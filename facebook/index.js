!function n(t,e,r){function a(i,s){if(!e[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[i]={exports:{}};t[i][0].call(u.exports,function(n){var e=t[i][1][n];return a(e?e:n)},u,u.exports,n,t,e,r)}return e[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(n,t){t.exports=function(n,t){var e=t||document;if(e.createStyleSheet){var r=e.createStyleSheet();return r.cssText=n,r.ownerNode}var a=e.getElementsByTagName("head")[0],o=e.createElement("style");return o.type="text/css",o.styleSheet?o.styleSheet.cssText=n:o.appendChild(e.createTextNode(n)),a.appendChild(o),o},t.exports.byUrl=function(n){if(document.createStyleSheet)return document.createStyleSheet(n).ownerNode;var t=document.getElementsByTagName("head")[0],e=document.createElement("link");return e.rel="stylesheet",e.href=n,t.appendChild(e),e}},{}],2:[function(n,t){t.exports={Puzzle:[["Roads 101","i76c67-255s-1knunumjd",["Connect from left to right by dragging tiles from the top.","Left to right","roady-base"]],["Town planning","i76c67-65184-1p97t4hl2u15",["Now you've got the hang of it, give it a go with all the tiles.","Your turn","roadx"]],["Reverse the flow","azbmn-1q0ank-1g2hikr6f",["Use the helipad to reverse the order of your tiles.","Stack tiles for later","helipad"]],["The Block Forest","1v2s8v-1qj324h32y-1q6ak2ac1xh4cznx3p",["Building road past special tiles like forests or the helipad gives you extra points.","Bonus points","forest"]],["★ Bulldozer Beach","i7b1xa-1q2p0rg4a-1gzj2ngl1pkgajre1jbq4o181xumsg041xxuxo8u1uup921p1l2ks6zg1ouj8oml2bh9tx",["Long press to bulldoze a tile you no longer need.","Bulldoze","dump"],["Congratulations. You've unlocked <b>Free Map</b> mode from the main menu.","Free Map","dump"]],["Palm Island","1vo7ux-gq8p29-1gzk9imq1sdea13u1kz9p2ka1ou7c1b81yeb9toa1tc4t3m1qvtx"],["Loopy Lagoon","juufym-23tbv4l816u-1gzkuybk1kz2judm1jbq4o181xumsg041xxuxo8u1uuph0c55kucn4l"],["Mini Monaco","lj1jeg-1bhgx297at7-1ztkxtp01f53i2vw1dpysny21opahvwp1xhbz7hg1v6adci81l9iuyio1b1oewh41ntzxghi34o8"],["Dual Carriageway","n5zga6-o04u8y-22kz99uk1hatzygi1l5e01zw1k8szvjg1plhv9je1tiqqs261l67rhqd1fgoxwyr"],["Little condo by the sea","1wed7t-1ahr1tavxbe5-1r3foqhe1sde83nn1kzfn8fs22lx2t6o1f3q5hvo1sywaee81l1l2z8n1fo32lgc281qh6l61vv32wmm1l2qqjt01tfxkw0o1a1sx1ai1tpd1b821l8p2xtc1sqlgat51mfusy7k2ppd"]],Free:[[null,"6exf2-a-"]]}},{}],3:[function(n,t){function e(n,t,e,r,a,o,i,s,c,l,u){n.beginPath(),n.moveTo(t,e),n.lineTo(r,a),n.lineTo(o,i),n.lineTo(s,c),n.closePath(),n.fillStyle=l,n.strokeStyle=u,n.stroke(),n.fill()}var r=n("./shadecolor");t.exports=function(n,t,a,o,i,s,c,l){n.globalAlpha=l||1,n.lineWidth=1,e(n,t,a,t-o,a-.5*o,t-o,a-s-.5*o,t,a-1*s,c,r(c,-5)),e(n,t,a,t+i,a-.5*i,t+i,a-s-.5*i,t,a-1*s,r(c,10),r(c,25)),e(n,t,a-s,t-o,a-s-.5*o,t-o+i,a-s-(.5*o+.5*i),t+i,a-s-.5*i,r(c,20),r(c,30)),n.globalAlpha=1}},{"./shadecolor":13}],4:[function(n,t){function e(n,t,e,r){var a,o,i;for(o=0;t>o;o++)for(n[o]||(n[o]=[]),i=0;e>i;i++)a=r(o,i,n[o][i]),a&&(n[o][i]=a);return n}function r(n,t,e){return[(n/(e/2)+t/(e/4))/2,(t/(e/4)-n/(e/2))/2]}function a(n){function t(){n.renderOnly||($.width=w.innerWidth,$.height=w.innerHeight),V=(($.width+$.height)/2-30)/(n.wMod||n.w),G=V/2,Q=V/10,on.width=H(0)+V,on.height=G+2,Object.keys(ln).map(function(n){X(n)})}function a(t){touchStartTime=wn,t.preventDefault();var e=h(t);Bn=1,un=e.is&&n.offsetTouch?40:0,In=e,Ln=e.clientX+e.clientY,Cn=0;var r=q(e,0);return jn=T(e),Dn=q(e),On=b(jn[0],jn[1],V),r||(En=0,Nn&&(Nn(),Nn=0)),En?void((1===Fn&&"helipad"===r||0===Fn&&y(e))&&(En=!1,Fn=0)):!en&&y(e)?(En=gn[0],u("select"),void(Fn=0)):("helipad"===r&&bn.length&&(En=bn[bn.length-1],u("select"),Fn=1),"water"===r&&(u("bloop"),k(T(e),m)),void(En||(An=setTimeout(function(){var t=e.clientX+e.clientY;if(10>Cn&&Ln>t-15&&t+15>Ln){un=0;var r=T(e),a=q(e),o=n.predef.filter(function(t){return t[2]===n.base?!1:r[0]===t[0]&&r[1]===t[1]?!0:void 0});a&&a!==n.base&&!o.length&&(C(e,n.base),u("boom"),k(r,"#aaaaaa"),A(),zn-=15,O(r,-15),P())}},400))))}function v(n){if(en||Bn){n.preventDefault(),Cn++;var t=h(n);!En&&Bn&&(pn[0]+=t.clientX-In.clientX,pn[1]+=t.clientY-In.clientY),In=t,jn=T(t),Dn=q(t),On=b(jn[0],jn[1],V)}}function x(){if(Bn=0,clearTimeout(An),En){if(y(In)||1===Fn&&"helipad"===Dn)return;"helipad"===Dn?(u("place"),1!=Fn&&(bn.push(En),gn.shift(),cn=wn,z(T(In)))):en||M(En,jn)?(s[En+"-base"]&&(En+="-base"),C(In,En)&&(u("place"),z(T(In)),0===Fn?(cn=wn,gn.shift()):bn.pop(),Fn=0)):(u("error"),u("error",.15)),P(),nextTile=c[gn[0]],nextTile&&nextTile.firstrun&&!l[gn[0]]&&(E(nextTile.firstrun,nextTile.title,gn[[0]]),l[gn[0]]=!0)}en||(En=!1,Fn=0,D())}function y(n){return n.clientY<G&&n.clientX>Sn&&n.clientX<Sn+G}function k(n,t){for(var e=0;8>e;e++)Rn.push([wn,n[0]-.5,n[1]-.5,2*Math.random()-1,2*Math.random()-1,1.5,un?800:500,t,-1,1,V/30])}function z(n){for(var t=["#aaaaaa","#cccccc",m],e=0;10>e;e++){var r=Math.random()-.5,a=Math.random()-.5;Rn.push([wn,n[0]-Math.random(),n[1]-Math.random(),r/4,a/4,0-Math.random()/2,500,t[Math.round(2*Math.random())],-.5,.8,V/50])}}function S(){Rn.length&&1e3/yn>30&&(Rn=Rn.filter(function(n){var t=(wn-n[0])/n[6];if(t>=1)return!1;var e=n[1]+n[3]*t,r=n[2]+n[4]*t,a=n[5]*G*t*n[8]*t*t,i=b(e,r,V);return o(nn,i[0]+pn[0],i[1]+pn[1]-a,n[10],n[10],n[10],n[7],t>.5?Math.max(0,n[9]*(1-t)):n[9]),1}))}function M(t,e){if(n.strict&&0===t.indexOf("road"))try{var r=Mn[e[0]][e[1]],a=I();Mn[e[0]][e[1]]=t;var o=I();if(Mn[e[0]][e[1]]=r,o.win)return!0;if(a.lose.length===o.lose.length)return!1}catch(n){return!1}for(var i=0;2>i;i++)if(f(e)===f(n.predef[i].slice(0,2)))return!1;return Mn[e[0]]?c[t].p(Mn[e[0]][e[1]]):void 0}function T(n,t){var e=r(n.clientX-pn[0],n.clientY-pn[1]-(0!==t?un:0),V);return[Math.ceil(e[0]),Math.ceil(e[1])]}function q(n,t){var e=T(n,t);try{return Mn[e[0]][e[1]]}catch(n){}}function C(n,t){var e=T(n);try{Mn[e[0]][e[1]]=t}catch(n){return 0}return 1}function A(){d.body.className=g+" rumble",setTimeout(function(){d.body.className=g},500)}function E(n,t,e,r){var a=ln[e].c,o=document.createElement("canvas");o.width=a.width,o.height=a.height/1.5;var i=o.getContext("2d");i.drawImage(a,0,0-a.height/3),p.show(n,t,e?o.toDataURL():0,1,r)}function N(n){var t=Math.pow(1.02,Math.max(0,(wn-this.start)/3))/200*$.height;n[1]+=t}function j(n){Un.forEach(function(t){var e=[n[0]+t[1][0],n[1]+t[1][1]];try{var r=Mn[e[0]][e[1]];if(c[r]){var a=c[r].points||0;qn[e[0]][e[1]]=[a,qn[e[0]][e[1]][0]!==a,1]}else qn[e[0]][e[1]]=[0,0!==qn[e[0]][e[1]][0],1]}catch(n){}})}function D(){fn&&(fn.forEach(function(n){j(n)}),kn=0,e(qn,n.w,n.h,function(n,t,e){!e[2]&&e[0]?(O([n,t],0-e[0]),e[0]=0):e[1]&&O([n,t],e[0]),e[1]=0,e[2]=0,kn+=e[0],F()}))}function O(n,t){return t&&Yn.push([wn,t,b(n[0],n[1],V),t>1]),F(),t}function F(){document.querySelector("#p").innerText=kn+zn}function B(){nn.font="bold 25px serif",nn.strokeStyle="#fff",nn.lineWidth=5,Yn.length&&(Yn=Yn.filter(function(n){var t=wn-n[0];if(1e3>t){var e=[n[1],n[2][0]+pn[0],n[2][1]+pn[1]-t/1e3*G-G];nn.globalAlpha=1-t/1e3,nn.fillStyle=n[3]?m:"#FF5566",nn.strokeText.apply(nn,e),nn.fillText.apply(nn,e)}else if(t>1e3)return!1;return!0}),nn.globalAlpha=1)}function L(n,t,e,r){if(en)return[];if(r||(r=[n]),n[0]===t[0]&&n[1]===t[1])return{win:r};var a,o=Mn[n[0]][n[1]],i=c[o],s=e[0]>1?-2+e[0]:e[0]+2;if(i.c[e[0]])a=e;else{var l=Un.filter(function(n){return i.c[n[0]]&&n[0]!==s?!0:void 0});if(!l.length)return{lose:r};a=l[0]}var u,d,f=[n[0]+a[1][0],n[1]+a[1][1]];try{u=Mn[f[0]][f[1]],d=c[u]}catch(n){return{lose:r}}var h=a[0]>1?-2+a[0]:a[0]+2;return d&&d.c&&d.c[h]?(r.push(f),L(f,t,a,r)):{lose:r}}function I(){return L(n.predef[0],n.predef[1],Un[1])}function P(){if(!en){var t=I();if(fn=t.win||t.lose,t&&t.win){var r=function(n,t){wn>this.start&&wn<this.end&&(n[1]+=0-20*Math.sin((wn-this.start)/125),this.s||(this.s=1,j(t)))};t.win.forEach(function(n,t){setTimeout(function(){u("ping"),O(n,10),zn+=10},100*t),Tn[n[0]][n[1]]={fn:r,start:100*t+wn,end:100*t+wn+350}}),u("win",t.win.length/10+.1),u("win",t.win.length/10+.2),setTimeout(function(){n.outro?E(n.outro[0],n.outro[1],n.outro[2],function(){n.onwin&&n.onwin.call(Z)}):n.onwin&&n.onwin.call(Z)},100*t.win.length+2e3)}else{var a=!0;0!==gn.length&&e(Mn,n.w,n.h,function(t,e,r){r===n.base&&(a=!1)}),a&&n.onlose&&n.onlose.call(Z)}}}function R(n){"function"==typeof n&&(n=n());var t=b(n[1],n[2],V);o(dn,0-t[0],0-t[1]-n[0]*G,n[3]*G,n[4]*G,n[5]*G,n[6],n[7])}function U(n){if(4===n.length){var t=b(n[2],n[3],V);dn.translate(0-t[0]-n[1],0-t[1]);var e=s[n[0]];"function"==typeof e&&(e=e(t)),e.forEach(R),dn.translate(t[0]-n[1],t[1])}else R(n)}function Y(n,t){dn.translate(V/2,1.5*V),"function"==typeof n&&(n=n(t)),n.forEach(U),dn.translate(0-V/2,0-1.5*V)}function X(n,t,e){if(t){if(t.lastRender===wn)return t;dn=t.x,dn.clearRect(0,0,t.c.width,t.c.height)}else t={c:d.createElement("canvas"),seed:e},t.c.width=V+1,t.c.height=2*V,dn=t.c.getContext("2d"),t.x=dn;return t.lastRender=wn,Y(s[n],t.seed),ln[n]=t,t}function _(n,t,e){var r=ln[e],a=b(n,t,V);a[1]<0-pn[1]-V||a[0]<0-pn[0]-V||a[1]>0-pn[1]+$.height+G||a[0]>0-pn[0]+$.width+G||(r?i.animated[e]&&X(e,r):r=X(e),Tn[n][t]&&Tn[n][t].fn.call(Tn[n][t],a,[n,t]),"water"===e&&1e3/yn>30?nn.drawImage(r.c,a[0]-V/2,a[1]-1.5*V-2*Math.sin(n+t+wn/200)):nn.drawImage(r.c,a[0]-V/2,a[1]-1.5*V),"helipad"===e&&J(a))}function H(n){return 0-G/2+(rn-n-1)*(G+an)}function W(){if(mn&&xn){cn&&(Xn=(1-(wn-cn)/200)*(H(1)-H(0)),wn>cn+200&&(cn=0,Xn=0));for(var n=1;n>-1;n--)sn.fillStyle=0===n?m:"#fff",sn.fillRect(0+n,1-n,Math.round(H(0)+V/2+10),Math.round(G+2*n));for(n=0;rn>n;n++){var t=gn[n];"undefined"!=typeof t&&(En&&0===Fn&&0===n||sn.drawImage(ln[t].c,H(n)+Xn,0-.75*G-(0!==n||En?1:5*Math.max(0,Math.sin(wn/200))),G,V))}sn.globalAlpha=.5,sn.fillStyle="#fff",sn.fillRect(0,1,H(0)-G/2,G-1),sn.globalAlpha=1,nn.drawImage(on,0,10)}}function J(n){bn.forEach(function(t,e){1===Fn&&e===bn.length-1?Bn||nn.drawImage(ln[t].c,n[0]-V/2,n[1]-1.5*V-G/10*(e+1)-5*Math.abs(Math.sin(wn/200))):nn.drawImage(ln[t].c,n[0]-V/2,n[1]-1.5*V-G/10*(e+1))})}function K(t){if(tn){if(yn=.9*yn+.1*(Date.now()-wn),wn=Date.now(),nn.fillStyle="#191F27",n.renderOnly||nn.fillRect(0,0,$.width,$.height),nn.translate(pn[0],pn[1]),e(Mn,n.w,n.h,_),nn.translate(0-pn[0],0-pn[1]),!n.renderOnly){if(W(),mn)if(en&&En&&On)nn.drawImage(ln.ok.c,On[0]-V/2+pn[0],On[1]-1.5*V+pn[1]);else if(En)if(Bn){if(nn.drawImage(ln[En].c,In.clientX-V/2,In.clientY-1.25*V-un),On&&Mn[jn[0]]&&Mn[jn[0]][jn[1]]){var r="helipad"===Dn||M(En,jn)?"ok":"notok";nn.drawImage(ln[r].c,On[0]-V/2+pn[0],On[1]-1.5*V+pn[1])}}else 0===Fn&&nn.drawImage(ln[En].c,H(0),0-V);B()}S(),t!==!1&&requestAnimationFrame(K)}}var V,G,Q,Z=this,$=n.canvas,nn=$.getContext("2d"),tn=!0,en="Free"===n.gameType,rn=4,an=15,on=d.createElement("canvas"),sn=on.getContext("2d"),cn=0,ln={ok:1,notok:1,dump:1,forest:1};en&&i.placeable.map(function(n){ln[n]=1}),t();var un,dn,fn,hn=n.h*G/4,pn=[$.width/2,$.height/2-hn+G/4],mn=1,gn=[],bn=[],vn=i.placeable,wn=Date.now(),xn=1,yn=0,kn=0,zn=0;F(),n.dist?gn=n.dist.map(function(t){return X(vn[t],void 0,n.seed++),vn[t]}):0===n.dist&&(xn=0);var Sn=H(0),Mn=e([],n.w,n.h,function(){return n.base}),Tn=e([],n.w,n.h,function(){return 0}),qn=e([],n.w,n.h,function(){return[0,0]});n.predef.forEach(function(n){Mn[n[0]][n[1]]=n[2]});var Cn,An,En,Nn,jn,Dn,On,Fn,Bn,Ln,In=!1,Pn=[["resize",t,window],["touchstart",a],["touchmove",v],["touchend",x],["mousedown",a],["mousemove",v],["mouseup",x]];n.renderOnly||(d.body.className=g,Pn.forEach(function(n){(n[2]||$).addEventListener(n[0],n[1],!0)}));var Rn=[];Z.setTile=function(n,t){En=n,Nn=t},Z.destroy=function(t){function r(){tn=!1,Pn.forEach(function(n){(n[2]||$).removeEventListener(n[0],n[1],!0)}),d.body.className="",t&&t()}t?(Tn=e([],n.w,n.h,function(){var n=wn+100*Math.random();return{fn:N,start:n,end:n+500}}),setTimeout(r,1e3),setTimeout(A,50),u("boom")):r()},this.ss=function(){mn=0,K();var n=d.createElement("a");n.setAttribute("target","_blank"),n.setAttribute("download","screenshot.png"),n.href=$.toDataURL("image/png"),n.click(),mn=1,K()};var Un=[[0,[-1,0]],[1,[0,-1]],[2,[1,0]],[3,[0,1]]],Yn=[],Xn=0;K(!n.renderOnly),n.renderOnly||n.intro&&E.apply(this,n.intro)}var o=n("./drawCube"),i=n("./sprites.js"),s=i.sprites,c=i.tileLogic,l={},u=n("./sfx"),f=JSON.stringify,h=(n("./random"),n("./touchlist")),f=JSON.stringify,p=n("./modal"),m="#55bbff",g="ingame",b=n("./getisometricpos");t.exports=a},{"./drawCube":3,"./getisometricpos":5,"./modal":10,"./random":11,"./sfx":12,"./sprites.js":14,"./touchlist":16}],5:[function(n,t){t.exports=function(n,t,e){return[(n-t)*(e/2),(n+t)*(e/4)]}},{}],6:[function(n){function t(){y.setTile("",0),b.className="",b=0}function e(n,t){var e=d.createElement("canvas");e.width=t,e.height=t;new o({tileSize:t,w:1,h:1,wMod:1.3,canvas:e,base:n,predef:[],dist:[],renderOnly:!0});return e.toDataURL("image/png")}function r(n,t){d.body.className="",x=n,t=Number(t),v=t;var e=c[n][t];return e?(e.canvas=i,e.gameType=n,e.offsetTouch="Free"!==n,e.onwin=function(){y.destroy(),r(n,t+1),w.location.hash=n+"-"+(t+1),p.set(n+(t+1),1)},e.onlose=function(){y.destroy(function(){h.show("Looks like you got stuck. Tap to try again.","Level failed",null,1,function(){r(n,t)})})},void(y=new o(e))):void(y?h.show("Congratulations, you've finished all the levels. Be sure to share this game with your friends!","You won!",0,0,a):a())}function a(){m.className="",u(i,s,0,1);var n=[["Puzzle","roadx-base"],["Free map","dump"]];g&&n.push(["Exit","grass"]),d.querySelector("#menu").innerHTML=n.map(function(n){var t=' data-action="'+n[0]+'"';return"<div"+t+"><img"+t+' src="'+e(n[1],Math.min(i.width,i.height)/4)+'">'+n[0]+"</div>"}).join(""),d.body.className="menu",f("dialog")}window.d=document,window.w=window,d.body.innerHTML='<canvas></canvas>\n<div id="tt"></div>\n<div id="s" style="display:none;"></div>\n<div class="chrome">\n    <div id="p"></div>\n    <div id="buttons">\n        <a data-action="menu"><img src="images/icon-menu.svg"></a>\n        <a data-action="ss"><img src="images/icon-screenshot.svg"></a>\n        <a data-action="restart"><img src="images/icon-restart.svg"></a>\n    </div>\n</div>\n<div id="menu"></div>\n<div id="tl"></div>\n',n("../style/style.css");var o=n("./game"),i=d.querySelector("canvas");i.width=innerWidth,i.height=innerHeight;var s=i.getContext("2d"),c=n("./l"),l=n("./sprites"),u=n("./logo"),f=n("./sfx"),h=n("./modal"),p=n("./storage"),m=d.querySelector("#tl"),g=!1;try{g=!!chrome.storage.sync}catch(n){}window.onresize=function(){d.body.width=window.innerWidth,d.body.height=window.innerHeight},window.onresize();var b;d.onkeydown=function(n){if(n=n||window.event,27==n.keyCode)if(b)t();else if(h.visible)h.hide();else if(y);else try{window.close()}catch(n){}},d.body.onclick=function(n){var t=n.target.dataset;return k[t.action]?(k[t.action](t),!1):y[t.action]?(y[t.action](t),!1):void 0};var v,x,y=0,k={restart:function(){y.destroy(function(){r(x,v)})},menu:function(){y&&(y.destroy(function(){a()}),y=0)},Puzzle:function(){h.show(c.Puzzle.map(function(n,t){var e=!t||p.state["Puzzle"+t];return'<a class="pill '+(e?"active":"")+'" data-action="'+(e?"l":"")+'" data-l="'+t+'">'+(t+1)+". "+n.name+"</a>"}).join(""),"Puzzle play",null,0,0,"Back")},"Free map":function(){p.state.Puzzle5?(m.innerHTML=l.placeable.map(function(n){return'<img id="t'+n+'" src="'+e(n,128)+'" data-action="p" data-s="'+n+'">'}).join(""),m.className="active",r("Free",0)):h.show("Unlock this mode by completing more puzzles.","Mode locked")},Exit:function(){window.close()},l:function(n){h.hide(function(){r("Puzzle",n.l)})},p:function(n){var e=b;e&&(e.className=""),b=d.querySelector("#t"+n.s),e===b?t():(b.className="active",y.setTile(n.s,function(){t()}))}};window.AudioContext||window.webkitAudioContext?a():h.show('This browser is too old to run Road Blocks.<a class="pill active" href="http://spacekidgames.com/road-blocks/system-requirements">Find out more</a>',"Unsupported",null,1)},{"../style/style.css":17,"./game":4,"./l":8,"./logo":9,"./modal":10,"./sfx":12,"./sprites":14,"./storage":15}],7:[function(n,t){function e(){this.set=function(n){for(var t=0;24>t;t++)this[String.fromCharCode(97+t)]=n[t]||0;this.c<.01&&(this.c=.01);var e=this.b+this.c+this.e;if(.18>e){var r=.18/e;this.b*=r,this.c*=r,this.e*=r}}}function r(){var n=this;this._params=new e;var t,r,a,o,i,s,c,l,u,d,f,h;n.r=function(){var t=n._params;o=100/(t.f*t.f+.001),i=100/(t.g*t.g+.001),s=1-t.h*t.h*t.h*.01,c=-t.i*t.i*t.i*1e-6,t.a||(f=.5-t.n/2,h=5e-5*-t.o),l=1+t.l*t.l*(t.l>0?-.9:10),u=0,d=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},n.tr=function(){n.r();var e=n._params;return t=e.b*e.b*1e5,r=e.c*e.c*1e5,a=e.e*e.e*1e5+12,3*((t+r+a)/3|0)},n.s=function(e,p){var m=n._params,g=1!=m.s||m.v,b=m.v*m.v*.1,v=1+3e-4*m.w,w=m.s*m.s*m.s*.1,x=1+1e-4*m.t,y=1!=m.s,k=m.x*m.x,z=m.g,S=m.q||m.r,M=m.r*m.r*m.r*.2,T=m.q*m.q*(m.q<0?-1020:1020),q=m.p?((1-m.p)*(1-m.p)*2e4|0)+32:0,C=m.d,A=m.j/2,E=m.k*m.k*.01,N=m.a,j=t,D=1/t,O=1/r,F=1/a,B=5/(1+m.u*m.u*20)*(.01+w);B>.8&&(B=.8),B=1-B;for(var L,I,P,R,U,Y,X=!1,_=0,H=0,W=0,J=0,K=0,V=0,G=0,Q=0,Z=0,$=0,nn=new Array(1024),tn=new Array(32),en=nn.length;en--;)nn[en]=0;for(var en=tn.length;en--;)tn[en]=2*Math.random()-1;for(var en=0;p>en;en++){if(X)return en;if(q&&++Z>=q&&(Z=0,n.r()),d&&++u>=d&&(d=0,o*=l),s+=c,o*=s,o>i&&(o=i,z>0&&(X=!0)),I=o,A>0&&($+=E,I*=1+Math.sin($)*A),I|=0,8>I&&(I=8),N||(f+=h,0>f?f=0:f>.5&&(f=.5)),++H>j)switch(H=0,++_){case 1:j=r;break;case 2:j=a}switch(_){case 0:W=H*D;break;case 1:W=1+2*(1-H*O)*C;break;case 2:W=1-H*F;break;case 3:W=0,X=!0}S&&(T+=M,P=0|T,0>P?P=-P:P>1023&&(P=1023)),g&&v&&(b*=v,1e-5>b?b=1e-5:b>.1&&(b=.1)),Y=0;for(var rn=8;rn--;){if(G++,G>=I&&(G%=I,3==N))for(var an=tn.length;an--;)tn[an]=2*Math.random()-1;switch(N){case 0:U=f>G/I?.5:-.5;break;case 1:U=1-G/I*2;break;case 2:R=G/I,R=6.28318531*(R>.5?R-1:R),U=1.27323954*R+.405284735*R*R*(0>R?1:-1),U=.225*((0>U?-1:1)*U*U-U)+U;break;case 3:U=tn[Math.abs(32*G/I|0)]}g&&(L=V,w*=x,0>w?w=0:w>.1&&(w=.1),y?(K+=(U-V)*w,K*=B):(V=U,K=0),V+=K,J+=V-L,J*=1-b,U=J),S&&(nn[Q%1024]=U,U+=nn[(Q-P+1024)%1024],Q++),Y+=U}Y*=.125*W*k,e[en]=Y>=1?32767:-1>=Y?-32768:32767*Y|0}return p}}var a=new r,o=function(n){a._params.set(n);var t=a.tr(),e=new Uint8Array(4*((t+1)/2|0)+44),r=2*a.s(new Uint16Array(e.buffer,44),t),o=new Uint32Array(e.buffer,0,44);o[0]=1179011410,o[1]=r+36,o[2]=1163280727,o[3]=544501094,o[4]=16,o[5]=65537,o[6]=44100,o[7]=88200,o[8]=1048578,o[9]=1635017060,o[10]=r,r+=44;for(var i=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c="data:audio/wav;base64,";r>i;i+=3){var l=e[i]<<16|e[i+1]<<8|e[i+2];c+=s[l>>18]+s[l>>12&63]+s[l>>6&63]+s[63&l]}return c};t.exports=o},{}],8:[function(n,t){function e(n){return Number(n)}function r(n){return n?n.match(/.{8}|.+/g).map(function(n){return String(parseInt(n,36)).substr(1)}).join(""):!1}var a=Object.keys(n("./sprites").sprites),o=n("./.levels.json");Object.keys(o).map(function(n){o[n]=o[n].map(function(n){var t=n[1].split("-").map(r),o=[];t[2]&&(o=t[2].match(/.{4}/g).map(function(n){return n=n.match(/(.)(.)(.+)/).map(e),[n[1],n[2],a[n[3]]]}));var i=t[0].match(/(.+)(.)(.)(.)(..)(.)$/);return{seed:e(t[1]),w:i[2],h:i[3],wMod:i[4],base:a[i[5]],strict:!!i[6],dist:"0"===t[1]?0:t[1].split("").map(e),predef:o,intro:n[2],outro:n[3],name:n[0]}})}),t.exports=o},{"./.levels.json":2,"./sprites":14}],9:[function(n,t){var e=[[1,1,1,,,1,1,,,,1,,,1,1,,,1,1,1,,1,,,,1,1,,,,1,1,,1,,1,,,1,1],[1,,1,,1,,,1,,1,,1,,1,,1,,1,,1,,1,,,1,,,1,,1,,,,1,,1,,1,,],[1,1,,,1,,,1,,1,1,1,,1,,1,,1,1,,,1,,,1,,,1,,1,,,,1,1,,,,1],[1,,1,,1,,,1,,1,,1,,1,,1,,1,,1,,1,,,1,,,1,,1,,,,1,,1,,,,1],[1,,1,,,1,1,,,1,,1,,1,1,,,1,1,1,,1,1,1,,1,1,,,,1,1,,1,,1,,1,1,1]],r=n("./drawCube"),a=n("./getisometricpos"),o=n("./shadecolor"),i=n("./sfx");t.exports=function(n,t,s,c){function l(){var c=Date.now()-1e3;if(t.clearRect(0,0,n.width,n.height),e.map(function(n,e){n.map(function(n,i){var s=a(i,e,f),l=(c+10*i-p)/500,m=Math.max(0,screen.height*(1-l));0===m&&g++,1==n&&(r(t,u+2*s[0],d+2*s[1]-m,f,f,.75*f,o("#888888",0-i)),r(t,u+2*s[0],d+2*s[1]-.75*f-m,f,f,.25*f,o(h,0-i)))})}),g&&!m){m=1;for(var b=0;4>b;b++)i("thud",b/9)}1e3>=c-p?requestAnimationFrame(l):s&&s()}var u=n.width/6.5,d=n.height/8,f=n.width/50,h="#55bbff",p=Date.now();c&&(p-=5e3),l();var m=0,g=0}},{"./drawCube":3,"./getisometricpos":5,"./sfx":12,"./shadecolor":13}],10:[function(n,t){function e(n){return parseInt(w.getComputedStyle(n,null).getPropertyValue("height"))}var r=n("./sfx"),a=document.querySelector("#tt"),o=document.querySelector("#s");t.exports={visible:!1,show:function(n,i,s,c,l,u){i=i?"<h1>"+i+"</h1>":"",s=s?'<img class="rubberBand" src="'+s+'">':"",a.innerHTML='<div id="tt-inner"><a class="close">'+(u||"OK")+"</a> "+i+n+s+"</div>",a.style.display="block",o.style.display="block",t.exports.visible=!0,setTimeout(function(){function n(n){n.preventDefault(),r("select"),t.exports.hide(l)}a.className="active",o.className="active";{var i=e(a),s=d.querySelector("#tt-inner");d.querySelector("#tt-inner img")}if(c){s.className="";for(var u=35;u>10&&(s.style.fontSize=u+"px",!(e(s)<i-100));u--);}else s.className="scroll";document.querySelector(".close").onclick=n,o.onclick=n,a.ontouchstart=a.onclick,setTimeout(function(){r("dialog")},10)},1)},hide:function(n){a.className="",o.className="",t.exports.visible=!0,setTimeout(function(){a.style.display="none",o.style.display="none",n&&n()},150)}}},{"./sfx":12}],11:[function(n,t){t.exports=function(n){var t=1e4*Math.sin(n);return t-Math.floor(t)}},{}],12:[function(n,t){var e=window.AudioContext||window.webkitAudioContext;t.exports=function(){function t(n){for(var t=atob(n.substr(n.indexOf(",")+1)),e=t.length,r=new Uint8Array(e),a=0;e>a;a++)r[a]=t.charCodeAt(a);return r.buffer}if(!e)return function(){};var r=new e,a=n("./jsfxr"),o={};return[["select",[2,,.11015387261286379,.4,.12941028638742866,.25,,0,,0,,0,,0,,0,,0,1,,0,.1,,1]],["place",[3,,.3,.25,,.08,,-.3,,0,,0,,0,,0,,0,1,,0,,0,.35]],["ping",[2,,.1,.4,.09,.44,,0,,0,,0,,0,,0,,0,1,,0,.1,,.5]],["dialog",[2,,.04,.4,.28,.35,,.2,,.15,.25,,0,.33,,.62,,0,1,,0,,0,.5]],["win",[2,,.14,.4,.5,.56,,0,,0,,0,,.08,,0,,0,1,,0,.1,,.35]],["boom",[3,,.39,.73,.38,.06,,.14,,0,,0,,0,,0,,0,1,,0,,0,.3]],["error",[1,,.15,,,.1,,,,,,,,,,,,,1,,,.1,,.4]],["thud",[3,,.11,.47,.15,.09,,-.3,,0,,0,,0,,0,,0,1,,0,,0,.35]],["bloop",[2,,.25,.4,.15,.2,,.24,,.04,.3,,0,,0,,0,,1,,0,,0,.5]]].forEach(function(n){r.decodeAudioData(t(a(n[1])),function(t){o[n[0]]=t})}),function(n,t){if(o[n]){var e=r.createBufferSource();e.buffer=o[n],e.connect(r.destination),t=r.currentTime+(t||0),e.start(t)}}}()},{"./jsfxr":7}],13:[function(n,t){t.exports=function(n,t){n=n.substr(1);var e=parseInt(n,16),r=Math.round(2.55*t),a=(e>>16)+r,o=(e>>8&255)+r,i=(255&e)+r;return"#"+(16777216+65536*(255>a?1>a?0:a:255)+256*(255>o?1>o?0:o:255)+(255>i?1>i?0:i:255)).toString(16).slice(1)}},{}],14:[function(n,t){function e(n){return-1!==["grass","sand"].indexOf(n)}var r=innerWidth<800?2:1,a=(n("./random"),"#444444"),o="#AE907A",i="#aaaaaa",s="#DC6969",c="#D4ECF1",l="#FAB41D",u="#000000",d="#66aa66",f="#9EC8A0",h="#D6D38C",p="#C8AF9E",m={roady:[[-.25,.9,0,.1,1,.25,i],[-.25,.1,0,.8,1,.2,a],[-.25,0,0,.1,1,.25,i]],roadx:[[-.25,0,.9,1,.1,.25,i],[-.25,0,.1,1,.8,.2,a],[-.25,0,0,1,.1,.25,i]],roadxy:[[-.25,.9,.9,.1,.1,.25,i],["r1",0,0,0],[-.25,.9,0,.1,.1,.25,i],["r2",0,0,0],["rc",0,0,0],["r3",0,0,0],[-.25,0,.9,.1,.1,.25,i],["r4",0,0,0],[-.25,0,0,.1,.1,.25,i]],roadx2yl:[[-.25,.1,.9,.9,.1,.25,i],["r1",0,0,0],[-.25,.9,0,.1,.1,.25,i],[-.25,0,.9,.1,.1,.25,i],["rc",0,0,0],["r3",0,0,0],[-.25,0,0,.1,.9,.25,i]],roadx2yr:[[-.25,.9,.9,.1,.1,.25,i],["r2",0,0,0],["r1",0,0,0],["rc",0,0,0],[-.25,.1,0,.9,.1,.25,i],[-.25,0,.1,.1,.9,.25,i],[-.25,0,0,.1,.1,.25,i]],roady2xl:[[-.25,.9,.9,.1,.1,.25,i],[-.25,0,.9,.9,.1,.25,i],[-.25,.9,0,.1,.9,.25,i],["rc",0,0,0],["r3",0,0,0],["r4",0,0,0],[-.25,0,0,.1,.1,.25,i]],roady2xr:[[-.25,.9,.1,.1,.9,.25,i],["r2",0,0,0],["rc",0,0,0],[-.25,.9,0,.1,.1,.25,i],[-.25,0,.9,.1,.1,.25,i],["r4",0,0,0],[-.25,0,0,.9,.1,.25,i]],forest:[["ground",0,0,0],["grassSurface",0,0,0],["tree",0,.3,.8],["tree",0,.6,.5],["tree",0,.4,.2],["elk",0,.1,.1]],broadx:[["water",0,0,0],["roadx",0,0,0],[0,0,0,1,0,.1,i],[0,0,1,1,0,.1,i]],broady:[["water",0,0,0],["roady",0,0,0],[0,0,0,0,1,.1,i],[0,1,0,0,1,.1,i]],r1:[[-.25,.9,.1,.1,.8,.2,a]],r2:[[-.25,.1,.9,.8,.1,.2,a]],r3:[[-.25,.1,0,.8,.1,.2,a]],r4:[[-.25,0,.1,.1,.8,.2,a]],rc:[[-.25,.1,.1,.8,.8,.2,a]],ground:[[-1,0,0,1,1,.75,"#ae907a"]],grassSurface:[[-.25,0,0,1,1,.25,d]],sandSurface:[[-.25,0,0,1,1,.25,h]],concreteSurface:[[-.25,0,0,1,1,.25,i]],grass:[["ground",0,0,0],["grassSurface",0,0,0]],sand:[["ground",0,0,0],["sandSurface",0,0,0]],palm:[["ground",0,0,0],["sandSurface",0,0,0],["treePalm",0,.8,.8],["treePalm",0,.4,.4]],building:[["ground",0,0,0],["grassSurface",0,0,0],[0,.2,.4,.8,.6,.8,p],[0,.3,0,.7,.4,.4,p],[0,.3,.05,0,.3,.35,i],[.05,.2,.75,0,.2,.28,c],[.4,.2,.75,0,.2,.28,c],[0,.2,.5,0,.2,.68,c]],test2:[],water:[[-1,0,0,1,1,.1,"#ffff99"],[-.25,0,0,1,1,0,"#55bbff",.3]],helipad:[["ground",0,0,0],["concreteSurface",0,0,0],[0,.95,.95,.05,.05,.1,s],[0,.05,.05,.9,.9,.05,i],[.05,.2,.2,.6,.1,0,s],[.05,.2,.7,.6,.1,0,s],[.05,.45,.3,.1,.4,0,s],[0,0,0,.05,.05,.1,s],[0,.95,0,.05,.05,.1,d],[0,0,.95,.05,.05,.1,d]],dump:[["ground",0,0,0],[-.25,0,0,1,1,.25,p],["bulldozer",0,.5,.5],[0,.1,.2,.1,.1,.1,p],[0,.35,.25,.1,.1,.1,p],[0,.3,.4,.1,.1,.1,p]],ok:[[0,0,0,1,1,0,"#00ff00",.5]],notok:[[0,0,0,1,1,0,s,.5]],tree:function(){for(var n=Math.sin(new Date/300),t=Math.sin(new Date/150),e=[[0,-.05,-.05,.1,.1,.2,p]],r=5;r>0;r--)e.push([.6-r/11+t*(5-r)/500,-.15+n*(5-r)/300,-0.15-n*(5-r)/300,r/25,r/25,.05,f]);return e},treePalm:function(){for(var n,t,e=Math.sin(new Date/300)/150,a=[],o=0;6>o;o++)a.push([t=5*o/50,n=0-e*o*r,0,.03,.03,.1,p]);return a.push([t,.05+n,0,.02,.15,.02,f]),a.push([t,0+n,0,.2,.08,.05,f]),a.push([t-.05,-.2+n,0,.2,.05,.05,f]),a.push([t,0+n,0,.05,.25,.02,f]),a.push([t,0+n,-.2,.05,.2,.02,f]),a.push([t,-.05+n,-.15,.02,.15,.02,f]),a},elk:function(){var n=Math.sin(new Date/1e3),t=n>0?.05:.15;return[[.15,.09,0,.02,.02,.05,o],[0,-.05,-.05,.02,.02,.1,o],[0,-.05,.03,.02,.02,.1,o],[0,.05,-.05,.02,.02,.1,o],[.1,-.08,-.05,.16,.1,.1,o],[t,-.08,.02,.04,.04,.04,o],[t+.04,-.08,0,.01,.01,.1,o],[t+.09,-.08,-.04,.01,.02,.02,o],[t+.1,-.08,-.04,.01,.01,.05,o],[t+.09,-.08,.06,.01,.02,.02,o],[t+.1,-.08,.08,.01,.01,.05,o],[t+.04,-.08,.04,.01,.01,.1,o]]},bulldozer:function(){var n=Math.sin(new Date/500),t=0-.1*Math.min(0,n);return[[0,0,.1,.3,.3,.1,i],[.02,0,.12,0,.06,.06,u],[.02,0,.22,0,.06,.06,u],[.02,0,.32,0,.06,.06,u],[.04,0,.1,0,.3,.02,l],[.04,0,.1,.3,0,.02,u],[.12,0,.1,.3,.3,.25,"#FAB41D"],[.15,0,.12,0,.1,.2,c],[.2,0,.25,0,.13,.15,c],[.2,.03,.1,.25,0,.15,c],[t,0,.07,.3,.01,.1,i],[t,.29,0,.01,.08,.1,i],[t,0,0,.3,.08,.01,i],[t,0,0,.01,.08,.1,l],[t/2+.01,.05,.1,0,.1,.05,l],[t/4+.025,.05,.2,0,.1,.05,l]]},forest2:[["ground",0,0,0],["grassSurface",0,0,0],["tree",0,.3,.8],["tree",0,.6,.5],["tree",0,.4,.2]]};Object.keys(m).map(function(n){0===n.indexOf("road")&&(m[n+"-base"]=m.ground.concat(m[n]))});var g={roady:{c:[0,1,0,1],p:e},roadx:{c:[1,0,1,0],p:e},roadxy:{c:[1,1,1,1],p:e,firstrun:"Cars will travel straight through intersections without making turns. You can double back over road you've already placed.",title:"Intersection"},roadx2yl:{c:[1,0,0,1],p:e},roadx2yr:{c:[1,1,0,0],p:e},roady2xl:{c:[0,0,1,1],p:e},roady2xr:{c:[0,1,1,0],p:e},forest:{p:function(n){return"water"!==n?!0:void 0},points:50},building:{p:e,title:"Buildings",firstrun:"Place buildings alongside roads for extra points.",points:100},dump:1,helipad:1,water:1,sand:1,palm:1,broadx:1,broady:1,forest2:1},b=Object.keys(g);b.map(function(n){0===n.indexOf("road")&&(g[n+"-base"]=g[n],g["b"+n]=g[n])}),g.helipad={points:500};var v={forest:1,forest2:1,sand:1,helipad:1,tree:1,elk:1,palm:1,dump:1};t.exports={sprites:m,placeable:b,tileLogic:g,animated:v}},{"./random":11}],15:[function(n,t){var e;try{e=chrome.storage.sync}catch(n){}t.exports={set:function(n,r){t.exports.state[n]=r,e&&e.set({state:JSON.stringify(t.exports.state)})},state:{}},e?e.get("state",function(n){if(n.state)try{t.exports.state=JSON.parse(n.state)}catch(n){console.log("failed to parse saved data.")}}):t.exports.state=localStorage},{}],16:[function(n,t){t.exports=function(n){var t=n.touches||[n],e={clientX:t[0].clientX,clientY:t[0].clientY,is:n.touches};return e}},{}],17:[function(n,t){var e="body,\nhtml{\n    margin:0;\n    padding:0;\n    background: #191F27;\n    overflow:hidden;\n    font-family: 'Trebuchet MS', 'Chalkboard', 'ChalkboardSE-Regular', sans-serif;\n}\n\n*{\n    -webkit-transition:opacity .15s, left .15s, transform .15s, top .15s;\n    transition:opacity .15s, left .15s, transform .15s, top .15s;\n}\n\n#tt,\n#tt-inner,\n.close{\n    border:3px solid #4AADFF;\n    border-radius: 8px;\n    color: #2C70A8;\n}\n\n#tt{\n    display:block;\n    position:absolute;\n    top:30px;\n    bottom:60px;\n    left:30px;\n    right:50px;\n    padding: 20px;\n    z-index:10;\n    border-radius:10px;\n    font-size:2em;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    background: rgba(74, 173, 255, .6);\n    box-shadow: 0 0 1em black;\n}\n\n#tt-inner{\n    background: rgba(255,255,255,.8);\n    padding:10px 30px;\n}\n\n#tt-inner.scroll{\n    overflow:auto;\n    font-size:25px !important;\n    max-height:85%;\n}\n\n.attr{\n    position:absolute;\n    right:10px;\n    bottom:10px;\n    font-size:8px;\n    opacity:.2;\n    color:#fff;\n}\n.attr a{\n    color:#fff;\n}\n.attr:hover,\n.attr:focus{\n    opacity:1;\n}\n\n.close{\n    position:absolute;\n    bottom:20px;\n    right:20px;\n    background: #CCE7FE;\n    font-weight:bold;\n    display:block;\n    font-size:24px;\n    text-align:center;\n    line-height:45px;\n    cursor: pointer;\n    padding: 0 2em;\n}\n.close:hover{\n    transform: scale(1.05);\n}\n\n#tt.active{\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n\n#s.active{\n    opacity:1;\n}\n\n#s{\n    opacity:0;\n    z-index:9;\n    position:absolute;\n    left:0;\n    top:0;\n    bottom:0;\n    right:0;\n    background:rgba(0,0,0,.5);\n}\n\n#tt img{\n    display:block;\n    margin:0 auto 0;\n    padding-bottom:20px;\n    max-width:200px;\n}\n\n/* buttons */\n#buttons{\n    position:absolute;\n    z-index: 5;\n    bottom:10px;\n    left:-10em;\n    background: #55bbff;\n    border:1px solid white;\n    border-left-style: none;\n    padding:10px;\n    font-size:40px;\n}\n.ingame #buttons,\n.rumble{\n    left:0;\n}\n\n#buttons a{\n    display:inline-block;\n    width:1.5em;\n    line-height:1.5em;\n    text-align: center;\n    color:white;\n    border-radius:2px;\n    cursor:pointer;\n}\n#buttons a:hover{\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n}\n\n#buttons a img{\n    width:1em;\n}\n\n/* points */\n#p{\n    position:absolute;\n    z-index:5;\n    top:-3em;\n    right:10px;\n    margin-left:20px;\n    font-weight:bold;\n    font-size:30px;\n    color: #55bbff;\n    text-align:right;\n    display:block;\n    text-shadow:\n     -1px -1px 0 #fff,\n      1px -1px 0 #fff,\n     -1px  1px 0 #fff,\n      1px  1px 0 #fff;\n}\n\n.ingame #p{\n    top:10px;\n}\n\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(.95, 1.05, 1);\n    transform: scale3d(.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, .95, 1);\n    transform: scale3d(1.05, .95, 1);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.rubberBand {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand;\n  -webkit-animation-delay: .2s;\n  animation-delay: .2s;\n}\n\nh1{\n    font-size:1.2em;\n    font-weight:bold;\n}\n\n.rumble {\n    -webkit-animation-name: rumble;\n    -webkit-animation-duration: .25s;\n    -webkit-animation-iteration-count: 2;\n\n    animation-name: rumble;\n    animation-duration: .25s;\n    animation-iteration-count: 20;\n}\n\n@-webkit-keyframes rumble {\n    0% {-webkit-transform: rotate(0deg);}\n    25% {-webkit-transform: translate(4px, 4px);}\n    50% {-webkit-transform: translate(0px, -4px);}\n    75% {-webkit-transform: translate(-4px, 0px);}\n    100% {-webkit-transform: translate(0px, 2px);}\n}\n\n@keyframes rumble {\n    0% {transform: rotate(0deg);}\n    25% {transform: translate(4px, 4px);}\n    50% {transform: translate(0px, -4px);}\n    75% {transform: translate(-4px, 0px);}\n    100% {transform: translate(0px, 2px);}\n}\n\n#menu{\n    -webkit-transform:scale(0);\n    transform:scale(0);\n    height:0;\n}\n\nbody.menu #menu{\n    display:block;\n    position:absolute;\n    left:0;\n    right:0;\n    bottom:20px;\n    text-align: center;\n    font-weight:bold;\n    color:white;\n    -webkit-transform:scale(1);\n    transform:scale(1);\n    height:auto;\n}\n\n#menu > div{\n    padding:10px 20px;\n    margin:10px 15px;\n    display:inline-block;\n    cursor: pointer;\n    border-radius: 2px;\n}\n\n#menu > div:hover,\n.pill.active:hover,\n#buttons a:hover{\n    background: #55bbff;\n    transform:scale(1.1);\n}\n\n#menu img{\n    display:block;\n    margin:0 0 10px;\n    padding:0;\n}\n\n.pill{\n    display:block;\n    border-radius: 5px;\n    color:#ddd;\n    background:#ACB2B7;\n    padding:0.5em;\n    margin:0.5em 0;\n    cursor:pointer;\n}\n\n.pill.active{\n    background:#3184C7;\n    color:white;\n}\n\n#tl{\n    position:absolute;\n    right:0;\n    top:0;\n    bottom:0;\n    width:15%;\n    max-width:128px;\n    background: #55bbff;\n    border-left: 1px solid white;\n    display:none;\n    overflow-y:auto;\n    /* Overlap points display we don't want */\n    z-index: 5;\n}\n#tl.active{\n    display:block;\n}\n#tl img{\n    width:90%;\n    display:block;\n    margin:0 5%;\n    border-radius: 5px;\n    cursor:pointer;\n}\n#tl img:hover{\n    transform:scale(1.1);\n}\n#tl img.active{\n    transform:scale(1.1);\n    background:white;\n}\n\n\n\n@media(min-width: 800px){\n    #tt{\n        left:20%;\n        right:20%;\n        top:100px;\n        bottom:100px;\n    }\n    #tt-inner{\n        padding:30px 50px;\n    }\n\n    #menu > div:hover,\n    .pill.active:hover,\n    #buttons a:hover{\n        background: #55bbff;\n        transform:scale(1.01);\n    }\n}\n\n@media(max-height:768px){\n    #tt{\n        top:0;\n        left:0;\n        bottom:0;\n        right:0;\n        border-radius:0;\n        border:none;\n    }\n    #tt img{\n        max-height: 200px;\n    }\n}\n\n@media(max-height:490px) and (orientation: landscape){\n    #tt{\n        padding-left: 150px;\n    }\n    #tt img{\n        position:absolute;\n        left:20px;\n        top:50px;\n    }\n}\n@media(max-width:800px){\n    #buttons{\n        font-size:20px;\n    }\n}\n";

n("./../../node_modules/cssify")(e),t.exports=e},{"./../../node_modules/cssify":1}]},{},[6]);