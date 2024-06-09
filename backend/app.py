from flask import Flask, request, jsonify
import requests
import os
import json
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Explicitly configure CORS to whitelist specific origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000/"]}})

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_BASE_URL = 'https://api.groq.com/v1'

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY must be set in the environment variables.")

def analyze_text_with_groq(text):
    headers = {
        'Authorization': f'Bearer {GROQ_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "messages": [
            {
                "role": "system",
                "content": "You are a sentiment analysis API. The JSON schema should include {'sentiment_analysis': {'sentiment': 'string', 'confidence_score': 'number'}}"
            },
            {
                "role": "user",
                "content": f"Perform sentiment analysis and provide scores for Joy, Sadness, Anger, Fear, Surprise, Disgust, and Neutral for the following text: {text}"
            }
        ],
        "model": "llama3-8b-8192",
        "temperature": 0.5,
        "max_tokens": 500,
    }

    try:
        app.logger.debug(f'Sending request to Groq API with payload: {payload}')
        response = requests.post(f'{GROQ_BASE_URL}/chat/completions', json=payload, headers=headers)
        response.raise_for_status()
        app.logger.debug(f'Response from Groq API: {response.json()}')
        return response.json()
    except requests.RequestException as e:
        app.logger.error(f'Error in request to Groq API: {e}')
        raise

def parse_groq_response(response):
    # Log the entire response for debugging
    app.logger.debug(f'Response from Groq API: {response}')
    
    # Extract the relevant part of the response content
    message_content = response['choices'][0]['message']['content']
    
    # Log the content for debugging
    app.logger.debug(f'Message content from Groq API: {message_content}')
    
    # Assuming the response content is a JSON string, parse it
    try:
        parsed_content = json.loads(message_content)
        app.logger.debug(f'Parsed content: {parsed_content}')
        
        # Extract emotion scores from the parsed content
        emotion_scores = {
            'Joy': parsed_content.get('joy', 0),
            'Sadness': parsed_content.get('sadness', 0),
            'Anger': parsed_content.get('anger', 0),
            'Fear': parsed_content.get('fear', 0),
            'Surprise': parsed_content.get('surprise', 0),
            'Disgust': parsed_content.get('disgust', 0),
            'Neutral': parsed_content.get('neutral', 0),
        }

        return emotion_scores
    except json.JSONDecodeError as e:
        app.logger.error(f'Error parsing JSON content: {e}')
        return None

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    app.logger.debug(f'Received data: {data}')
    text = data.get('text')

    if not text:
        app.logger.error('No text provided in the request')
        return jsonify({'error': 'Text is required'}), 400

    try:
        analysis_results = analyze_text_with_groq(text)
        emotion_scores = parse_groq_response(analysis_results)

        if emotion_scores is None:
            app.logger.error('Failed to parse response from Groq API')
            return jsonify({'error': 'Failed to parse response from Groq API'}), 500

        emotion_values = [
            emotion_scores['Joy'],
            emotion_scores['Sadness'],
            emotion_scores['Anger'],
            emotion_scores['Fear'],
            emotion_scores['Surprise'],
            emotion_scores['Disgust'],
            emotion_scores['Neutral'],
        ]

        return jsonify({'data': emotion_values})

    except requests.RequestException as e:
        app.logger.error(f'Error in request to Groq API: {e}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
