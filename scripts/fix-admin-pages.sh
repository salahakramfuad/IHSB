#!/bin/bash

# Script to fix admin pages layout
# Removes Sidebar imports and fixes layout structure

find app/admin -name "page.tsx" -type f ! -path "*/login/*" | while read file; do
  # Remove Sidebar import
  sed -i '' '/import.*Sidebar/d' "$file"
  
  # Fix layout structure - remove Sidebar usage and fix margins
  sed -i '' 's/<Sidebar \/>//g' "$file"
  sed -i '' 's/lg:ml-64/lg:pl-64/g' "$file"
  sed -i '' 's/lg:mr-64/lg:pl-64/g' "$file"
  
  # Remove wrapper divs that are now in layout
  sed -i '' 's/<div className="min-h-screen bg-gray-50">//g' "$file"
  sed -i '' 's/<main className="lg:pl-64 p-6/<div className="p-6/g' "$file"
  sed -i '' 's/<\/main>/<\/div>/g' "$file"
done

echo "Admin pages fixed!"
