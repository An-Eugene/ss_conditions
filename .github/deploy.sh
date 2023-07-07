#!/bin/bash

# parse rules_proxy and make PAC file
mapfile -t lines < ../rules/rules_proxy
for ((i=0; i<${#lines[@]}; i++)); do
    line=${lines[i]}
    if [[ $line == *.* && $line != *.*.* && ${line:0:2} != '*.' ]]; then
        lines[i]="*.$line"
    fi
done

echo "var __BLOCKEDSITES__ = [" > ../ss_conditions.pac
for line in "${lines[@]}"; do
    echo "  \"$line\"," >> ../ss_conditions.pac
done
sed -i '$ s/,$//' ../ss_conditions.pac
echo "];" >> ../ss_conditions.pac

cat ../templates/ss_conditions_template.pac >> ../ss_conditions.pac

# parse both rules_proxy and rules_direct and make ACL file
echo "[bypass_all]" > ../ss_conditions.acl
echo "" >> ../ss_conditions.acl
echo "[proxy_list]" >> ../ss_conditions.acl

mapfile -t lines < ../rules/rules_proxy
for line in "${lines[@]}"; do
    if [[ $line == *.*.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="$line"
    elif [[ $line == *.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="^${line//./\\.}$"
    elif [[ $line == *.* ]]; then
        transformed_line="(?:^|\\.)${line//./\\.}$"
    else
        transformed_line="$line"
    fi
    echo "$transformed_line" >> ../ss_conditions.acl
done

echo "" >> ../ss_conditions.acl
echo "[bypass_list]" >> ../ss_conditions.acl

mapfile -t lines < ../rules/rules_direct
for line in "${lines[@]}"; do
    if [[ $line == *.*.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="$line"
    elif [[ $line == *.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="^${line//./\\.}$"
    elif [[ $line == *.* ]]; then
        transformed_line="(?:^|\\.)${line//./\\.}$"
    else
        transformed_line="$line"
    fi
    echo "$transformed_line" >> ../ss_conditions.acl
done

# parse rules_proxy and make .CONF file
# echo -n "" > ../ss_conditions.conf
cat ../templates/ss_conditions_template.conf > ../ss_conditions.conf
mapfile -t lines < ../rules/rules_proxy
for line in "${lines[@]}"; do
    if [[ $line == *.*.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="IP-CIDR,$line,PROXY"
    else
        transformed_line="DOMAIN-SUFFIX,$line,PROXY"
    fi
    echo "$transformed_line" >> ../ss_conditions.conf
done
echo "FINAL,DIRECT" >> ../ss_conditions.conf

# parse rules_proxy and make .CONF file for Shadowlink
echo -n "" > ../ss_conditions_clash.conf
mapfile -t lines < ../rules/rules_proxy
for line in "${lines[@]}"; do
    if [[ $line == *.*.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="IP-CIDR,$line,PROXY"
    else
        transformed_line="DOMAIN-SUFFIX,$line,PROXY"
    fi
    echo "$transformed_line" >> ../ss_conditions_clash.conf
done
echo "FINAL,DIRECT" >> ../ss_conditions_clash.conf
