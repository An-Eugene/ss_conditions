#!/bin/bash

# Read file 1.txt and modify lines with a single dot
mapfile -t lines < rules_proxy
for ((i=0; i<${#lines[@]}; i++)); do
    line=${lines[i]}
    if [[ $line == *.* && $line != *.*.* ]]; then
        lines[i]="*.$line"
    fi
done

# Create the output file out1.txt
echo "var __BLOCKEDSITES__ = [" > ../ss_conditions.pac
for line in "${lines[@]}"; do
    echo "\"$line\"," >> ../ss_conditions.pac
done
echo "];" >> ../ss_conditions.pac

# Append the content of file 2.txt to out1.txt
cat ../templates/ss_conditions_template.pac >> ../ss_conditions.pac
