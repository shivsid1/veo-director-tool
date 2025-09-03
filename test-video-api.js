import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({
  apiKey: process.env.VITE_GEMINI_API_KEY || 'AIzaSyDoEIJMO-n2vfYWeDg0Z-0XC89rKAVZEYY',
  authType: 'API_KEY'
});

async function testVideoGeneration() {
  try {
    console.log('Testing Veo 3 video generation...');
    
    let operation = await client.models.generateVideos({
      model: "veo-3.0-fast-generate-preview",
      prompt: "A close-up shot of a golden retriever playing in a field",
      config: {
        aspect_ratio: "16:9",
        number_of_videos: 1
      }
    });
    
    console.log('Video generation started:', operation);
    
    // Add this after the operation is created
    console.log('Polling for completion...');
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      operation = await client.operations.get(operation.name);
      console.log('Status:', operation.done ? 'Complete' : 'Processing...');
    }

    if (operation.result && operation.result.generatedVideos) {
      console.log('Video generated successfully!');
      // You can add download logic here if needed
    } else {
      console.log('Video generation failed:', operation.error);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testVideoGeneration();
