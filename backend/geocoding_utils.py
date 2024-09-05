import requests
import time

GEOCODING_API_KEY = ''
cache = {}

def get_coordinates(location):

    if location in cache:
        return cache[location]

    url = f'https://api.opencagedata.com/geocode/v1/json?q={location}&key={GEOCODING_API_KEY}'

    try:
        response = requests.get(url)
        data = response.json()

        if data['results']:
            result = data['results'][0]
            coordinates = {
                'latitude': result['geometry']['lat'],
                'longitude': result['geometry']['lng']
            }
            return coordinates
        else:
            return None
    except Exception as e:
        print(f'Error getting coordinates for {location}: {e}')
        return None
    finally:
        time.sleep(1)  # Sleep for 1 second to avoid rate limiting. mf OpenCage API