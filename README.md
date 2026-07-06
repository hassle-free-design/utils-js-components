# UtilsJsComponents

A lightweight jQuery plugin for common UI interactions without writing JavaScript. Think of it as a simpler alternative to htmx for basic show/hide, reveal, and clipboard functionality.

## Features

- ✅ Toggle element visibility with a single attribute
- ✅ Password show/hide toggle
- ✅ Show More / Show Less for truncated content
- ✅ Load More (reveal next X items)
- ✅ Copy to Clipboard
- ✅ Fade animations support
- ✅ Class-based or inline style toggling
- ✅ Button active state tracking
- ✅ Zero configuration required
- ✅ Works with dynamically added elements

## Installation

1. Include jQuery (required):
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

2. Include UtilsJsComponents:
```html
<script src="path/to/UtilsJsComponents.js"></script>
```

That's it! The plugin auto-initializes on document ready.

## Quick Start

```html
<!-- Simple toggle -->
<button ujs-target-id="#loginBox">Login</button>
<div id="loginBox" style="display: none;">
    Login form here...
</div>

<!-- Password show/hide -->
<input type="password" ujs-pass-show-hide>

<!-- Show more / show less -->
<div ujs-show-more-content ujs-show-more-height="150">
    Long content...
</div>
<button ujs-show-more-target="#contentBox">Show More</button>

<!-- Load more -->
<div id="itemsList" ujs-load-more-container ujs-load-more-initial="5" ujs-load-more-step="5">
    <div>Item 1</div>
    <div>Item 2</div>
    ...
</div>
<button ujs-load-more-target="#itemsList">Load More</button>

<!-- Copy to clipboard -->
<input type="text" id="shareLink" value="https://example.com" readonly>
<button ujs-copy-target="#shareLink">Copy</button>
```

## Attributes Reference

### Target Toggle

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ujs-target-id` | ✅ Yes | - | CSS selector for the target element to toggle (e.g., `#myElement`, `.myClass`) |
| `ujs-toggle-class` | ❌ No | - | Class to toggle on target. If not specified, toggles inline `display` style |
| `ujs-anim-fade` | ❌ No | - | Enable fade animation. Just add the attribute (no value needed) |
| `ujs-anim-duration` | ❌ No | `300` | Animation duration in milliseconds (only works with `ujs-anim-fade`) |
| `ujs-btn-active-class` | ❌ No | `active` | Class added to button when target is visible |

### Password Toggle

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ujs-pass-show-hide` | ✅ Yes | - | Marks a password input to receive a show/hide toggle button |
| `ujs-pass-btn-class` | ❌ No | - | Extra CSS class(es) added to the generated toggle button |

### Show More / Show Less

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ujs-show-more-content` | ✅ Yes (on content box) | - | Marks the element whose content should be collapsed/expanded |
| `ujs-show-more-height` | ❌ No | `150` | Collapsed height in pixels |
| `ujs-show-more-fade-color` | ❌ No | `#fff` | Color the bottom fade-out overlay blends into (match your background) |
| `ujs-show-more-target` | ✅ Yes (on button) | - | CSS selector for the content box to expand/collapse |
| `ujs-anim-fade` | ❌ No | - | Enable smooth height animation. Without it, expand/collapse is instant |
| `ujs-anim-duration` | ❌ No | `300` | Animation duration in milliseconds (only works with `ujs-anim-fade`) |
| `ujs-show-more-text` | ❌ No | `Show More` | Button label when content is collapsed |
| `ujs-show-more-text-less` | ❌ No | `Show Less` | Button label when content is expanded |
| `ujs-btn-active-class` | ❌ No | `active` | Class added to button when content is expanded |

### Load More

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ujs-load-more-container` | ✅ Yes (on list) | - | Marks the container whose direct children should be revealed progressively |
| `ujs-load-more-initial` | ❌ No | `5` | Number of items visible on page load |
| `ujs-load-more-step` | ❌ No | `5` | Number of additional items revealed per click |
| `ujs-load-more-target` | ✅ Yes (on button) | - | CSS selector for the container to reveal items from |
| `ujs-anim-fade` | ❌ No | - | Fade newly revealed items in. Without it, they appear instantly |
| `ujs-anim-duration` | ❌ No | `300` | Animation duration in milliseconds (only works with `ujs-anim-fade`) |
| `ujs-load-more-text-done` | ❌ No | `No more items` | Button label once every item has been revealed. The button is also disabled at this point |

### Copy to Clipboard

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ujs-copy-target` | ⚠️ One of these two required | - | CSS selector for the source element. Reads `.val()` for inputs/textareas (visible or hidden) and plain text (no HTML) for anything else |
| `ujs-copy-value` | ⚠️ One of these two required | - | A literal string to copy, used when there's no source element on the page |
| `ujs-copy-success-text` | ❌ No | `Copied!` | Temporary button label shown after a successful copy |
| `ujs-copy-success-duration` | ❌ No | `2000` | How long (ms) the success label stays before reverting to the button's original text |

## Usage Examples

### Target Toggle

#### Basic Toggle (Inline Style)

Toggles `display: none` on the target element:

```html
<button ujs-target-id="#loginBoxWrapper">Login</button>
<div id="loginBoxWrapper" style="display: none;">
    Login form content...
</div>
```

#### Toggle with Class

Toggles a CSS class instead of inline style:

```html
<button ujs-target-id="#menuWrapper" ujs-toggle-class="hide">Menu</button>
<div id="menuWrapper" class="hide">
    Menu items...
</div>

<style>
.hide { display: none; }
</style>
```

#### Fade Animation

Add smooth fade in/out effect:

```html
<button ujs-target-id="#loginBoxWrapper" ujs-anim-fade>Login</button>
<div id="loginBoxWrapper" style="display: none;">
    Login form with fade effect...
</div>
```

#### Custom Animation Duration

```html
<button ujs-target-id="#menuWrapper" ujs-anim-fade ujs-anim-duration="500">
    Slow Menu
</button>
<div id="menuWrapper" style="display: none;">
    Menu with 500ms fade...
</div>
```

#### Custom Button Active Class

Track button state with a custom class:

```html
<button ujs-target-id="#sidebar" ujs-btn-active-class="open">
    Toggle Sidebar
</button>
<div id="sidebar" style="display: none;">
    Sidebar content...
</div>

<style>
.open {
    background-color: #007bff;
    color: white;
}
</style>
```

#### Complete Example

All Target Toggle features combined:

```html
<button 
    ujs-target-id="#notificationPanel" 
    ujs-toggle-class="hidden"
    ujs-anim-fade 
    ujs-anim-duration="400"
    ujs-btn-active-class="active">
    Notifications
</button>

<div id="notificationPanel" class="hidden">
    Your notifications here...
</div>

<style>
.hidden { display: none; }
.active { 
    background-color: #28a745;
    color: white;
    font-weight: bold;
}
</style>
```

### Password Toggle

#### Basic Password Toggle

Just add the attribute — the show/hide button is created automatically:

```html
<input type="password" class="form-control" ujs-pass-show-hide placeholder="Enter your password">
```

#### Custom Button Styling

```html
<input type="password" 
       class="form-control" 
       ujs-pass-show-hide 
       ujs-pass-btn-class="text-primary fs-5"
       placeholder="Enter your password">
```

#### Dynamically Added Inputs

New `[ujs-pass-show-hide]` inputs added to the DOM (e.g. loaded via AJAX or inside a modal) are picked up automatically via a `MutationObserver`. If you'd rather trigger it manually instead:

```js
$('#myModal').on('shown.bs.modal', function() {
    UtilsJsComponents.passwordToggle_reinit();
});
```

### Show More / Show Less

#### Instant Toggle (Hard Show)

```html
<div id="contentBox1" ujs-show-more-content ujs-show-more-height="100">
    <p>Paragraph 1...</p>
    <p>Paragraph 2...</p>
    <p>Paragraph 3, hidden until expanded...</p>
</div>
<button ujs-show-more-target="#contentBox1">Show More</button>
```

#### Smooth Toggle (Fade)

```html
<div id="contentBox2" ujs-show-more-content ujs-show-more-height="80">
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        ...
    </ul>
</div>
<button 
    ujs-show-more-target="#contentBox2" 
    ujs-anim-fade 
    ujs-anim-duration="400">
    Show More
</button>
```

#### Custom Labels & Fade Color

Useful when the content box isn't sitting on a plain white background:

```html
<div 
    id="contentBox3" 
    ujs-show-more-content 
    ujs-show-more-height="90" 
    ujs-show-more-fade-color="#f1f3f5">
    Content...
</div>
<button 
    ujs-show-more-target="#contentBox3" 
    ujs-anim-fade
    ujs-show-more-text="Read More" 
    ujs-show-more-text-less="Collapse">
    Read More
</button>
```

### Load More

#### Instant Reveal (Hard Show)

```html
<div id="itemsList1" ujs-load-more-container ujs-load-more-initial="3" ujs-load-more-step="3">
    <div class="card mb-2">Item 1</div>
    <div class="card mb-2">Item 2</div>
    ...
</div>
<button ujs-load-more-target="#itemsList1">Load More</button>
```

#### Fade-In Reveal With Custom "Done" Label

```html
<div id="itemsList2" ujs-load-more-container ujs-load-more-initial="2" ujs-load-more-step="2">
    <div class="alert alert-light">Task 1</div>
    <div class="alert alert-light">Task 2</div>
    ...
</div>
<button 
    ujs-load-more-target="#itemsList2" 
    ujs-anim-fade 
    ujs-anim-duration="400"
    ujs-load-more-text-done="All tasks loaded">
    Load More Tasks
</button>
```

### Copy to Clipboard

#### Copy From a Visible Input

```html
<input type="text" id="shareLink1" class="form-control" value="https://example.com/invite/ab12cd34" readonly>
<button ujs-copy-target="#shareLink1">Copy</button>
```

#### Copy From a Hidden Input

```html
<input type="hidden" id="apiKey1" value="sk_live_9f8a7b6c5d4e3f2g1h0i">
<button 
    ujs-copy-target="#apiKey1" 
    ujs-copy-success-text="Key copied!">
    Copy API Key
</button>
```

#### Copy Plain Text From a Div

Only the text content is copied — no HTML markup:

```html
<div id="codeBlock1">npm install utils-js-components</div>
<button 
    ujs-copy-target="#codeBlock1" 
    ujs-copy-success-duration="1500">
    Copy Command
</button>
```

#### Copy a Literal Value

No source element needed:

```html
<button ujs-copy-value="support@example.com">Copy Support Email</button>
```

## How It Works

1. **Auto-initialization**: The plugin automatically initializes when the DOM is ready
2. **Event delegation**: Uses event delegation, so it works with dynamically added elements
3. **State detection**: Automatically detects current state (visibility, expanded/collapsed, items shown) and acts accordingly
4. **No inline JavaScript**: Keep your HTML clean - no `onclick` handlers needed
5. **Graceful clipboard fallback**: Copy to Clipboard uses the modern `navigator.clipboard` API where available, and falls back to `execCommand('copy')` on older browsers or non-secure contexts

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE 9+ (with jQuery 1.x or 2.x) for Target Toggle and Password Toggle
- Copy to Clipboard requires a browser that supports either the Clipboard API or `document.execCommand('copy')`

## Requirements

- jQuery 1.7+ (for event delegation support)

## License

Free to use in any project.

## Future Extensions

Planned features:
- Slide animations (`ujs-anim-slide`)
- Multiple target support
- Toggle groups (radio-button behavior)
- Custom events/callbacks
- More animation options
- Keyboard navigation for Load More / Show More

## Contributing

Suggestions and improvements are welcome!