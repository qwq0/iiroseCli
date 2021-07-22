window.addEventListener("load", function ()
{
    var account = null;
    try
    {
        account = JSON.parse(window.localStorage.getItem("account"));
    }
    catch (err)
    {
        account = [];
    }
    var ws = [];
    window.debugMode = true;
    forEach(account, function (i, o)
    {
        addws(o);
    });
});