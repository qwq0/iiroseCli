var account = null;
try
{
    account = JSON.parse(window.localStorage.getItem("account"));
    if (!Array.isArray(account))
        throw "localStorage: account is not array";
}
catch (err)
{
    account = [];
}
function save_account()
{
    window.localStorage.setItem("account", JSON.stringify(account.filter(function (o)
    {
        return o != null;
    })));
}
try
{
    var ws = [];
    window.debugMode = false;
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
    window.localStorage.removeItem("account");
}