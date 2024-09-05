from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from nlp_utils import extract_entities
from geocoding_utils import get_coordinates

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow CORS for socket.io

# In-memory storage for locations
locations = [
    {"name": "New York", "latitude": 40.7128, "longitude": -74.0060},
    {"name": "Los Angeles", "latitude": 34.0522, "longitude": -118.2437}
]

# Endpoint to extract locations from a text
@app.route('/process_post', methods=['POST'])
def process_post():
    data = request.get_json()
    content = data.get('content', '')

    if not content:
        return jsonify({"error": "No content provided"}), 400

    locations = extract_entities(content)

    location_data = []
    for location in locations:
        coordinates = get_coordinates(location)
        if coordinates:
            location_info = {
                'location': location,
                'coordinates': coordinates
            }
            location_data.append(location_info)
            socketio.emit('newLocation', location_info)

    return jsonify({"locations": location_data})

# Endpoint to get locations
@app.route('/locations', methods=['GET'])
def get_locations():
    return jsonify(locations)

# Endpoint to add a location
@app.route('/locations', methods=['POST'])
def add_location():
    data = request.get_json()
    if not data or 'name' not in data or 'latitude' not in data or 'longitude' not in data:
        return jsonify({"error": "Invalid input"}), 400
    locations.append({
        "name": data['name'],
        "latitude": data['latitude'],
        "longitude": data['longitude']
    })
    return jsonify({"message": "Location added successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
