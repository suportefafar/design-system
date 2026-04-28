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

## Icons — Lucide

The design system uses [Lucide](https://lucide.dev) as its icon library. Lucide is a fork of Feather Icons with 1500+ icons, consistent style, and lightweight SVGs.

### 1. Vanilla HTML / CSS / JS

Add the Lucide CDN script to your `<head>` or before `</body>`, then use `<i data-lucide="icon-name"></i>` in your markup:

```html
<!-- In your <head> or before </body> -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  // Initialize icons after DOM is ready
  document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
</script>

<!-- Usage in HTML -->
<button class="ffds-btn ffds-btn-md ffds-btn-primary">
  <i data-lucide="plus"></i> Add Item
</button>

<i data-lucide="settings"></i>
<i data-lucide="user"></i>
<i data-lucide="search"></i>
```

#### Styling Icons

Lucide icons inherit `color` and can be sized with `width` and `height`:

```css
[data-lucide] {
  width: 1em;
  height: 1em;
  stroke-width: 2;
  vertical-align: -0.125em; /* align with text */
}
```

#### Dynamic Content

If you inject HTML dynamically (e.g., via AJAX), call `lucide.createIcons()` again to render new icons:

```javascript
// After inserting new HTML with data-lucide attributes
lucide.createIcons();
```

### 2. Ruby on Rails 8 Integration (with Turbo)

In your `app/views/layouts/application.html.erb`, add the Lucide CDN and initialize icons on both `DOMContentLoaded` and `turbo:load` (to handle Turbo Drive page transitions):

```erb
<%# In <head>, after the design-system tags %>
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
  document.addEventListener('turbo:load', () => lucide.createIcons());
</script>
```

Then use icons in your `.html.erb` views:

```erb
<%= link_to new_item_path, class: "ffds-btn ffds-btn-md ffds-btn-primary" do %>
  <i data-lucide="plus"></i> New Item
<% end %>

<i data-lucide="arrow-left"></i>
<i data-lucide="edit"></i>
<i data-lucide="trash-2"></i>
```

### 3. Common Icon Names

| Purpose | Icon Name | Preview reference |
|---|---|---|
| Add / Create | `plus` | [lucide.dev/icons/plus](https://lucide.dev/icons/plus) |
| Edit | `edit` or `pencil` | [lucide.dev/icons/edit](https://lucide.dev/icons/edit) |
| Delete | `trash-2` | [lucide.dev/icons/trash-2](https://lucide.dev/icons/trash-2) |
| View / Eye | `eye` | [lucide.dev/icons/eye](https://lucide.dev/icons/eye) |
| Search | `search` | [lucide.dev/icons/search](https://lucide.dev/icons/search) |
| Settings | `settings` | [lucide.dev/icons/settings](https://lucide.dev/icons/settings) |
| User | `user` | [lucide.dev/icons/user](https://lucide.dev/icons/user) |
| Users / Group | `users` | [lucide.dev/icons/users](https://lucide.dev/icons/users) |
| Menu | `menu` | [lucide.dev/icons/menu](https://lucide.dev/icons/menu) |
| Close | `x` | [lucide.dev/icons/x](https://lucide.dev/icons/x) |
| Arrow Left | `arrow-left` | [lucide.dev/icons/arrow-left](https://lucide.dev/icons/arrow-left) |
| Check | `check` | [lucide.dev/icons/check](https://lucide.dev/icons/check) |
| Info | `info` | [lucide.dev/icons/info](https://lucide.dev/icons/info) |
| Warning | `alert-triangle` | [lucide.dev/icons/alert-triangle](https://lucide.dev/icons/alert-triangle) |
| Calendar | `calendar` | [lucide.dev/icons/calendar](https://lucide.dev/icons/calendar) |
| Chart | `bar-chart-3` | [lucide.dev/icons/bar-chart-3](https://lucide.dev/icons/bar-chart-3) |
| Download | `download` | [lucide.dev/icons/download](https://lucide.dev/icons/download) |
| Mail | `mail` | [lucide.dev/icons/mail](https://lucide.dev/icons/mail) |
| Phone | `phone` | [lucide.dev/icons/phone](https://lucide.dev/icons/phone) |
| Log Out | `log-out` | [lucide.dev/icons/log-out](https://lucide.dev/icons/log-out) |

Browse all icons at [lucide.dev/icons](https://lucide.dev/icons).

## Development Workflow

1. Modify files inside the `src/` directory.
2. Run `npm run build` to generate the minified assets and update the `/latest/` symlink.
3. Because the container uses a Docker bind mount, Nginx will instantly serve the updated files without needing a container restart.

```bash
npm install
npm run build
```
