import dataclasses
from package_dataclass import Package

class Package_Manager():

    def __init__(self):
        self.packages = {}
        self.packages["mypack"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack1"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack2"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack3"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack4"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack5"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack6"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack7"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack8"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")
        self.packages["mypack9"] = Package("mypack", "v1.1.1", "my.package.com", "This is my pack", "Mike", "MIT", "123456789")

    def new_package(self, package_name, package_version, package_url, package_description, package_author, package_license, package_cid):
        self.packages[package_name.lower()] = Package(package_name, package_version, package_url, package_description, package_author, package_license, package_cid)
        print("Author: " + package_author)
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

