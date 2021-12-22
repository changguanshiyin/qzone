if (window.seajs) {
  var siDomain = window.siDomain || (parent.siDomain || (top.siDomain || "i.gtimg.cn"));
  var g_V = window.g_V || (parent.g_V || (top.g_V || {jq:"2.0.0"}));
  seajs.config({charset:"utf-8", timeout:5 * 60 * 1E3, debug:0, paths:{"v8":window.location.protocol + "//" + siDomain + "/qzone/v8/", "photo.v7":window.location.protocol + "//" + siDomain + "/qzone/photo/v7/js/", "cssBase":window.location.protocol + "//" + siDomain + "/", "app":window.location.protocol + "//" + siDomain + "/qzone/app", "mall.v8":window.location.protocol + "//" + siDomain + "/qzone/mall/v8/"}, alias:{"jquery":window.location.protocol + "//" + siDomain + "/ac/lib/jquery/jquery-" + 
  g_V.jq, "migrate-plugin":"v8/engine/migrate-plugin.js", "app/v8/config/1.0":window.location.protocol + "//" + siDomain + "/qzone/app/v8/config/1.0.js"}, map:[[/^.+\/lib\/jquery\.js$/, window.location.protocol + "//" + siDomain + "/ac/lib/jquery/jquery-" + g_V.jq + ".js"]], preload:["app/v8/config/1.0"]});
}
;
