#!/bin/bash

# Veo Video Generation Script
# Generates a video and then polls for completion

PROJECT_ID="veo-director-tool"
LOCATION="us-central1"
BUCKET="gs://veo-output-director/renders/"

echo "🎬 Starting Veo video generation..."
echo "📋 Project: ${PROJECT_ID}"
echo "📍 Location: ${LOCATION}"
echo "🪣 Output bucket: ${BUCKET}"
echo ""

# Start the video generation
echo "🚀 Submitting generation request..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/veo-3.0-generate-001:predictLongRunning" \
  -d '{
    "instances":[{"prompt":"cinematic aerial over pine forest at golden hour, slow dolly"}],
    "parameters":{
      "aspectRatio":"16:9",
      "sampleCount":1,
      "resolution":"1080p",
      "durationSeconds":8,
      "storageUri":"'${BUCKET}'"
    }
  }')

# Check if we got an operation ID
if echo "$RESPONSE" | grep -q '"name"'; then
    OPERATION_NAME=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('name', ''))
except:
    print('')
")
    
    if [[ -n "$OPERATION_NAME" ]]; then
        echo "✅ Generation started successfully!"
        echo "🔍 Operation: $OPERATION_NAME"
        echo ""
        
        # Extract just the operation ID for easier reference
        OPERATION_ID=$(echo "$OPERATION_NAME" | sed 's/.*operations\///')
        echo "📝 Operation ID: $OPERATION_ID"
        echo ""
        
        # Start polling
        echo "⏱️  Polling every 30 seconds until complete..."
        echo ""
        
        while true; do
            TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
            
            POLL_RESPONSE=$(curl -s -X POST \
                -H "Authorization: Bearer $(gcloud auth print-access-token)" \
                -H "Content-Type: application/json" \
                "https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/veo-3.0-generate-001:fetchPredictOperation" \
                -d "{\"operationName\":\"$OPERATION_NAME\"}")
            
            if echo "$POLL_RESPONSE" | grep -q '"done": true'; then
                echo "✅ [${TIMESTAMP}] Operation completed!"
                echo ""
                
                # Check for errors in the final response
                if echo "$POLL_RESPONSE" | grep -q '"error"'; then
                    echo "❌ Operation completed with error:"
                    echo "$POLL_RESPONSE" | python3 -m json.tool
                else
                    echo "📹 Success! Final response:"
                    echo "$POLL_RESPONSE" | python3 -m json.tool
                    
                    # Extract video URI
                    VIDEO_URI=$(echo "$POLL_RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    predictions = data.get('response', {}).get('predictions', [])
    if predictions and 'videos' in predictions[0]:
        videos = predictions[0]['videos']
        if videos:
            print(videos[0].get('gcsUri', 'No gcsUri found'))
        else:
            print('No videos in predictions')
    else:
        print('No predictions found')
except Exception as e:
    print(f'Parse error: {e}')
")
                    
                    if [[ "$VIDEO_URI" != "No"* ]] && [[ "$VIDEO_URI" != "Parse"* ]]; then
                        echo ""
                        echo "🎥 Your generated video is ready at:"
                        echo "   $VIDEO_URI"
                        echo ""
                        echo "💡 To download it locally, run:"
                        echo "   gsutil cp \"$VIDEO_URI\" ."
                    fi
                fi
                break
            else
                echo "⏳ [${TIMESTAMP}] Still processing..."
                
                # Check for errors during polling
                if echo "$POLL_RESPONSE" | grep -q '"error"'; then
                    echo "❌ Error detected:"
                    echo "$POLL_RESPONSE" | python3 -m json.tool
                    break
                fi
            fi
            
            sleep 30
        done
    else
        echo "❌ Failed to extract operation name from response"
        echo "$RESPONSE" | python3 -m json.tool
    fi
else
    echo "❌ Generation request failed:"
    echo "$RESPONSE" | python3 -m json.tool
fi

echo ""
echo "🏁 Script complete!"
