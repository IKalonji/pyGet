import dataclasses
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from package_manager import Package_Manager

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

PACKAGE_MANAGER = Package_Manager()

@app.route('/')
def home():
    return '<h1>pyGet-API<h1>'

@app.route('/pyget/v0/new-package', methods=['POST']) 
def new_package():
    print(request.json)
    body = request.get_json(force=True)
    package = PACKAGE_MANAGER.new_package(body['package_name'],
                                body['package_version'],
                                body['package_url'], 
                                body['package_description'], 
                                body['package_author'], 
                                body['package_license'], 
                                body['package_cid']) 
    return jsonify({'response': 'OK', 'message': 'New package created', 'data': dataclasses.asdict(package)}), 200

@app.route('/pyget/v0/get-package/<package_name>', methods=['GET'])
def get_package(package_name):
    package = PACKAGE_MANAGER.get_package(package_name=package_name)
    if package is None:
        return jsonify({'response': 'ERROR', 'message': 'Package not found'}), 404
    return jsonify({'response': 'OK', 'message': 'Package retrieved', 'data': dataclasses.asdict(package)}), 200

@app.route('/pyget/v0/get-packages', methods=['GET'])
def get_packages():
    packages = PACKAGE_MANAGER.get_packages()
    return jsonify({'response': 'OK', 'message': 'Packages retrieved', 'data': packages}), 200

if __name__ == '__main__':
    app.run(debug=True)
    


