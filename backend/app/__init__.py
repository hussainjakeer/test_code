import os
from flask import Flask
from dotenv import load_dotenv
from datetime import timedelta
from flask_session import Session
from flask_cors import CORS

from .routes import *
from .routes.dashboard_routes import *
from .routes.gsc_auth_apis import *

dotenv_path = "config.env"
load_dotenv(dotenv_path)

def create_app():
    
    app = Flask(__name__)
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_FILE_DIR'] = os.path.join(os.getcwd(), 'flask_session')
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config['SESSION_COOKIE_SECURE'] = True
    if not os.path.exists(app.config['SESSION_FILE_DIR']):
        os.makedirs(app.config['SESSION_FILE_DIR'])
    
    CORS(app,  resources={r'/*': {"origins": ["http://localhost:5173", "http://localhost:3000"],
                                  "allow_headers": "*",
                                  "methods": ["GET", "POST"]}},
         supports_credentials=True)
    Session(app)
    
    # app.register_blueprint(dashboard_apis, url = '/dashboard')
    app.register_blueprint(dashboard_apis, url = '/dashboard')
    
    
    return app