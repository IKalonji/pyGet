import json
from struct import pack
import sys
import os
import requests


ENDPOINT = 'http://localhost:5000/pyget/v0/'

def main():
    """
    Main function
    """
    pass

def init(project_name):
    """
    Init
    """
    print(project_name)
    try:
        # Create project directory
        os.mkdir(os.path.join(os.getcwd(), project_name)) 
    except FileExistsError as error:
        print(project_name + ' already exists: Choose a different project name.')
        sys.exit(0)

    os.chdir(project_name)

    #create modules folder in project directory
    os.mkdir('pyget_modules')

    #create pyget.json in project directory
    with open('pyget.json', 'w') as pyget_file:
        pyget_file.write('{"dependencies": []}')

    #create app.py in project directory
    with open('app.py', 'w') as app_file:
        #write placeholder for app.py
        app_file.write('#from pyget_modules import <module_name_here>\n\n')
        app_file.write('def main():\n')
        app_file.write('    pass\n\n')
        app_file.write('if __name__ == "__main__":\n')
        app_file.write('    main()\n')

def install_package(package_name):
    """
    Get package
    """

    #get package metadata from API
    package_url = ENDPOINT + 'get-package/' + package_name
    response = requests.get(package_url)
    if response.status_code != 200:
        print('Package not found.', response.json())
        sys.exit(0)

    print(response.json())
    #package = response.json()['data']

    print("""Package found""")
    #print("""Package found: {}""".format(package))
    

    #write package to file

    open(package_name, 'wb').write(response.content)
    

def uninstall_package(package_name):
    """
    Uninstall package
    """
    #Remove package from pyget.json and delete package file from pyget_modules
    with open('pyget.json', 'r') as pyget_file:
        pyget_json = pyget_file.read()
        pyget_data = json.loads(pyget_json)
        pyget_data['dependencies'].remove(package_name)
        with open('pyget.json', 'w') as pyget_file:
            pyget_file.write(json.dumps(pyget_data))
    os.remove(os.path.join('pyget_modules', package_name))

def list_packages():
    """
    Get packages
    """
    #get packages from API
    package_url = ENDPOINT + 'get-packages'
    response = requests.get(package_url)
    if response.status_code != 200:
        print('No packages found.')
        sys.exit(0)
    print("""Packages found""")
    for package in response.json()['data']:
        print(package)

def help():
    """
    Help
    """
    
    help = """
                        pyGet-CLI

    Usage:
        pyget [options] [<args>]
    Options:
        help                     Show this help message and exit.
        list                     List available packages.
        init <project_name>      Initialize pyGet-CLI.
        install <package_name>   Install package.
        uninstall <package_name> Uninstall package.
    """

    print(help)



def run(arguments):
    """
    Run
    """
    if len(arguments) == 0:
        help()
        sys.exit(0)
    elif arguments[0] == 'help':
        help()
        sys.exit(0)
    elif arguments[0] == 'list':
        list_packages()
        sys.exit(0)
    elif arguments[0] == 'init':
        if len(arguments) != 2:
            print('Please provide a project name with no spaces in between.')
            sys.exit(0)
        init(arguments[1])
        sys.exit(0)
    elif arguments[0] == 'install':
        if len(arguments) == 1:
            #install all packages from pyget.json
            with open('pyget.json', 'r') as pyget_file:
                pyget_json = pyget_file.read()
                pyget_data = json.loads(pyget_json)
                for package in pyget_data['dependencies']:
                    install_package(package)
        for package in arguments[1:]:
            install_package(package)
        sys.exit(0)
    elif arguments[0] == 'uninstall':
        if len(arguments) == 1:
            #uninstall all packages from pyget.json
            input = input('Are you sure you want to uninstall all packages? (y/n) ')
            if input == 'y':
                with open('pyget.json', 'r') as pyget_file:
                    pyget_json = pyget_file.read()
                    pyget_data = json.loads(pyget_json)
                    for package in pyget_data['dependencies']:
                        uninstall_package(package)
        for package in arguments[1:]:
            uninstall_package(package)
        sys.exit(0)
    else: 
        help()
        sys.exit(0)


if __name__ == '__main__':
    run(sys.argv[1:])
