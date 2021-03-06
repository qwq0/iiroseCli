import { MD5_32Char_lowerCase } from "./md5.js";
import "./pako.min.js";
import { protocol } from "./protocol.js";
var pako = window.pako;

export function addws(account, pageEle)
{
    var ws = new WebSocket("wss://m1.iirose.com:8778/");
    ws.binaryType = "arraybuffer";
    var onMsg = protocol(sendMsg, pageEle);

    ws.addEventListener("message", function (ev)
    {
        var e = new Uint8Array(ev.data);
        if (e[0] == 1)
            onMsg(pako.inflate(e.subarray(1), { to: "string" }));
        else
            onMsg((new TextDecoder('utf8')).decode(e));
    });

    function sendMsg(e)
    {
        if (window.debugMode)
            console.log("send", e);
        var buffer = new Uint8Array((new TextEncoder('utf8')).encode(e));
        if (buffer.size > 256)
        {
            e = pako.gzip(e);
            buffer = new Uint8Array(e.length + 1);
            buffer[0] = 1;
            buffer.set(e, 1);
            ws.send(buffer);
        }
        else
            ws.send(buffer);
    }

    ws.addEventListener("open", function ()
    {
        console.log("ws opened");
        pageEle.appendChild(document.createElement("div")).innerText = "已连接到服务器";
        ws.send('*' + JSON.stringify({
            "r": account.room, // room id
            "n": account.name, // user id
            "p": MD5_32Char_lowerCase(account.password), // MD5_32Char_lowerCase(password)

            "st": "n", // "n"  (status)
            "mo": "", // ""  (mood)
            "mb": "1", // "1"  (Mobile terminal)
            "cp": "", // ?
            "mu": "01", // "01"
            "nt": "", // ?

            "fp": "@" + MD5_32Char_lowerCase(Math.random().toString())  // '@' + random_32Char()
        }));
    });

    ws.addEventListener("close", function ()
    {
        console.log("ws closed");
        pageEle.appendChild(document.createElement("div")).innerText = "已从服务器断开";
    });

    return {
        sendMsg: sendMsg,
        ws: ws
    };
}
