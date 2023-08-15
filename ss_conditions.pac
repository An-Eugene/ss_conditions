var __BLOCKEDSITES__ = [
  "*.ua",
  "*.3dyuriki.com",
  "*.4pda.ru",
  "9tv.co.il",
  "*.activatica.org",
  "*.agents.media",
  "*.appleinsider.ru",
  "*.appspot.com",
  "*.arbat.media",
  "*.archiveofourown.org",
  "*.azathabar.com",
  "*.azattyq.com",
  "*.bbc.com",
  "*.bbci.co.uk",
  "*.bellingcat.com",
  "*.bild.de",
  "*.blackseanews.net",
  "*.carousell.sg",
  "*.cdninstagram.com",
  "*.cherta.media",
  "*.colta.ru",
  "*.crocoblock.com",
  "*.currenttime.tv",
  "*.cyxymu.info",
  "*.delfi.ee",
  "*.delfi.lt",
  "*.delfi.lv",
  "*.dell.com",
  "*.dellcdn.com",
  "*.discours.io",
  "*.dossier.center",
  "*.dovod.online",
  "*.doxa.team",
  "*.dw.com",
  "*.echofm.online",
  "*.echokavkaza.com",
  "*.ej.ru",
  "*.eporner.com",
  "*.euronews.com",
  "*.euroradio.fm",
  "*.exler.ru",
  "*.expres.online",
  "*.facebook.com",
  "*.fbcdn.net",
  "*.flibusta.is",
  "*.fortanga.org",
  "*.foxitsoftware.com",
  "*.freemedia.io",
  "*.gagadget.com",
  "*.germania.one",
  "*.grani.ru",
  "*.graty.me",
  "yt3.ggpht.com",
  "news.google.com",
  "play.google.com",
  "*.hdrezka.ag",
  "*.holod.media",
  "*.hostinger.com",
  "*.hs.fi",
  "*.idelreal.org",
  "*.instagram.com",
  "*.intel.com",
  "*.is.fi",
  "*.istories.media",
  "*.itsmycity.ru",
  "*.jauns.lv",
  "*.jsfiddle.net",
  "*.kasparov.ru",
  "*.kavkaz-uzel.eu",
  "*.kavkazr.com",
  "*.korrespondent.net",
  "*.krymr.com",
  "*.kym-cdn.com",
  "*.lentachel.ru",
  "*.libgen.li",
  "*.linkedin.com",
  "*.locals.md",
  "*.lolz.guru",
  "*.m.me",
  "*.mediazona.ca",
  "*.medium.com",
  "*.meduza.io",
  "*.merezha.co",
  "*.metla.press",
  "*.mignews.com",
  "echo.msk.ru",
  "*.navalny.com",
  "*.netflix.com",
  "*.newsru.com",
  "newsru.co.il",
  "*.newtimes.ru",
  "*.novaya.no",
  "*.novayagazeta.ru",
  "*.novayagazeta.eu",
  "*.openai.com",
  "*.openmedia.io",
  "*.opposition-news.com",
  "*.otkrito.lv",
  "*.ovd.news",
  "*.ovdinfo.org",
  "*.ozodi.org",
  "*.pap.pl",
  "*.paperpaper.ru",
  "*.paperpaper.io",
  "*.politiken.dk",
  "*.posle.media",
  "*.postimees.ee",
  "*.proekt.media",
  "*.provereno.media",
  "*.putin-killer.com",
  "*.quora.com",
  "*.realist.online",
  "*.republic.ru",
  "*.rezka.ag",
  "*.rezonans.media",
  "*.rferl.org",
  "*.roar-review.com",
  "*.root-nation.com",
  "*.rutor.is",
  "*.rutracker.org",
  "*.sakhalin.info",
  "*.saverudata.net",
  "*.semnasem.org",
  "*.severreal.org",
  "*.sibreal.org",
  "*.skat.media",
  "*.slavicsac.com",
  "*.sobesednik.com",
  "*.sobytiya.info",
  "*.solopress.com",
  "*.spektr.press",
  "*.spotify.com",
  "*.sputnikipogrom.com",
  "*.strana.news",
  "*.strana.today",
  "*.suicidegirls.com",
  "*.suspilne.media",
  "*.svoboda.org",
  "*.svtv.org",
  "*.t.co",
  "*.tayga.info",
  "*.telegraf.by",
  "*.the-village.ru",
  "*.thebarentsobserver.com",
  "*.thebell.io",
  "*.theins.ru",
  "*.themegrill.com",
  "*.thenewtab.io",
  "*.thepiratebay.org",
  "*.tjournal.ru",
  "*.tv2.today",
  "*.tvfreedom.io",
  "*.tvrain.ru",
  "*.tvrain.tv",
  "*.twimg.com",
  "*.twitter.com",
  "*.usa.one",
  "*.verstka.media",
  "*.vesma.today",
  "*.vesma.one",
  "vesty.co.il",
  "*.voanews.com",
  "*.vot-tak.tv",
  "*.welt.de",
  "*.windscribe.com",
  "*.wixmp.com",
  "*.wonderzine.com",
  "*.yle.fi",
  "*.zahav.ru",
  "*.zerkalo.io",
  "*.zona.media"
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
