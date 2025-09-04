import React, { useState } from 'react';

const VideoGenerator = ({ selections, selectedInspiration, sceneDescription, onGenerationComplete, onReset }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [error, setError] = useState(null);

  // Generate a cinematic prompt from selections
  const generatePromptFromSelections = (selections) => {
    const { equipment, movement, lighting, palette, composition } = selections;
    
    const promptParts = [];
    
    if (equipment) {
      const equipmentMap = {
        'arri_pro': 'shot on ARRI Alexa Mini LF with cinema-grade clarity',
        'vintage_film': 'shot on vintage 16mm film with warm analog grain',
        'iphone': 'captured on iPhone 15 Pro with clean digital detail',
        'security_cam': 'CCTV surveillance aesthetic with digital noise',
        'red_cinema': 'shot on RED Cinema camera with high dynamic range',
        'film_noir': 'classic black & white film noir aesthetic with high contrast',
        'drone_cam': 'aerial cinematography with wide perspectives and smooth movement',
        'webcam': 'low-fi digital quality with intimate, authentic feel'
      };
      promptParts.push(equipmentMap[equipment]);
    }
    
    if (movement) {
      const movementMap = {
        'static': 'locked-off static camera with zero movement',
        'dolly': 'smooth dolly tracking shot',
        'handheld': 'natural handheld motion with subtle shake',
        'orbit': 'orbiting camera move around the subject',
        'push_in': 'slow push-in movement toward the subject for emphasis',
        'pull_back': 'reveal shot pulling back to show context and scale',
        'tilt_pan': 'simple camera tilt and pan for dynamic framing',
        'whip_pan': 'fast horizontal whip pan for energy and transition'
      };
      promptParts.push(movementMap[movement]);
    }
    
    if (lighting) {
      const lightingMap = {
        'natural': 'soft natural daylight with gentle shadows',
        'dramatic': 'high contrast dramatic light with deep shadows',
        'soft': 'even soft studio lighting with minimal shadows',
        'neon': 'vibrant neon lighting with colored glow',
        'golden_hour': 'warm golden hour lighting with magical quality',
        'harsh_sun': 'harsh direct sunlight with strong shadows and contrast',
        'candlelight': 'warm flickering candlelight with intimate atmosphere',
        'moonlight': 'cool moonlight with blue tones and low-light aesthetic'
      };
      promptParts.push(lightingMap[lighting]);
    }
    
    if (palette) {
      const paletteMap = {
        'cool_blues': 'cool blue color palette with cinematic grade',
        'warm_pastels': 'warm pastel palette with gentle saturation',
        'black_white': 'black and white monochrome with high contrast',
        'saturated': 'bold saturated colors with vibrant look',
        'sepia_tone': 'vintage sepia tone with nostalgic brown monochrome',
        'teal_orange': 'modern teal and orange color grade with blockbuster look',
        'muted_earth': 'desaturated earth tones with organic natural feel',
        'high_contrast': 'high contrast palette with punchy blacks and whites'
      };
      promptParts.push(paletteMap[palette]);
    }
    
    if (composition) {
      const compositionMap = {
        'close_up': 'intimate close-up framing with shallow depth',
        'medium': 'balanced medium shot with standard framing',
        'wide': 'wide establishing shot with environmental context',
        'aerial': 'aerial overhead perspective with bird\'s-eye view',
        'dutch_angle': 'dutch angle tilted frame for tension and unease',
        'over_shoulder': 'over-the-shoulder conversation perspective with depth',
        'bird_eye': 'straight down bird\'s eye view for pattern and scale',
        'worm_eye': 'worm\'s eye view looking up for power and dominance'
      };
      promptParts.push(compositionMap[composition]);
    }
    
    return promptParts.join(', ');
  };



  const generateVideo = async () => {
    if (!selections || Object.values(selections).some(s => !s)) {
      setError('Please select all categories before generating');
      return;
    }

    if (!sceneDescription || sceneDescription.trim().length === 0) {
      setError('Please describe your scene before generating');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress('Starting video generation...');

    try {
      // Use inspiration prompt if available, otherwise generate from selections
      let technicalPrompt;
      if (selectedInspiration && selectedInspiration.prompt) {
        technicalPrompt = selectedInspiration.prompt;
        console.log('Using inspiration prompt:', technicalPrompt);
      } else {
        technicalPrompt = generatePromptFromSelections(selections);
        console.log('Generated technical prompt from selections:', technicalPrompt);
      }
      
      // Combine scene description with technical parameters
      const fullPrompt = `${sceneDescription.trim()}. ${technicalPrompt}`;
      console.log('Full prompt:', fullPrompt);
      console.log('Selections:', selections);

      setGenerationProgress('Initiating Veo 3 generation...');

      // Real Vertex AI API integration
      console.log('Using real Vertex AI API for Veo 3 video generation');
      
      // Start video generation
      const response = await fetch('https://veo-director-backend-337593556542.us-central1.run.app/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: fullPrompt })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed: ${errorData.error || response.statusText}`);
      }
      
      const { operation } = await response.json();
      console.log('Video generation started, operation:', operation);
      
      setGenerationProgress('Video generation in progress...');

      // Wait a moment for the operation to be fully registered
      setGenerationProgress('Waiting for operation to initialize...');
      await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 seconds

      // Poll for completion
      let attempts = 0;
      const maxAttempts = 60; // 10 minutes max
      
      while (attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds

        console.log(`Polling attempt ${attempts}/${maxAttempts}`);
        
        try {
          // Check operation status
          const statusResponse = await fetch(`https://veo-director-backend-337593556542.us-central1.run.app/api/operation-status/${encodeURIComponent(operation)}`);
          
          if (!statusResponse.ok) {
            const errorData = await statusResponse.json().catch(() => ({}));
            
            // Handle 404 specially - operation might still be initializing
            if (statusResponse.status === 404 && errorData.retryAfter) {
              console.log(`Operation not ready yet, retrying in ${errorData.retryAfter} seconds...`);
              setGenerationProgress(`Operation initializing... retrying in ${errorData.retryAfter} seconds`);
              continue; // Skip this attempt and try again
            }
            
            throw new Error(`Status check failed: ${statusResponse.status} ${statusResponse.statusText}`);
          }
          
          const statusData = await statusResponse.json();
          console.log(`Poll attempt ${attempts} result:`, statusData);
          
          // Check if operation is done
          if (statusData.done) {
            if (statusData.response && statusData.response.videos) {
              // Success! Operation is complete, now download the video
              console.log('🎬 Video generation completed, downloading video...');
              setGenerationProgress('Video generated! Downloading...');
              
              try {
                // Call the download endpoint to get the video details
                const downloadResponse = await fetch(`https://veo-director-backend-337593556542.us-central1.run.app/api/download-video/${encodeURIComponent(operation)}`);
                
                if (!downloadResponse.ok) {
                  const errorData = await downloadResponse.json().catch(() => ({}));
                  throw new Error(`Download failed: ${errorData.error || downloadResponse.statusText}`);
                }
                
                const downloadData = await downloadResponse.json();
                
                if (downloadData.success && downloadData.video) {
                  const video = {
                    uri: downloadData.video.dataUrl || downloadData.video.signedUrl,
                    gcsUri: downloadData.video.gcsUri,
                    duration: downloadData.video.duration,
                    resolution: downloadData.video.resolution,
                    format: downloadData.video.format || 'MP4',
                    mimeType: downloadData.video.mimeType
                  };
                  
                  setGeneratedVideo(video);
                  setGenerationProgress('Video ready!');
                  onGenerationComplete?.(video);
                  return; // Success!
                } else {
                  throw new Error('Download response missing video data');
                }
              } catch (downloadError) {
                console.error('Download error:', downloadError);
                throw new Error(`Failed to download video: ${downloadError.message}`);
              }
            } else if (statusData.error) {
              throw new Error(`Video generation failed: ${statusData.error.message || JSON.stringify(statusData.error)}`);
            } else {
              // Log the actual response structure for debugging
              console.log('Response structure:', JSON.stringify(statusData.response, null, 2));
              throw new Error('Video generation completed but no videos found in response');
            }
          }
          
          setGenerationProgress('Processing your video...');
          
        } catch (pollError) {
          console.error(`Polling error on attempt ${attempts}:`, pollError);
          setGenerationProgress('Processing your video...');
        }
      }
      
      // If we get here, we've timed out
      throw new Error('Video generation timed out after 10 minutes. Please try again.');

    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'Video generation failed');
      setGenerationProgress('');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGeneration = () => {
    setGeneratedVideo(null);
    setError(null);
    setGenerationProgress('');
  };

  const hasSelections = selections && Object.values(selections).some(s => s);
  const hasSceneDescription = sceneDescription && sceneDescription.trim().length > 0;

  return (
    <div>
      {/* Generate Button - Moved Much Lower */}
      {!isGenerating && !generatedVideo && (
        <div className="text-center" style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
          <button
            onClick={generateVideo}
            disabled={!hasSelections || !hasSceneDescription}
            className={`
              relative px-20 py-12 text-3xl font-black transition-all duration-300 transform group
              ${(!hasSelections || !hasSceneDescription)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 active:scale-95'
              }
            `}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(40px) saturate(200%)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              color: '#1f2937',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
              minHeight: '80px',
              minWidth: '300px'
            }}
          >
            <span className="relative z-10">🎬 GENERATE VIDEO</span>
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            ></div>
          </button>
          
          {(!hasSelections || !hasSceneDescription) && (
            <p className="mt-6 text-sm text-gray-500">
              {!hasSceneDescription 
                ? 'Describe your scene above to generate your video'
                : 'Select options above to generate your video'
              }
            </p>
          )}
          
          <div className="mt-8">
            <button
              onClick={onReset}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200 font-light tracking-wider"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              RESET
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="text-center" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
          {/* Simple Status Indicator */}
          <div className="flex justify-center" style={{ marginBottom: '32px', marginTop: '40px' }}>
            <div 
              className="rounded-full flex items-center justify-center"
              style={{
                width: '100px', // Reduced from 120px
                height: '100px', // Reduced from 120px
                background: 'rgba(59, 130, 246, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '3px solid rgba(59, 130, 246, 0.3)', // Reduced from 4px
                boxShadow: '0 12px 36px rgba(59, 130, 246, 0.2)' // Reduced from 0 16px 48px
              }}
            >
              <div 
                className="rounded-full"
                style={{ 
                  width: '60px', // Reduced from 80px
                  height: '60px', // Reduced from 80px
                  border: '3px solid rgba(59, 130, 246, 0.3)', // Reduced from 4px
                  borderTop: '3px solid #3b82f6', // Reduced from 4px
                  animation: 'spin 1s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="mb-6">
            <p 
              className="text-xl font-bold text-gray-900 mb-2"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              🎬 Generating Video
            </p>
            <p className="text-sm text-gray-600 font-medium">{generationProgress}</p>
            <p className="text-xs text-gray-500 mt-2">
              This may take a few minutes...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div 
          className="card text-center p-8 bg-red-50 rounded-lg my-4"
          style={{
            borderColor: '#fca5a5',
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
        >
          <p className="text-red-600 font-semibold mb-3">Generation Failed</p>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <button
            onClick={resetGeneration}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Generated Video */}
      {generatedVideo && (
        <div className="text-center pt-40 pb-20">
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Your Video is Ready!</h4>
            <p className="text-sm text-gray-600">Generated with Veo 3 AI</p>
          </div>
          
          {/* Video Display */}
          <div 
            className="card bg-gray-100 rounded-lg p-6 mb-8"
            style={{
              borderColor: '#e5e7eb',
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            <video
              controls
              className="w-full max-w-md mx-auto rounded-lg"
              src={generatedVideo.uri}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div 
            className="card text-left bg-gray-50 rounded-lg p-6 mb-8"
            style={{
              borderColor: '#e5e7eb',
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            <h5 
              className="text-2xl font-black text-gray-900 mb-4 tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              VIDEO DETAILS
            </h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {generatedVideo.duration || '8 seconds'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Resolution:</strong> {generatedVideo.resolution || '720p'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Format:</strong> {generatedVideo.format || 'MP4'}
              </p>
              {generatedVideo.gcsUri && (
                <p className="text-sm text-gray-600">
                  <strong>Storage:</strong> 
                  <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded ml-2">
                    {generatedVideo.gcsUri}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 justify-center pt-8 mt-6">
            <button
              onClick={async () => {
                console.log('Download button clicked, video URI:', generatedVideo.uri);
                if (generatedVideo.uri) {
                  try {
                    // Create a proper download link
                    const link = document.createElement('a');
                    link.href = generatedVideo.uri;
                    link.download = `veo-video-${Date.now()}.${generatedVideo.format?.toLowerCase() || 'mp4'}`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } catch (error) {
                    console.error('Download failed:', error);
                    // Fallback to opening in new tab
                    window.open(generatedVideo.uri, '_blank');
                  }
                } else {
                  console.error('No video URI available for download');
                  alert('Video download not available. Please try generating again.');
                }
              }}
              className="btn-primary"
            >
              Download Video
            </button>
            <button
              onClick={resetGeneration}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default VideoGenerator;