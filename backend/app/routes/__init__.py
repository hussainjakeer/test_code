from flask import Blueprint

dashboard_apis = Blueprint("routes", __name__)

from . import dashboard_routes, gsc_auth_apis