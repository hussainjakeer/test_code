import os
from app import create_app

def main():
   app = create_app()
   host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
   port = int(os.getenv('FLASK_RUN_PORT', 5000))
   # app.run(host=host, port=port, debug=True,ssl_context = "adhoc")
   app.run(host=host, port=port, debug=True)

if __name__ == '__main__':
   main()