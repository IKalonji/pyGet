from dataclasses import dataclass


@dataclass
class Package():
    package_name:str
    package_version:str
    package_url:str
    package_description:str
    package_author:str
    package_license:str
    package_cid:str