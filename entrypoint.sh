#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  echo "PostgreSQL is still starting..."
  sleep 4
done
echo "PostgreSQL is ready!"

echo "Building backend..."
npx prisma generate
npm run build

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting backend..."
node dist/index.js