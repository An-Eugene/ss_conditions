var __BLOCKEDSITES__ = [
"yt3.ggpht.com",
"play.google.com",
"*.twitter.com",
"*.t.co",
"*.twimg.com",
"*.facebook.com",
"*.m.me",
"*.fbcdn.net",
"*.instagram.com",
"*.cdninstagram.com",
"*.rutracker.org",
"*.rutor.is",
"*.flibusta.is",
"*.intel.com",
"*.spotify.com",
"*.quora.com",
"*.openai.com",
"*.jsfiddle.net",
"*.saverudata.net",
"*.gagadget.com",
"*.exler.ru",
"*.medium.com",
"*.hostinger.com"
];

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
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) {
            return "DIRECT";
        }
        return "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080";
    }
});
