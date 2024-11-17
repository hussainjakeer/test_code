import os
import numpy as np
import pandas as pd
from . import dashboard_apis
from .utils import token_required, build_service
from flask import current_app, session, jsonify, request

API_SERVICE_NAME = os.getenv("API_SERVICE_NAME")
API_VERSION = os.getenv("API_VERSION")
CLIENT_ID = os.getenv("CLIENT_ID")
TOKEN_INFO_URL = os.getenv("TOKEN_INFO_URL")

@dashboard_apis.route('/dashboard/property-list', methods = ["GET", "POST"])
@token_required
def fetch_gsc_site_list_data():
    
    try:
        access_token = request.headers.get('Authorization')
        access_token = access_token[7:].strip()
        
        service = build_service(access_token)
    
        if not service:
            return jsonify({'message': 'Failed to Build credentials for Google Search Console'}), 401
        
        # Example: Get the list of sites (WebProperty) in GSC
        sites = service.sites().list().execute()
        try:
            site_list = sites["siteEntry"]
        except Exception as e:
            return jsonify({'message': 'Please add project to Google Search Console'}), 401
        
        site_list_sorted = [site["siteUrl"] for site in site_list  if site['permissionLevel'] != 'siteUnverifiedUser']
        site_list_sorted = sorted(site_list_sorted)
        # session["site_list_sorted"] = site_list_sorted
        return jsonify({"properties_list":site_list_sorted}), 200

    except Exception as e:
        current_app.logger.error(f"Error fetching data from Google Search Console: {str(e)}")
        return jsonify({'message': 'Error fetching data from Google Search Console'}), 500




def fetch_gsc_data(service, selected_property, start_date, 
                   end_date, dimension = ["DATE"]):
    
    try:
        all_responses = []
        start_row = 0
        # Get the list of sites in GSC
        while True:
            request_body = {
                "startDate": start_date,
                "endDate": end_date,
                "dimensions": dimension,
                # "dimensionFilterGroups": dimensionFilterGroups,
                "rowLimit": 25000,
                "dataState": "final",
                "startRow": start_row,
                # 'aggregationType': 'byPage'
                }
            response_data = service.searchanalytics().query(siteUrl = selected_property,
                                                        body = request_body).execute()
            rows = response_data.get("rows", [])
            all_responses.extend([each["keys"] + [each['clicks'], each['impressions'], each['ctr'], each['position']] for each in rows])
            
            start_row += len(rows)
            if len(rows) <25000:
                break
        
        df = pd.DataFrame(all_responses, columns=dimension + ['Clicks', 'Impressions', 'CTR', 'Position'])
        # df = df.apply(lambda x: int(x) if isinstance(x, np.int64) else (float(x) if isinstance(x, np.float64) else x))
        return df.to_dict(orient = 'records')
        
    
    except Exception as e:
        current_app.logger.error(f"Error fetching data from Google Search Console: {str(e)}")
        return jsonify({'message': 'Error fetching data from Google Search Console'}), 500
    
    