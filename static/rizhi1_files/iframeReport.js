(function(){var e=0;var t=1;var n=2;var r={};var a=3e3;var o="https://h5.qzone.qq.com/iframe/report";var i=document.getElementsByTagName("iframe");function v(){for(var n=0;n<i.length;n++){var o;var c=f(i[n]);if(c===""||r[c]!==undefined)continue;if(i[n]&&i[n].contentDocument){o=e}else{o=t}r[c]=o}s();setTimeout(v,a)}function f(e){var t=document.createElement("a");t.src=e.src;if(!t.host)return"";var n=t.protocol+"//"+t.host+t.pathname;var r=n.split("/")||[];if(r[3]==="live"&&r[4]==="video"){n=r.slice(0,-2).join("/")}return n}function s(){var e={};var t=false;for(var a in r){if(r[a]!==n){e[a]=r[a];t=true}r[a]=n}if(t){var i=new XMLHttpRequest;i.open("POST",o);i.setRequestHeader("Content-Type","application/json");i.send(JSON.stringify(e))}}v()})();