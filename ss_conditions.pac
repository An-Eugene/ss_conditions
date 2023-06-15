var __BLOCKEDSITES__ = [
    "yt3.ggpht.com",  // YouTube avatars
    "play.google.com",
    "*.twitter.com",  // Twitter
    "*.t.co",  // Twitter short links
    "*.twimg.com",  // Twitter CDN
    "*.facebook.com",  // Facebook
    "*.m.me",  // Facebook short links
    "*.fbcdn.net",  // Facebook CDN
    "*.instagram.com",  // Instagram
    "*.cdninstagram.com",  // Instagram CDN
    "*.rutracker.org",  // torrents
    "*.rutor.is",  // torrents
    "*.flibusta.is",  // torrents
    "*.intel.com",  // Fix "not supported in your country"
    "*.spotify.com",
    "*.quora.com",
    "*.openai.com",
    "*.jsfiddle.net",
    "*.saverudata.net",
    "*.gagadget.com",
    "*.exler.ru",
    "*.medium.com",
    "*.hostinger.com",
];


var proxy;
var direct;

if (typeof __PROXY__ === "undefined") {
    proxy = "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080";
    direct = "DIRECT";
} else {
    proxy = __PROXY__;
    direct = "DIRECT;";
}

var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+auto switch", {
    "+auto switch": function(url, host, scheme) {
        "use strict";
        if (__BLOCKEDSITES__.some(function(blockedSite) {
            return new RegExp((blockedSite.startsWith("*") ? "(?:^|\\.)" : "^") + blockedSite.replace(/\./g, "\\.").replace(/^\*\\\./, "") + "$").test(host);
        })) {
            return "+proxy";
        }
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host) || /^192\.168\.[0-9]{1-3}\.[0-9]{1-3}$/.test(host)) {
            return direct;
        }
        return proxy;
    }
});
