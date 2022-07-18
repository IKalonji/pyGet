from struct import pack
import sys
import os
import requests

test_CID = "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn"

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
        print('Package not found.')
        sys.exit(0)

    package = response.json()['data']

    print("""Package found: {}""".format(package))
    

    cid = package['package_cid']

    #get package from IPFS
    package_url = 'https://ipfs.io/ipfs/' + 'bafkreibn2afdduqkv4ntcb7rhbveepfieyomy4ppblgf4ver5o2xi6j2ou' #test_CID
    # package_url = 'https://gateway.pinata.cloud/ipfs/' + 'bafkreibn2afdduqkv4ntcb7rhbveepfieyomy4ppblgf4ver5o2xi6j2ou'

    response = requests.get(package_url, stream=True, allow_redirects=True)
    print(response.headers)

    print("""Downloading package from {}""".format(package_url))
    if response.status_code != 200:
        print('Package not found.')
        sys.exit(0)

    #write package to file

    open(package_name, 'wb').write(response.content)
    

def uninstall_package(package_name):
    """
    Uninstall package
    """
    pass

def list_packages():
    """
    Get packages
    """
    pass

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
    if arguments[0] == 'help':
        help()
        sys.exit(0)
    if arguments[0] == 'list':
        list_packages()
        sys.exit(0)
    if arguments[0] == 'init':
        init(arguments[1])
        sys.exit(0)
    if arguments[0] == 'install':
        install_package(arguments[1])
        sys.exit(0)
    if arguments[0] == 'uninstall':
        uninstall_package(arguments[1])
        sys.exit(0)
    help()
    sys.exit(0)


if __name__ == '__main__':
    run(sys.argv[1:])
