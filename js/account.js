var accObj = null;
try
{
    accObj = JSON.parse(window.localStorage.getItem("account"));
    if (!Array.isArray(accObj))
        throw "localStorage: account is not array";
}
catch (err)
{
    accObj = [];
}
window.account = accObj;
export function save_account()
{
    window.localStorage.setItem("account", JSON.stringify(accObj.filter(function (o)
    {
        return o != null;
    })));
}
export var account = accObj;