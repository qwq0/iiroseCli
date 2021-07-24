import { account, save_account } from "./account.js";
import { prompt_d } from "./utils.js";

export function addButtonDiv(text, callback, style)
{
    var e = document.createElement("div");
    e.innerText = text;
    e.addEventListener("click", callback);
    if (style)
        e.style = style;
    return e;
}

var mlb_bt = document.getElementById("mlb_bt"); // 收起菜单按钮
var lb_bt = document.getElementById("lb_bt"); // 菜单按钮
var main_box = document.getElementById("main_box"); // 整个
var page_box = document.getElementById("page_box"); // 页面
var lm_box = document.getElementById("lm_box"); // 左菜单
var tm_box = document.getElementById("tm_box"); // 顶菜单
mlb_bt.addEventListener("click", function ()
{
    main_box.style.top = "-50px";
    main_box.style.left = "-50px";
});
lb_bt.addEventListener("click", function ()
{
    main_box.style.top = "0px";
    main_box.style.left = "0px";
});
var page_now = -1;
// var page_num = Number(window.localStorage.getItem("page_num"));
var page_num = 0;
var page_list = [];
export function addPage(title, pageEle)
{
    if (!title)
        title = "未命名";
    var page_id = page_num++;
    // window.localStorage.setItem("page_num", page_num);
    var tm_bt = document.createElement("div");
    tm_bt.innerText = title;
    tm_bt.className = "flBox";
    tm_bt.style.borderRight = "1px solid rgba(255, 255, 255, 0.5)";
    tm_bt.style.height = "100%";
    tm_bt.style.width = "160px";

    if (pageEle == undefined)
        pageEle = document.createElement("div");
    pageEle.classList.add("box");
    pageEle.style.height = "100%";
    pageEle.style.width = "100%";

    page_list[page_id] =
    {
        page: pageEle,
        button: tm_bt
    };
    pageEle.style.display = "none";
    tm_bt.addEventListener("click", function ()
    {
        if (page_now > -1)
        {
            page_list[page_now].page.style.display = "none";
            page_list[page_now].button.style.backgroundColor = "";
        }
        page_now = page_id;
        pageEle.style.display = "";
        tm_bt.style.backgroundColor = "rgba(200, 200, 255, 0.3)";
    });
    tm_box.appendChild(tm_bt);
    page_box.appendChild(pageEle);
    return pageEle;
}

var lm_bt_account = document.getElementById("lm_bt_account");

var account_pageEle = document.createElement("div");
account_pageEle.style.padding = "30px";
account_pageEle.style.overflowX = "hidden";
account_pageEle.style.overflowY = "auto";
lm_bt_account.addEventListener("click", function ()
{
    addPage("账号管理", account_pageEle);
});
account_pageEle.style.padding = "25px";
export function account_pageEle_add_acc(i, o)
{
    var acc_info = account_pageEle.appendChild(document.createElement("div"));
    acc_info.style.border = "2px solid rgb(255,255,255,0.5)";
    acc_info.style.marginTop = "15px";
    acc_info.appendChild(addButtonDiv("账号 (点此删除)", function ()
    {
        if (confirm("确定删除此账号?\n删除后下次登录时不会登录此账号\n账号名: " + o.name))
        {
            account[i] = null;
            save_account();
            acc_info.remove();
        }
    }));
    acc_info.appendChild(addButtonDiv("用户名 : " + o.name, function (e)
    {
        o.name = prompt_d("修改用户名为:", o.name);
        e.currentTarget.innerText = "用户名 : " + o.name;
        save_account();
    }, "margin-top:10px"));
    acc_info.appendChild(addButtonDiv("密码 : " + o.password, function (e)
    {
        o.password = prompt_d("修改密码为:\n请注意这不是修改账号密码 而是修改登录时使用的密码", o.password);
        e.currentTarget.innerText = "密码 : " + o.password;
        save_account();
    }, "margin-top:10px"));
    acc_info.appendChild(addButtonDiv("房间id : " + o.room, function (e)
    {
        o.room = prompt_d("房间id:\n请注意房间的id不是房间名", o.room);
        e.currentTarget.innerText = "房间id : " + o.room;
        save_account();
    }, "margin-top:10px"));
}
account_pageEle.appendChild(addButtonDiv("点击此处创建账号 点击账号详情修改 点击账号删除 任何操作将在下次登录时生效", function ()
{
    var o = {
        "name": "",
        "password": "",
        "room": ""
    };
    account.push(o);
    account_pageEle_add_acc(account.length - 1, o);
    save_account();
}));

export function setUserPage(pageEle, msg_box, sendMsg)
{
    msg_box.className = "box";
    msg_box.style.height = "100%";
    msg_box.style.width = "100%";
    msg_box.style.padding = "10px";
    msg_box.style.paddingBottom = "75px";
    msg_box.style.overflowX = "hidden";
    msg_box.style.overflowY = "auto";

    var msg_input = document.createElement("div");
    msg_input.className = "box";
    msg_input.style.top = "calc(100% - 50px)";
    msg_input.style.left = "50px";
    msg_input.style.height = "50px";
    msg_input.style.width = "calc(100% - 100px)";
    msg_input.style.borderTop = "1px solid rgba(255,255,255,0.5)";
    msg_input.style.backgroundColor = "rgba(5,5,5,0.6)";
    msg_input.style.lineHeight = "50px";
    msg_input.style.outline = "none";
    msg_input.contentEditable = "true";
    pageEle.appendChild(msg_input);
    var msg_send = document.createElement("div");
    msg_send.className = "box flBox";
    msg_send.style.top = "calc(100% - 50px)";
    msg_send.style.left = "calc(100% - 50px)";
    msg_send.style.height = "50px";
    msg_send.style.width = "50px";
    msg_send.style.borderTop = "1px solid rgba(255,255,255,0.5)";
    msg_send.style.borderLeft = "1px solid rgba(255,255,255,0.5)";
    msg_send.style.backgroundColor = "rgba(5,5,5,0.6)";
    msg_send.innerText = "发送";
    msg_send.addEventListener("click", function ()
    {
        var text = msg_input.innerText;
        msg_input.innerText = "";
        if (text != "")
            sendMsg(JSON.stringify({
                "m": text,
                "mc": "000000",
                "i": Math.floor(Math.random() * (1 << 30)).toString()
            }));
    });
    pageEle.appendChild(msg_send);
}