#!/bin/bash

# Veo Operation Status Checker
# This script polls the Veo operation until it completes

OPERATION_ID="07c6d1a8-3340-4c15-936d-cfe72868108d"
PROJECT_ID="veo-director-tool"
LOCATION="us-central1"

echo "🎬 Checking Veo operation status for: ${OPERATION_ID}"
echo "⏱️  Polling every 30 seconds until complete..."
echo ""

while true; do
    # Get current timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Make the API call
    RESPONSE=$(curl -s -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/veo-3.0-generate-001:fetchPredictOperation" \
        -d "{\"operationName\":\"projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/veo-3.0-generate-001/operations/${OPERATION_ID}\"}")
    
    # Check if the operation is done
    if echo "$RESPONSE" | grep -q '"done": true'; then
        echo "✅ [${TIMESTAMP}] Operation completed!"
        echo ""
        echo "📹 Final response:"
        echo "$RESPONSE" | python3 -m json.tool
        
        # Extract and display the video URL if available
        VIDEO_URI=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    videos = data.get('response', {}).get('predictions', [{}])[0].get('videos', [])
    if videos:
        print(videos[0].get('gcsUri', 'No gcsUri found'))
    else:
        print('No videos found in response')
except:
    print('Could not parse video URI')
")
        
        if [[ "$VIDEO_URI" != "No"* ]] && [[ "$VIDEO_URI" != "Could"* ]]; then
            echo ""
            echo "🎥 Your generated video is ready at: $VIDEO_URI"
        fi
        
        break
    else
        echo "⏳ [${TIMESTAMP}] Still processing..."
        
        # Check for errors
        if echo "$RESPONSE" | grep -q '"error"'; then
            echo "❌ Error detected in response:"
            echo "$RESPONSE" | python3 -m json.tool
            break
        fi
    fi
    
    # Wait 30 seconds before next check
    sleep 30
done

echo ""
echo "🏁 Polling complete!"
