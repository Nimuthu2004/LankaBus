from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from route_optimizer import RouteOptimizer

app = Flask(__name__)
CORS(app) # Allows Flutter to communicate with the server

# Initialize your ML pipeline
optimizer = RouteOptimizer()
optimizer.setup() 

@app.route('/api/route', methods=['POST'])
def get_best_route():
    data = request.json
    try:
        # Calls the ML logic you wrote in route_optimizer.py
        result = optimizer.find_best_route(
            origin=data['origin'],
            destination=data['destination'],
            mode=data.get('mode', 'driving')
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)