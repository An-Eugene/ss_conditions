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
        if (/(?:^|\.)hostinger\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)medium\.com$/.test(host)) return "+proxy";
        if (/^yt3\.ggpht\.com$/.test(host)) return "+proxy";
        if (/^play\.google\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)twitter\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)t\.co$/.test(host)) return "+proxy";
        if (/(?:^|\.)twimg\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)facebook\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)m\.me$/.test(host)) return "+proxy";
        if (/(?:^|\.)fbcdn\.net$/.test(host)) return "+proxy";
        if (/(?:^|\.)instagram\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)cdninstagram\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)rutracker\.org$/.test(host)) return "+proxy";
        if (/(?:^|\.)rutor\.is$/.test(host)) return "+proxy";
        if (/(?:^|\.)flibusta\.is$/.test(host)) return "+proxy";
        if (/(?:^|\.)intel\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)spotify\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)quora\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)openai\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)jsfiddle\.net$/.test(host)) return "+proxy";
        if (/(?:^|\.)saverudata\.net$/.test(host)) return "+proxy";
        if (/(?:^|\.)gagadget\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)exler\.ru$/.test(host)) return "+proxy";
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080";
    }
});