var __BLOCKEDSITES__ = [
  "*.4pda.ru",
  "*.cdninstagram.com",
  "*.exler.ru",
  "*.facebook.com",
  "*.fbcdn.net",
  "*.flibusta.is",
  "*.gagadget.com",
  "yt3.ggpht.com",
  "play.google.com",
  "*.hostinger.com",
  "*.instagram.com",
  "*.intel.com",
  "*.jsfiddle.net",
  "*.linkedin.com",
  "*.lolz.guru",
  "*.m.me",
  "*.medium.com",
  "*.meduza.io",
  "*.navalny.com",
  "*.openai.com",
  "*.quora.com",
  "*.rutor.is",
  "*.rutracker.org",
  "*.saverudata.net",
  "*.spotify.com",
  "*.svoboda.org",
  "*.t.co",
  "*.twimg.com",
  "*.twitter.com",
  "*.windscribe.com"
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
