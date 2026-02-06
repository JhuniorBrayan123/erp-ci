#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  APP_ENV: "${APP_ENV:-local}",
  APP_VERSION: "${APP_VERSION:-local}",
  API_BASE: "${API_BASE:-/api}"
};
EOF
