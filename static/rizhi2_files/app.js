(function() {
  if (!window.QZFL || (!QZFL.lang || !window.seajs)) {
    return;
  }
  seajs.use(["v8/toolbar/core", "v8/menu/cover_menu", "v8/engine/compatible.js", "v8/history/json2", "v8/history/adapter", "v8/history/history"].concat(window.g_moreModules || []), function(toolbar, covermenu) {
    var cpujs = {"load":function(cb) {
      if (typeof cb == "function") {
        cb();
      } else {
        var i = 0;
        for (i = 0;i < cb.length;i++) {
          cb[i]();
        }
      }
    }};
    window.cpujs = cpujs;
    if (window.g_app_identifier == "onekeydressup") {
      QZONE.FrontPage.importDressupAction = function(cb) {
        if (!QZONE.preview) {
          QZFL.imports(["http://", siDomain, "/qzone/v6/promotion/preview/previewer.js"].join(""));
        }
        cb && cb();
      };
    }
    var app = {bootstrap:function() {
      QZONE.Global.Event.scrollEvent.init();
      toolbar.bootstrap();
      covermenu.bootstrap();
      QZONE.FrontPage.toApp(window.location.href);
      QZONE.qzEvent && QZONE.qzEvent.addEventListener("_qz_enterAppStart", function() {
        G_Param.userScrolling = 0;
      });
      QZONE.shop.initDressUp();
      if (QZONE.FrontPage.isInteractZone()) {
        seajs.use("http://" + siDomain + "/qzone/biz/vpage/v8/v.js", function(module) {
          if (module) {
            module.init();
          }
        });
      }
    }};
    app.bootstrap();
    setTimeout(function() {
      window.TCISD && (TCISD.pv && TCISD.pv("8.qzone.qq.com", "tab_app_direct_pv"));
    }, 5E3);
  });
})();

