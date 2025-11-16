#!/bin/sh
# This script ensures the database is ready before starting the app.

echo "Running database migrations..."
# Runs the script we just added to package.json
npm run migrate

# Check if migration was successful
if [ $? -ne 0 ]; then
  echo "Migration failed, exiting."
  exit 1
fi

echo "Migrations complete, starting the application..."
# Starts your app using the "start" script
exec npm run start