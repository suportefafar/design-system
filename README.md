# Farmácia UFMG Design System

A centralized, versioned, and distributable UI component library and design token system for Farmácia UFMG applications.

## Architecture

This service acts as a self-hosted CDN serving minified CSS, Javascript, and localized Google Fonts for cross-stack compatibility (Rails, WordPress, Vanilla HTML).

- **`src/`**: Source files (`farmacia-ds.css`, `farmacia-ds.js`).
- **`dist/`**: Minified, production-ready assets, separated by version.
- **`fonts/`**: Locally hosted fonts to comply with GDPR and prevent third-party tracking.
- **`index.html`**: Documentation and interactive preview of all components and design tokens.

## Integration

To integrate the Design System into your application, include the following tags in your HTML `<head>`:

### 1. Using the Latest Version (Recommended for actively maintained apps)

```html
<!-- CSS -->
<link rel="stylesheet" href="http://design-system.farmacia.local/dist/latest/farmacia-ds.min.css">
<!-- JS -->
<script src="http://design-system.farmacia.local/dist/latest/farmacia-ds.min.js"></script>
```

### 2. Using a Specific Version (Recommended for stable, legacy apps)

```html
<!-- CSS -->
<link rel="stylesheet" href="http://design-system.farmacia.local/dist/v2025.04/farmacia-ds.min.css">
<!-- JS -->
<script src="http://design-system.farmacia.local/dist/v2025.04/farmacia-ds.min.js"></script>
```

### 3. Ruby on Rails Integration

In your `app/views/layouts/application.html.erb`:

```erb
<% if Rails.env.production? %>
  <link rel="stylesheet" href="https://design-system.farmacia.ufmg.br/dist/latest/farmacia-ds.min.css">
  <script src="https://design-system.farmacia.ufmg.br/dist/latest/farmacia-ds.min.js"></script>
<% else %>
  <link rel="stylesheet" href="http://design-system.farmacia.local/dist/latest/farmacia-ds.min.css">
  <script src="http://design-system.farmacia.local/dist/latest/farmacia-ds.min.js"></script>
<% end %>
```

### 4. WordPress Integration

In your theme's `functions.php`:

```php
function enqueue_farmacia_ds() {
    $base_url = (wp_get_environment_type() === 'production') 
        ? 'https://design-system.farmacia.ufmg.br' 
        : 'http://design-system.farmacia.local';

    wp_enqueue_style('farmacia-ds', "$base_url/dist/latest/farmacia-ds.min.css", array(), null);
    wp_enqueue_script('farmacia-ds-js', "$base_url/dist/latest/farmacia-ds.min.js", array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_farmacia_ds');
```

## Usage Guidelines

1. **Prefixes**: All classes are prefixed with `ffds-` (e.g., `.ffds-btn`, `.ffds-card`) to prevent collisions with Bootstrap or WP themes.
2. **Scoping**: The CSS reset and base typography are scoped under the `.ffds-root` class. Ensure your application's `<body>` or main container includes this class:
   ```html
   <body class="ffds-root">
   ```
3. **Dark Mode**: Add `.ffds-dark` to the `<html>` or `<body>` tag to force dark mode, or use `FFDS.toggleDarkMode()` via Javascript. By default, it respects the system's `prefers-color-scheme`.

## Development Workflow

1. Modify files inside the `src/` directory.
2. Run `npm run build` to generate the minified assets and update the `/latest/` symlink.
3. Because the container uses a Docker bind mount, Nginx will instantly serve the updated files without needing a container restart.

```bash
npm install
npm run build
```
