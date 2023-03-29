import { cutString, forEach, forEachRev } from "./utils";

export function protocol(sendMsg, pageEle)
{
    let login = false;

    return function (data)
    {
        if (window.debugMode)
            console.log("get", data);
        if (data.slice(0, 3) == '%*"')
        {
            sendMsg("s");
            if (data[3] == '*')
            {
                login = true;
                var obj = cutString(data.slice(4), "'");
            }
            if (!login)
            {
                if (data[3] == 's')
                {
                    var a = data.slice(4).split('>');
                    pageEle.appendChild(document.createTextNode("房间错误 此账号在房间: " + a[1] + " 请修改为: " + a[0]));
                }
                if (data[3] == '1' || data[3] == '2')
                {
                    pageEle.appendChild(document.createTextNode("登录失败 请检查账号密码"));
                }
            }
            return;
        }
        // 以下协议列表参考蔷薇官方代码
        // 因为逆向需要耗费大量世界所以并没有实现所有协议内容
        // 注释的内容为官方实现

        switch (data[0])
        {
            case '"':
                if (data[1] != "\"")
                    forEachRev(data.substr(1).split("<"), function (i, m)
                    {
                        if (window.debugMode)
                            console.log("rMsg", m.split(">"));
                        var a = m.split(">");
                        var e = document.createElement("div");
                        e.style.left = "0";
                        e.style.right = "0";
                        e.style.padding = "5px";
                        e.style.marginTop = "5px";
                        e.style.border = "2px solid";
                        e.style.borderColor = "#" + a[5];
                        e.innerText = a[2] + " : " + a[3];
                        pageEle.appendChild(e);
                    });
                break;
            /*
            case "%":
                var t, o, i = e.indexOf('"');
                "*" == e[1] ? password ? '"' == e[3] ? (d = e.substr(4).indexOf('"'),
                    a = e.substr(4, d).split("#"),
                    Probe.init.bankHolder && "" !== a[0] && Objs.bankHolder.function.bankUpdate(a[0].split(" ")),
                    Probe.init.stockHolder && (a[1] = a[1].split("$"),
                        a[1].push(Number((a[1][1] / a[1][0]).toFixed(4))),
                        Objs.stockHolder.function.stockUpdate(a[1])),
                    Objs.mapHolder.function.freshRoom(e.substr(d + 5))) : (t = e.substr(2, i - 2),
                        Probe.roomLoaded || (Temporary.initPm = function ()
                        {
                            (t = t && Init.service.pmOfflineMsg(t)) && (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                                Objs.leaveMsgHolder.function.get(t));
                        }
                        ),
                        Objs.mapHolder.function.freshRoom(e.substr(i + 1))) : Objs.mapHolder.function.freshRoom(e.substr(i + 1)) : (s = e.substr(2, i - 2),
                            o = e.substr(i + 1),
                            i = o.indexOf('"'),
                            password && (Temporary.initPm = function ()
                            {
                                var e = o.substr(0, i);
                                (e = e && Init.service.pmOfflineMsg(e)) && (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                                    Objs.leaveMsgHolder.function.get(e));
                            }
                            ),
                            Objs.mapHolder.function.freshRoom(o.substr(i + 1)),
                            shareMedia(s));
                break;
            case "+":
                Utils.View.addToStack([1, [e = e.substr(1), 0], $.extend(!0, [], Variable.whoisArr)]),
                    whois(e, Variable.whoisArr);
                break;
            case "-":
                var a = e.substr(1);
                if ("*" == a[0])
                    2 == (a = a.substr(1).split(">")).length && (a[1] = unhtmlspecialchars(a[1]),
                        Objs.mapHolder.function.roompsdFunc(a[0]) != a[1]) && Objs.mapHolder.function.roompsdFunc(a[0], a[1]),
                        a[0] == roomn ? location._reload() : Objs.mapHolder.function.roomchanger(a[0], 1);
                else if ("#" == a[0])
                    (a = a.substr(1).split('"'))[0] && Cookie("roomattr", a[0]),
                        a[1] && Cookie("roomcolor", a[1]),
                        a[2] && (i = roomnFull.lastIndexOf("_"),
                            Cookie("roomname", -1 == i ? a[2] : Objs.mapHolder.Assets.roomNameJson[roomnFull.substr(0, i).split("_").pop()] + "_" + a[2])),
                        a[3] && Cookie("roominfo", a[3]),
                        location._reload();
                else if ("-" == e || a == roomn)
                    location._reload();
                else if ("k" == a)
                    Objs.mapHolder.function.roomchanger(Constant.rid.space);
                else if ("--" == e)
                    parent.location._reload();
                else if ("---" == e)
                    try
                    {
                        Utils.service.clearCache(1);
                    } catch (e)
                    {
                        parent.location._reload();
                    }
                else
                    Objs.mapHolder.function.roomchanger(a);
                break;
            case "=":
                danmakuHolder.function.msg(e.substr(1));
                break;
            case "$":
                "?" == e[1] ? Objs.userREHolder.function.server(2, e.substr(2)) : "#" == e[1] ? Objs.userREHolder.function.server(3, e.substr(2)) : "^" == e[1] ? Objs.userREHolder.function.server(0, e.substr(2)) : "*" == e[1] ? Objs.userREHolder.function.lib(9, e.substr(2)) : "!" == e[1] ? (Info.me["s" == e[2] ? "socialVerified" : "telVerified"] = 3 == e.length,
                    Info.me.verified = Info.me.socialVerified && Info.me.telVerified,
                    "t" == e[2] && 3 == e.length && Utils.sync(0, languageArr[7][263])) : "@" == e[1] ? Objs.userREHolder.function.server(4, e.substr(2)) : "%" == e[1] ? "0" != e[3] && "2" != e[3] || Probe.init.userREHolder ? Objs.userREHolder.function.server(5, e.substr(2)) : _alert(("0" == e[3] ? "* 已绑定" : "* 已解绑").replace("*", languageArr[36][17][0][e[2]])) : Objs.userREHolder.function.server(1, e.substr(1));
                break;
            case "&":
                shareMedia(e.substr(2));
                break;
            case "?":
                peerIdArr = e.substr(1).split(">"),
                    callPeerProbe = -1,
                    peerIdArrLenth = peerIdArr.length - 1,
                    callPeerAll();
                break;
            case "~":
                Objs.mediaListHolder.function.get(e.substr(1));
                break;
            case "^":
                Objs.userSearchHolder.function.get(e.substr(1));
                break;
            case ":":
                "*" == e[1] ? (Objs.timelineHolder.function.get(e = e.substr(2), 0, 0, "2"),
                    1 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][4] = e)) : "+" == e[1] ? (Objs.taskHolder.function.get(e.substr(2), Probe.leaveMsgHolder.taskP),
                        Probe.leaveMsgHolder.taskP && (Probe.leaveMsgHolder.taskP = "")) : "-" == e[1] ? (Objs.forumHolder.function.get(e.substr(2), Probe.leaveMsgHolder.postP),
                            Probe.leaveMsgHolder.postP && (Probe.leaveMsgHolder.postP = "")) : "=" == e[1] ? (Objs.timelineHolder.function.get(e.substr(2), Probe.leaveMsgHolder.timelineP, 0, ""),
                                Probe.leaveMsgHolder.timelineP && (Probe.leaveMsgHolder.timelineP = "")) : "%" == e[1] ? Objs.timelineHolder.function.edit(1, e.substr(2)) : "^" == e[1] ? Objs.timelineHolder.function.edit(3, e.substr(2)) : Objs.timelineHolder.function.edit(2, e.substr(2));
                break;
            case ".":
                var s = e.substr(2);
                switch (e[1])
                {
                    case "!":
                        s = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][s]);
                        break;
                    case "@":
                        s = "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][s]);
                        break;
                    case "#":
                        s = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][s[0]]) + "\n" + "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][s[1]]);
                }
                Utils.sync(0, s);
                break;
            case ",":
                mediaShareRoom && (1 == e.length ? Utils.service.isShareMediaPlaying() && (shareMediaCurrentTime = -1,
                    Probe.emptyMediaPlayer && pageBlur || _alert(languageArr[9][3][9])) : Utils.service.seekDemandMedia(Number(e.substr(1))));
                break;
            case ";":
                focusI(inputholdermain.val(e.substr(1)));
                break;
            case "_":
                if ("_" == e[1])
                    console.log(e.substr(2));
                else
                {
                    switch (e[2])
                    {
                        case "0":
                            s = languageArr[15][3][3][1][2][3][1];
                            break;
                        case "1":
                            s = languageArr[15][3][3][1][2][3][2];
                            break;
                        case "2":
                            s = languageArr[15][3][3][1][2][3][3];
                            break;
                        case "3":
                            s = languageArr[15][3][3][1][2][3][4],
                                Objs.shopHolder.coinHolder.html(Variable.coin += 1e4);
                            break;
                        case "p":
                        case "q":
                            s = "[ " + Utils.service.pmMsg2Show(unhtmlspecialchars(e.substr(3))) + " ]\n" + languageArr[7]["p" == e[2] ? 135 : 136];
                            break;
                        case "l":
                            s = "[ " + Utils.service.pmMsg2Show(unhtmlspecialchars(e.substr(4))) + " ]\n" + Assets.notiEmoji.check + "  " + languageArr[36][17][0][e[3]];
                            break;
                        case "r":
                            s = languageArr[36][6][2][2];
                            break;
                        case "x":
                            s = languageArr[36][6][2][7];
                            break;
                        case "!":
                            s = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]),
                                Utils.service.admin.roomLimit(0, e[3]);
                            break;
                        case "@":
                            s = "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]),
                                Utils.service.admin.roomLimit(1, e[3]);
                            break;
                        case "#":
                            s = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]) + "\n" + "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[4]]),
                                Utils.service.admin.roomLimit(2, e[3] + e[4]);
                            break;
                        case "=":
                            s = "当前已经是所选的状态了";
                            break;
                        case "$":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   被此房 #".replace("#", "1" == s[3] ? "禁止发言" : "2" == s[3] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(s[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(s[1]) + Mod.text(0, s[2], 1);
                            break;
                        case "%":
                        case "w":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   被此房 #".replace("#", "%" == e[2] ? "黑名单" : "白名单").replace("*", unhtmlspecialchars(s[0])) + ("%" == e[2] ? Variable.Text.alarm : Variable.Text.alarmGood) + Utils.smallTools.getTimeDurationStr(s[1]) + Mod.text(0, s[2], 1);
                            break;
                        case "^":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   的此房 # 被解除".replace("#", "1" == s[1] ? "禁止发言" : "2" == s[1] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(s[0]));
                            break;
                        case "&":
                        case "W":
                            s = "[   *   ]   的此房 # 被解除".replace("#", "&" == e[2] ? "黑名单" : "白名单").replace("*", unhtmlspecialchars(e.substr(3)));
                            break;
                        case "*":
                            s = "此房 # 被清空".replace("#", "禁言");
                            break;
                        case "(":
                        case "X":
                            s = "此房 # 被清空".replace("#", "(" == e[2] ? "黑名单" : "白名单");
                            break;
                        case ")":
                            s = e.substr(3),
                                s = "此房 最大人数 被设为 * 人".replace("*", "" === s ? "&" : s);
                            break;
                        case "b":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   被 #".replace("#", "禁封").replace("*", unhtmlspecialchars(s[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(s[1]) + Mod.text(0, s[2], 1);
                            break;
                        case "t":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   被 #".replace("#", "全局 #").replace("#", "1" == s[3] ? "禁止发言" : "2" == s[3] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(s[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(s[1]) + Mod.text(0, s[2], 1);
                            break;
                        case "d":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   被 #".replace("#", "小黑屋").replace("*", unhtmlspecialchars(s[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(s[1]) + Mod.text(0, s[2], 1);
                            break;
                        case "B":
                            s = "[   *   ]   # 被解除".replace("#", "禁封").replace("*", unhtmlspecialchars(e.substr(3)));
                            break;
                        case "T":
                            s = e.substr(3).split(">"),
                                s = "[   *   ]   # 被解除".replace("#", "全局 #").replace("#", "1" == s[1] ? "禁止发言" : "2" == s[1] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(s[0]));
                            break;
                        case "D":
                            s = "[   *   ]   # 被解除".replace("#", "小黑屋").replace("*", unhtmlspecialchars(e.substr(3)));
                            break;
                        case "_":
                            s = ("*" == (s = e.substr(3))[0] ? "" : ("@" == s[0] ? "充值成功" : "#" == s[0] ? "提现成功" : "提现失败") + " , ") + "您的当前房间余额为 : " + s.substr(1) + languageArr[7][41];
                            break;
                        case "-":
                            s = "!" == (s = e.substr(3))[0] ? "此房 挂机奖励被设为每小时追加 : " + s.substr(1) + languageArr[7][41] : "此房 发言奖励倍率被设为 : " + s.substr(1) + " 倍";
                            break;
                        case "+":
                            switch ((s = e.substr(3))[0])
                            {
                                case "0":
                                    s = "此房 盈利金额加到 [ * ] 中".replace("*", "0" == s.substr(1) ? "账户余额" : "房间余额");
                                    break;
                                case "1":
                                    s = "此房 扣费金额优先从 [ * ] 中扣除".replace("*", "0" == s.substr(1) ? "账户余额" : "房间余额");
                                    break;
                                case "2":
                                    s = "此房 福利金额优先从 [ * ] 中扣除".replace("*", "0" == s.substr(1) ? "账户余额" : "房间余额");
                                    break;
                                case "3":
                                    s = "此房 福利要求的 挂机时间 被限制为 : " + s.substr(1) + " 小时";
                                    break;
                                case "4":
                                    s = "此房 福利要求的 时间段 被限制为 : " + s.substr(1);
                            }
                            break;
                        case "m":
                            s = e[3] ? languageArr[7][147] : languageArr[7][148];
                            break;
                        case "O":
                            s = "房员移动成功";
                            break;
                        case "Q":
                            s = "所选人已移出";
                            break;
                        case "E":
                            s = "列表是空的";
                            break;
                        case "A":
                            s = "列表中已经存在了";
                            break;
                        case "4":
                            s = "管理员以上级别的人 无法被添加到 黑名单";
                            break;
                        case "S":
                            s = "当前已经是所设定的数据了";
                            break;
                        case "P":
                            s = "当前没有正在播放的媒体";
                            break;
                        case "L":
                            s = "命令执行失败 , 请重试";
                            break;
                        case "K":
                            s = "此用户当前不在您操作的房间内";
                            break;
                        case "J":
                            s = "此用户当前所在的房间 , 禁止房员被移动";
                            break;
                        case "M":
                            if (Probe.emptyMediaPlayer && pageBlur)
                                return;
                            s = e.substr(4) || "3",
                                s = "# 投票已发起 , 当前 * / 3 票".replace("#", "0" == e[3] ? "当前媒体切除" : "当前媒体点播者全部媒体切除").replace("*", s) + ("3" == s ? " , 投票成功 !" : "");
                            break;
                        case "G":
                            if (Probe.emptyMediaPlayer && pageBlur)
                                return;
                            s = "您已经发起过投票了 , 当前 * / 3 票".replace("*", e.substr(3));
                            break;
                        case "V":
                            s = "只能操作自己点播的媒体";
                            break;
                        case "F":
                            s = languageArr[7][146];
                    }
                    _alert(s);
                }
                break;
            case "|":
                "$" == e[1] ? "#" == e[2] ? "@" == e[3] ? ((s = Objs.shopHolder.Assets.selectJSON[Objs.shopHolder.housePageType + 7 + "_0"]).pop(),
                    Utils.setSelectVal(Objs.shopHolder["houseSelectObj" + (1 == Objs.shopHolder.housePageType ? "" : Objs.shopHolder.housePageType)], Objs.shopHolder.Assets.selectJSON, s.length ? s[0][0] : ""),
                    s.length || Objs.shopHolder["houseSelectObj" + (1 == Objs.shopHolder.housePageType ? "" : Objs.shopHolder.housePageType)].html("您尚无房间"),
                    Objs.shopHolder.coinHolder.html(Variable.coin = Number(e.substr(4))),
                    _alert(languageArr[7][40] + Variable.coin + languageArr[7][41])) : (_alert(languageArr[7][40] + (Variable.coin = Number(e.substr(3))) + languageArr[7][41]),
                        Probe.init.shopHolder && Objs.shopHolder.function.updateCoin(1)) : (d = Variable.currentUserInfoObj) && ((a = (uInfoMode ? d.userTag.coin : d).find("span[coin]")).html(strTmp = Utils.smallTools.formatDecimal(Number(a.html()) + Number(e.substr(2)), 3)),
                            Utils.View.lib(2, [17, strTmp]),
                            (s = Utils.View.lib(5)) && (strTmp = Utils.View.lib(2, 17, s) - e.substr(2),
                                Utils.View.lib(2, [17, 0 < strTmp ? Utils.smallTools.formatDecimal(strTmp, 3) : 0], s)),
                            _alert(languageArr[7][143])) : "v" == e[1] ? "+" == e[2] ? Objs.mapHolder.function.controlContacts && Objs.mapHolder.function.controlContacts(4, e.substr(3).split(">")) : (Objs.mapHolder.function.controlContacts && Objs.mapHolder.function.controlContacts(5, e.substr(3)),
                                Probe.init.timelineHolder && socket._onmessage(":!" + e.substr(3))) : (Objs.whoisConnectionHolder.function.fetchConnection(e = e.substr(2)),
                                    1 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][3] = e));
                break;
            case "`":
                if ("%" == e[1])
                    Objs.shopHolder.function.getLuck(e.substr(2));
                else if ("$" == e[1])
                    Objs.shopHolder.coinHolder.html(Variable.coin = Number(e.substr(2)));
                else if ("?" == e[1])
                    if ("-" == e[2])
                        Objs.shopHolder.lotteryResult.html("☹").css("transform", "scale(1.1)"),
                            setTimeout(function ()
                            {
                                Objs.shopHolder.lotteryResult.css("transform", "");
                            }, speed250),
                            Objs.shopHolder.function.getLottery(100);
                    else if ("$" == e[2])
                    {
                        s = e.substr(3);
                        Objs.shopHolder.lotteryResult.html("$" + s).css("transform", "scale(1.1)"),
                            setTimeout(function ()
                            {
                                Objs.shopHolder.lotteryResult.css("transform", "");
                            }, speed250),
                            (s -= 100) && Objs.shopHolder.function.getLottery(0 < s ? "$" + s : -1 * s);
                    } else
                    {
                        var r, s = e.substr(4);
                        switch (m = e[3])
                        {
                            case "0":
                                u = 0,
                                    r = "accessory";
                                break;
                            case "1":
                                u = 6,
                                    r = "role";
                                break;
                            case "2":
                                u = 7,
                                    r = "emoji";
                        }
                        Objs.shopHolder.lotteryTry.attr("disabled", "disabled"),
                            Objs.shopHolder.lotteryResult.html("🎁").css("transform", "scale(1.1)"),
                            setTimeout(function ()
                            {
                                Objs.shopHolder.lotteryResult.css("transform", "");
                            }, speed250),
                            Objs.shopHolder.function.getLottery(100),
                            Objs.shopHolder.lotteryBack.click(),
                            d = Objs.shopHolder.Variable.initProbeArr2[u],
                            Objs.shopHolder.mainContent.children("div:eq(" + (u + 1) + ")")[0].lastChild.firstChild.click();
                        function n()
                        {
                            Utils.sync(0, languageArr[15][5][3][0] + "  [  " + languageArr[15][u + 1][0] + "  :  " + Objs.shopHolder[r + "PriceArr"][s] + languageArr[7][41] + "  ]  ✨"),
                                socket._onmessage("`@3" + m + s),
                                Objs.shopHolder.lotteryTry.removeAttr("disabled");
                        }
                        d ? n() : Temporary.lotteryCallback = n;
                    }
                else
                    "@" == e[1] ? 1 == e[2] ? Objs.shopHolder.function.buildPanel(Number(e[3]), e.substr(4)) : 2 == e[2] ? (c = 0 == e[3] ? (p = "accessory",
                        0) : 1 == e[3] ? (p = "role",
                            6) : (p = "emoji",
                                7),
                        5 != e.length && (0 == c ? (Cookie("cprobe", e.substr(6, 13)),
                            1 == e[5] ? Cookie("accessory", accessory = e.substr(19)) : (accessory = "",
                                removeCookie("accessory"))) : 6 != c && Utils.emojiManager && Utils.emojiManager(e.substr(6), 1 == e[5])),
                        2 == e[4] && Probe.init.shopHolder && Objs.shopHolder.Variable.initProbeArr2[c] && (!(s = Objs.shopHolder[p + "Panel"].attr("s")) || 1 == e[3] && "none" != Objs.shopHolder.roleSystemPanel.css("display") || Objs.shopHolder[p + "ItemArr"][s].click(),
                            "none" != Objs.shopHolder.boxArr[c].css("display") ? socket.send("=~1" + e[3]) : Objs.shopHolder.Variable.initProbeArr2[c] = 0)) : 3 == e[2] && (c = 0 == e[3] ? (p = "accessory",
                                0) : 1 == e[3] ? (p = "role",
                                    6) : (p = "emoji",
                                        7),
                                Objs.shopHolder.Variable.initProbeArr2[c]) && (s = Objs.shopHolder[p + "Panel"].attr("s"),
                                    a = 4 == e.length,
                                    m = a ? s : e.substr(4),
                                    Objs.shopHolder[p + "PagePointerArr"].eq(Math.floor(Objs.shopHolder[p + "ItemPosArr"][m] / 36)).click(),
                                    Objs.shopHolder[p + "ItemArr"][m].attr("st", 1).children(".textColor").html(languageArr[15][0][1][0]),
                                    a ? (Objs.shopHolder[p + "ItemArr"][s].attr("buy", 1).click().click().removeAttr("buy"),
                                        Objs.shopHolder.coinHolder.html(Variable.coin -= Objs.shopHolder[p + "PriceArr"][s])) : (s == m ? Objs.shopHolder[p + "ItemArr"][s].attr("buy", 1).click().click().removeAttr("buy") : Objs.shopHolder[p + "ItemArr"][m].click(),
                                            Objs.shopHolder[p + "PageArr"][Objs.shopHolder[p + "PageCurrent"]].scrollTop(Objs.shopHolder[p + "ItemArr"][m][0].offsetTop - ("accessory" == p ? 247 : 232)))) : "^" == e[1] ? Objs.shopHolder.function.houseGet(e.substr(3), e[2]) : "#" == e[1] ? Objs.wealthHolder.function.get(e.substr(2)) : "~" == e[1] ? Objs.mapHolder.function.roomPasswordCheck(e[2]) : "!" == e[1] && Temporary.houseConfirmAfterProtectPassword && ("0" == e[2] ? _alert(languageArr[15][3][3][1][2][3][3]) : Temporary.houseConfirmAfterProtectPassword(),
                                                delete Temporary.houseConfirmAfterProtectPassword);
                break;
            case "@":
                var l;
                "*" == e[1] ? (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                    Objs.leaveMsgHolder.function.get(e.substr(2))) : "=" == e[1] ? (l = e.substr(2).split("'"),
                        Probe.init.timelineHolder || (Probe.skipInit = 1,
                            Init.fullPanel(5)),
                        Objs.timelineHolder.function.edit(5, l)) : "#" == e[1] ? (l = e.substr(2).split('"'),
                            Probe.init.forumHolder || (Probe.skipInit = 1,
                                Init.fullPanel(3)),
                            Objs.forumHolder.function.get(l[1], Number(l[0]))) : "$" == e[1] && (l = e.substr(2).split('"'),
                                Probe.init.taskHolder || (Probe.skipInit = 1,
                                    Init.fullPanel(4)),
                                Objs.taskHolder.function.get(l[1], Number(l[0])));
                break;
            case "#":
                "undefined" != typeof gamePanel && gamePanel.getMsg(e.substr(1));
                break;
            case "*":
                var d, c;
                "@" == e[1] ? (Objs.pairHolder.function.event.call(Objs.pairHolder.stopBtn, 1),
                    _alert(languageArr[17][14])) : "!" == e[1] ? (d = e.substr(2).split('"'),
                        Objs.pairHolder.function.event(2, privateMsgFunc(d[0], d[1], d[2], d[3], d[4], d[5], 1))) : (Objs.pairHolder.function.event.call(Objs.pairHolder.stopBtn, 1),
                            s = e.substr(1),
                            (c = Objs.mapHolder.function.findUserByUid(s)) ? Objs.pairHolder.function.event(2, Utils.buildPm(0, c, 1)) : socket.send("`!" + e.substr(1)));
                break;
            case ">":
                ">" == e[1] ? (e = Number(e.substr(2)),
                    Objs.stockHolder.stockInput.val(0 < e ? e : ""),
                    Objs.stockHolder.stockPrice.html(0 < e ? Utils.smallTools.formatDecimal(e * Objs.stockHolder.Variable.stockNum, 4) : "- -"),
                    _alert(languageArr[19][10] + e + languageArr[19][2]),
                    Probe.tmp.stockNoUpdateShow ? Probe.tmp.stockNoUpdateShow = 0 : Objs.stockHolder.stockMineShow.html(Objs.stockHolder.Variable.stockCoin = e)) : "<" == e[1] ? (e = Number(e.substr(2)),
                        strTmp = Math.floor(e / Objs.stockHolder.Variable.stockNum),
                        Objs.stockHolder.stockInput.val(0 < strTmp ? strTmp : ""),
                        Objs.stockHolder.stockPrice.html(0 < strTmp ? Utils.smallTools.formatDecimal(strTmp * Objs.stockHolder.Variable.stockNum, 4) : "- -"),
                        _alert(languageArr[7][40] + e + languageArr[7][41] + "\n" + languageArr[19][12] + " " + strTmp + languageArr[19][2]),
                        Probe.tmp.stockNoUpdateShow ? Probe.tmp.stockNoUpdateShow = 0 : Objs.stockHolder.stockCoinShow.html(Variable.coin = e)) : "%" == e[1] ? Objs.stockHolder.stockCoinShow.html(Variable.coin = Number(e.substr(2))) : "*" == e[1] ? _alert(languageArr[19][11]) : "#" == e[1] ? (Objs.stockHolder.Variable.stockCoin = 0,
                            Objs.stockHolder.function.stockUpdate([1e3, 1e3, 1]),
                            Utils.sync(0, languageArr[19][13])) : "!" == e[1] ? (strTmp = e.substr(2).split('"'),
                                Objs.bankHolder.bankCoinShow.html(Variable.coin = Number(strTmp[0])),
                                Objs.bankHolder.function.bankUpdate([strTmp[1], strTmp[2]])) : "-" == e[1] ? (strTmp = Number(e.substr(2)),
                                    Objs.bankHolder.Variable.creditNum = 0 < strTmp ? strTmp : 0,
                                    Objs.bankHolder.bankCreditShow.html(0 < (strTmp = Objs.bankHolder.Variable.creditNum - (Objs.bankHolder.Variable.loanNum[0] + Objs.bankHolder.Variable.loanNum[1])) ? Utils.smallTools.formatDecimal(strTmp, 3) : 0)) : "$" == e[1] ? Objs.bankHolder.function.bankUpdate(e.substr(2).split('"')) : "?" == e[1] ? "$" == e[2] || "@" == e[2] ? (strTmp = "$" == e[2],
                                        0 < (e = Number(e.substr(3))) && (strTmp ? Objs.bankHolder.bankInput.val(e) : Objs.bankHolder.function.event(0, e)),
                                        _alert(languageArr[7][40] + e + languageArr[7][41]),
                                        Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : Objs.bankHolder.bankCoinShow.html(Variable.coin = e)) : "!" == e[2] ? (e = e.substr(3).split(" "),
                                            0 < (strTmp = (e[0] = Number(e[0])) + (e[1] = Number(e[1]))) && Objs.bankHolder.bankInput.val(strTmp),
                                            _alert(languageArr[36][15][2][1] + strTmp + languageArr[7][41]),
                                            Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : (Objs.bankHolder.bankDepositShow[0].html(Objs.bankHolder.Variable.depositNum[1] = e[1]),
                                                Objs.bankHolder.bankDepositShow[1].html(Objs.bankHolder.Variable.depositNum[0] = e[0]))) : "*" == e[2] ? (e = e.substr(3).split(" "),
                                                    0 < (strTmp = Utils.smallTools.formatDecimal(e[2] - (Number(e[0]) + Number(e[1])), 3)) && Objs.bankHolder.bankInput.val(strTmp),
                                                    _alert(languageArr[36][15][2][2] + strTmp + languageArr[7][41]),
                                                    Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : (Objs.bankHolder.bankLoanShow[0].html(Objs.bankHolder.Variable.loanNum[1] = e[1]),
                                                        Objs.bankHolder.bankLoanShow[1].html(Objs.bankHolder.Variable.loanNum[0] = e[0]),
                                                        strTmp2 = Number(e[2]),
                                                        Objs.bankHolder.Variable.creditNum = 0 < strTmp2 ? strTmp2 : 0,
                                                        Objs.bankHolder.bankCreditShow.html(0 < strTmp ? strTmp : 0))) : "&" == e[2] ? (e = e.substr(3).split(" "),
                                                            0 < (strTmp = (e[0] = Number(e[0])) + (e[1] = Number(e[1]))) && Objs.bankHolder.bankInput.val(strTmp),
                                                            _alert(languageArr[36][15][2][3] + strTmp + languageArr[7][41]),
                                                            Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : (Objs.bankHolder.bankLoanShow[0].html(Objs.bankHolder.Variable.loanNum[1] = e[1]),
                                                                Objs.bankHolder.bankLoanShow[1].html(Objs.bankHolder.Variable.loanNum[0] = e[0]))) : (strTmp = e[3],
                                                                    e = e.substr(4),
                                                                    0 < (e = Number(e)) && "@" != strTmp && Objs.bankHolder.bankInput.val(e),
                                                                    _alert(languageArr[36][15][2][4].replace(Variable.regexp.char.asterisk, "!" == strTmp ? languageArr[36][15][1][0] : "#" == strTmp ? languageArr[36][15][1][3] : languageArr[36][15][2][5]) + e + languageArr[7][41]),
                                                                    "@" != strTmp && (Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : Objs.bankHolder.function.bankUpdate([String(e)]))) : (a = e.substr(1).split('"'),
                                                                        Objs.stockHolder.Variable.stockCoin = Number(a[5 == a.length ? 3 : 2]),
                                                                        Variable.coin = Number(a[5 == a.length ? 4 : 3]),
                                                                        Objs.stockHolder.function.stockUpdate(a));
                break;
            case "]":
                "!" == e[1] ? (s = e.substr(2)) ? Objs.shopHolder.boxArr[15].attr("host") == s.substr(-13) ? _alert(languageArr[15][3][3][1][0][3][1]) : Objs.shopHolder.function.houseMemberAdd(s + ">") : _alert(languageArr[15][3][3][1][0][3][2]) : "@" == e[1] ? Objs.shopHolder.function.houseMemberAdd(e.substr(2) + ">" + Objs.shopHolder.houseMemberUid + ">" + Objs.shopHolder.houseMemberAdmin) : "#" == e[1] ? Probe.init.shopHolder && Objs.shopHolder.function.roomRebuild(e.substr("!" == e[2] ? 3 : 2), "!" == e[2] ? 1 : 0) : "*" == e[1] && Objs.shopHolder.function.roomIdCorrect(e.substr(2));
                break;
            case "s":
                "," == e[1] ? Init.contacts(e.substr(2)) : "~" == e[1] ? void 0 !== Temporary.emojiList ? (Init.faceHolderBuild("4", e.substr(2), Temporary.emojiList),
                    delete Temporary.emojiList) : Temporary.emojiServer = e.substr(2) : (strTmp = e.substr(2).split(">"),
                        Cookie("rolePlayName", Variable.rolePlay.rolePlayNameV = unhtmlspecialchars(Variable.rolePlay.rolePlayNameV2 = strTmp[2])),
                        Cookie("rolePlayImg", Variable.rolePlay.rolePlayImgV = unhtmlspecialchars(Variable.rolePlay.rolePlayImgV2 = strTmp[1])),
                        Cookie("rolePlaySex", Variable.rolePlay.rolePlaySexV = unhtmlspecialchars(strTmp[0])));
                break;
            case ")":
                "!" == e[1] ? (e[2],
                    Objs.shopHolder.function.game(null, e.substr(2))) : "*" == e[1] && gameControler(4, 0, myself2, e.substr(2));
                break;
            case "t":
                var p;
                "0" == e[1] ? _alert(0 == (p = e[2]) ? languageArr[7][0] : 1 == p ? languageArr[9][3][2] : "") : "1" == e[1] ? (-1 < (s = e.substr(3)).indexOf("*Subsection*") && (s = s.replace("*Subsection*", languageArr[9][2][21])),
                    demandSend(1, Number(e[2]), s)) : Utils.service.bilibiliDemand(e.substr(2));
                break;
            case "w":
                Main.parseVideo(e);
                break;
            case "u":
                "2" == e[1] ? Objs.mapHolder.function.freshRoom(e.substr(2), 1) : Objs.mapHolder.function.freshUserGet(e.substr(1));
                break;
            case "m":
                if ("m" == e)
                    2 == Probe.changeRoomReady ? (Temporary.moveRoomGo(),
                        location._reload()) : Probe.changeRoomReady = 1;
                else if ("!" == e[1])
                {
                    switch (Utils.service.cursorSH(1, 1),
                    Objs.repertory.roomListDarker.stop().fadeOut(speed50),
                    delete Probe.changeRoomReady,
                    delete Temporary.moveRoomGo,
                    Objs.mapHolder.Assets.roomChangerProbe = 0,
                    "5" == e[2] ? (Objs.mapHolder.function.roompsdFunc(Temporary.moveRoomN, 0, 1),
                        Objs.mapHolder.function.lib(7, Temporary.moveRoomN),
                        Objs.mapHolder.function.roomchanger(Temporary.moveRoomN)) : delete Temporary.moveRoomN,
                    e[2])
                    {
                        case "b":
                        case "d":
                            s = e[2];
                            var m = (e = e.substr(3)).indexOf("#")
                                , u = e.substr(m + 1);
                            s = languageArr[35][3]["b" == s ? 1 : 6] + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(e.substr(0, m)) + Mod.text(0, u, 1);
                            break;
                        case "m":
                            s = languageArr[35][3][8].replace("*", e.substr(3));
                            break;
                        case "t":
                            s = languageArr[35][3][9].replace("*", e.substr(3));
                            break;
                        case "g":
                            s = languageArr[35][3][11];
                            break;
                        case "5":
                            s = languageArr[7][137];
                    }
                    _alert(s),
                        Temporary.guideNewComerCallback && Temporary.guideNewComerCallback();
                }
                break;
            case "h":
                "1" == e[1] ? Objs.mapHolder.function.manageRoom(1, e.substr(2)) : "2" == e[1] ? Objs.mapHolder.function.manageRoom(2, e.substr(2)) : "3" == e[1] ? Objs.mapHolder.function.manageRoom(3, e.substr(2)) : "4" == e[1] ? Objs.mapHolder.function.manageRoom(4, e.substr(2)) : "x" == e[1] && ((e = e.substr(2).split("<"))[0] && Objs.mediaManager.bgimg && (Objs.mediaManager.bgimg.function.parse("*" == e[0] ? "" : e[0]),
                    _alert(languageArr[7][138][1])),
                    e[1]) && Objs.mediaManager.media && (Objs.mediaManager.media.function.parse("*" == e[1] ? "" : e[1]),
                        _alert(languageArr[7][138][2]));
                break;
            case "z":
                e.substr(1).split('"').forEach(function (e)
                {
                    socket._onmessage(unhtmlspecialchars(e));
                });
                break;
            case "c":
                Utils.getScript("lib/js/app/momentum/momentum.js"),
                    patchedSetInterval(function ()
                    {
                        socket.send("c");
                    }, 2e3);
                break;
            case "v":
                "0" == e[1] ? Utils.service.revokeMsg("#" == e[2] ? 1 : 0, e.substr(3)) : "2" == e[1] ? (s = e.substr(2),
                    Objs.helpHolder.Variable["htmlAdminData" + s[0]] = s,
                    Objs.helpHolder.function.fetch(0, s)) : "3" == e[1] ? Probe.telRequired = "*" == e[2] : "p" == e[1] && ("$" == e[2] ? Objs.makeMoneyHolder.function.goPay(e.substr(3)) : "!" == e[2] && _alert("充电接口繁忙 , 请稍候再试"));
                break;
            case "p":
                Utils.service.offlinePmBuild(e.substr(1));
                break;
            case "a":
                Objs.shellHolder.function.get(e.substr(1));
                break;
            case "q":
                switch ("B" != (s = e[1]) && "D" != s && (e = e.substr(2),
                    "$" != s) && "W" != s && "T" != s && (e = e.split(">")),
                "b" != s && (m = Mod.Text.admin(s, e)),
                s)
                {
                    case "3":
                        Utils.sync(0, m),
                            e[2] == roomn && Utils.service.admin.set(0, e[3], e[0], e[1]);
                        break;
                    case "4":
                    case "w":
                        if (roomn == e[2])
                        {
                            if ("4" == s)
                                return Utils.service.databaseNotifyManage("roomblock", 1, e[0] + ">" + e[1] + ">" + e[2]),
                                    void socket._onmessage("-k");
                            Utils.service.admin.setWhiteList(1);
                        }
                        Utils.sync(0, m);
                        break;
                    case "b":
                        Objs.mapHolder.function.lib(6, e),
                            Utils.service.disconnect();
                        break;
                    case "t":
                        Utils.sync(0, m),
                            Utils.service.admin.set(1, e[2], e[0], e[1]);
                        break;
                    case "d":
                        "5b7ab80a2017d" != roomn ? (Utils.service.databaseNotifyManage("darkroom", 1, e[0] + ">" + e[1]),
                            Objs.mapHolder.function.roomchanger("5b7ab80a2017d")) : Utils.sync(0, m);
                        break;
                    case "#":
                        Utils.sync(0, m),
                            e[0] == roomn && Utils.service.admin.set(0, "0");
                        break;
                    case "$":
                    case "W":
                        Utils.sync(0, m),
                            "W" == s && e == roomn && Utils.service.admin.setWhiteList(0);
                        break;
                    case "B":
                        Utils.sync(0, m);
                        break;
                    case "T":
                        Utils.sync(0, m),
                            Utils.service.admin.set(1, "0");
                        break;
                    case "D":
                        Utils.sync(0, m);
                }
                break;
            case "i":
                switch (e[1])
                {
                    case "!":
                        Variable.currentRoomInfoObj.roomTag.subscribe.html(e = e.substr(2)),
                            2 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][2] = e);
                        break;
                    case "@":
                        Variable.currentRoomInfoObj.function.fetchSubscriber(e = e.substr(2)),
                            2 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][3] = e);
                        break;
                    case "#":
                        Init.roomSubscribe(e.substr(2));
                        break;
                    case "$":
                        Objs.mapHolder.function.controlSubscribe && Objs.mapHolder.function.controlSubscribe("+" == e[2] ? 0 : 1, e.substr(3));
                        break;
                    case "^":
                        i = (e = e.substr(2)).indexOf(" ");
                        Objs.noticeHolder.function.fetch(e.substr(0, i), e.substr(i + 1));
                }
                break;
            case "g":
                switch (e[1])
                {
                    case "-":
                        Objs.mallHolder.function.initData(0, e.substr(2));
                        break;
                    case "+":
                        Objs.mallHolder.function.initData(1, e.substr(2));
                        break;
                    case "^":
                        Objs.mallHolder.function.initData(2, e.substr(2));
                        break;
                    case "~":
                        Objs.mallHolder.function.initData(3, e.substr(2));
                        break;
                    case "%":
                        Objs.mallHolder.function.initData(4, e.substr(2));
                        break;
                    case "!":
                        Objs.mallHolder.function.initData(5, e.substr(2));
                        break;
                    case "&":
                        Objs.mallHolder.function.initData(6, e.substr(2));
                        break;
                    case "@":
                        Objs.mallHolder.function.initData(7, e.substr(2));
                        break;
                    case "|":
                        Objs.mallHolder.function.initData(8, e.substr(2));
                        break;
                    case ";":
                        Objs.mallHolder.function.initData(9, e.substr(2));
                        break;
                    case "_":
                        Objs.mallHolder.function.initData(10, e.substr(2));
                        break;
                    case "u":
                        Objs.mallHolder.function.initData(12, e.substr(2));
                        break;
                    case "o":
                        Objs.mallHolder.function.initData(13, e.substr(2));
                        break;
                    case "#":
                        Objs.mallHolder.function.action(0, e.substr(2));
                        break;
                    case "*":
                        Objs.mallHolder.function.action(1, e.substr(2));
                        break;
                    case "?":
                        Objs.mallHolder.function.action(2, e.substr(2));
                        break;
                    case "$":
                        Objs.mallHolder.function.action(3, e.substr(2));
                        break;
                    case "f":
                        Objs.mallHolder.function.action(4, e.substr(2));
                        break;
                    case "m":
                        Objs.mallHolder.function.action(5, e.substr(2));
                        break;
                    case "p":
                        Objs.mallHolder.function.action(7, e.substr(2));
                        break;
                    case "d":
                        Objs.mallHolder.function.action(8, e.substr(2));
                        break;
                    case "k":
                        Objs.mallHolder.function.action(9, e.substr(2));
                        break;
                    case "w":
                        Objs.mallHolder.function.action(10, e.substr(2));
                        break;
                    case "r":
                        Objs.mallHolder.function.action(11, e.substr(2));
                        break;
                    case "x":
                        Objs.mallHolder.function.action(12, e.substr(2));
                        break;
                    case "q":
                        Objs.mallHolder.function.action(13, e.substr(2));
                        break;
                    case "n":
                        Objs.mallHolder.function.action(14, e.substr(2));
                        break;
                    case "e":
                        Objs.mallHolder.function.action(15, e.substr(2));
                        break;
                    case "l":
                        Objs.mallHolder.function.action(16, e.substr(2));
                        break;
                    case "a":
                        Objs.mallHolder.function.orderUpdate(e[2], e.substr(3));
                }
                break;
            case "o":
                if ("p" === e[1])
                {
                    i = (e = e.substr(2)).indexOf(":");
                    switch (strTmp = e.substr(i + 1),
                    e.substr(0, i))
                    {
                        case "sumall":
                            Utils.service.postForm("https://shop.imoe.xyz/api/v1/callback/login", {
                                uid: uid,
                                key: strTmp
                            });
                            break;
                        case "sumallPay":
                            strTmp = strTmp.split("_"),
                                Utils.service.postForm("https://shop.imoe.xyz/api/v1/callback/pay", {
                                    uid: uid,
                                    key: strTmp[0],
                                    token: strTmp[1]
                                });
                    }
                }
                break;
            case "r":
                if ("+" == e[1])
                    switch (strTmp3 = e.substr(3),
                    e[2])
                    {
                        case "0":
                            Probe.init.mediaChat || Init.mediaChat(),
                                strTmp3 == uid ? Objs.mediaChat.function.join(1) : Objs.mediaChat.function.add(strTmp3, reduceDataUsage6 ? avatarconv(Objs.mapHolder.function.findUserByUid(strTmp3)[0]) : "", 1);
                            break;
                        case "1":
                            Objs.mediaChat.function.exit(strTmp3, 1);
                            break;
                        case "2":
                            strTmp3 == uid ? Objs.mediaChat.function.join(1) : Objs.mediaChat.function.mute(strTmp3, 1);
                            break;
                        case "3":
                            strTmp3 == uid ? Objs.mediaChat.function.join(1) : Objs.mediaChat.function.mute(strTmp3);
                    }
                else if (strTmp3 = e.substr(4),
                    "*" == e[2])
                    switch (e[3])
                    {
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                            Objs.phoneHolder[strTmp3.substr(0, 13)].function.onMsg(0, e[3], strTmp3.substr(13));
                    }
                else
                    switch (e[3])
                    {
                        case "0":
                            strTmp2 = strTmp3.substr(13).split('"'),
                                Utils.phone(strTmp4 = strTmp3.substr(0, 13), strTmp2[0], strTmp2[1], strTmp2[2], strTmp2[3]),
                                Objs.phoneHolder[strTmp4].function.onMsg(1, e[3], strTmp2[4]);
                            break;
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                            Objs.phoneHolder[strTmp3.substr(0, 13)].function.onMsg(1, e[3], strTmp3.substr(13));
                    }
                break;
            case "D":
                danmakuHolder.function.action(e.substr(1));
            */
        }


    };
}