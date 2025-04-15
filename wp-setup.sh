#!/bin/bash

# WordPress Setup Script for Aesthetic Aspiration Landing Page

# Configuration
WP_PORT=8082
WP_DIR="./wordpress"
DB_NAME="aesthetic_wp"
DB_USER="root"
DB_PASSWORD="root"
DB_HOST="localhost"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up WordPress for Aesthetic Aspiration...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create docker-compose.yml file
echo -e "${GREEN}Creating Docker Compose configuration...${NC}"
cat > docker-compose.yml << EOL
version: '3'

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    ports:
      - "3306:3306"

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "${WP_PORT}:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: ${DB_NAME}
    volumes:
      - wordpress_data:/var/www/html

volumes:
  db_data:
  wordpress_data:
EOL

# Start the containers
echo -e "${GREEN}Starting WordPress and MySQL containers...${NC}"
docker-compose up -d

# Wait for WordPress to be ready
echo -e "${GREEN}Waiting for WordPress to start...${NC}"
sleep 10

echo -e "${GREEN}WordPress is now running at http://localhost:${WP_PORT}${NC}"
echo -e "${GREEN}Complete the WordPress installation by visiting http://localhost:${WP_PORT}${NC}"
echo -e "${YELLOW}After installation, follow these steps:${NC}"
echo -e "1. Install and activate the Advanced Custom Fields (ACF) plugin"
echo -e "2. Install and activate the Custom Post Type UI (CPT UI) plugin"
echo -e "3. Install and activate the WP REST API Menus plugin"
echo -e "4. Install and activate the JWT Authentication for WP REST API plugin"
echo -e "5. Create the 'Courses' and 'Testimonials' custom post types"
echo -e "6. Create the necessary ACF fields for each post type"
echo -e "7. Add CORS headers to your .htaccess or wp-config.php file"
echo -e "8. Add some sample content"
echo -e "\n${GREEN}Once completed, your React app will be able to fetch data from WordPress!${NC}"
echo -e "Update your .env file with: VITE_WP_API_URL=http://localhost:${WP_PORT}/wp-json/wp/v2" 