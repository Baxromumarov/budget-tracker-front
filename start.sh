#!/bin/sh
set -eu

PORT="${PORT:-8000}"

echo "🌐 Starting frontend service..."
cd frontend
NPM_BIN="$(command -v npm || true)"
if [ -z "$NPM_BIN" ]; then
  echo "⚙️  Node.js/npm not detected. Installing..."
  apt-get update && apt-get install -y nodejs npm
  NPM_BIN="$(command -v npm || true)"
  if [ -z "$NPM_BIN" ]; then
    echo "❌ Failed to install npm."
    exit 1
  fi
fi

NPX_BIN="$(command -v npx || true)"
if [ -z "$NPX_BIN" ]; then
  echo "⚙️  npx not detected. Reinstalling npm to provide npx..."
  apt-get update && apt-get install -y npm
  NPX_BIN="$(command -v npx || true)"
  if [ -z "$NPX_BIN" ]; then
    echo "❌ Failed to install npx."
    exit 1
  fi
fi

"$NPM_BIN" install
"$NPM_BIN" run build
exec "$NPX_BIN" serve -s dist -l "$PORT"
