
(function(){var getEmptyPageTip=function(){var tip='';var TIP_TEMPLATE='<img class="empty_pic_message" src="http://<%=siDomain%>/qzone_v6/img/shuoshuo/<%=imageName%>.png">';var imageName;switch(MOOD.env.tab){case'weibo':imageName='empty_home_sync';break;case'index':imageName='empty_feed_post';break;case'feedlist':case'mine':if(MOOD.env.loginUin==MOOD.env.uin){imageName='empty_home_post';}else{imageName='empty_guest_post';}
break;case'schedule':imageName='empty_timing_post';break;case'detail':return'该条说说已被删除';}
return tmpl(TIP_TEMPLATE,{imageName:imageName,siDomain:siDomain});};MOOD.getFrameNode=function(){return parent.QZFL.dom.get('LayPageContainer')||parent.QZFL.dom.get('pageApp');};MOOD.viewport_=function(_w){_w=_w||window;var scrollY=0;if(typeof(_w.pageYOffset)=='number'){scrollY=_w.pageYOffset;}else if(_w.document.body&&_w.document.body.scrollTop){scrollY=_w.document.body.scrollTop;}else if(_w.document.documentElement&&_w.document.documentElement.scrollTop){scrollY=_w.document.documentElement.scrollTop;}
var height=_w.innerHeight||_w.document.documentElement.clientHeight||_w.document.body.clientHeight;return{top:scrollY,bottom:scrollY+height,height:height};};MOOD.isVisiable=function(element){var node=this.getFrameNode();var innerScrollTop=node?node.scrollTop:0;var viewport=MOOD.viewport_(parent);var el=$e(element);var buffer_=0;var position=QZFL.dom.getPosition(element);top_diff=position.top-viewport.bottom-innerScrollTop;bottom_diff=position.bottom-viewport.top-innerScrollTop;var result=(top_diff<=buffer_&&bottom_diff+buffer_>=0);return result;},MOOD.loadIfVisiable=function(element,index){var load_flag=element.getAttribute('data-img-load');var result=MOOD.isVisiable(element);var LOAD_PHOTO_EXT_PARAM='rf=mood_app';var isSupportWebp=QZONE.FP._t.QZFL.cookie.get('QZ_FE_WEBP_SUPPORT')=="1";if(isSupportWebp){LOAD_PHOTO_EXT_PARAM+='&t=5';}
if(result&&load_flag!='load'){element.setAttribute('data-img-load','load');var tid=element.getAttribute('data-tid');$e(element).find('img').each(function(){if($e(this).hasClass('typeset-lazyload')){$e(this).removeClass('typeset-lazyload');var src=this.getAttribute('data-src');var midSrc=this.getAttribute('data-midsrc');var bigSrc=this.getAttribute('data-bigsrc');if((src||midSrc||bigSrc).indexOf('http://p.qpimg.cn/cgi-bin/cgi_imgproxy')>-1){LOAD_PHOTO_EXT_PARAM='';}
if(src&&LOAD_PHOTO_EXT_PARAM){src+=(src.indexOf('?')>-1?'&':'?')+LOAD_PHOTO_EXT_PARAM;}
if(midSrc&&LOAD_PHOTO_EXT_PARAM){midSrc+=(midSrc.indexOf('?')>-1?'&':'?')+LOAD_PHOTO_EXT_PARAM;}
if(bigSrc&&LOAD_PHOTO_EXT_PARAM){bigSrc+=(bigSrc.indexOf('?')>-1?'&':'?')+LOAD_PHOTO_EXT_PARAM;}
var picWidth=this.getAttribute('pic-width');var picHeight=this.getAttribute('pic-height');var index=parseInt(this.getAttribute('pic-index'),10)+1;if(src){var imageItemContainer;QZFL.dom.searchChain(this,'parentNode',function(node){if(!node){return;}
if($e(node).hasClass('img-item-'+index)){imageItemContainer=node;return true;}});var size=QZFL.dom.getSize(imageItemContainer);var holderWidth=size[0];var holderHeight=size[1];var isbigHolder=(holderWidth==400||holderHeight==400);var showImage=this;var loadImage=new Image();loadImage.onload=function(){if(this.width<holderWidth||this.height<holderHeight){if(this.width/this.height>holderWidth/holderHeight){showImage.height=holderHeight;}else{showImage.width=holderWidth;}
if(picWidth>holderHeight&&picHeight>holderHeight){showImage.src=bigSrc;}else{showImage.src=this.src;}
return;}
if(this.width/this.height>holderWidth/holderHeight){showImage.height=holderHeight;}else{showImage.width=holderWidth;}
showImage.src=this.src;};loadImage.src=isbigHolder?bigSrc:src;}}
if($e(this).hasClass('lazyload')){$e(this).removeClass('lazyload');var src=this.getAttribute('data-src');var isphoto=this.getAttribute('data-isphoto');if(src.indexOf('http://p.qpimg.cn/cgi-bin/cgi_imgproxy')>-1){LOAD_PHOTO_EXT_PARAM='';}
if(src){if(isphoto==1&&LOAD_PHOTO_EXT_PARAM){src+=(src.indexOf('?')>-1?'&':'?')+LOAD_PHOTO_EXT_PARAM;}
var limit_info=this.getAttribute('data-limit')||'';var limit=limit_info.split(',');if(limit.length!=2){limit=[400,300];};var bigPic=limit[0]==400;var isVideoThumb=$e(this.parentNode.parentNode).hasClass('js-small-video');if(this.hasAttribute('data-isvideo')){this.setAttribute('src',src.replace('&amp;','&'));}else{QZFL.media.reduceImage((bigPic?0:1),limit[0],limit[1],{trueSrc:src.replace('&amp;','&'),img:this,callback:function(obj,type,tagW,tagH,p){if(isVideoThumb&&p.ow&&p.oh){var newW=parseInt(QZFL.dom.getStyle(obj,'width'),10),newH=parseInt(QZFL.dom.getStyle(obj,'height'),10),oHW=p.oh/p.ow,showW,showH;if(oHW<=newH/newW){showH=newH;showW=newH/oHW;}else{showW=newW;showH=newW*oHW;}
if(showW>400){showW=400;showH=newW*oHW;}
obj.style='width:'+showW+'px;height:'+showH+'px';return;}
if(bigPic){return;}
var newW=parseInt(QZFL.dom.getStyle(obj,'width'),10),newH=parseInt(QZFL.dom.getStyle(obj,'height'),10);var offH=-(newH-tagH)/2,offW=-(newW-tagW)/2;if(offH){QZFL.dom.setStyle(obj,'margin-top',offH+'px');}
if(offW&&offW<0){QZFL.dom.setStyle(obj,'margin-left',offW+'px');}}});}}}
var imgsrc=this.getAttribute('data-src');if(imgsrc){if(Math.random()<0.3){var imgsrc=this.getAttribute('data-src');if(imgsrc)
var httpsImg=new Image();httpsImg.src=imgsrc.replace('http://','https://');var st1=new Date().getTime();httpsImg.onload=function(evt){var et1=new Date().getTime();MOOD.imageSpeedReport({points:{siteName:"user.qzone.qq.com",pageName:'shuoshuolist_imageload_https',24:et1-st1}});};}else{var imgsrc=this.getAttribute('data-src');var httpImg=new Image();httpImg.src=imgsrc;var st1=new Date().getTime();httpImg.onload=function(evt){var et1=new Date().getTime();MOOD.imageSpeedReport({points:{siteName:"user.qzone.qq.com",pageName:'shuoshuolist_imageload_http',24:et1-st1}});};}}});}};MOOD.imageSpeedReport=function(opt){if(false||!!document.documentMode){return;}
var paramStr=this.toUrlParam({appid:'20141',appkey:'c373ba4a1ce77b27601e887e9f8eb3f4',speedparams:this.toUrlParam(opt.points),apn:'wifi',device:'iPhone',platform:'ios',app:'qq',_:Math.random()});var url='https://huatuo.weiyun.com/report.cgi?'+paramStr;var img=new Image();img.src=url;};MOOD.toUrlParam=function(data){var rs=[];for(var key in data){if(data.hasOwnProperty(key)){if(data[key]!==''&&data[key]!==undefined){rs.push(key+'='+encodeURIComponent(data[key]));}}}
return rs.join('&');};MOOD.loadVisiableItems=function(){$e('.mod_feed_lst#msgList li.feed').each(function(item,index){MOOD.loadIfVisiable(this,index);});};MOOD.getDetailSuc=function(d){if(d.code<0){return{code:d.code,msg:d.message};}
var item={};item.source_name=((d.source_name=='朋友网'||d.source_name=='QQ空间')&&!isQzone)?'':d.source_name;item.rt_source_name=((d.rt_source_name=='朋友网'||d.rt_source_name=='QQ空间')&&!isQzone)?'':d.rt_source_name||'';item.auth_flag=d.auth_flag||0;item.right=d.right||1;item.commentlist=d.commentlist||[];item.replies=d.replies||d.msgTotal||item.commentlist.length;item.total=1;item.msglist=[d];item.usrinfo=d.usrinfo;return item;};MOOD.render=function(initialData){var ua=QZFL.userAgent.windows?(QZFL.userAgent.windows<6?"os_winxp":"os_win7"):"os_mac";var html=$e('html');html.addClass(ua);MOOD.load('*',function(M){var mmc=new M.MoodModelCollection({uin:MOOD.env.uin,type:MOOD.env.tab,hostUin:QZONE.FP.getQzoneConfig('onwerUin'),initialData:initialData,success:function(mmc){var config={mood:{comment:{max_comments_count:((MOOD.env.tab=='mine'||MOOD.env.tab=='detail')?5:0),max_replies_count:5}}};if(MOOD.env.tab=='detail'){config.mood.comment.max_comments_count=20;if(QZONE.FP.isFamousZone()){config.mood.comment.max_comments_count=0;}}
mmc.setConfig(config);var mod_feed_lst=document.getElementById('msgList');var pageinfo=mmc.getPagination();if(MOOD.env.tab=='feedlist'&&pageinfo.page>1){QZFL.dom.insertAdjacent(mod_feed_lst,2,mmc.getHTML());}else{if(QZFL.object.route(mmc,'opts.initialData.code')<0){console.log('[ERROR] mood/index.js controller.load 加载数据异常，错误码:',QZFL.object.route(mmc,'opts.initialData.code'));mod_feed_lst.innerHTML=QZFL.object.route(mmc,'opts.initialData.message')||QZFL.object.route(mmc,'opts.initialData.msg')||'';return;}
if(mmc.getSizeSync()>0){mod_feed_lst.innerHTML=mmc.getHTML();}else{mod_feed_lst.innerHTML=getEmptyPageTip();}}
MOOD.loadVisiableItems();}});});};})();