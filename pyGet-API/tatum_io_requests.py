import requests
import json

ENDPOINT = 'https://api-eu1.tatum.io/v3/ipfs'
API_KEY = ""

def get_package_file(package_cid):
    """
    Get package file from Tatum.io
    """
    headers = {
        "x-api-key": API_KEY,
    }
    package_url = ENDPOINT + '/' + package_cid
    response = requests.get(package_url, headers=headers)
    if response.status_code != 200:
        print('Package not found.')
        return None
    elif response.status_code == 200:
        print('Package found.')
        return response.content
    

def post_package(file):
    """
    Post package file to Tatum.io
    """

    headers = {
        "Content-Type": "multipart/form-data",
        "x-api-key": API_KEY,
    }

    post_response = requests.post(ENDPOINT, headers=headers, files={'file': (file.filename, file.stream, file.content_type, file.headers)})

    if post_response.status_code != 200:
        print('Error posting package.')
        return None
    elif post_response.status_code == 200 or post_response == "Sucess":
        print('Package posted.')
        return post_response.json()['ipfsHash']
    
    