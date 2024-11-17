import os
import time
from flask import jsonify, request, current_app, session
from functools import wraps
import requests as http_requests
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials


CLIENT_ID = os.getenv("CLIENT_ID")
TOKEN_INFO_URL = os.getenv("TOKEN_INFO_URL")
API_SERVICE_NAME = os.getenv("API_SERVICE_NAME")
API_VERSION = os.getenv("API_VERSION")


# Custom Decorator to verify the access token sent by frontend
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 403
        
        if token.startswith("Bearer "):
            token = token[7:].strip()
            
        if 'credentials' not in session:
            try:
                response = http_requests.get(f"{TOKEN_INFO_URL}?access_token={token}")
                token_info = response.json()
                
                if (response.status_code != 200) or ("error" in token_info):
                    return jsonify({"error" : "Invalid or expired token!"}), 401
                
                if token_info.get('aud') != CLIENT_ID:
                    return jsonify({'error' : "Invalid token audience!"}), 401
                
                credentials =  Credentials(token=token)
                session["credentials"] = credentials.to_json()
                
                # Add the user info (or token) to the request context if needed
                # request.user_info = token_info  # Store user info for later use (optional)
                
            except Exception as e:
                current_app.logger.error(f"Error verifying token: {str(e)}")
                return jsonify({"error": "Invalid or expired token!"}), 401
        
        else:
            if session["credentials"].token == token:
                pass
            else:
                return jsonify({'message': 'Token is missmatch'}), 401

        return f(*args, **kwargs)
    return decorated_function



def build_service(access_token):
    try :
        # Set up the Google API client with the access token
        credentials =  Credentials(token=access_token)
        
        # Fetch data from Google Search Console
        service = build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

        if not service:
            return jsonify({'message': 'Failed to Build credentials for Google Search Console'}), 401
        return service
    
    except Exception as e:
        return jsonify({'message': 'Service Building Error'}), 400