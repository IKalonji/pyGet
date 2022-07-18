import dataclasses
from package_dataclass import Package

class Package_Manager():

    def __init__(self):
        self.packages = {}

    def new_package(self, package_name, package_version, package_url, package_description, package_author, package_license, package_cid):
        self.packages[package_name.lower()] = Package(package_name, package_version, package_url, package_description, package_author, package_license, package_cid)
        return self.packages[package_name.lower()]

    def get_package(self, package_name):
        try:
            return self.packages[package_name.lower()]
        except KeyError as error:
            print(error)
            return None    

    def get_packages(self):
        packages = [dataclasses.asdict(package) for package in self.packages.values()]
        return packages

