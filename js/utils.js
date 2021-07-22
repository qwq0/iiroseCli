function cutString(s, mod)
{
    var ind = s.indexOf(mod);
    return [s.slice(0, ind), s.slice(ind + 1)];
}
function forEach(o, callback)
{
    if (!o)
        return false;
    for (var i = 0, Li = o.length; i < Li; i++)
        if (o[i] != undefined && callback(i, o[i]))
            return true;
    return false;
};