var mcache = require('memory-cache');

function get(key) {
    return mcache.get(key);
}

function set(key, value, duration) {
    return mcache.put(key, value, duration * 1000);
}

module.exports = { get, set };
