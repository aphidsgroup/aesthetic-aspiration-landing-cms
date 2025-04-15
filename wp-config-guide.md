# WordPress Configuration Guide

This guide will help you set up WordPress as a headless CMS for the Aesthetic Aspiration website.

## Installation

1. Run the setup script: `bash wp-setup.sh`
2. Open http://localhost:8082 to complete the WordPress installation
3. Create an admin account and remember the credentials

## Required Plugins

Install and activate the following plugins:

1. **Advanced Custom Fields (ACF)** - For custom fields
2. **Custom Post Type UI (CPT UI)** - For creating custom post types
3. **WP REST API Menus** - For exposing menus to the API
4. **JWT Authentication for WP REST API** - For secure authentication
5. **ACF to REST API** - For exposing ACF fields to the API
6. **Yoast SEO** - For SEO optimization (optional)

## Creating Custom Post Types

### Courses

1. Go to CPT UI > Add/Edit Post Types
2. Create a new post type with the following settings:
   - Post Type Slug: `course`
   - Plural Label: `Courses`
   - Singular Label: `Course`
   - Show in REST API: `Yes`
   - REST API base slug: `courses`
   - Supports: Title, Editor, Excerpt, Featured Image

### Testimonials

1. Go to CPT UI > Add/Edit Post Types
2. Create a new post type with the following settings:
   - Post Type Slug: `testimonial`
   - Plural Label: `Testimonials`
   - Singular Label: `Testimonial`
   - Show in REST API: `Yes`
   - REST API base slug: `testimonials`
   - Supports: Title, Editor, Featured Image

## Custom Fields Setup

### Course Fields

1. Go to Custom Fields > Field Groups
2. Add a new field group called "Course Details"
3. Add the following fields:
   - Field Label: `Duration`
     - Field Name: `duration`
     - Field Type: `Text`
   - Field Label: `Mode`
     - Field Name: `mode`
     - Field Type: `Select`
     - Choices: `Online`, `Offline`, `Hybrid`
   - Field Label: `Certification`
     - Field Name: `certification`
     - Field Type: `Text`
   - Field Label: `Batch Size`
     - Field Name: `batch_size`
     - Field Type: `Number`
   - Field Label: `Slug`
     - Field Name: `slug`
     - Field Type: `Text`
4. In "Location" settings, set "Show this field group if Post Type is equal to Course"

### Testimonial Fields

1. Go to Custom Fields > Field Groups
2. Add a new field group called "Testimonial Details"
3. Add the following fields:
   - Field Label: `Name`
     - Field Name: `name`
     - Field Type: `Text`
   - Field Label: `Position`
     - Field Name: `position`
     - Field Type: `Text`
   - Field Label: `Location`
     - Field Name: `location`
     - Field Type: `Text`
   - Field Label: `Rating`
     - Field Name: `rating`
     - Field Type: `Number`
     - Minimum Value: 1
     - Maximum Value: 5
4. In "Location" settings, set "Show this field group if Post Type is equal to Testimonial"

## Add CORS Support

Add the following code to your `.htaccess` file in the WordPress root directory:

```
# Enable CORS
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "X-Requested-With, Content-Type, X-WP-Nonce, Authorization"
</IfModule>
```

Or add this to your `wp-config.php` file:

```php
// Enable CORS
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-WP-Nonce, Authorization");
});
```

## Testing the API

Once everything is set up, you can test the API by visiting:

- Courses: http://localhost:8082/wp-json/wp/v2/courses
- Testimonials: http://localhost:8082/wp-json/wp/v2/testimonials

## Connecting to Your React App

Update your `.env` file with:

```
VITE_WP_API_URL=http://localhost:8082/wp-json/wp/v2
```

The API integration file at `src/lib/api.ts` will use this environment variable to connect to your WordPress API. 