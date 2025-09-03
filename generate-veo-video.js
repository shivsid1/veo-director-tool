#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');

// Configuration
const PROJECT_ID = 'veo-director-tool';
const LOCATION = 'us-central1';
const MODEL_ID = 'veo-3.0-generate-001';

// Function to get Google Cloud access token
function getAccessToken() {
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    return token;
  } catch (error) {
    console.error('❌ Failed to get access token. Make sure you are authenticated with gcloud.');
    console.error('Run: gcloud auth login');
    process.exit(1);
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

// Function to generate video
async function generateVideo(prompt) {
  console.log('🎬 Starting Veo 3 video generation...');
  console.log('📝 Prompt:', prompt);
  console.log('');
  
  const token = getAccessToken();
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
  
  try {
    console.log('🚀 Making API request to Vertex AI...');
    const response = await makeRequest(url, options, requestData);
    
    if (response.status !== 200) {
      console.error('❌ API request failed:', response.status);
      console.error('Response:', response.data);
      return;
    }
    
    console.log('✅ Video generation started successfully!');
    console.log('📋 Operation:', response.data.name);
    console.log('');
    
    // Poll for completion
    await pollOperation(response.data.name, token);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Function to poll operation status
async function pollOperation(operationName, token) {
  console.log('⏳ Polling for completion...');
  console.log('⏱️  This may take 1-5 minutes...');
  console.log('');
  
  let attempts = 0;
  const maxAttempts = 60; // 10 minutes max
  
  while (attempts < maxAttempts) {
    attempts++;
    
    try {
      const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/${operationName}`;
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await makeRequest(url, options);
      
      if (response.status !== 200) {
        console.error('❌ Status check failed:', response.status);
        break;
      }
      
      const operation = response.data;
      
      if (operation.done) {
        if (operation.response && operation.response.predictions) {
          console.log('🎉 Video generation completed successfully!');
          console.log('');
          
          const predictions = operation.response.predictions;
          if (predictions.length > 0) {
            const video = predictions[0];
            console.log('📹 Video Details:');
            console.log('   Duration: 8 seconds');
            console.log('   Resolution: 720p');
            console.log('   Format: MP4');
            
            if (video.videos && video.videos.length > 0) {
              const videoUri = video.videos[0].gcsUri;
              console.log('   Storage URI:', videoUri);
              console.log('');
              console.log('💡 To download, use: gsutil cp ' + videoUri + ' ./generated-video.mp4');
            }
          }
        } else if (operation.error) {
          console.error('❌ Video generation failed:');
          console.error('   Error:', operation.error.message || JSON.stringify(operation.error));
        } else {
          console.error('❌ Video generation completed but no result found');
        }
        break;
      } else {
        console.log(`⏳ [${new Date().toLocaleTimeString()}] Still processing... (Attempt ${attempts}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      }
      
    } catch (error) {
      console.error(`❌ Polling error on attempt ${attempts}:`, error.message);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
    }
  }
  
  if (attempts >= maxAttempts) {
    console.log('⏰ Polling timed out after 10 minutes');
  }
}

// Main execution
if (require.main === module) {
  const prompt = process.argv[2];
  
  if (!prompt) {
    console.log('Usage: node generate-veo-video.js "Your video prompt here"');
    console.log('');
    console.log('Example:');
    console.log('  node generate-veo-video.js "A cinematic shot of a majestic lion in the savannah"');
    process.exit(1);
  }
  
  generateVideo(prompt).catch(console.error);
}

module.exports = { generateVideo };
