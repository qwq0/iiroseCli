(function () {
    'use strict';

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
    }
    function forEachRev(o, callback)
    {
        if (!o)
            return false;
        for (var i = o.length - 1; i >= 0; i--)
            if (o[i] != undefined && callback(i, o[i]))
                return true;
        return false;
    }
    function prompt_d(t, o)
    {
        var i = prompt(t, o);
        return (i != null ? i : o)
    }

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
    function save_account()
    {
        window.localStorage.setItem("account", JSON.stringify(accObj.filter(function (o)
        {
            return o != null;
        })));
    }
    var account = accObj;

    function addButtonDiv(text, callback, style)
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
    document.getElementById("lm_box"); // 左菜单
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
    function addPage(title, pageEle)
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
    function account_pageEle_add_acc(i, o)
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

    function setUserPage(pageEle, msg_box, sendMsg)
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

    var bit_rol = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));
    var md5_cmn = (q, a, b, x, s, t) => safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    var md5_ff = (a, b, c, d, x, s, t) => md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    var md5_gg = (a, b, c, d, x, s, t) => md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    var md5_hh = (a, b, c, d, x, s, t) => md5_cmn(b ^ c ^ d, a, b, x, s, t);
    var md5_ii = (a, b, c, d, x, s, t) => md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    function safe_add(x, y)
    {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xFFFF);
    }
    function md5_ct(x, len)
    {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }

    function MD5_32Char_lowerCase(s)
    {
        var bin_s = Array();
        var mask = (1 << 8) - 1;
        for (var i = 0; i < s.length * 8; i += 8)
            bin_s[i >> 5] |= (s.charCodeAt(i / 8) & mask) << (i % 32);

        var bin = md5_ct(bin_s, s.length * 8);
        var hex_tab = "0123456789abcdef";
        var ret = "";
        for (var i = 0; i < bin.length * 4; i++)
            ret += hex_tab[(bin[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF] + hex_tab[(bin[i >> 2] >> ((i % 4) * 8)) & 0xF];
        return ret;
    }

    /*! pako 2.0.3 https://github.com/nodeca/pako @license (MIT AND Zlib) */
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={});}(undefined,(function(t){function e(t){let e=t.length;for(;--e>=0;)t[e]=0;}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),l=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),o=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function b(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length;}let g,p,m;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e;}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255;},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a);},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1]);},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1;}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,l=0;for(n=1;n<=s;n++)i[n]=l=l+a[n-1]<<1;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e));}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0;},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0;},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i;},D=(t,e,i)=>{let n,s,o,h,d=0;if(0!==t.last_lit)do{n=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],s=t.pending_buf[t.l_buf+d],d++,0===n?z(t,s,e):(o=c[s],z(t,o+a+1,e),h=r[o],0!==h&&(s-=u[o],x(t,s,h)),n--,o=v(n),z(t,o,i),h=l[o],0!==h&&(n-=w[o],x(t,n,h)));}while(d<t.last_lit);z(t,256,e);},O=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let l,o,h,d=-1;for(t.heap_len=0,t.heap_max=573,l=0;l<r;l++)0!==a[2*l]?(t.heap[++t.heap_len]=d=l,t.depth[l]=0):a[2*l+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,l=t.heap_len>>1;l>=1;l--)S(t,a,l);h=r;do{l=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),o=t.heap[1],t.heap[--t.heap_max]=l,t.heap[--t.heap_max]=o,a[2*h]=a[2*l]+a[2*o],t.depth[h]=(t.depth[l]>=t.depth[o]?t.depth[l]:t.depth[o])+1,a[2*l+1]=a[2*o+1]=h,t.heap[1]=h++,S(t,a,1);}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,l=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,b=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,b++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=o&&(u=l[_-o]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==b){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,b-=2;}while(b>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--);}})(t,e),E(a,d,t.bl_count);},T=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++l<o&&n===r||(l<h?t.bl_tree[2*n]+=l:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):l<=10?t.bl_tree[34]++:t.bl_tree[36]++,l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4));},I=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++l<o&&n===r)){if(l<h)do{z(t,n,t.bl_tree);}while(0!=--l);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),l--),z(t,16,t.bl_tree),x(t,l-3,2)):l<=10?(z(t,17,t.bl_tree),x(t,l-3,3)):(z(t,18,t.bl_tree),x(t,l-11,7));l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4);}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),((t,e,a,i)=>{Z(t),i&&(y(t,a),y(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a;})(t,e,a,!0);};var N={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<l[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<l[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);g=new b(d,r,257,i,s),p=new b(_,l,0,n,s),m=new b(new Array(0),o,0,19,7);})(),F=!0),t.l_desc=new k(t.dyn_ltree,g),t.d_desc=new k(t.dyn_dtree,p),t.bl_desc=new k(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,R(t);},_tr_stored_block:L,_tr_flush_block:(t,e,i,n)=>{let s,r,l=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),O(t,t.l_desc),O(t,t.d_desc),l=(t=>{let e;for(T(t,t.dyn_ltree,t.l_desc.max_code),T(t,t.dyn_dtree,t.d_desc.max_code),O(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1);})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,l+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t);},_tr_tally:(t,e,i)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8);})(t);}};var B=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0;}while(--r);n%=65521,s%=65521;}return n|s<<16|0};const C=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t;}return e})());var M=(t,e,a,i)=>{const n=C,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return -1^t},H={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:K,_tr_stored_block:P,_tr_flush_block:Y,_tr_tally:G,_tr_align:X}=N,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:q,Z_FULL_FLUSH:J,Z_FINISH:Q,Z_BLOCK:V,Z_OK:$,Z_STREAM_END:tt,Z_STREAM_ERROR:et,Z_DATA_ERROR:at,Z_BUF_ERROR:it,Z_DEFAULT_COMPRESSION:nt,Z_FILTERED:st,Z_HUFFMAN_ONLY:rt,Z_RLE:lt,Z_FIXED:ot,Z_DEFAULT_STRATEGY:ht,Z_UNKNOWN:dt,Z_DEFLATED:_t}=j,ft=258,ct=262,ut=103,wt=113,bt=666,gt=(t,e)=>(t.msg=H[e],e),pt=t=>(t<<1)-(t>4?9:0),mt=t=>{let e=t.length;for(;--e>=0;)t[e]=0;};let kt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const vt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0));},yt=(t,e)=>{Y(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,vt(t.strm);},xt=(t,e)=>{t.pending_buf[t.pending++]=e;},zt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e;},At=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=B(t.adler,e,n,a):2===t.state.wrap&&(t.adler=M(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Et=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,l=t.nice_match;const o=t.strstart>t.w_size-ct?t.strstart-(t.w_size-ct):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ft;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),l>t.lookahead&&(l=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ft-(f-s),s=f-ft,i>r){if(t.match_start=e,r=i,i>=l)break;c=h[s+r-1],u=h[s+r];}}}while((e=_[e&d])>o&&0!=--n);return r<=t.lookahead?r:t.lookahead},Rt=t=>{const e=t.w_size;let a,i,n,s,r;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ct)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,i=t.hash_size,a=i;do{n=t.head[--a],t.head[a]=n>=e?n-e:0;}while(--i);i=e,a=i;do{n=t.prev[--a],t.prev[a]=n>=e?n-e:0;}while(--i);s+=e;}if(0===t.strm.avail_in)break;if(i=At(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=i,t.lookahead+t.insert>=3)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=kt(t,t.ins_h,t.window[r+1]);t.insert&&(t.ins_h=kt(t,t.ins_h,t.window[r+3-1]),t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ct&&0!==t.strm.avail_in)},Zt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a)),t.match_length>=3)if(i=G(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;}while(0!=--t.match_length);t.strstart++;}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=kt(t,t.ins_h,t.window[t.strstart+1]);else i=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2},Ut=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a),t.match_length<=5&&(t.strategy===st||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=G(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(yt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=G(t,0,t.window[t.strstart-1]),i&&yt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--;}return t.match_available&&(i=G(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2};function St(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n;}const Dt=[new St(0,0,0,0,((t,e)=>{let a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Rt(t),0===t.lookahead&&e===W)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,yt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-ct&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(yt(t,!1),t.strm.avail_out),1)})),new St(4,4,8,4,Zt),new St(4,5,16,8,Zt),new St(4,6,32,32,Zt),new St(4,4,16,16,Ut),new St(8,16,32,32,Ut),new St(8,16,128,128,Ut),new St(8,32,128,256,Ut),new St(32,128,258,1024,Ut),new St(32,258,258,4096,Ut)];function Ot(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_t,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),mt(this.dyn_ltree),mt(this.dyn_dtree),mt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),mt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),mt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0;}const Tt=t=>{if(!t||!t.state)return gt(t,et);t.total_in=t.total_out=0,t.data_type=dt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:wt,t.adler=2===e.wrap?0:1,e.last_flush=W,K(e),$},It=t=>{const e=Tt(t);var a;return e===$&&((a=t.state).window_size=2*a.w_size,mt(a.head),a.max_lazy_match=Dt[a.level].max_lazy,a.good_match=Dt[a.level].good_length,a.nice_match=Dt[a.level].nice_length,a.max_chain_length=Dt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ft=(t,e,a,i,n,s)=>{if(!t)return et;let r=1;if(e===nt&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==_t||i<8||i>15||e<0||e>9||s<0||s>ot)return gt(t,et);8===i&&(i=9);const l=new Ot;return t.state=l,l.strm=t,l.wrap=r,l.gzhead=null,l.w_bits=i,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=n+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+3-1)/3),l.window=new Uint8Array(2*l.w_size),l.head=new Uint16Array(l.hash_size),l.prev=new Uint16Array(l.w_size),l.lit_bufsize=1<<n+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new Uint8Array(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,It(t)};var Lt={deflateInit:(t,e)=>Ft(t,e,_t,15,8,ht),deflateInit2:Ft,deflateReset:It,deflateResetKeep:Tt,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?et:(t.state.gzhead=e,$):et,deflate:(t,e)=>{let a,i;if(!t||!t.state||e>V||e<0)return t?gt(t,et):et;const n=t.state;if(!t.output||!t.input&&0!==t.avail_in||n.status===bt&&e!==Q)return gt(t,0===t.avail_out?it:et);n.strm=t;const s=n.last_flush;if(n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,xt(n,31),xt(n,139),xt(n,8),n.gzhead?(xt(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),xt(n,255&n.gzhead.time),xt(n,n.gzhead.time>>8&255),xt(n,n.gzhead.time>>16&255),xt(n,n.gzhead.time>>24&255),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(xt(n,255&n.gzhead.extra.length),xt(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=M(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,3),n.status=wt);else {let e=_t+(n.w_bits-8<<4)<<8,a=-1;a=n.strategy>=rt||n.level<2?0:n.level<6?1:6===n.level?2:3,e|=a<<6,0!==n.strstart&&(e|=32),e+=31-e%31,n.status=wt,zt(n,e),0!==n.strstart&&(zt(n,t.adler>>>16),zt(n,65535&t.adler)),t.adler=1;}if(69===n.status)if(n.gzhead.extra){for(a=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending!==n.pending_buf_size));)xt(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73);}else n.status=73;if(73===n.status)if(n.gzhead.name){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,xt(n,i);}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.gzindex=0,n.status=91);}else n.status=91;if(91===n.status)if(n.gzhead.comment){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,xt(n,i);}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.status=ut);}else n.status=ut;if(n.status===ut&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&vt(t),n.pending+2<=n.pending_buf_size&&(xt(n,255&t.adler),xt(n,t.adler>>8&255),t.adler=0,n.status=wt)):n.status=wt),0!==n.pending){if(vt(t),0===t.avail_out)return n.last_flush=-1,$}else if(0===t.avail_in&&pt(e)<=pt(s)&&e!==Q)return gt(t,it);if(n.status===bt&&0!==t.avail_in)return gt(t,it);if(0!==t.avail_in||0!==n.lookahead||e!==W&&n.status!==bt){let a=n.strategy===rt?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Rt(t),0===t.lookahead)){if(e===W)return 1;break}if(t.match_length=0,a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):n.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ft){if(Rt(t),t.lookahead<=ft&&e===W)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ft;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ft-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead);}if(t.match_length>=3?(a=G(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):Dt[n.level].func(n,e);if(3!==a&&4!==a||(n.status=bt),1===a||3===a)return 0===t.avail_out&&(n.last_flush=-1),$;if(2===a&&(e===q?X(n):e!==V&&(P(n,0,0,!1),e===J&&(mt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),vt(t),0===t.avail_out))return n.last_flush=-1,$}return e!==Q?$:n.wrap<=0?tt:(2===n.wrap?(xt(n,255&t.adler),xt(n,t.adler>>8&255),xt(n,t.adler>>16&255),xt(n,t.adler>>24&255),xt(n,255&t.total_in),xt(n,t.total_in>>8&255),xt(n,t.total_in>>16&255),xt(n,t.total_in>>24&255)):(zt(n,t.adler>>>16),zt(n,65535&t.adler)),vt(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?$:tt)},deflateEnd:t=>{if(!t||!t.state)return et;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==ut&&e!==wt&&e!==bt?gt(t,et):(t.state=null,e===wt?gt(t,at):$)},deflateSetDictionary:(t,e)=>{let a=e.length;if(!t||!t.state)return et;const i=t.state,n=i.wrap;if(2===n||1===n&&42!==i.status||i.lookahead)return et;if(1===n&&(t.adler=B(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(mt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size;}const s=t.avail_in,r=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Rt(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=kt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++;}while(--e);i.strstart=t,i.lookahead=2,Rt(i);}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=l,t.avail_in=s,i.wrap=n,$},deflateInfo:"pako deflate (from Nodeca project)"};const Nt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Bt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Nt(a,e)&&(t[e]=a[e]);}}return t},Ct=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length;}return a};let Mt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(t){Mt=!1;}const Ht=new Uint8Array(256);for(let t=0;t<256;t++)Ht[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Ht[254]=Ht[254]=1;var jt=t=>{let e,a,i,n,s,r=t.length,l=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(l),s=0,n=0;s<l;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Kt=(t,e)=>{let a,i;const n=e||t.length,s=new Array(2*n);for(i=0,a=0;a<n;){let e=t[a++];if(e<128){s[i++]=e;continue}let r=Ht[e];if(r>4)s[i++]=65533,a+=r-1;else {for(e&=2===r?31:3===r?15:7;r>1&&a<n;)e=e<<6|63&t[a++],r--;r>1?s[i++]=65533:e<65536?s[i++]=e:(e-=65536,s[i++]=55296|e>>10&1023,s[i++]=56320|1023&e);}}return ((t,e)=>{if(e<65534&&t.subarray&&Mt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,i)},Pt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Ht[t[a]]>e?a:e};var Yt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0;};const Gt=Object.prototype.toString,{Z_NO_FLUSH:Xt,Z_SYNC_FLUSH:Wt,Z_FULL_FLUSH:qt,Z_FINISH:Jt,Z_OK:Qt,Z_STREAM_END:Vt,Z_DEFAULT_COMPRESSION:$t,Z_DEFAULT_STRATEGY:te,Z_DEFLATED:ee}=j;function ae(t){this.options=Bt({level:$t,method:ee,chunkSize:16384,windowBits:15,memLevel:8,strategy:te},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Lt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==Qt)throw new Error(H[a]);if(e.header&&Lt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?jt(e.dictionary):"[object ArrayBuffer]"===Gt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Lt.deflateSetDictionary(this.strm,t),a!==Qt)throw new Error(H[a]);this._dict_set=!0;}}function ie(t,e){const a=new ae(e);if(a.push(t,!0),a.err)throw a.msg||H[a.err];return a.result}ae.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return !1;for(s=e===~~e?e:!0===e?Jt:Xt,"string"==typeof t?a.input=jt(t):"[object ArrayBuffer]"===Gt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Wt||s===qt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else {if(n=Lt.deflate(a,s),n===Vt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Lt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===Qt;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output);}return !0},ae.prototype.onData=function(t){this.chunks.push(t);},ae.prototype.onEnd=function(t){t===Qt&&(this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg;};var ne={Deflate:ae,deflate:ie,deflateRaw:function(t,e){return (e=e||{}).raw=!0,ie(t,e)},gzip:function(t,e){return (e=e||{}).gzip=!0,ie(t,e)},constants:j};var se=function(t,e){let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),l=E.dmax,o=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,b=(1<<E.lenbits)-1,g=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=u[f&b];e:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,0===m)A[n++]=65535&p;else {if(!(16&m)){if(0==(64&m)){p=u[(65535&p)+(f&(1<<m)-1)];continue e}if(32&m){E.mode=12;break t}t.msg="invalid literal/length code",E.mode=30;break t}k=65535&p,m&=15,m&&(c<m&&(f+=z[a++]<<c,c+=8),k+=f&(1<<m)-1,f>>>=m,c-=m),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=w[f&g];a:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,!(16&m)){if(0==(64&m)){p=w[(65535&p)+(f&(1<<m)-1)];continue a}t.msg="invalid distance code",E.mode=30;break t}if(v=65535&p,m&=15,c<m&&(f+=z[a++]<<c,c+=8,c<m&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<m)-1,v>l){t.msg="invalid distance too far back",E.mode=30;break t}if(f>>>=m,c-=m,m=n-s,v>m){if(m=v-m,m>h&&E.sane){t.msg="invalid distance too far back",E.mode=30;break t}if(y=0,x=_,0===d){if(y+=o-m,m<k){k-=m;do{A[n++]=_[y++];}while(--m);y=n-v,x=A;}}else if(d<m){if(y+=o+d-m,m-=d,m<k){k-=m;do{A[n++]=_[y++];}while(--m);if(y=0,d<k){m=d,k-=m;do{A[n++]=_[y++];}while(--m);y=n-v,x=A;}}}else if(y+=d-m,m<k){k-=m;do{A[n++]=_[y++];}while(--m);y=n-v,x=A;}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]));}else {y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3;}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]));}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c;};const re=15,le=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),oe=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),he=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),de=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var _e=(t,e,a,i,n,s,r,l)=>{const o=l.bits;let h,d,_,f,c,u,w=0,b=0,g=0,p=0,m=0,k=0,v=0,y=0,x=0,z=0,A=null,E=0;const R=new Uint16Array(16),Z=new Uint16Array(16);let U,S,D,O=null,T=0;for(w=0;w<=re;w++)R[w]=0;for(b=0;b<i;b++)R[e[a+b]]++;for(m=o,p=re;p>=1&&0===R[p];p--);if(m>p&&(m=p),0===p)return n[s++]=20971520,n[s++]=20971520,l.bits=1,0;for(g=1;g<p&&0===R[g];g++);for(m<g&&(m=g),y=1,w=1;w<=re;w++)if(y<<=1,y-=R[w],y<0)return -1;if(y>0&&(0===t||1!==p))return -1;for(Z[1]=0,w=1;w<re;w++)Z[w+1]=Z[w]+R[w];for(b=0;b<i;b++)0!==e[a+b]&&(r[Z[e[a+b]]++]=b);if(0===t?(A=O=r,u=19):1===t?(A=le,E-=257,O=oe,T-=257,u=256):(A=he,O=de,u=-1),z=0,b=0,w=g,c=s,k=m,v=0,_=-1,x=1<<m,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){U=w-v,r[b]<u?(S=0,D=r[b]):r[b]>u?(S=O[T+r[b]],D=A[E+r[b]]):(S=96,D=0),h=1<<w-v,d=1<<k,g=d;do{d-=h,n[c+(z>>v)+d]=U<<24|S<<16|D|0;}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,b++,0==--R[w]){if(w===p)break;w=e[a+r[b]];}if(w>m&&(z&f)!==_){for(0===v&&(v=m),c+=g,k=w-v,y=1<<k;k+v<p&&(y-=R[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=m<<24|k<<16|c-s|0;}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),l.bits=m,0};const{Z_FINISH:fe,Z_BLOCK:ce,Z_TREES:ue,Z_OK:we,Z_STREAM_END:be,Z_NEED_DICT:ge,Z_STREAM_ERROR:pe,Z_DATA_ERROR:me,Z_MEM_ERROR:ke,Z_BUF_ERROR:ve,Z_DEFLATED:ye}=j,xe=12,ze=30,Ae=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Ee(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0;}const Re=t=>{if(!t||!t.state)return pe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,we},Ze=t=>{if(!t||!t.state)return pe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Re(t)},Ue=(t,e)=>{let a;if(!t||!t.state)return pe;const i=t.state;return e<0?(a=0,e=-e):(a=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?pe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,Ze(t))},Se=(t,e)=>{if(!t)return pe;const a=new Ee;t.state=a,a.window=null;const i=Ue(t,e);return i!==we&&(t.state=null),i};let De,Oe,Te=!0;const Ie=t=>{if(Te){De=new Int32Array(512),Oe=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(_e(1,t.lens,0,288,De,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;_e(2,t.lens,0,32,Oe,0,t.work,{bits:5}),Te=!1;}t.lencode=De,t.lenbits=9,t.distcode=Oe,t.distbits=5;},Fe=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Le={inflateReset:Ze,inflateReset2:Ue,inflateResetKeep:Re,inflateInit:t=>Se(t,15),inflateInit2:Se,inflate:(t,e)=>{let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return pe;a=t.state,a.mode===xe&&(a.mode=13),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,_=l,f=o,x=we;t:for(;;)switch(a.mode){case 1:if(0===a.wrap){a.mode=13;break}for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(2&a.wrap&&35615===h){a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0),h=0,d=0,a.mode=2;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=ze;break}if((15&h)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits)a.wbits=y;else if(y>a.wbits){t.msg="invalid window size",a.mode=ze;break}a.dmax=1<<a.wbits,t.adler=a.check=1,a.mode=512&h?10:xe,h=0,d=0;break;case 2:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(a.flags=h,(255&a.flags)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=ze;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=3;case 3:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.head&&(a.head.time=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=M(a.check,A,4,0)),h=0,d=0,a.mode=4;case 4:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=5;case 5:if(1024&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0;}else a.head&&(a.head.extra=null);a.mode=6;case 6:if(1024&a.flags&&(c=a.length,c>l&&(c=l),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=7;case 7:if(2048&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y));}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=8;case 8:if(4096&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y));}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=9;case 9:if(512&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=ze;break}h=0,d=0;}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=xe;break;case 10:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}t.adler=a.check=Ae(h),h=0,d=0,a.mode=11;case 11:if(0===a.havedict)return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,ge;t.adler=a.check=1,a.mode=xe;case xe:if(e===ce||e===ue)break t;case 13:if(a.last){h>>>=7&d,d-=7&d,a.mode=27;break}for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=14;break;case 1:if(Ie(a),a.mode=20,e===ue){h>>>=2,d-=2;break t}break;case 2:a.mode=17;break;case 3:t.msg="invalid block type",a.mode=ze;}h>>>=2,d-=2;break;case 14:for(h>>>=7&d,d-=7&d;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=ze;break}if(a.length=65535&h,h=0,d=0,a.mode=15,e===ue)break t;case 15:a.mode=16;case 16:if(c=a.length,c){if(c>l&&(c=l),c>o&&(c=o),0===c)break t;n.set(i.subarray(s,s+c),r),l-=c,s+=c,o-=c,r+=c,a.length-=c;break}a.mode=xe;break;case 17:for(;d<14;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=ze;break}a.have=0,a.mode=18;case 18:for(;a.have<a.ncode;){for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3;}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=_e(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=ze;break}a.have=0,a.mode=19;case 19:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(p<16)h>>>=b,d-=b,a.lens[a.have++]=p;else {if(16===p){for(R=b+2;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(h>>>=b,d-=b,0===a.have){t.msg="invalid bit length repeat",a.mode=ze;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2;}else if(17===p){for(R=b+3;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}h>>>=b,d-=b,y=0,c=3+(7&h),h>>>=3,d-=3;}else {for(R=b+7;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}h>>>=b,d-=b,y=0,c=11+(127&h),h>>>=7,d-=7;}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=ze;break}for(;c--;)a.lens[a.have++]=y;}}if(a.mode===ze)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=ze;break}if(a.lenbits=9,E={bits:a.lenbits},x=_e(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=ze;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=_e(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=ze;break}if(a.mode=20,e===ue)break t;case 20:a.mode=21;case 21:if(l>=6&&o>=258){t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,se(t,f),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,a.mode===xe&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(g&&0==(240&g)){for(m=b,k=g,v=p;z=a.lencode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}h>>>=m,d-=m,a.back+=m;}if(h>>>=b,d-=b,a.back+=b,a.length=p,0===g){a.mode=26;break}if(32&g){a.back=-1,a.mode=xe;break}if(64&g){t.msg="invalid literal/length code",a.mode=ze;break}a.extra=15&g,a.mode=22;case 22:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra;}a.was=a.length,a.mode=23;case 23:for(;z=a.distcode[h&(1<<a.distbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(0==(240&g)){for(m=b,k=g,v=p;z=a.distcode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}h>>>=m,d-=m,a.back+=m;}if(h>>>=b,d-=b,a.back+=b,64&g){t.msg="invalid distance code",a.mode=ze;break}a.offset=p,a.extra=15&g,a.mode=24;case 24:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra;}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=ze;break}a.mode=25;case 25:if(0===o)break t;if(c=f-o,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=ze;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window;}else w=n,u=r-a.offset,c=a.length;c>o&&(c=o),o-=c,a.length-=c;do{n[r++]=w[u++];}while(--c);0===a.length&&(a.mode=21);break;case 26:if(0===o)break t;n[r++]=a.length,o--,a.mode=21;break;case 27:if(a.wrap){for(;d<32;){if(0===l)break t;l--,h|=i[s++]<<d,d+=8;}if(f-=o,t.total_out+=f,a.total+=f,f&&(t.adler=a.check=a.flags?M(a.check,n,f,r-f):B(a.check,n,f,r-f)),f=o,(a.flags?h:Ae(h))!==a.check){t.msg="incorrect data check",a.mode=ze;break}h=0,d=0;}a.mode=28;case 28:if(a.wrap&&a.flags){for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8;}if(h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=ze;break}h=0,d=0;}a.mode=29;case 29:x=be;break t;case ze:x=me;break t;case 31:return ke;case 32:default:return pe}return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<ze&&(a.mode<27||e!==fe))&&Fe(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,a.wrap&&f&&(t.adler=a.check=a.flags?M(a.check,n,f,t.next_out-f):B(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===xe?128:0)+(20===a.mode||15===a.mode?256:0),(0===_&&0===f||e===fe)&&x===we&&(x=ve),x},inflateEnd:t=>{if(!t||!t.state)return pe;let e=t.state;return e.window&&(e.window=null),t.state=null,we},inflateGetHeader:(t,e)=>{if(!t||!t.state)return pe;const a=t.state;return 0==(2&a.wrap)?pe:(a.head=e,e.done=!1,we)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return t&&t.state?(i=t.state,0!==i.wrap&&11!==i.mode?pe:11===i.mode&&(n=1,n=B(n,e,a,0),n!==i.check)?me:(s=Fe(t,e,a,a),s?(i.mode=31,ke):(i.havedict=1,we))):pe},inflateInfo:"pako inflate (from Nodeca project)"};var Ne=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1;};const Be=Object.prototype.toString,{Z_NO_FLUSH:Ce,Z_FINISH:Me,Z_OK:He,Z_STREAM_END:je,Z_NEED_DICT:Ke,Z_STREAM_ERROR:Pe,Z_DATA_ERROR:Ye,Z_MEM_ERROR:Ge}=j;function Xe(t){this.options=Bt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Le.inflateInit2(this.strm,e.windowBits);if(a!==He)throw new Error(H[a]);if(this.header=new Ne,Le.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=jt(e.dictionary):"[object ArrayBuffer]"===Be.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=Le.inflateSetDictionary(this.strm,e.dictionary),a!==He)))throw new Error(H[a])}function We(t,e){const a=new Xe(e);if(a.push(t),a.err)throw a.msg||H[a.err];return a.result}Xe.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,l;if(this.ended)return !1;for(r=e===~~e?e:!0===e?Me:Ce,"[object ArrayBuffer]"===Be.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=Le.inflate(a,r),s===Ke&&n&&(s=Le.inflateSetDictionary(a,n),s===He?s=Le.inflate(a,r):s===Ye&&(s=Ke));a.avail_in>0&&s===je&&a.state.wrap>0&&0!==t[a.next_in];)Le.inflateReset(a),s=Le.inflate(a,r);switch(s){case Pe:case Ye:case Ke:case Ge:return this.onEnd(s),this.ended=!0,!1}if(l=a.avail_out,a.next_out&&(0===a.avail_out||s===je))if("string"===this.options.to){let t=Pt(a.output,a.next_out),e=a.next_out-t,n=Kt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n);}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==He||0!==l){if(s===je)return s=Le.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return !0},Xe.prototype.onData=function(t){this.chunks.push(t);},Xe.prototype.onEnd=function(t){t===He&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg;};var qe={Inflate:Xe,inflate:We,inflateRaw:function(t,e){return (e=e||{}).raw=!0,We(t,e)},ungzip:We,constants:j};const{Deflate:Je,deflate:Qe,deflateRaw:Ve,gzip:$e}=ne,{Inflate:ta,inflate:ea,inflateRaw:aa,ungzip:ia}=qe;var na=Je,sa=Qe,ra=Ve,la=$e,oa=ta,ha=ea,da=aa,_a=ia,fa=j,ca={Deflate:na,deflate:sa,deflateRaw:ra,gzip:la,Inflate:oa,inflate:ha,inflateRaw:da,ungzip:_a,constants:fa};t.Deflate=na,t.Inflate=oa,t.constants=fa,t.default=ca,t.deflate=sa,t.deflateRaw=ra,t.gzip=la,t.inflate=ha,t.inflateRaw=da,t.ungzip=_a,Object.defineProperty(t,"__esModule",{value:!0});}));

    function protocol(sendMsg, pageEle)
    {
        return function (data)
        {
            if (window.debugMode)
                console.log("get", data);
            if (data.slice(0, 3) == '%*"')
            {
                sendMsg("s");
                if (data[3] == '*')
                {
                    cutString(data.slice(4), "'");
                }
                if (data[3] == 's')
                {
                    var a = data.slice(4).split('>');
                    pageEle.appendChild(document.createTextNode("房间错误 此账号在房间: " + a[1] + " 请修改为: " + a[0]));
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

    var pako = window.pako;

    function addws(account, pageEle)
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

    window.debugMode = false;
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

})();
