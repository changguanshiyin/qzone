var urlMap=[
//source path, mapped domain name, need to keep path
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/client\/photo\/pages\/portal/ig,"photo.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/client\/photo\/pages/ig,"photo.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/photo\/zone/ig,"photo.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/newblog\//ig,"blog.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/blog\/reader_qzone_confige\.html/ig,"friendblog.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/blog\/blog.*/ig,"blog.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/blog\/blog_mood\.html/ig,"blog.qzone.qq.com"],
	[/^http:\/\/qzone\.qq\.com\/blog\/\d+-\d+/ig,"blog.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/blog\/tmygb_static\.htm/ig,"msg.qzone.qq.com"],
	[/^http:\/\/m\.((cnc\.)|(edu\.))?qzone\.qq\.com\/cgi\-bin\/new\/msgb_output_page/ig, "msg.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/msgboard\/v2\//ig, "msg.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/toolbar\/toolbar\.htm/ig,"toolbar.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/toolbar\/qqtoolbar2008\.html/ig,"soso.qzone.qq.com"],//add by yuni
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/web\/load\.htm/ig,"none.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/web\/load_noqz\.html/ig,"none.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/admin\/user_.*/ig,"uinfo.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/profile\/user_.*/ig,"uinfo.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/newprofile\/profile_.*/ig,"uinfo.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/admin\/message_.*/ig,"littleMsg.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/admin\/msg_.*/ig,"littleMsg.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/interact\/cityinqzone.*/ig,"cityqzone.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/interact\/intera_.*/ig,"interact.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/newfriend\/friend.*/ig,"interact.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/newfriend\/newfriend_.*/ig,"interact.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/club/ig,"club.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/driftbottle\/poke/ig,"poke.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/driftbottle/ig,"drift.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/gift/ig,"drift.qzone.qq.com",true],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/mall/ig,"mall.qzone.qq.com",true],// keep path
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone\/flower/ig,"flower.qzone.qq.com",true],// keep path,��ͳ�ƻ���Ӧ��ҳ���pv��uv
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/qzone/ig,"imgcache.qzone.qq.com"],
	[/^http:\/\/qzone-music\.qq\.com/ig,"music.qzone.qq.com"],
	[/^http:\/\/(\w+\.)?(imgcache|qzs)\.qq\.com\/music\/musicbox_v2_1\//ig,"music.qzone.qq.com"],
	[/^http:\/\/photo\.qq\.com\/qzone_v4\/(interact_)?marked_list\.htm/ig,"photo.qzone.qq.com",true],
	[/^http:\/\/(qz-)?photo\.qq\.com\/qzone_v4/ig,"photo.qzone.qq.com"],
	[/^http:\/\/(qz-)?photo\.qq\.com/ig,"photo.qq.com",true],
	[/^http:\/\/mall\.qzone\.qq\.com/ig,"mall.qzone.qq.com",true],// keep path
	[/^http:\/\/\d+\.qzone\.qq\.com/ig,"myweb.qzone.qq.com"],
	[/^http:\/\/qzone\.soso\.com/ig,"qzone.soso.com",true],// keep path
	[/^http:\/\/user\d+\.qzone\.qq\.com\/cgi\-bin\/prop/ig,"mall.qzone.qq.com"],
	[/^http:\/\/user\d+\.qzone\.qq\.com\/cgi\-bin\/user/ig,"usertools.qzone.qq.com"],
	[/^http:\/\/user\d+\.qzone\.qq\.com\/(client|web)/ig,"usertools.qzone.qq.com"],
	[/^http:\/\/user\.qzone\.qq\.com/ig,"myweb.qzone.qq.com"],
	[/^http:\/\/users\.qzone\.qq\.com/ig,"users.qzone.qq.com"],
	[/^http:\/\/m[\d]{0,2}\.mail\.qq\.com\/cgi\-bin\/reader_detail/ig,"mail.qzone.qq.com"],
	[/^http:\/\/taotao\.qq\.com/ig,"taotao.qzone.qq.com",true],
	[/^http:\/\/b\.((cnc\.)|(edu\.))?qzone\.qq\.com\/cgi\-bin\/blognew\/readzone_get_titletoppage/ig,"friendblog.qzone.qq.com",true],
	[/^http:\/\/i\.qzone\.qq\.com\//ig,"ihome.qzone.qq.com",true],
	[/^http:\/\/i\.qq\.com\//ig,"ihome.qzone.qq.com",true],
	[/^http:\/\/blogtest\.qzone\.qq\.com\//ig,"blogtest.qzone.qq.com",true]
];

function pingQQ(){
 if(typeof(pgvMain)=="function"){
		if(top.isBiz){
			pvCurDomain = "biz.qzone.qq.com";
			pvCurUrl = "/"+top.g_iUin+"/";
		}else if(top.getBitMapFlag && top.getBitMapFlag(7)){
			pvCurDomain = "star.qzone.qq.com";
			pvCurUrl = "/"+top.g_iUin+"/";
		}else{
			//domain name mapping
			for (var i = 0; i < urlMap.length; i++) {
				if (urlMap[i][0].test(location.href)) {
					pvCurDomain = urlMap[i][1];
					pvCurUrl = urlMap[i][2] ? location.pathname : "/";//keep path if necessary
					if (pvCurDomain == "myweb.qzone.qq.com") {
						if (/jump=4/.test(document.cookie)) {
							pvCurDomain = "my.qzone.qq.com";
							pvCurUrl = "/web";// web visit
						} else if (/jump=3/.test(document.cookie)) {
							pvCurDomain = "my.qzone.qq.com";
							pvCurUrl = "/new_client";// from new qzone client
						} else if (/jump=2/.test(document.cookie)) {
							pvCurDomain = "my.qzone.qq.com";
							pvCurUrl = "/old_client";// from old qzone client
						} else if (/jump=1/.test(document.cookie) && /zzpanelkey=/.test(document.cookie)) {
							pvCurDomain = "myclient.qzone.qq.com";
							pvCurUrl = "/new_client";// from new qzone client
							document.cookie = "jump=3; path=/; domain=qq.com";
						} else if (/clientver=/.test(document.cookie)) {
							pvCurDomain = "myclient.qzone.qq.com";
							pvCurUrl = "/old_client";// from old qzone client
							document.cookie = "jump=2; path=/; domain=qq.com";
						} else {// web visit
							document.cookie = "jump=4; path=/; domain=qq.com";
						}
					} else if ((/^http:\/\/qzone\.qq\.com\/blog\/\d+-\d+/ig).test(location.href)) { //from static pages
						if (/^http:\/\/(www\.)?(google|baidu)\.(com|cn)(\.cn)?\//i.test(document.referrer)) {
							pvCurUrl = RegExp.$2;
						} else {
							pvCurUrl = 'static';
						}
					} else if (pvCurDomain == "blog.qzone.qq.com") {
						if (/jump=1/.test(document.cookie)) {
							pvCurUrl = "/fromclient";
						}
						else if(/news_quote_dlg\.html/ig.test(location.href)) {
							pvCurUrl = "qqnews";
						}
					} else if (pvCurDomain == "photo.qzone.qq.com") {
						if (/jump=1/.test(document.cookie)) {
							pvCurUrl = "/fromclient";
						}
					} else if(pvCurDomain == "ihome.qzone.qq.com"){
							pvCurUrl = "/login";
					}
					break;
				}
			}
		}
		if(!window.cancelSendPV) pgvMain();
	}
}
window.setTimeout(pingQQ,5000);

var pvCurDomain=location.host,pvCurUrl=location.pathname; //can be changed after the script is loaded
var pvRefDomain=pvRefUrl=pvRealDomain="";
function pgvGetDomainInfo(){
	var l = location;
	try{l=top.location;}catch(e){};
	pvRealDomain=pvCurDomain=(pvCurDomain?pvCurDomain:l.host);
	var url=pvCurUrl?pvCurUrl:l.pathname;
	return("dm="+pvCurDomain+"&url="+escape(url)+"&tt=-");
}
function pgvGetRefInfo(){
	var refdm=refurl="-";
	var r=/https?:\/\/(\w+(\.\w+)+)(\/[^?#]*)?/;
	var m=document.referrer.match(r);
	try{m=top.document.referrer.match(r);}catch(e){};
	if(m){
		if(m.length>1)refdm=m[1];
		if(m.length>3)refurl=m[3];
	}
	pvRefDomain=refdm=(pvRefDomain?pvRefDomain:refdm);
	pvRefUrl=refurl=(pvRefUrl?pvRefUrl:refurl);
	return("&rdm="+refdm+"&rurl="+escape(refurl));
}
function pgvGetUserInfo(){
	var m=document.cookie.match(/(^|;|\s)*pgv_pvid=([^;]*)(;|$)/);
	if(m){
		pvid=m[2]
	}else{
		var pvid = (Math.round(Math.random()* 2147483647)*(new Date().getUTCMilliseconds()))%10000000000;
		document.cookie="pgv_pvid="+pvid+"; path=/; domain=qq.com; expires=Sun, 18 Jan 2038 00:00:00 GMT;"
	}
	return "&pgv_pvid="+pvid;
}
function pgvSendInfo(url){
	window.pgvImg=new Image();
	window.pgvImg.src=url;
}
function pgvMain(pgv_bhv_type){
	try{
		var Url="http://pingfore.qq.com/pingd?"+pgvGetDomainInfo()+pgvGetRefInfo()+pgvGetUserInfo()+
		"&scr=-&scl=-&lang=-&java=1&cc=-&pf=-&tz=-8&ct=-&vs=3.3";
		if(pgv_bhv_type&&pgv_bhv_type=="return_url")return Url;
		pgvSendInfo(Url+"&emu="+Math.random());
	}catch(e){
		var v=ScriptEngine()+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
		pgvSendInfo("http://219.133.51.97/pingd?err="+escape(e.message)+"&jsv="+v+"&url="+escape(location.href)+"&stone="+Math.random());
	}
}
/*  |xGv00|99b6f3bdb2a85c920a9a6e9090b2f000 */