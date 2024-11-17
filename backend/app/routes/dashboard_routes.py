import os
import datetime
import pandas as pd
from . import dashboard_apis
from .utils import token_required, build_service
from app.features import sum_finder
from flask import jsonify, request, current_app, session
from functools import wraps
from .gsc_auth_apis import fetch_gsc_data


CLIENT_ID = os.getenv("CLIENT_ID")
TOKEN_INFO_URL = os.getenv("TOKEN_INFO_URL")

# @dashboard_apis.route('/', methods = ["GET", "POST"])
@dashboard_apis.route('/dashboard', methods = ["GET","POST"])
@token_required
def dashboard():
    try:
        # Get the access token from the frontend (in the Authorization header)
        access_token = request.headers.get('Authorization')
        access_token = access_token[7:].strip()
        service = build_service(access_token)
        
        all_dimensions = {
            "date": ["DATE"],
            "query": ["QUERY"],
            "country": ["COUNTRY"],
            "device": ["DEVICE"],
            "page": ["PAGE"],
            # "all_dimensions_table" : ["QUERY", "PAGE", "COUNTRY", "DEVICE", "DATE"]
            }
        
        if request.method == "POST":
            dashboard_result = {}
            # Get the payload from the POST request
            request_data = request.get_json()
            
            start_date = request_data.get('start_date')
            end_date = request_data.get('end_date')
            selected_property = request_data.get('selected_property')
            tables = {}
            for key, value in all_dimensions.items():
                tables[key] = fetch_gsc_data(service, selected_property, start_date = start_date,
                           end_date = end_date, dimension = value)
                print(key, " : ")
                print(tables[key])
                
                
            dashboard_result['table'] = tables
            
            date_dataframe = pd.DataFrame(tables['date'])
            aggrigates = {
                "CLICKS_SUM" : sum_finder(date_dataframe, 'Clicks'),
                "IMPRESSIONS_SUM" :sum_finder(date_dataframe, 'Impressions'),
                "CTR": f"{(date_dataframe['Clicks'].sum() / date_dataframe['Impressions'].sum()) * 100:.2f}%" if date_dataframe["Impressions"].sum() > 0 else "0"
            }
            dashboard_result['aggrigates'] = aggrigates
            return jsonify(dashboard_result), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching dashboard data: {str(e)}")
        return jsonify({'message': 'Error fetching dashboard data'}), 500


