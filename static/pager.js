var host = location.hostname,
    g_domain = "qq.com";
if (/pengyou.com$/i.test(host)) {
    g_domain = "pengyou.com";
} else if (/^qzone.qq.com$/i.test(host)) {
    g_domain = "qzone.qq.com";
} else if (/qzone.com$/i.test(host)) {
    g_domain = "qzone.com";
}

try {
    if(/^(\d+|user|h5|rc|sns|mp|qzs)\.qzone\.qq\.com/.test(host)) {
        document.domain = location.hostname;
    } else {
        document.domain = g_domain;
    }
} catch (err) {
    throw new Error("For qq.com domain only!");
}
window.QZONE = window.QZONE || {};
QZONE.FP = QZONE.FP || {};
QZONE.AP = QZONE.AP || {};
QZONE.PY = QZONE.PY || {};
(function() {
    var _fp = window,
        found = 0,
        appid = '',
        where;
    try {
        do {
            _fp = _fp.parent;
            if (_fp.QZONE && _fp.QZONE.FrontPage && _fp.g_iUin) {
                found = 5;
                break;
            }
        }
        while (_fp != top);
        appid = _fp.QZONE.space.getCurrApp();
        appid = appid[0] == 'myhome' || appid[0] == 'main' ? appid[1] : (appid[0] || '');
    } catch (ex) {
        found = 0;
    }
    QZONE.FP._t = _fp;
    if (found < 5) {
        return false;
    }
    window.g_version = QZONE.FP._t.g_version;
    window.g_isBrandQzone = QZONE.FP._t.g_isBrandQzone;
    window.imgcacheDomain = QZONE.FP._t.imgcacheDomain;
    window.siDomain = QZONE.FP._t.siDomain;

    function extend(source, target) {
        for (var k in source) {
            if (k.charAt(0) != '_' && typeof(source[k]) == 'function') {
                target[k] = source[k];
            }
        }
    }
    extend(_fp.QZONE.OFP || {}, QZONE.FP);
    extend(_fp.QZONE.FrontPage, QZONE.FP);
    extend({
        activateOFPIframe: function() {
            if (frameElement) {
                if (typeof(frameElement.activate) == "function") {
                    frameElement.activate();
                }
            }
        }
    }, QZONE.FP);
    extend(_fp.QZONE.appPlatform || {}, QZONE.AP);
    (location.href.indexOf('qq.com') == -1 || location.href.indexOf('qzone.com') == -1) && extend(_fp.QZONE.PengYou || {}, QZONE.PY);
    setTimeout(function() {
        if (window.QZFL && QZFL.config && QZFL.config.FSHelperPage) {
            QZFL.config.FSHelperPage = "//" + _fp.imgcacheDomain + "/qzone/v5/toolpages/fp_gbk.html";
        }
    }, ((location.href.indexOf('qq.com') == -1 || location.href.indexOf('qzone.com') == -1) ? 200 : 2000));

    function checkAllow(appid) {
        try {
            if (frameElement && frameElement.id === 'frameFeedList') {
                where = 1;
                return true;
            }
        } catch (err) {};
        if (typeof(g_version) != "undefined" && g_version == "6") {
            return true;
        }
        if (typeof(g_version) != "undefined" && g_version == 5 && window == top) {
            return true;
        }
        if (!appid) {
            return false;
        }
        if (appid == 2 || appid == "blog" || appid == "bloglist") {
            appid = 2;
            where = 2;
            return true;
        }
        if (appid == 334 || appid == 7 || appid == "msg" || appid == "msgboard") {
            return true;
        }
    }
    // if(!checkAllow(appid))
    // {
    //     return;
    // }
    var ignoreTags = makeMap("ADDRESS,APPLET,BLOCKQUOTE,BODY,BUTTON,CENTER,DD,DEL,DIR,DIV,DL,DT,FIELDSET,FORM,FRAMESET,HR,IFRAME,INS,ISINDEX,LI,MAP,MENU,NOFRAMES,NOSCRIPT,OBJECT,OL,P,PRE,SCRIPT,TABLE,TBODY,TD,TFOOT,TH,THEAD,TR,UL");
    var rCDN = "(?:^|\.)(?:" + g_domain.replace(/\./g, "\\.") + "|qzonestyle\.gtimg\.cn)$";
    rCDN = new RegExp(rCDN, "i");

    var CGI = 'http://google.urlshare.cn/umirror_url_check';
    var goUser = /(?:^|\.)(?:user\.qzone\.qq\.com\/\d+)$/i;
    if (document.addEventListener) {
        document.addEventListener('click', firewall, false);
    } else if (document.attachEvent) {
        document.attachEvent("onclick", firewall);
    }
    if (document.domain == 'pengyou.com') {
        window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
        QZFL.config = QZFL.config || {};
        QZFL.config.domain = "qzs." + g_domain;
        QZFL.config.FSHelperPage = location.protocol + '//' + QZFL.config.domain + "/qzone/v5/toolpages/fp_gbk.html";
    }

    function firewall(evt) {
        evt = evt || window.event;
        var elem = evt.target || evt.srcElement,
            deepCounter = 99,
            tagName, href, target, meteor, mj;
        while (elem && deepCounter > -1) {
            deepCounter--;
            tagName = elem.nodeName;
            if (tagName == 'BODY') {
                break;
            }
            if (tagName == 'HTML') {
                continue;
            }
            if (!elem.getAttribute) {
                break;
            }
            if (ignoreTags[tagName]) {
                elem = elem.parentNode;
                continue;
            }
            href = elem.getAttribute('href') || '';
            // 空间的页面强制https
            if(/^http:\/\/[user|rc|h5|h5s]+\.qzone\.qq\.com/.test(href)){
                elem.hrefbak = href;
                elem.href = href.replace(/^http:/, 'https:');
                setTimeout((function(el){
                    return function(){
                        el.href = el.hrefbak;
                    };
                })(elem), 50);
            }
            else if (isGoUser(href)) {
                elem.hrefbak = href;
                elem.href = href + "/profile";
                setTimeout((function(el) {
                    return function() {
                        el.href = el.hrefbak;
                    };
                })(elem), 50);
            } else if (tagName == 'A' && !elem.onclick) {
                href = elem.getAttribute('href') || '';
                if (href.slice(0, 4) == 'http' && !isCDNDomain(href) && href.slice(0, CGI.length) != CGI) {
                    elem.hrefbak = href;
                    if ((parent.g_isBrandQzone != "1") && ((typeof(g_version) != "undefined" && g_version == 6 && ((typeof(g_isOFP) != "undefined") && g_isOFP == "0" && (typeof(QZ) != "undefined") && QZ.G && !QZ.G.inApp)) || (typeof(g_version) != "undefined" && g_version == 5))) {
                        mj = "&mj=1";
                    } else {
                        mj = "";
                    }
                    if (window.ActiveXObject && elem.innerHTML.indexOf('<') == -1) {
                        meteor = document.createComment('');
                        elem.appendChild(meteor);
                    }
                    currApp = QZONE.FP.getCurrApp();
                    var feedLi = QZFL.dom.searchElementByClassName(elem, "f_single");
                    if (feedLi) {
                        try {
                            currApp = feedLi.getAttribute("id").split("_")[2];
                        } catch (ex) {}
                    }
                    elem.href = CGI + '?appid=' + currApp + '&rappid=' + appid + mj + '&url=' + encodeURIComponent(href) + (where ? '&where=' + where : '') + "&luin=" + QZONE.FP._t.checkLogin() + "&lpos=" + locationMap(QZONE.FP._t.QZONE.FP.getCurrApp()[0]) + "&lsource=" + appMap(currApp);
                    setTimeout((function(el) {
                        return function() {
                            el.href = el.hrefbak;
                        };
                    })(elem), 50);
                }
                break;
            }
            elem = elem.parentNode;
        }
    }

    function appMap(appid) {
        var map = {
            311: 1,
            2: 2,
            4: 3,
            202: 4,
            334: 5,
            1: 6
        };
        return map[appid] || 1;
    }

    function locationMap(appid) {
        var map = {
            0: 0,
            311: 3,
            2: 4,
            4: 5,
            202: 6,
            334: 7,
            1: 8
        };
        var result = map[appid];
        if (result == 0) {
            if (top && top.g_isOFP == "1") {
                result = 2;
            } else {
                result = 1;
            }
        }
        return result || 1;
    }

    function isCDNDomain(href) {
        var h = href.split('://');
        if (h[1]) {
            h = h[1].split('/')[0];
            return rCDN.test(h);
        }
    }

    function isGoUser(href) {
        return false;
        if (!href) {
            return false;
        }
        var h = href.split('://');
        if (h[1]) {
            return goUser.test(h[1]);
        }
    }

    function makeMap(str) {
        var obj = {},
            items = str.split(","),
            i = 0,
            l = items.length;
        for (; i < l; i++) {
            obj[items[i]] = true;
        }
        return obj;
    }
})();
window.F4A=window.F4A||{};F4A.widget=F4A.widget||{};F4A.widget.Pager=F4A.widget.Pager||function(container,config){var _=this;var _id=F4A.widget.Pager.count++;var Const={PG_STATUS_READY:0,PG_STATUS_GO:1,PG_DEF_OFFSETSIZE:2,PG_DEF_PAGESIZE:10}
var TEMPLATE={CONTENT:'<div class="{style}" id="_pager_content_{id}">'+'<p class="mod_pagenav_main"><a href="javascript:void(0);" onclick="return false;" title="以下为分页" style="position:absolute;top:-999em" class="speak"></a>'+'{previous}{first}'+'{pager}'+'{last}{next}'+'</p>'+'<p class="mod_pagenav_option">'+'<span class="mod_pagenav_turn">到{goinput}页 {gobutton}'+'</p>'+'</div>',FIRST_DISABLE:'<span class="mod_pagenav_disable"><span>首页</span></span>',FIRST_ENABLE:'<a href="javascript:void(0);" onclick="return false;" title="首页" id="pager_first_{id}" class="c_tx"><span>1</span></a>',LAST_DISABLE:'<span class="mod_pagenav_disable"><span>末页</span></span>',LAST_ENABLE:'<a href="javascript:void(0);" onclick="return false;" title="末页" id="pager_last_{id}" class="c_tx"><span>{pagenum}</span></a>',PREVIOUS_DISABLE:'<span class="mod_pagenav_disable"><span>上一页</span></span>',PREVIOUS_ENABLE:'<a href="javascript:void(0);" onclick="return false;" title="上一页" id="pager_previous_{id}" class="c_tx"><span>上一页</span></a>',NEXT_DISABLE:'<span class="mod_pagenav_disable"><span>下一页</span></span>',NEXT_ENABLE:'<a href="javascript:void(0);" onclick="return false;" title="下一页" id="pager_next_{id}" class="c_tx"><span>下一页</span></a>',PAGE_NORMAL:'<a href="javascript:void(0);" onclick="return false;" title="{pagenum}" class="c_tx" id="pager_num_{id}_{pagenum}"><span>{pagenum}</span></a>',PAGE_CURRENT:'<span class="current"><span>{pagenum}</span></span>',PAGE_SIMPLE:'<span class="simple">{pagenum}</span>',GO_PAGE_INPUT:'<input type="text" id="pager_go_{id}" class="textinput" />',GO_PAGE_BUTTON:'<button id="pager_gobtn_{id}" type="button" class="bt_tx2"><span>确定</span></button>',ELLIPSIS:'<span class="mod_pagenav_more"><span>…</span></span>',CLASS_NAME:'mod_pagenav'}
this.eleContainer=null;this.totalNum=0;this.type=0;this.totalPage=0;this.pageSize=Const.PG_DEF_PAGESIZE;this.previousPage=0;this.currentPage=0;this.offsetPage=Const.PG_DEF_OFFSETSIZE;this.staus=Const.PG_STATUS_READY;this.initialized=false;this.onTurn=function(page,pagesize){};this.hideEmpty=true;this.init=function(){var i;if(!container)return;this.eleContainer=container;if(typeof config=="object"){for(i in config){if(typeof this[i]!=undefined){this[i]=config[i];}}
if(config.type!=undefined){this.setType(config.type);}
if(typeof config.template=="object"){for(i in config.template){this.setTemplate(i,config.template[i]);}}
if(!!config.totalNum){this.setTotalNum(config.totalNum);}
if(!!config.totalPage){}
if(!!this.totalPage){this.fillPager();}else{this.eleContainer.style.display='none';}}
this.initialized=true;}
this.setTemplate=function(tName,strTmpl){if(TEMPLATE[tName.toUpperCase()]==undefined){return;}
TEMPLATE[tName.toUpperCase()]=strTmpl;}
this.setType=function(aType){if(aType==1){this.setTemplate("CLASS_NAME","mod_pagenav_style2");this.setTemplate("PREVIOUS_DISABLE",'<span class="mod_pagenav_disable"><span><span class="arrow">&lt;</span> 上一页</span></span>');this.setTemplate("PREVIOUS_ENABLE",'<a href="javascript:void(0);" onclick="return false;" title="上一页" id="pager_previous_{id}" class="c_tx bor3"><span><span class="arrow">&lt;</span> 上一页</span></a>');this.setTemplate("NEXT_DISABLE",'<span class="mod_pagenav_disable"><span>下一页 <span class="arrow">&gt;</span></span></span>');this.setTemplate("NEXT_ENABLE",'<a href="javascript:void(0);" onclick="return false;" title="下一页" id="pager_next_{id}" class="c_tx bor3"><span>下一页 <span class="arrow">&gt;</span></span></a>');this.setTemplate("PAGE_NORMAL",'<a href="javascript:void(0);" onclick="return false;" title="{pagenum}" class="c_tx bor3" id="pager_num_{id}_{pagenum}"><span>{pagenum}</span></a>');this.setTemplate("PAGE_CURRENT",'<span class="current bg2"><span>{pagenum}</span></span>');this.setTemplate("FIRST_DISABLE",'<span class="mod_pagenav_disable"><span>首页</span></span>');this.setTemplate("FIRST_ENABLE",'<a href="javascript:void(0);" onclick="return false;" title="首页" id="pager_first_{id}" class="c_tx bor3"><span>1</span></a>');this.setTemplate("LAST_DISABLE",'<span class="mod_pagenav_disable"><span>末页</span></span>');this.setTemplate("LAST_ENABLE",'<a href="javascript:void(0);" onclick="return false;" title="末页" id="pager_last_{id}" class="c_tx bor3"><span>{pagenum}</span></a>');}}
this.setTotalNum=function(total,blnRefresh){var orgPage=this.totalPage;var orgCurPage=this.currentPage;this.totalNum=total;this.totalPage=Math.ceil(total/this.pageSize);this.currentPage=Math.min(this.totalPage,this.currentPage);if(!!blnRefresh){if(orgPage!=this.totalPage){this.fillPager();}
this.refresh();}}
this.fillPager=function(){if(!this.currentPage)return;var pageArr=[];var pageHTML='';var start,end,i;var aBtn;start=(this.currentPage-this.offsetPage>0)?(this.currentPage-this.offsetPage):1;end=(this.currentPage+this.offsetPage<=this.totalPage)?(this.currentPage+this.offsetPage):this.totalPage;var pagerContent;if(this.type==2){pagerContent=TEMPLATE.PAGE_SIMPLE.replace(/\{pagenum\}/g,this.currentPage+"/"+this.totalPage);}else{for(i=start;i<=end;i++){if(i==this.currentPage){pageArr.push(TEMPLATE.PAGE_CURRENT.replace(/\{pagenum\}/g,i));}else{pageArr.push(TEMPLATE.PAGE_NORMAL.replace(/\{pagenum\}/g,i));}}
pagerContent=pageArr.join('');}
pageHTML=TEMPLATE.CONTENT.replace(/\{pager\}/g,pagerContent).replace(/\{first\}/g,(this.currentPage-this.offsetPage<=1)?"":(TEMPLATE.FIRST_ENABLE+((this.currentPage-this.offsetPage>2)?TEMPLATE.ELLIPSIS:""))).replace(/\{previous\}/g,(this.currentPage==1)?TEMPLATE.PREVIOUS_DISABLE:TEMPLATE.PREVIOUS_ENABLE).replace(/\{next\}/g,(this.currentPage==this.totalPage)?TEMPLATE.NEXT_DISABLE:TEMPLATE.NEXT_ENABLE).replace(/\{last\}/g,(this.currentPage+this.offsetPage>this.totalPage-1)?"":((this.currentPage+this.offsetPage<this.totalPage-1)?TEMPLATE.ELLIPSIS:"")+(TEMPLATE.LAST_ENABLE.replace(/\{pagenum\}/g,this.totalPage))).replace(/\{goinput\}/g,TEMPLATE.GO_PAGE_INPUT).replace(/\{gobutton\}/g,TEMPLATE.GO_PAGE_BUTTON).replace(/\{style\}/g,TEMPLATE.CLASS_NAME).replace(/\{id\}/g,_id);if(this.totalPage<=1){this.eleContainer.style.display=(this.hideEmpty?'none':'');}else{this.eleContainer.style.display='';}
this.eleContainer.innerHTML=pageHTML;for(i=start;i<=end;i++){if(aBtn=$('pager_num_'+_id+'_'+i)){QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(this,'goPage',i));}}
var _=this;if(aBtn=$('pager_first_'+_id))
QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(this,'goPage',1,this.pageSize));if(aBtn=$('pager_previous_'+_id))
QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(this,'goPage',this.currentPage-1,this.pageSize));if(aBtn=$('pager_next_'+_id))
QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(this,'goPage',this.currentPage+1,this.pageSize));if(aBtn=$('pager_last_'+_id))
QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(this,'goPage',this.totalPage,this.pageSize));if(aBtn=$('pager_go_'+_id)){var funcGo=function(size){var elem=$('pager_go_'+_id);if(QZFL.event.getEvent().keyCode==13){_.goPage(parseInt(elem.value),size);}}
QZFL.event.addEvent(aBtn,'keyup',QZFL.event.bind(null,funcGo,this.pageSize));}
if(aBtn=$('pager_gobtn_'+_id)){var funcGo=function(size){var elem=$('pager_go_'+_id)
_.goPage(parseInt(elem.value),size);}
QZFL.event.addEvent(aBtn,'click',QZFL.event.bind(null,funcGo,this.pageSize));}
if(this.type==1){$e("#_pager_content_"+_id+" a").onHover(function(){$e(this).addClass("bg2").removeClass("bor3");},function(){$e(this).addClass("bor3").removeClass("bg2");});}}
this.goPage=function(page){page=parseInt(page,10);if(isNaN(page))page=1;if(page<1){page=1;}else if(page>this.totalPage){page=this.totalPage;}
this.previousPage=this.currentPage;this.currentPage=page;this.fillPager();if(typeof this.onTurn=='function')this.onTurn(this.currentPage,this.pageSize);QZFL.event.preventDefault();return false;}
this.refresh=function(){this.goPage(this.currentPage);}
this.init();}
F4A.widget.Pager.count=F4A.widget.Pager.count||0;/*  |xGv00|062346e3d7c26e42264974061e982bc5 */