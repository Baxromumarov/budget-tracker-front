#!/bin/sh
set -eu

PORT="${PORT:-8000}"

echo "🌐 Starting frontend service..."
cd frontend
npm install
npm run build
exec npx serve -s dist -l "$PORT"
