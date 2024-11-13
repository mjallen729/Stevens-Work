#!/bin/bash

# Are comments sufficient for documentation for shell script?
# 
# Check if correct number of arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <backup_directory>"
    echo "- Copies the contents (files) from source_directory to backup_directory."
    exit 1
fi

source_dir="$1"
backup_dir="$2"

# Check if source directory exists
if [ ! -d "$source_dir" ]; then
    echo "Error: Source directory '$source_dir' does not exist"
    exit 1
fi

# Create backup directory
if [ ! -d "$backup_dir" ]; then
    mkdir -p "$backup_dir"
    if [ $? -ne 0 ]; then
        echo "Error: Unable to create backup directory '$backup_dir'"
        exit 1
    fi
    echo "Created backup directory: $backup_dir"
fi

files_copied=0
files_skipped=0
files_failed=0

# Process each file in source
for file in "$source_dir"/*; do
    if [ -d "$file" ]; then
        continue
    fi

    filename=$(basename "$file")
    backup_file="$backup_dir/$filename"

    if [ -f "$backup_file" ]; then
        source_time=$(stat -c %Y "$file")
        backup_time=$(stat -c %Y "$backup_file")
        
        # Skip if backup is newer or same age
        if [ $source_time -le $backup_time ]; then
            echo "Skipping $filename (not modified)"
            ((files_skipped++))
            continue
        fi
    fi

    # Copy the file
    cp "$file" "$backup_file"
    if [ $? -eq 0 ]; then
        echo "Copied $filename"
        ((files_copied++))
    else
        echo "Failed to copy $filename"
        ((files_failed++))
    fi
done

echo -e "\nBackup Summary:"
echo "Files copied: $files_copied"
echo "Files skipped (not modified): $files_skipped"
echo "Files failed: $files_failed"
echo "Total files processed: $((files_copied + files_skipped + files_failed))"