import express from 'express';
import { execSync } from 'child_process';
import https from 'https';
import cors from 'cors';

const app = express();
// Use Cloud Run's PORT environment variable or fallback to 3001 for local development
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const PROJECT_ID = 'veo-director-tool';
const LOCATION = 'us-central1';
const MODEL_ID = 'veo-3.0-generate-001';

// Function to get Google Cloud access token
async function getAccessToken() {
  try {
    // Try service account first (for production)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      const { GoogleAuth } = await import('google-auth-library');
      const auth = new GoogleAuth({
        credentials: serviceAccount,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      const token = await auth.getAccessToken();
      return token;
    }
    
    // Fallback to CLI auth (for local development)
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    return token;
  } catch (error) {
    console.error('Failed to get access token:', error.message);
    throw new Error('Authentication failed - please check Google Cloud setup');
  }
}

// Function to make HTTP request
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Endpoint to generate video
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    console.log('🎬 Starting Veo 3 video generation...');
    console.log('📝 Prompt:', prompt);
    
    const token = await getAccessToken();
    console.log('✅ Got access token');
    
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:predictLongRunning`;
    
    const requestData = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        aspectRatio: "16:9",
        sampleCount: 1,
        durationSeconds: 8
      }
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    console.log('🚀 Making API request to Vertex AI...');
    const response = await makeRequest(url, options, requestData);
    
    if (response.status !== 200) {
      console.error('❌ API request failed:', response.status);
      return res.status(response.status).json({ 
        error: 'API request failed', 
        details: response.data 
      });
    }
    
    console.log('✅ Video generation started successfully!');
    console.log('📋 Full response data:', JSON.stringify(response.data, null, 2));
    console.log('📋 Operation name:', response.data.name);
    
    res.json({
      success: true,
      operation: response.data.name,
      message: 'Video generation started successfully'
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ 
      error: 'Video generation failed', 
      details: error.message 
    });
  }
});

// Endpoint to check operation status
app.get('/api/operation-status/:operationName', async (req, res) => {
  try {
    let { operationName } = req.params;
    
    if (!operationName) {
      return res.status(400).json({ error: 'Operation name is required' });
    }
    
    // Decode the URL-encoded operation name
    operationName = decodeURIComponent(operationName);
    console.log('🔍 Checking operation status for:', operationName);
    
    const token = await getAccessToken();
    
    // For Veo API, we need to use the :fetchPredictOperation endpoint
    // Extract the model and operation parts
    const operationMatch = operationName.match(/models\/([^\/]+)\/operations\/([^\/]+)/);
    if (!operationMatch) {
      return res.status(400).json({ error: 'Invalid operation format' });
    }
    
    const [, modelId, operationId] = operationMatch;
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${modelId}:fetchPredictOperation`;
    
    console.log('🌐 Making request to:', url);
    console.log('📋 Full operation name:', operationName);
    
        const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    // For Veo, we need to send the operation name in the request body
    const requestData = {
      operationName: operationName
    };

    const response = await makeRequest(url, options, requestData);
    
    if (response.status !== 200) {
      console.error('❌ Status check failed with status:', response.status);
      
      // If it's a 404, the operation might not be ready yet
      if (response.status === 404) {
        return res.status(404).json({ 
          error: 'Operation not found - may still be initializing',
          details: 'The operation may take a few moments to be fully registered. Please try again in 10-15 seconds.',
          retryAfter: 15
        });
      }
      
      return res.status(response.status).json({ 
        error: 'Status check failed', 
        details: response.data 
      });
    }
    
    console.log('✅ Status check successful');
    console.log('📋 Response data:', JSON.stringify(response.data, null, 2));
    
    // Check if operation is done
    if (response.data.done) {
      console.log('🎬 Operation completed!');
      if (response.data.response && response.data.response.videos) {
        console.log('📹 Videos found:', response.data.response.videos.length);
      }
    } else {
      console.log('⏳ Operation still running...');
    }
    
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ Error checking operation status:', error.message);
    res.status(500).json({ 
      error: 'Failed to check operation status', 
      details: error.message 
    });
  }
});

// Video download endpoint
app.get('/api/download-video/:operationName', async (req, res) => {
  try {
    let { operationName } = req.params;
    
    if (!operationName) {
      return res.status(400).json({ error: 'Operation name is required' });
    }
    
    // Decode the URL-encoded operation name
    operationName = decodeURIComponent(operationName);
    console.log('📥 Downloading video for operation:', operationName);
    
    const token = await getAccessToken();
    
    // First check the operation status to get the GCS path
    const operationMatch = operationName.match(/models\/([^\/]+)\/operations\/([^\/]+)/);
    if (!operationMatch) {
      return res.status(400).json({ error: 'Invalid operation format' });
    }
    
    const [, modelId, operationId] = operationMatch;
    const statusUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${modelId}:fetchPredictOperation`;
    
    const statusOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const statusData = {
      operationName: operationName
    };
    
    const statusResponse = await makeRequest(statusUrl, statusOptions, statusData);
    
    if (statusResponse.status !== 200) {
      return res.status(statusResponse.status).json({ 
        error: 'Failed to get operation status', 
        details: statusResponse.data 
      });
    }
    
    const operationData = statusResponse.data;
    
    if (!operationData.done) {
      return res.status(400).json({ 
        error: 'Operation not complete', 
        details: 'Video generation is still in progress'
      });
    }
    
    if (!operationData.response || !operationData.response.videos || operationData.response.videos.length === 0) {
      return res.status(400).json({ 
        error: 'No video found in response', 
        details: 'The operation completed but no video was generated'
      });
    }
    
    const video = operationData.response.videos[0];
    
    // Check if video is in base64 format or GCS URI format
    if (video.bytesBase64Encoded) {
      // Video is in base64 format - create a data URL
      console.log('🎬 Video found in base64 format');
      
      const dataUrl = `data:${video.mimeType || 'video/mp4'};base64,${video.bytesBase64Encoded}`;
      
      res.json({
        success: true,
        video: {
          dataUrl: dataUrl,
          mimeType: video.mimeType || 'video/mp4',
          duration: '8 seconds',
          resolution: '720p',
          format: 'base64'
        }
      });
    } else if (video.gcsUri) {
      // Video is stored in Google Cloud Storage
      console.log('🎬 Video found at GCS URI:', video.gcsUri);
      
      // Extract bucket and object path from gs:// URI
      const gcsMatch = video.gcsUri.match(/gs:\/\/([^\/]+)\/(.+)/);
      if (!gcsMatch) {
        return res.status(400).json({ 
          error: 'Invalid GCS URI format', 
          details: 'Could not parse the Google Cloud Storage URI'
        });
      }
      
      const [, bucketName, objectPath] = gcsMatch;
      
      // Create a signed URL for the video download
      // This allows the frontend to download the video directly from GCS
      const signedUrl = await generateSignedUrl(bucketName, objectPath);
      
      res.json({
        success: true,
        video: {
          gcsUri: video.gcsUri,
          signedUrl: signedUrl,
          mimeType: video.mimeType || 'video/mp4',
          duration: '8 seconds',
          resolution: '720p',
          format: 'gcs'
        }
      });
    } else {
      return res.status(400).json({ 
        error: 'No video data found', 
        details: 'The video was generated but no video data (base64 or GCS URI) was provided'
      });
    }
    
  } catch (error) {
    console.error('❌ Error downloading video:', error.message);
    res.status(500).json({ 
      error: 'Failed to download video', 
      details: error.message 
    });
  }
});

// Helper function to generate signed URLs for GCS objects
async function generateSignedUrl(bucketName, objectPath) {
  try {
    // For now, return the GCS URI as a direct download link
    // In production, you'd want to generate a proper signed URL with expiration
    return `https://storage.googleapis.com/${bucketName}/${objectPath}`;
  } catch (error) {
    console.error('❌ Error generating signed URL:', error.message);
    throw error;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Veo Director Tool API is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Veo Director Tool API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎬 Video generation: POST http://localhost:${PORT}/api/generate-video`);
  console.log(`⏳ Status check: GET http://localhost:${PORT}/api/operation-status/:operationName`);
  console.log(`📥 Video download: GET http://localhost:${PORT}/api/download-video/:operationName`);
});

export default app;
