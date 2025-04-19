import os
import sys

# Replace with your actual path and project name
sys.path.insert(0, '/home/pritechv/backend')  # where manage.py is

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
