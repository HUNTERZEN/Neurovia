#!/bin/bash

# Configuration - Replace these with your values
REMOTE_USER="root"  # or your server username
REMOTE_HOST="your_server_ip"  # your server IP address
REMOTE_DIR="/opt/aeternex"
APP_NAME="aeternex"

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Deploying $APP_NAME to remote server...${NC}"

# Ensure the remote directory exists
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR"

# Copy project files to remote server
echo "Copying project files..."
rsync -avz --exclude 'node_modules' \
          --exclude '.git' \
          --exclude 'dist' \
          ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# SSH into remote server and set up the application
ssh $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_DIR

    # Pull latest Docker images
    docker-compose pull

    # Stop existing containers
    docker-compose down

    # Build and start containers
    docker-compose up --build -d

    # Remove unused images
    docker image prune -f

    echo "Deployment completed!"
EOF

echo -e "${GREEN}Deployment successful!${NC}" 