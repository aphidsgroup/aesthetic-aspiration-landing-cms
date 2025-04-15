# Aesthetic Aspiration Landing Page with Headless WordPress

This project uses a React frontend with WordPress as a headless CMS.

## Setup Instructions

### 1. WordPress Setup Options

#### Option A: Docker Setup (Original)
```bash
docker-compose up -d
```
This will start WordPress at http://localhost:8082 and MySQL database.

#### Option B: LocalWP Setup (Recommended)
1. Install [LocalWP](https://localwp.com/) if you haven't already
2. Create a new WordPress site in LocalWP
3. Configure the site URL in `.env.local` (default is `http://localhost:10000`)

### 2. WordPress Configuration

1. Visit your WordPress admin panel:
   - If using Docker: http://localhost:8082/wp-admin
   - If using LocalWP: http://localhost:10000/wp-admin (or your custom URL)

2. Install and activate the following plugins:
   - ACF (Advanced Custom Fields)
   - Custom Post Type UI
   - WP REST API
   - WP REST API Menus
   - JWT Authentication for WP REST API

3. Configure custom post types in WordPress:
   - Courses
   - Testimonials

4. Enable CORS in your WordPress by adding this to your theme's functions.php:
   ```php
   add_action('init', function() {
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
     header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");
   });
   ```

### 3. Start the React app

```bash
npm run dev
```

The app will be accessible at http://localhost:8080

## Custom CMS Dashboard

This project includes a custom CMS dashboard for content management, which is more user-friendly than the default WordPress admin.

1. Access the dashboard at: http://localhost:8080/dashboard
2. Login with your WordPress credentials
3. Manage courses and testimonials directly from this interface

The dashboard provides:
- Course management (create, edit, update)
- Testimonial management (create, edit, update)
- Overview statistics

## Environment Configuration

The environment variables can be configured in the `.env` file (for production) or `.env.local` file (for local development):

```
# For Docker setup
VITE_WP_API_URL=http://localhost:8082/wp-json/wp/v2
VITE_WP_AUTH_URL=http://localhost:8082/wp-json/jwt-auth/v1/token

# For LocalWP (uncomment and adjust as needed)
# VITE_WP_API_URL=http://localhost:10000/wp-json/wp/v2
# VITE_WP_AUTH_URL=http://localhost:10000/wp-json/jwt-auth/v1/token
```

## Development Notes

- All WordPress content is fetched from the REST API
- Make sure to publish content in WordPress before it will appear on the site
- After making changes to WordPress structure, you may need to adjust the React components to match
- The custom dashboard provides a simpler interface for content editors, but advanced settings should still be managed in the WordPress admin

## Project info

**URL**: https://lovable.dev/projects/c036df4e-e1c6-4159-a493-198312af2df6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c036df4e-e1c6-4159-a493-198312af2df6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev -- --host
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- WordPress REST API

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c036df4e-e1c6-4159-a493-198312af2df6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
