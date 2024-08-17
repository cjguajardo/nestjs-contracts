
echo "Builder entrypoint.sh"

echo "Deleting node_modules"
rm -rf node_modules

echo "Installing dependencies"
npm install

echo "Running migrations"
npx prisma migrate reset --force

echo "Removing dist folder"
rm -rf dist

# Run the start command
echo "Starting the project"
npm run start