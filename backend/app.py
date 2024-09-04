from flask import Flask, request, jsonify

app = Flask(__name__)

locations = [
    {"name": "New York", "latitude": 40.7128, "longitude": -74.0060},
    {"name": "Los Angeles", "latitude": 34.0522, "longitude": -118.2437}
]

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
