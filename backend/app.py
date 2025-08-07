from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
import tempfile

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/')
def index():
    return "AI Tutor Flask backend is running!"

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio = request.files['audio']
    
    # Get filename and check extension
    filename = audio.filename or 'recording.webm'
    allowed_extensions = {'flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm'}
    
    # Extract extension
    if '.' in filename:
        ext = filename.rsplit('.', 1)[1].lower()
    else:
        ext = 'webm'  # Default to webm
    
    if ext not in allowed_extensions:
        return jsonify({'error': f'Invalid file format. Supported formats: {allowed_extensions}'}), 400

    temp_path = None
    try:
        # Create temporary file with correct extension
        with tempfile.NamedTemporaryFile(suffix=f".{ext}", delete=False) as temp_file:
            # Read and save the uploaded file
            audio.save(temp_file.name)
            temp_path = temp_file.name
        
        # Debug: Check file size
        file_size = os.path.getsize(temp_path)
        print(f"Saved temp file: {temp_path}, size: {file_size} bytes")
        
        # Transcribe using OpenAI Whisper
        with open(temp_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        
        transcribed_text = transcript.text
        print(f"Transcription successful: {transcribed_text[:100]}...")

        # Generate AI response
        chat_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI tutor."},
                {"role": "user", "content": transcribed_text}
            ]
        )
        ai_reply = chat_response.choices[0].message.content

        return jsonify({'text': transcribed_text, 'ai_reply': ai_reply})
    
    except Exception as e:
        print(f"Error in transcription: {str(e)}")
        return jsonify({'error': f'Processing failed: {str(e)}'}), 500
    
    finally:
        # Clean up temporary file
        if temp_path and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except:
                pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)