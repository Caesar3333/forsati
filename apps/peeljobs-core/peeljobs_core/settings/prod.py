import os

from .base import *  # noqa: F403
from .base import _env_bool, _env_list

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = _env_bool("DJANGO_DEBUG", False)
ALLOWED_HOSTS = _env_list("DJANGO_ALLOWED_HOSTS", "forsati.org,www.forsati.org")

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "3600"))
