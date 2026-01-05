import os

from .base import *  # noqa: F403
from .base import _env_bool, _env_list

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "changeme")
DEBUG = _env_bool("DJANGO_DEBUG", True)
ALLOWED_HOSTS = _env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")

SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_HSTS_SECONDS = 0
