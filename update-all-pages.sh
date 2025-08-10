#!/bin/bash

# Update all HTML pages with performance CSS and auth.js

echo "Updating all pages with performance optimizations and authentication..."

# Pages to update
pages=(
    "pages/rent.html"
    "pages/commercial.html"
    "pages/new-launch.html"
    "pages/plots-land.html"
    "pages/property-detail.html"
    "pages/post-free.html"
)

for page in "${pages[@]}"; do
    echo "Updating $page..."
    
    # Add performance-optimized.css after style.css
    sed -i '' 's|<link rel="stylesheet" href="../css/style.css">|<link rel="stylesheet" href="../css/style.css">\
    <link rel="stylesheet" href="../css/performance-optimized.css">|' "$page"
    
    # Add auth.js before the page-specific JS
    if ! grep -q "auth.js" "$page"; then
        sed -i '' 's|<script src="../js/script.js"></script>|<script src="../js/script.js"></script>\
    <script src="../js/auth.js"></script>|' "$page"
    fi
done

echo "All pages updated successfully!"