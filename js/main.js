import { forEach } from "./utils.js";
import { account_pageEle_add_acc, addPage, setUserPage } from "./ui.js"
import { account } from "./account.js";
import { addws } from "./ws.js";



var ws = [];
window.debugMode = (window.location.hash == "#debugMode");
try
{
    forEach(account, function (i, o)
    {
        account_pageEle_add_acc(i, o);

        var pageEle = addPage(o.name);
        var msg_box = document.createElement("div");
        var ct = addws(o, pageEle.appendChild(msg_box));
        setUserPage(pageEle, msg_box, ct.sendMsg);
    });
}
catch (err)
{
    console.error(err);
    window.localStorage.removeItem("account");
}