([
    "./js/md5.js",
    "./js/pako.min.js",
    "./js/utils.js",
    "./js/ui.js",
    "./js/protocol.js",
    "./js/ws.js",
    "./js/main.js"
]).forEach(function (o)
{
    var s = document.createElement("script");
    s.src = o + "?" + Math.random();
    document.body.appendChild(s);
});