import os
import json
from notebook.base.handlers import IPythonHandler
from notebook.utils import url_path_join
import requests

class PingyBoi(IPythonHandler):
    def get(self):
        '''
        Ping a provided URL and see if it is up. This is a safety 
        feature to prevent from constructing an nbgitpuller link that
        does not exist and crashes. Basically, all we need to do is see
        if we have a valid webpage or not. 
        '''
        url = self.get_argument('url')
        request = requests.get(url)
        if request.status_code == 200:
            status = '200'
        else: 
            status = str(request.status_code)

        self.write(json.dumps({'code':status}))

def _jupyter_server_extension_paths():
    """
    Set up the server extension 
    """
    return [{
        'module': 'gitpuller_wrapper',
    }]


def _jupyter_nbextension_paths():
    """
    Set up the notebook extension for displaying metrics
    """
    return [{
        "section": "common",
        "dest": "gitpuller_wrapper",
        "src": "static",
        "require": "gitpuller_wrapper/main"
    }]

def load_jupyter_server_extension(nb_server_app):
    web_app = nb_server_app.web_app
    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/ping')
    web_app.add_handlers(host_pattern, [(route_pattern, PingyBoi)])
    
    