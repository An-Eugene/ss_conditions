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

# parse rules_proxy and make ACL file
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


# parse rules_proxy_lite and make ACL file for lite version
echo "[bypass_all]" > ../ss_conditions_lite.acl
echo "" >> ../ss_conditions_lite.acl
echo "[proxy_list]" >> ../ss_conditions_lite.acl

mapfile -t lines < ../rules/rules_proxy_lite
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
    echo "$transformed_line" >> ../ss_conditions_lite.acl
done

echo "" >> ../ss_conditions_lite.acl


# parse rules_proxy and make .CONF file (default firewall / Shadowlink / Clash syntax)
echo -n "" > ../ss_conditions.conf
mapfile -t lines < ../rules/rules_proxy
for line in "${lines[@]}"; do
    if [[ $line == *.*.*.* && ${line:0:2} != '*.' ]]; then
        transformed_line="IP-CIDR,$line,PROXY"
    elif [[ $line == '*.'* ]]; then
        transformed_line="DOMAIN-SUFFIX,${line:2},PROXY"
    else
        transformed_line="DOMAIN-SUFFIX,$line,PROXY"
    fi
    echo "$transformed_line" >> ../ss_conditions.conf
done
# echo "FINAL,DIRECT" >> ../ss_conditions.conf
