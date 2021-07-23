import { forEach } from "./utils.js";
import { account_pageEle_add_acc, addPage } from "./ui.js"
import { account } from "./account.js";
import { addws } from "./ws.js";



var ws = [];
window.debugMode = false;
try
{
    forEach(account, function (i, o)
    {
        account_pageEle_add_acc(i, o);

        var pageEle = addPage(o.name);
        pageEle.style.padding = "10px";
        addws(o, pageEle);
    });
}
catch (err)
{
    console.error(err);
    window.localStorage.removeItem("account");
}