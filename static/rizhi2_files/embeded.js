/**
 * @fileOverview QzoneV6内推荐的嵌入应用接口对接包（用于公司内qq.com域下的应用）
 * @author scorpionxu
 * @version 1.0
 */


(window.constructQzoneAppLib = function(_wnd, _doc){
    //一级域名收归
    var g_domain = "qq.com",
	fw,
	f = 0,
    rCDN = "(?:^|\.)(?:"+g_domain.replace(/\./g,"\\.")+"|qzonestyle\.gtimg\.cn|qzs\.qq\.com)$",
	CGI = 'http://google.urlshare.cn/umirror_url_check',
	goUser = /(?:^|\.)(?:user\.qzone\.qq\.com\/\d+)$/i,
    host = location.hostname;
    rCDN = new RegExp(rCDN,"i");
	function checkDomain(){
		fw = _wnd;
		do{
			try{
				fw=fw.parent;
				if(fw.QZONE && fw.QZONE.FrontPage){
					f = fw.g_version || 8;
					return true;
				}
			}catch(e){
				//这里不要抛异常
			}
		}while(fw!=top)
		// throw (new Error(""));
		return false;
	}
	
	function setDomainByHost(){
		var h = location.host;
		if(/^(\d+|user|h5|rc|mp)\.qzone\.qq\.com/.test(h)) {
    		_doc.domain = location.host;
    		return;
		}
		if(h.indexOf("qzone.qq.com")>=0){
			try{
	    		_doc.domain = "qzone.qq.com";
			checkDomain();
			return;
	    	}catch(e){}
		}
		if(h.indexOf("qq.com")>=0){
			try{
	    		_doc.domain = "qq.com";
			checkDomain();
			return;
	    	}catch(e){}
		}
		if(h.indexOf("qzone.com")>=0){
			try{
	    		_doc.domain = "qzone.com";
			checkDomain();
			return;
	    	}catch(e){}
		}
		
		//throw (new Error("域名适配错误,请联系Qzone前台框架服务组"));
	}

	if(/^(\d+|user|h5|rc|mp)\.qzone\.qq\.com/.test(location.host)) {
		_doc.domain = location.host;
        checkDomain();
	} else {
        try{
        	_doc.domain = "qzone.qq.com";
	    	checkDomain();
	    }catch(e){
	    	try{
	    		_doc.domain = "qq.com";
	    		checkDomain();
	    	}catch(e){
	    		try{
	    			_doc.domain = "qzone.com";
					checkDomain();
	    		}catch(e){
		    		setDomainByHost();
		    	}
	    	}
	    }
	}
    
	
	try {
		var parentHostSplit = parent.location.hostname.split('.');
		var parentPath = parent.location.pathname.slice(0, 6);
        var parentHostDomain3 = parentHostSplit.slice(-3).join('.');
        
        if(parentHostDomain3 === 'qzs.qq.com') {
			if(parentPath !== '/qzone') {
				_doc.domain = location.hostname
			}
		} else if(parentHostDomain3 !== 'qzone.qq.com' && parentHostDomain3 !== 'gameapp.qq.com' && parentHostDomain3 !== 'y.qq.com') {
			_doc.domain = location.hostname
		}
	} catch (error) {
		_doc.domain = location.hostname
	}
	
	function getParams(pn){
		var r = new RegExp("(\\?|#|&)" + pn + "=([^&#]*)(&|#|$)"),
			m = _wnd.location.href.match(r);
		return (m ? m[2] : "");
	}

	function extend(sc, tt){
		for (var k in sc) {
			if (k.charAt(0) != '_' && typeof(sc[k]) == 'function') {
				tt[k] = sc[k];
			}
		}
	}

		var aid = '',
		qv = getParams('qz_fl'),
		qz;


	qz = _wnd.QZONE = _wnd.QZONE || {};

	qz.FP = qz.FP || {};
	qz.AP = qz.AP || {}; //渐渐deprecated

	
	//look up qzone framework frame, begin


	if(!f){ //not found
		return;
	}
	//end

	qz.FP._t = fw; //qzone framework frame define
    _wnd.checkLogin=_wnd.checkLogin||qz.FP._t.checkLogin; //给二级页补上这些方法。
    if(!_wnd.TCISD && qz.FP._t.TCISD){
        _wnd.TCISD = {};
        for(var i in qz.FP._t.TCISD){
            _wnd.TCISD[i] = qz.FP._t.TCISD[i];
        }
    }
	//_wnd.TCISD=_wnd.TCISD||qz.FP._t.TCISD; 
	
	
    window.imgcacheDomain = fw.imgcacheDomain;
    window.siDomain = fw.siDomain;

	if(f < 6){ //v5 appid get
		aid = fw.QZONE.space.getCurrApp();
		aid = aid[0] == 'myhome' || aid[0] == 'main' ? aid[1] : (aid[0] || '');
	}else{ //v6 appid get
		//todo
	}

	fw.QZONE.OFP && extend(fw.QZONE.OFP, qz.FP);
	fw.QZONE.appPlatform && extend(fw.QZONE.appPlatform, QZONE.AP);

	extend(fw.QZONE.FrontPage, qz.FP);

	qz.FP.activateOFPIframe = function(){
		frameElement && (typeof(frameElement.activate) == "function") && frameElement.activate();		
	};

	qz.FP.includeQZFL = function(s){
		var v = '',
			tsl;

		if(fw.constructQZFL){
			eval("(" + (fw.constructQZFL._string || (fw.constructQZFL._string = fw.constructQZFL.toString())) + ")();");
		}else{
			tsl = fw.document.getElementsByTagName("script");
			if(tsl){
				for(var i = 0, len = tsl.length; i < len; ++i){
					if(tsl[i] && tsl[i].src && (tsl[i].src.toLowerCase().indexOf('/qzfl/qzfl') > -1)){
						v = tsl[i].src;
						break;
					}
				}
				_doc.write('<script type="text/javascript" charset="utf-8" src=' + (v || ('http://' + (fw.siDomain || 'qzonestyle.gtimg.cn') + '/ac/qzfl/release/qzfl_for_qzone.js')) + '><\/script>');
			}
		}
	};
	//名片
	qz.FP.includeNamecard = function(){
	    if(fw.constructNamecard){
            eval("(" + (fw.constructNamecard._string || (fw.constructNamecard._string = fw.constructNamecard.toString())) + ")();");
        }else{
            _doc.write('<script type="text/javascript" defer="defer" src="http://' + (fw.siDomain || 'qzonestyle.gtimg.cn') + '/qzone/v5/namecard.js"><\/script>');
        }
	};

	//点击时，对<a>的href进行检查，如果是外域的链接则使用平台统一的 http://open.qzone.qq.com/url_check 来打开
	var ignoreTags = makeMap("ADDRESS,APPLET,BLOCKQUOTE,BODY,BUTTON,CENTER,DD,DEL,DIR,DIV,DL,DT,FIELDSET,FORM,FRAMESET,HR,IFRAME,INS,ISINDEX,LI,MAP,MENU,NOFRAMES,NOSCRIPT,OBJECT,OL,P,PRE,SCRIPT,TABLE,TBODY,TD,TFOOT,TH,THEAD,TR,UL");
	
	if (document.addEventListener) {
		document.addEventListener('click', firewall, false);
	} else if (document.attachEvent) {
		document.attachEvent("onclick", firewall);
	}
	
	function firewall(evt){
		evt = evt || window.event;
		var elem = evt.target || evt.srcElement, deepCounter = 3, tagName, href, target, meteor;
		while (elem && deepCounter > -1) {
			deepCounter--;
			tagName = elem.nodeName;
			//debugger;
			if(!elem.getAttribute){
				break;
			}
			href = elem.getAttribute('href');
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
			else if(isGoUser(href)){
				elem.hrefbak = href;
				elem.href = href+"/profile";
				setTimeout((function(el){
					return function(){
						el.href = el.hrefbak;
					};
				})(elem), 50);
			}else if (tagName == 'A' && !elem.onclick) {
				// 非空间域 noopener
				try {
					if(location.href.indexOf('/v6/bloglist.html') == -1) {
						elem.rel = 'noopener';
					}
				} catch (error) {
				}
				href = elem.getAttribute('href');
				if (href && (href.slice(0, 2) == '//' || href.slice(0, 4) == 'http') && !isCDNDomain(href) && href.slice(0, CGI.length) != CGI) {
					elem.hrefbak = href;
					
					if (window.ActiveXObject && elem.innerHTML.indexOf('<') == -1) {
						meteor = document.createComment('');
						elem.appendChild(meteor);
					}
					var mj = "";
					if(!qz.FP._t.ownermode&&(qz.FP._t.g_isBrandQzone!="1")){
						mj = "&mj=1";
					}
					var currApp = QZONE.FP.getCurrApp();
                    var feedLi = QZFL && QZFL.dom && QZFL.dom.searchElementByClassName&&QZFL.dom.searchElementByClassName(elem, "f_single");
                    if(feedLi){
                        try{
                            currApp = feedLi.getAttribute("id").split("_")[2];
                        } catch(ex){}
                    }
					elem.href = CGI + '?url=' + encodeURIComponent(href)+'&where=1'+mj+'&appid='+currApp +"&luin="+qz.FP._t.checkLogin()+"&lpos="+locationMap(qz.FP._t.QZONE.FP.getCurrApp()[0])+"&lsource="+appMap(currApp);
					setTimeout((function(el){
						return function(){
							el.href = el.hrefbak;
						};
					})(elem), 50);
				}
				break;
			}
			if (ignoreTags[tagName]) {
				break;
			}
			// 对付嵌套多层的外链
			var aElem = top.$j(elem).parents('a[href]')[0];
			elem = aElem ? aElem : elem.parentNode;
		}
	}

    function appMap(appid){
        var map = {
            311:1,
            2:2,
            4:3,
            202:4,
            334:5,
            1:6
        };
        return map[appid] || 1;
    }

    function locationMap(appid){
        var map = {
            0:0,
            311:3,
            2:4,
            4:5,
            202:6,
            334:7,
            1:8
        };
        var result = map[appid];
        if(result == 0){
            if(fw && fw.g_isOFP == "1"){
                result = 2;
            }else{
                result = 1;
            }
        }
        return result || 1;
    }

	function isCDNDomain(href){
		var a = document.createElement('a'),
			host;
		a.href = href;
		host = a.host;
		if (host) {
			return rCDN.test(host);
		}
	}
	function isGoUser(href){
		if(!href){
			return false;
		}
		var h = href.split('://');
		if (h[1]) {
			return goUser.test(h[1]);
		}
	}
	function makeMap(str){
		var obj = {}, items = str.split(","), i = 0, l = items.length;
		for (; i < l; i++) {
			obj[items[i]] = true;
		}
		return obj;
	}
	
	try{ _wnd.top = fw;	}catch(ign){}

})(window, document);
