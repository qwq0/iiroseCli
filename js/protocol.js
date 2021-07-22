function protocol(sendMsg, pageEle)
{
    return function (data)
    {
        if (window.debugMode)
            console.log("get", data);
        if (data.slice(0, 3) == '%*"')
        {
            sendMsg("");
            if (data[3] == '*')
            {
                var obj = cutString(data.slice(4), "'");
            }
            if (data[3] == 's')
            {
                var a = data.slice(4).split('>');
                pageEle.appendChild(document.createTextNode("房间错误 此账号在房间: " + a[1] +" 请修改为: " + a[0]));
            }
            if (data[3] == '1' || data[3] == '2')
            {
                pageEle.appendChild(document.createTextNode("登录失败 请检查账号密码"));
            }
            return;
        }
        // 以下协议列表参考蔷薇官方代码
        // 因为逆向需要耗费大量世界所以并没有实现所有协议内容
        // 注释的内容为官方实现
        switch (data[0])
        {
            case "%":
                /*
                var t, o, a, i = e.indexOf('"');
                "*" == e[1] ? password ? '"' == e[3] ? (s = e.substr(4).indexOf('"'),
                t = e.substr(4, s).split("#"),
                Probe.init.bankHolder && "" !== t[0] && Objs.bankHolder.function.bankUpdate(t[0].split(" ")),
                Probe.init.stockHolder && (t[1] = t[1].split("$"),
                r = t[1][1],
                t[1].push(Number((r / t[1][0]).toFixed(4))),
                Objs.stockHolder.function.stockUpdate(t[1])),
                Objs.mapHolder.function.freshRoom(e.substr(s + 5))) : (o = e.substr(2, i - 2),
                Probe.roomLoaded || (Temporary.initPm = function() {
                    (o = o && Init.service.pmOfflineMsg(o)) && (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                    Objs.leaveMsgHolder.function.get(o))
                }
                ),
                Objs.mapHolder.function.freshRoom(e.substr(i + 1))) : Objs.mapHolder.function.freshRoom(e.substr(i + 1)) : (r = e.substr(2, i - 2),
                a = e.substr(i + 1),
                i = a.indexOf('"'),
                password && (Temporary.initPm = function() {
                    var e = a.substr(0, i);
                    (e = e && Init.service.pmOfflineMsg(e)) && (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                    Objs.leaveMsgHolder.function.get(e))
                }
                ),
                Objs.mapHolder.function.freshRoom(a.substr(i + 1)),
                shareMedia(r));
                */
                break;
            case "+":
                /*
                Utils.View.addToStack([1, [e = e.substr(1), 0], $.extend(!0, [], Variable.whoisArr)]),
                whois(e, Variable.whoisArr);
                */
                break;
            case "-":
                /*
                var s = e.substr(1);
                if ("*" == s[0])
                    2 == (s = s.substr(1).split(">")).length && (s[1] = unhtmlspecialchars(s[1]),
                    Objs.mapHolder.function.roompsdFunc(s[0]) != s[1] && Objs.mapHolder.function.roompsdFunc(s[0], s[1])),
                    s[0] == roomn ? location._reload() : Objs.mapHolder.function.roomchanger(s[0], 1);
                else if ("#" == s[0])
                    (s = s.substr(1).split('"'))[0] && Cookie("roomattr", s[0]),
                    s[1] && Cookie("roomcolor", s[1]),
                    s[2] && (i = roomnFull.lastIndexOf("_"),
                    Cookie("roomname", -1 == i ? s[2] : Objs.mapHolder.Assets.roomNameJson[roomnFull.substr(0, i).split("_").pop()] + "_" + s[2])),
                    s[3] && Cookie("roominfo", s[3]),
                    location._reload();
                else if ("-" == e || s == roomn)
                    location._reload();
                else if ("k" == s)
                    Objs.mapHolder.function.roomchanger(Constant.rid.communication);
                else if ("--" == e)
                    parent.location._reload();
                else if ("---" == e)
                    try {
                        Utils.service.clearCache(1)
                    } catch (e) {
                        parent.location._reload()
                    }
                else
                    Objs.mapHolder.function.roomchanger(s);
                    */
                break;
            case "=":
                /*
                danmakuMsg(e.substr(1));
                */
                break;
            case "$":
                /*
                "?" == e[1] ? Objs.userREHolder.function.server(2, e.substr(2)) : "#" == e[1] ? Objs.userREHolder.function.server(3, e.substr(2)) : "^" == e[1] ? Objs.userREHolder.function.server(0, e.substr(2)) : "*" == e[1] ? Objs.userREHolder.function.lib(9, e.substr(2)) : "!" == e[1] ? Info.me.verified = 2 == e.length : Objs.userREHolder.function.server(1, e.substr(1));
                */
                break;
            case "&":
                /*
                shareMedia(e.substr(2));
                */
                break;
            case "?":
                /*
                peerIdArr = e.substr(1).split(">"),
                callPeerProbe = -1,
                peerIdArrLenth = peerIdArr.length - 1,
                callPeerAll();
                */
                break;
            case "~":
                /*
                Objs.mediaListHolder.function.get(e.substr(1));
                */
                break;
            case "^":
                /*
                Objs.userSearchHolder.function.get(e.substr(1));
                */
                break;
            case ":":
                /*
                "*" == e[1] ? (Objs.timelineHolder.function.get(e = e.substr(2), 0, 0, "2"),
                1 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][4] = e)) : "+" == e[1] ? (Objs.taskHolder.function.get(e.substr(2), Probe.leaveMsgHolder.taskP),
                Probe.leaveMsgHolder.taskP && (Probe.leaveMsgHolder.taskP = "")) : "-" == e[1] ? (Objs.forumHolder.function.get(e.substr(2), Probe.leaveMsgHolder.postP),
                Probe.leaveMsgHolder.postP && (Probe.leaveMsgHolder.postP = "")) : "=" == e[1] ? (Objs.timelineHolder.function.get(e.substr(2), Probe.leaveMsgHolder.timelineP, 0, ""),
                Probe.leaveMsgHolder.timelineP && (Probe.leaveMsgHolder.timelineP = "")) : "%" == e[1] ? Objs.timelineHolder.function.edit(1, e.substr(2)) : "^" == e[1] ? Objs.timelineHolder.function.edit(3, e.substr(2)) : Objs.timelineHolder.function.edit(2, e.substr(2));
                */
                break;
            case ".":
                /*
                var r = e.substr(2);
                switch (e[1]) {
                case "!":
                    r = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][r]);
                    break;
                case "@":
                    r = "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][r]);
                    break;
                case "#":
                    r = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][r[0]]) + "\n" + "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][r[1]])
                }
                Utils.sync(0, r);
                */
                break;
            case ",":
                /*
                mediaShareRoom && (1 == e.length ? Utils.service.isShareMediaPlaying() && (shareMediaCurrentTime = -1,
                Probe.emptyMediaPlayer && pageBlur || _alert(languageArr[9][3][9])) : Utils.service.seekDemandMedia(Number(e.substr(1))));
                */
                break;
            case ";":
                /*
                focusI(inputholdermain.val(e.substr(1)));
                */
                break;
            case "_":
                /*
                if ("_" == e[1])
                    console.log(e.substr(2));
                else {
                    switch (e[2]) {
                    case "0":
                        r = languageArr[15][3][3][1][2][3][1];
                        break;
                    case "1":
                        r = languageArr[15][3][3][1][2][3][2];
                        break;
                    case "2":
                        r = languageArr[15][3][3][1][2][3][3];
                        break;
                    case "3":
                        r = languageArr[15][3][3][1][2][3][4],
                        Objs.shopHolder.coinHolder.html(Variable.coin += 1e4);
                        break;
                    case "p":
                        r = "[ " + Utils.service.pmMsg2Show(unhtmlspecialchars(e.substr(3))) + " ]\n" + languageArr[7][135];
                        break;
                    case "q":
                        r = "[ " + Utils.service.pmMsg2Show(unhtmlspecialchars(e.substr(3))) + " ]\n" + languageArr[7][136];
                        break;
                    case "r":
                        r = languageArr[36][6][2][2];
                        break;
                    case "x":
                        r = languageArr[36][6][2][7];
                        break;
                    case "!":
                        r = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]),
                        Utils.service.admin.roomLimit(0, e[3]);
                        break;
                    case "@":
                        r = "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]),
                        Utils.service.admin.roomLimit(1, e[3]);
                        break;
                    case "#":
                        r = "此房 发言 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[3]]) + "\n" + "此房 点播 限制为 [ * ]".replace("*", ["所有人", "普通成员以上级别", "带星成员以上级别", "仅房主", "白名单以上级别", "仅白名单"][e[4]]),
                        Utils.service.admin.roomLimit(2, e[3] + e[4]);
                        break;
                    case "=":
                        r = "当前已经是所选的状态了";
                        break;
                    case "$":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   被此房 #".replace("#", "1" == r[3] ? "禁止发言" : "2" == r[3] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(r[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(r[1]) + Mod.text(0, r[2], 1);
                        break;
                    case "%":
                    case "w":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   被此房 #".replace("#", "%" == e[2] ? "黑名单" : "白名单").replace("*", unhtmlspecialchars(r[0])) + ("%" == e[2] ? Variable.Text.alarm : Variable.Text.alarmGood) + Utils.smallTools.getTimeDurationStr(r[1]) + Mod.text(0, r[2], 1);
                        break;
                    case "^":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   的此房 # 被解除".replace("#", "1" == r[1] ? "禁止发言" : "2" == r[1] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(r[0]));
                        break;
                    case "&":
                    case "W":
                        r = "[   *   ]   的此房 # 被解除".replace("#", "&" == e[2] ? "黑名单" : "白名单").replace("*", unhtmlspecialchars(e.substr(3)));
                        break;
                    case "*":
                        r = "此房 # 被清空".replace("#", "禁言");
                        break;
                    case "(":
                    case "X":
                        r = "此房 # 被清空".replace("#", "(" == e[2] ? "黑名单" : "白名单");
                        break;
                    case ")":
                        r = e.substr(3),
                        r = "此房 最大人数 被设为 * 人".replace("*", "" === r ? "&" : r);
                        break;
                    case "b":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   被 #".replace("#", "禁封").replace("*", unhtmlspecialchars(r[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(r[1]) + Mod.text(0, r[2], 1);
                        break;
                    case "t":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   被 #".replace("#", "全局 #").replace("#", "1" == r[3] ? "禁止发言" : "2" == r[3] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(r[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(r[1]) + Mod.text(0, r[2], 1);
                        break;
                    case "d":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   被 #".replace("#", "小黑屋").replace("*", unhtmlspecialchars(r[0])) + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(r[1]) + Mod.text(0, r[2], 1);
                        break;
                    case "B":
                        r = "[   *   ]   # 被解除".replace("#", "禁封").replace("*", unhtmlspecialchars(e.substr(3)));
                        break;
                    case "T":
                        r = e.substr(3).split(">"),
                        r = "[   *   ]   # 被解除".replace("#", "全局 #").replace("#", "1" == r[1] ? "禁止发言" : "2" == r[1] ? "禁止点播" : "禁止发言 & 禁止点播").replace("*", unhtmlspecialchars(r[0]));
                        break;
                    case "D":
                        r = "[   *   ]   # 被解除".replace("#", "小黑屋").replace("*", unhtmlspecialchars(e.substr(3)));
                        break;
                    case "_":
                        r = ("*" == (r = e.substr(3))[0] ? "" : ("@" == r[0] ? "充值成功" : "#" == r[0] ? "提现成功" : "提现失败") + " , ") + "您的当前房间余额为 : " + r.substr(1) + languageArr[7][41];
                        break;
                    case "-":
                        r = "!" == (r = e.substr(3))[0] ? "此房 挂机奖励被设为每小时追加 : " + r.substr(1) + languageArr[7][41] : "此房 发言奖励倍率被设为 : " + r.substr(1) + " 倍";
                        break;
                    case "+":
                        switch ((r = e.substr(3))[0]) {
                        case "0":
                            r = "此房 盈利金额加到 [ * ] 中".replace("*", "0" == r.substr(1) ? "账户余额" : "房间余额");
                            break;
                        case "1":
                            r = "此房 扣费金额优先从 [ * ] 中扣除".replace("*", "0" == r.substr(1) ? "账户余额" : "房间余额");
                            break;
                        case "2":
                            r = "此房 福利金额优先从 [ * ] 中扣除".replace("*", "0" == r.substr(1) ? "账户余额" : "房间余额");
                            break;
                        case "3":
                            r = "此房 福利要求的 挂机时间 被限制为 : " + r.substr(1) + " 小时";
                            break;
                        case "4":
                            r = "此房 福利要求的 时间段 被限制为 : " + r.substr(1)
                        }
                        break;
                    case "m":
                        r = e[3] ? languageArr[7][147] : languageArr[7][148];
                        break;
                    case "O":
                        r = "房员移动成功";
                        break;
                    case "Q":
                        r = "所选人已移出";
                        break;
                    case "E":
                        r = "列表是空的";
                        break;
                    case "A":
                        r = "列表中已经存在了";
                        break;
                    case "4":
                        r = "管理员以上级别的人 无法被添加到 黑名单";
                        break;
                    case "S":
                        r = "当前已经是所设定的数据了";
                        break;
                    case "P":
                        r = "当前没有正在播放的媒体";
                        break;
                    case "L":
                        r = "命令执行失败 , 请重试";
                        break;
                    case "K":
                        r = "此用户当前不在您操作的房间内";
                        break;
                    case "J":
                        r = "此用户当前所在的房间 , 禁止房员被移动";
                        break;
                    case "M":
                        if (Probe.emptyMediaPlayer && pageBlur)
                            return;
                        r = e.substr(4) || "3",
                        r = "# 投票已发起 , 当前 * / 3 票".replace("#", "0" == e[3] ? "当前媒体切除" : "当前媒体点播者全部媒体切除").replace("*", r) + ("3" == r ? " , 投票成功 !" : "");
                        break;
                    case "G":
                        if (Probe.emptyMediaPlayer && pageBlur)
                            return;
                        r = "您已经发起过投票了 , 当前 * / 3 票".replace("*", e.substr(3));
                        break;
                    case "V":
                        r = "只能操作自己点播的媒体";
                        break;
                    case "F":
                        r = languageArr[7][146]
                    }
                    _alert(r)
                }
                */
                break;
            case "|":
                /*
                "$" == e[1] ? "#" == e[2] ? "@" == e[3] ? ((r = Objs.shopHolder.Assets.selectJSON[Objs.shopHolder.housePageType + 7 + "_0"]).pop(),
                Utils.setSelectVal(Objs.shopHolder["houseSelectObj" + (1 == Objs.shopHolder.housePageType ? "" : Objs.shopHolder.housePageType)], Objs.shopHolder.Assets.selectJSON, r.length ? r[0][0] : ""),
                r.length || Objs.shopHolder["houseSelectObj" + (1 == Objs.shopHolder.housePageType ? "" : Objs.shopHolder.housePageType)].html("您尚无房间"),
                Objs.shopHolder.coinHolder.html(Variable.coin = Number(e.substr(4))),
                _alert(languageArr[7][40] + Variable.coin + languageArr[7][41])) : (_alert(languageArr[7][40] + (Variable.coin = Number(e.substr(3))) + languageArr[7][41]),
                Probe.init.shopHolder && Objs.shopHolder.function.updateCoin(1)) : (n = Variable.currentUserInfoObj) && ((d = (uInfoMode ? n.userTag.coin : n).find("span[coin]")).html(strTmp = Utils.smallTools.formatDecimal(Number(d.html()) + Number(e.substr(2)), 3)),
                Utils.View.lib(2, [17, strTmp]),
                (r = Utils.View.lib(5)) && (strTmp = Utils.View.lib(2, 17, r) - e.substr(2),
                Utils.View.lib(2, [17, 0 < strTmp ? Utils.smallTools.formatDecimal(strTmp, 3) : 0], r)),
                _alert(languageArr[7][143])) : "v" == e[1] ? "+" == e[2] ? Objs.mapHolder.function.controlContacts && Objs.mapHolder.function.controlContacts(4, e.substr(3).split(">")) : (Objs.mapHolder.function.controlContacts && Objs.mapHolder.function.controlContacts(5, e.substr(3)),
                Probe.init.timelineHolder && socket._onmessage(":!" + e.substr(3))) : (Objs.whoisConnectionHolder.function.fetchConnection(e = e.substr(2)),
                1 == Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][0] && (Variable.Stack.URInfo[Variable.Stack.URInfo.length - 1][3] = e));
                */
                break;
            case "`":
                /*
                if ("%" == e[1])
                    Objs.shopHolder.function.getLuck(e.substr(2));
                else if ("$" == e[1])
                    Objs.shopHolder.coinHolder.html(Variable.coin = Number(e.substr(2)));
                else if ("?" == e[1])
                    if ("-" == e[2])
                        Objs.shopHolder.lotteryResult.html("☹").css("transform", "scale(1.2)"),
                        setTimeout(function() {
                            Objs.shopHolder.lotteryResult.css("transform", "")
                        }, speed250),
                        Objs.shopHolder.function.getLottery(100);
                    else if ("$" == e[2]) {
                        r = e.substr(3);
                        Objs.shopHolder.lotteryResult.html("$" + r).css("transform", "scale(1.2)"),
                        setTimeout(function() {
                            Objs.shopHolder.lotteryResult.css("transform", "")
                        }, speed250),
                        (r -= 100) && Objs.shopHolder.function.getLottery(0 < r ? "$" + r : -1 * r)
                    } else {
                        var n, l, r = e.substr(4);
                        switch (g = e[3]) {
                        case "0":
                            b = 0,
                            l = "accessory";
                            break;
                        case "1":
                            b = 6,
                            l = "role";
                            break;
                        case "2":
                            b = 7,
                            l = "emoji"
                        }
                        Objs.shopHolder.lotteryTry.attr("disabled", "disabled"),
                        Objs.shopHolder.lotteryResult.html("🎁").css("transform", "scale(1.2)"),
                        setTimeout(function() {
                            Objs.shopHolder.lotteryResult.css("transform", "")
                        }, speed250),
                        Objs.shopHolder.function.getLottery(100),
                        Objs.shopHolder.lotteryBack.click(),
                        n = Objs.shopHolder.Variable.initProbeArr2[b],
                        Objs.shopHolder.mainContent.children("div:eq(" + (b + 1) + ")")[0].lastChild.firstChild.click();
                        var d = function() {
                            Utils.sync(0, languageArr[15][5][3][0] + "  [  " + languageArr[15][b + 1][0] + "  :  " + Objs.shopHolder[l + "PriceArr"][r] + languageArr[7][41] + "  ]  ✨"),
                            socket._onmessage("`@3" + g + r),
                            Objs.shopHolder.lotteryTry.removeAttr("disabled")
                        };
                        n ? d() : Temporary.lotteryCallback = d
                    }
                else {
                    var c, p;
                    "@" == e[1] ? 1 == e[2] ? Objs.shopHolder.function.buildPanel(Number(e[3]), e.substr(4)) : 2 == e[2] ? (p = 0 == e[3] ? (c = "accessory",
                    0) : 1 == e[3] ? (c = "role",
                    6) : (c = "emoji",
                    7),
                    5 != e.length && (0 == p ? (Cookie("cprobe", e.substr(6, 13)),
                    1 == e[5] ? Cookie("accessory", accessory = e.substr(19)) : (accessory = "",
                    removeCookie("accessory"))) : 6 == p || Utils.emojiManager && Utils.emojiManager(e.substr(6), 1 == e[5])),
                    2 == e[4] && Probe.init.shopHolder && Objs.shopHolder.Variable.initProbeArr2[p] && (!(r = Objs.shopHolder[c + "Panel"].attr("s")) || 1 == e[3] && "none" != Objs.shopHolder.roleSystemPanel.css("display") || Objs.shopHolder[c + "ItemArr"][r].click(),
                    "none" != Objs.shopHolder.boxArr[p].css("display") ? socket.send("=~1" + e[3]) : Objs.shopHolder.Variable.initProbeArr2[p] = 0)) : 3 == e[2] && (p = 0 == e[3] ? (c = "accessory",
                    0) : 1 == e[3] ? (c = "role",
                    6) : (c = "emoji",
                    7),
                    Objs.shopHolder.Variable.initProbeArr2[p] && (r = Objs.shopHolder[c + "Panel"].attr("s"),
                    p = 4 == e.length,
                    g = p ? r : e.substr(4),
                    Objs.shopHolder[c + "PagePointerArr"].eq(Math.floor(Objs.shopHolder[c + "ItemPosArr"][g] / 36)).click(),
                    Objs.shopHolder[c + "ItemArr"][g].attr("st", 1).children(".textColor").html(languageArr[15][0][1][0]),
                    p ? (Objs.shopHolder[c + "ItemArr"][r].attr("buy", 1).click().click().removeAttr("buy"),
                    Objs.shopHolder.coinHolder.html(Variable.coin -= Objs.shopHolder[c + "PriceArr"][r])) : (r == g ? Objs.shopHolder[c + "ItemArr"][r].attr("buy", 1).click().click().removeAttr("buy") : Objs.shopHolder[c + "ItemArr"][g].click(),
                    Objs.shopHolder[c + "PageArr"][Objs.shopHolder[c + "PageCurrent"]].scrollTop(Objs.shopHolder[c + "ItemArr"][g][0].offsetTop - ("accessory" == c ? 247 : 232))))) : "^" == e[1] ? Objs.shopHolder.function.houseGet(e.substr(3), e[2]) : "#" == e[1] ? Objs.wealthHolder.function.get(e.substr(2)) : "~" == e[1] ? Objs.mapHolder.function.roomPasswordCheck(e[2]) : "!" == e[1] && Temporary.houseConfirmAfterProtectPassword && ("0" == e[2] ? _alert(languageArr[15][3][3][1][2][3][3]) : Temporary.houseConfirmAfterProtectPassword(),
                    delete Temporary.houseConfirmAfterProtectPassword)
                }
                */
                break;
            case "@":
                /*
                var u;
                "*" == e[1] ? (Probe.init.leaveMsgHolder || Init.fullPanel(9),
                Objs.leaveMsgHolder.function.get(e.substr(2))) : "=" == e[1] ? (u = e.substr(2).split("'"),
                Probe.init.timelineHolder || (Probe.skipInit = 1,
                Init.fullPanel(5)),
                Objs.timelineHolder.function.edit(5, u)) : "#" == e[1] ? (u = e.substr(2).split('"'),
                Probe.init.forumHolder || (Probe.skipInit = 1,
                Init.fullPanel(3)),
                Objs.forumHolder.function.get(u[1], Number(u[0]))) : "$" == e[1] && (u = e.substr(2).split('"'),
                Probe.init.taskHolder || (Probe.skipInit = 1,
                Init.fullPanel(4)),
                Objs.taskHolder.function.get(u[1], Number(u[0])));
                */
                break;
            case "#":
                /*
                "undefined" != typeof gamePanel && gamePanel.getMsg(e.substr(1));
                */
                break;
            case "*":
                /*
                var m;
                "@" == e[1] ? (Objs.pairHolder.function.event.call(Objs.pairHolder.stopBtn, 1),
                _alert(languageArr[17][14])) : "!" == e[1] ? (m = e.substr(2).split('"'),
                Objs.pairHolder.function.event(2, privateMsgFunc(m[0], m[1], m[2], m[3], m[4], m[5], 1))) : (Objs.pairHolder.function.event.call(Objs.pairHolder.stopBtn, 1),
                r = e.substr(1),
                (m = Objs.mapHolder.function.findUserByUid(r)) ? Objs.pairHolder.function.event(2, Utils.buildPm(0, m, 1)) : socket.send("`!" + e.substr(1)));
                */
                break;
            case ">":
                /*
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
                "@" != strTmp && (Probe.tmp.bankNoUpdateShow ? Probe.tmp.bankNoUpdateShow = 0 : Objs.bankHolder.function.bankUpdate([String(e)]))) : (h = e.substr(1).split('"'),
                Objs.stockHolder.Variable.stockCoin = Number(h[5 == h.length ? 3 : 2]),
                Variable.coin = Number(h[5 == h.length ? 4 : 3]),
                Objs.stockHolder.function.stockUpdate(h));
                */
                break;
            case "]":
                /*
                "!" == e[1] ? (r = e.substr(2)) ? Objs.shopHolder.boxArr[15].attr("host") == r.substr(-13) ? _alert(languageArr[15][3][3][1][0][3][1]) : Objs.shopHolder.function.houseMemberAdd(r + ">") : _alert(languageArr[15][3][3][1][0][3][2]) : "@" == e[1] ? Objs.shopHolder.function.houseMemberAdd(e.substr(2) + ">" + Objs.shopHolder.houseMemberUid + ">" + Objs.shopHolder.houseMemberAdmin) : "#" == e[1] ? Probe.init.shopHolder && Objs.shopHolder.function.roomRebuild(e.substr("!" == e[2] ? 3 : 2), "!" == e[2] ? 1 : 0) : "*" == e[1] && Objs.shopHolder.function.roomIdCorrect(e.substr(2));
                */
                break;
            case "s":
                /*
                "," == e[1] ? Init.contacts(e.substr(2)) : "~" == e[1] ? void 0 !== Temporary.emojiList ? (Init.faceHolderBuild("4", e.substr(2), Temporary.emojiList),
                delete Temporary.emojiList) : Temporary.emojiServer = e.substr(2) : (strTmp = e.substr(2).split(">"),
                Cookie("rolePlayName", Variable.rolePlay.rolePlayNameV = unhtmlspecialchars(Variable.rolePlay.rolePlayNameV2 = strTmp[2])),
                Cookie("rolePlayImg", Variable.rolePlay.rolePlayImgV = unhtmlspecialchars(Variable.rolePlay.rolePlayImgV2 = strTmp[1])),
                Cookie("rolePlaySex", Variable.rolePlay.rolePlaySexV = unhtmlspecialchars(strTmp[0])));
                */
                break;
            case ")":
                /*
                "!" == e[1] ? (e[2],
                Objs.shopHolder.function.game(null, e.substr(2))) : "*" == e[1] && gameControler(4, 0, myself2, e.substr(2));
                */
                break;
            case "t":
                /*
                var h;
                "0" == e[1] ? _alert(0 == (h = e[2]) ? languageArr[7][0] : 1 == h ? languageArr[9][3][2] : "") : "1" == e[1] ? (-1 < (r = e.substr(3)).indexOf("*Subsection*") && (r = r.replace("*Subsection*", languageArr[9][2][21])),
                demandSend(1, Number(e[2]), r)) : Utils.service.bilibiliDemand(e.substr(2));
                */
                break;
            case "w":
                /*
                Main.parseVideo(e);
                */
                break;
            case "u":
                /*
                "2" == e[1] ? Objs.mapHolder.function.freshRoom(e.substr(2), 1) : Objs.mapHolder.function.freshUserGet(e.substr(1));
                */
                break;
            case "m":
                /*
                if ("m" == e)
                    2 == Probe.changeRoomReady ? (Temporary.moveRoomGo(),
                    location._reload()) : Probe.changeRoomReady = 1;
                else if ("!" == e[1]) {
                    switch (Utils.service.cursorSH(1, 1),
                    Objs.repertory.roomListDarker.stop().fadeOut(speed50),
                    delete Probe.changeRoomReady,
                    delete Temporary.moveRoomGo,
                    Objs.mapHolder.Assets.roomChangerProbe = 0,
                    "5" == e[2] ? (Objs.mapHolder.function.roompsdFunc(Temporary.moveRoomN, 0, 1),
                    Objs.mapHolder.function.lib(7, Temporary.moveRoomN),
                    Objs.mapHolder.function.roomchanger(Temporary.moveRoomN)) : delete Temporary.moveRoomN,
                    e[2]) {
                    case "b":
                    case "d":
                        r = e[2];
                        var g = (e = e.substr(3)).indexOf("#")
                            , b = e.substr(g + 1);
                        r = languageArr[35][3]["b" == r ? 1 : 6] + Variable.Text.alarm + Utils.smallTools.getTimeDurationStr(e.substr(0, g)) + Mod.text(0, b, 1);
                        break;
                    case "m":
                        r = languageArr[35][3][8].replace("*", e.substr(3));
                        break;
                    case "t":
                        r = languageArr[35][3][9].replace("*", e.substr(3));
                        break;
                    case "g":
                        r = languageArr[35][3][11];
                        break;
                    case "5":
                        r = languageArr[7][137]
                    }
                    _alert(r),
                    Temporary.guideNewComerCallback && Temporary.guideNewComerCallback()
                }
                */
                break;
            case "h":
                /*
                "1" == e[1] ? Objs.mapHolder.function.manageRoom(1, e.substr(2)) : "2" == e[1] ? Objs.mapHolder.function.manageRoom(2, e.substr(2)) : "3" == e[1] ? Objs.mapHolder.function.manageRoom(3, e.substr(2)) : "x" == e[1] && ((e = e.substr(2).split("<"))[0] && Objs.mediaManager.bgimg && (Objs.mediaManager.bgimg.function.parse("*" == e[0] ? "" : e[0]),
                _alert(languageArr[7][138][1])),
                e[1] && Objs.mediaManager.media && (Objs.mediaManager.media.function.parse("*" == e[1] ? "" : e[1]),
                _alert(languageArr[7][138][2])));
                */
                break;
            case "z":
                /*
                e.substr(1).split('"').forEach(function(e) {
                    socket._onmessage(unhtmlspecialchars(e))
                });
                */
                break;
            case "c":
                /*
                */
                break;
            case "v":
                /*
                "0" == e[1] ? Utils.service.revokeMsg("#" == e[2] ? 1 : 0, e.substr(3)) : "2" == e[1] && (r = e.substr(2),
                Objs.helpHolder.Variable["htmlAdminData" + r[0]] = r,
                Objs.helpHolder.function.fetch(0, r));
                */
                break;
            case "p":
                /*
                Utils.service.offlinePmBuild(e.substr(1));
                */
                break;
            case "a":
                /*
                Objs.shellHolder.function.get(e.substr(1));
                */
                break;
            case "q":
                /*
                switch ("B" != (r = e[1]) && "D" != r && (e = e.substr(2),
                "$" != r && "W" != r && "T" != r && (e = e.split(">"))),
                "b" != r && (g = Mod.Text.admin(r, e)),
                r) {
                case "3":
                    Utils.sync(0, g),
                    e[2] == roomn && Utils.service.admin.set(0, e[3], e[0], e[1]);
                    break;
                case "4":
                case "w":
                    if (roomn == e[2]) {
                        if ("4" == r)
                            return Utils.service.databaseNotifyManage("roomblock", 1, e[0] + ">" + e[1] + ">" + e[2]),
                            void socket._onmessage("-k");
                        Utils.service.admin.setWhiteList(1)
                    }
                    Utils.sync(0, g);
                    break;
                case "b":
                    Objs.mapHolder.function.lib(6, e),
                    Utils.service.disconnect();
                    break;
                case "t":
                    Utils.sync(0, g),
                    Utils.service.admin.set(1, e[2], e[0], e[1]);
                    break;
                case "d":
                    "5b7ab80a2017d" != roomn ? (Utils.service.databaseNotifyManage("darkroom", 1, e[0] + ">" + e[1]),
                    Objs.mapHolder.function.roomchanger("5b7ab80a2017d")) : Utils.sync(0, g);
                    break;
                case "#":
                    Utils.sync(0, g),
                    e[0] == roomn && Utils.service.admin.set(0, "0");
                    break;
                case "$":
                case "W":
                    Utils.sync(0, g),
                    "W" == r && e == roomn && Utils.service.admin.setWhiteList(0);
                    break;
                case "B":
                    Utils.sync(0, g);
                    break;
                case "T":
                    Utils.sync(0, g),
                    Utils.service.admin.set(1, "0");
                    break;
                case "D":
                    Utils.sync(0, g)
                }
                */
                break;
            case "i":
                /*
                switch (e[1]) {
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
                    Objs.noticeHolder.function.fetch(e.substr(0, i), e.substr(i + 1))
                }
                */
                break;
            case "g":
                /*
                switch (e[1]) {
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
                case "w":
                    Objs.mallHolder.function.action(6, e.substr(2));
                    break;
                case "p":
                    Objs.mallHolder.function.action(7, e.substr(2))
                }
                */
                break;
            case "o":
                /*
                if ("p" === e[1]) {
                    i = (e = e.substr(2)).indexOf(":");
                    switch (strTmp = e.substr(i + 1),
                    e.substr(0, i)) {
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
                        })
                    }
                }
                */
                break;
            case "r":
                /*
                switch (strTmp3 = e.substr(2),
                e[1]) {
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
                    strTmp3 == uid ? Objs.mediaChat.function.join(1) : Objs.mediaChat.function.mute(strTmp3)
                }
                */
                break;
            default:
                if (data[0] >= '0' && data[0] <= '9')
                {
                    if (window.debugMode)
                        console.log("rMsg", data.split(">"));
                    var a = data.split(">");
                    var e = document.createElement("div");
                    e.style.left = "0";
                    e.style.right = "0";
                    e.style.padding = "5px";
                    e.style.marginTop = "5px";
                    e.style.border = "2px solid";
                    e.style.borderColor = "#" + a[5];
                    e.innerText = a[2] + " : " + a[3];
                    pageEle.appendChild(e);
                }
        }
    }
}