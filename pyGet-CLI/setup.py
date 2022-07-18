from setuptools import setup
setup(
    name='pyGet-CLI',
    version='0.0.1',
    entry_points={
        'console_scripts': [
            'pyget=pyget:run'
        ]
    }
)