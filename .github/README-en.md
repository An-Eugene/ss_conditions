[![ru](https://img.shields.io/badge/language-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-blue.svg)](https://github.com/an-eugene/ss_conditions/blob/master/.github/README.md)
[![en](https://img.shields.io/badge/language-english-red.svg)](https://github.com/an-eugene/ss_conditions/blob/master/.github/README-en.md)

## About project
These instructions and files are intended to use with Shadowsocks and Shadowsocks-compatible servers (e. g. [Outline](https://getoutline.org/ru/ "Download Outline") or [3x-ui](https://github.com/MHSanaei/3x-ui)). These files may not work for other servers and clients as is so you should either provide compatibility by your own or remake VPN server using Shadowsocks.
These configs are using blacklist principle: anything that is not in list will be routed directly. Thiis allows you to seemlessly use blocked resources (will be proxied) and resources that are not blocked and detect VPN usage (e. g. gosuslugi, will be routed directly) at the same time. 
This thing allows you to use internet without restrictions easily but ***doesn't provide anonymity!*** Some sites that are routed via proxy could use CDN or telemetry services that will be routed directly and see your real IP. For proper anonymity use only full VPN settings with killswitch function; or configure rules by yourself (for example, by using whitelist principle).

At this time you can configure these platforms:
* [Shadowsocks for Windows](#shadowsocks-for-windows)
* ~~[Shadowsocks for Linux](#shadowsocks-for-linux)~~
* ~~[Shadowsocks for MacOS](#shadowsocks-for-macos)~~
* [Shadowsocks for Android](#shadowsocks-for-android)
* [Shadowsocks client for iOS](#shadowsocks-client-for-ios)
  - [Shadowrocket for iOS](#shadowrocket-for-ios-optimal-but-paid-solution) (paid)
  - [Shadowlink for iOS](#shadowlink-for-ios-non-automatic-but-free-solution) (free)
 
Since these configs are remote, any changes made in repository will be automatically updated on your devices, no need to track if there are some updates, no need to update any settings manually **(except personally mentioned instructions)**.

## I want to fork this repo to configure it by myself
If you want to update list in your own fork - put your changes in /rules/rules_proxy file only. Automatic script in this repo will track it and generate proper configs by itself.
If you live in Russia and want to just add 1-2 sites that are missing here - open issue and send me these sites instead. I will add them to my list and you will not worry about future changes.

If you live not in Russia - just fork repo and make your own proxy list instead: this current repo contains rules for Russia, proper config for your country may and will be very different from this. And I will not add your sites to list if they are not blocked in Russia.

## Shadowsocks for Windows
1. Install [Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo")  from official repo and add a server to program via ss:// link
3. Put the PAC file link to remote PAC file setting
4. Turn on System Proxy Server - Setup script (PAC)

PAC file link: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.pac


## Shadowsocks for Linux
For now you can install shadowsocks-electron and use SwitchyOmega in browser. I don't know proper solution for this OS.


## ~~Shadowsocks for MacOS~~
1. ~~Install [Shadowsocks](https://github.com/shadowsocks/ShadowsocksX-NG)~~
I don't know proper solution for this OS.


## Shadowsocks for Android
1. Install [Shadowsocks из Google Play](https://play.google.com/store/apps/details?id=com.github.shadowsocks "Shadowsocks in Google Play") and add a server to program via ss:// link
2. Change "route" to "User rules" in server settings
3. Go to User rules -> Add rule -> config URL and enter ACL file link

ACL file link: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.acl


## ShadowSocks client for iOS
### Shadowrocket for iOS (optimal but paid solution)
1. Buy and install [Shadowrocket из AppStore](https://apps.apple.com/us/app/shadowrocket/id932747118) (~$5).
2. Enter your server via ss:// ilnk
3. Go to "Settings" -> add configuration file -> enter .CONF file link 
4. Choose "Global Routing" -> Config at main page

.CONF file link: [https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions_shadowrocket.conf](https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions_shadowrocket.conf)

### Shadowlink for iOS (non-automatic but free solution)
1. Install [Shadowlink из AppStore](https://apps.apple.com/us/app/shadowlink-shadowsocks-proxy/id1439686518 "Shadowlink for iOS"). **Deny any paid subscriptions and trials**: we don't care about predefined paid servers, we will enter our own server.
2. Enter your own server. This is the only program that requires QR instead of ss:// link. To convert ss://<base64_info> link to QR code you can use any [QR code generator](https://webqr.com/create.html), then just scan it via iPhone camera.
3. Go to Proxy Rule, import CONF file

Link to download CONF file: https://an-eugene.github.io/ss_conditions/site/ss.html


## Proxy SwitchyOmega for browser (deprecated)
1. Install any Shadowsocks client that will provide proxy server ([Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases/latest "Shadowsocks github repo") for Windows, Shadowsocks-electron for Linux etc.)
2. Install [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif "SwitchyOmega for Google Chrome") extention to your browser
3. Create new profile - PAC profile
4. Enter PAC file link there
5. Save changes
6. Create auto switch profile (optionally)
   1. Create new profile - proxy
   2. Enter settings "SOCKS5" "127.0.0.1" "1080" (localhost:1080 is the default proxy address for most of the Shadowsocks clients)
   3. Create new profile - auto switch
   4. Point default routing as PAC Profile
   5. Save changes
8. Choose your profile (either PAC or auto switch)

PAC file link: https://raw.githubusercontent.com/An-Eugene/ss_conditions/main/ss_conditions.pac

**Note:** auto switch is the best debug profile to add any site to proxy profile without modifying current routing file by hands and without waiting your site to be added to these files. I used to use it when I was doing this project to create database by my hands. It can be useful for debugging but if you just want routing to work - you don't need it.
