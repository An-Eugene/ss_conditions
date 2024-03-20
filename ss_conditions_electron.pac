// Define a variable to hold the route list
var cachedRouteList = null;

// Function to fetch the remote route list file and cache it
function fetchAndCacheRouteList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/An-Eugene/ss_conditions/linux-experimentation/ss_conditions_list.conf", false); // Synchronous request
    xhr.send();
    cachedRouteList = xhr.responseText;
}

// Function to check if a URL matches any domain in the route list
function isInRouteList(url) {
    if (!cachedRouteList) {
        fetchAndCacheRouteList(); // Download the route list if not cached
    }
    var domains = cachedRouteList.split("\n");
    for (var i = 0; i < domains.length; i++) {
        var domain = domains[i].trim();
        if (domain.startsWith("*.")) {
            // Check if the URL matches the wildcard domain and its subdomains
            var wildcardDomain = domain.substring(2); // Remove the leading '*.'
            if (url.indexOf(wildcardDomain) !== -1 && url.indexOf("." + wildcardDomain) !== -1) {
                return true;
            }
        } else {
            // Check if the URL exactly matches the domain
            if (url.indexOf(domain) !== -1) {
                return true;
            }
        }
    }
    return false;
}

// Main function to determine proxy usage
function FindProxyForURL(url, host) {
    if (isInRouteList(host)) {
        return "PROXY proxy.example.com:8080"; // Replace with your proxy server details
    } else {
        return "DIRECT";
    }
}
