#!/bin/bash

# Add user-menu-fix.css to all pages

echo "Adding user menu fix CSS to all pages..."

# Pages to update
pages=(
    "pages/buy.html"
    "pages/rent.html"
    "pages/commercial.html"
    "pages/new-launch.html"
    "pages/plots-land.html"
    "pages/property-detail.html"
    "pages/post-free.html"
    "pages/login.html"
    "pages/register.html"
    "pages/dashboard.html"
)

for page in "${pages[@]}"; do
    echo "Updating $page..."
    
    # Add user-menu-fix.css after performance-optimized.css
    sed -i '' 's|<link rel="stylesheet" href="../css/performance-optimized.css">|<link rel="stylesheet" href="../css/performance-optimized.css">\
    <link rel="stylesheet" href="../css/user-menu-fix.css">|' "$page"
    
done

echo "All pages updated with user menu fix!"