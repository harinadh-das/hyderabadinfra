#\!/bin/bash

# List of files to update
files=(
    "./login.html"
    "./register.html"
    "./post-free.html"
    "./property-detail.html"
    "./dashboard.html"
    "./plots-land.html"
    "./flatmates.html"
    "./articles.html"
    "./pg-hostels.html"
    "./leads.html"
    "./sell-fast.html"
    "./rental-services.html"
    "./property-valuation.html"
    "./rental-agreements.html"
    "./membership.html"
    "./advertise.html"
    "./builder-solutions.html"
    "./new-launch.html"
    "./areas/kondapur.html"
    "./areas/narsingi.html"
    "./areas/madhapur.html"
    "./areas/hitec-city.html"
    "./areas/manikonda.html"
    "./areas/banjara-hills.html"
    "./areas/jubilee-hills.html"
    "./areas/gachibowli.html"
    "./areas/kokapet.html"
)

# New navigation HTML
new_nav='                        <li class="nav-item">
                            <a href="buy.html" class="nav-link">Buy</a>
                        </li>
                        <li class="nav-item">
                            <a href="sell.html" class="nav-link">Sell</a>
                        </li>
                        <li class="nav-item">
                            <a href="rent.html" class="nav-link">Rent</a>
                        </li>
                        <li class="nav-item">
                            <a href="post-property.html" class="nav-link btn-post">Post Property</a>
                        </li>'

echo "Navigation Update Script Created"
echo "Found ${#files[@]} files to update"
