#!/bin/bash

# This script prompts for a project name and creates a new
# React application using Vite in the current directory.

# Ask the user for the project name.
read -p "Enter the project name: " project_name

# Check if the project name is empty.
if [ -z "$project_name" ]; then
    echo "Error: Project name cannot be empty."
    exit 1
fi

# Execute the command to create the new Vite/React project.
# The double dash (--) is required to pass arguments correctly to the template.
npm create vite@latest "$project_name" -- --template react

echo "-------------------------------------"
echo "Success! Your React project '$project_name' has been created."
echo "Navigate to the new directory to get started:"
echo "  cd $project_name"
echo "  npm install"
echo "  npm run dev"
