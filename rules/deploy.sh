#!/bin/bash

mapfile -t lines < rules_proxy
for ((i=0; i<${#lines[@]}; i++)); do
    line=${lines[i]}
    if [[ $line == *.* && $line != *.*.* ]]; then
        lines[i]="*.$line"
    fi
done

echo "var __BLOCKEDSITES__ = [" > ../ss_conditions.pac
for line in "${lines[@]}"; do
    echo "  \"$line\"," >> ../ss_conditions.pac
done
sed -i '$ s/,$//' out1.txt
echo "];" >> ../ss_conditions.pac

cat ../templates/ss_conditions_template.pac >> ../ss_conditions.pac
