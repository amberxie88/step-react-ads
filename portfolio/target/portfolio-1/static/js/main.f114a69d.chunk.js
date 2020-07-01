(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{240:function(e,a,t){e.exports=t(427)},245:function(e,a,t){},427:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(14),c=t.n(l);t(245),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=t(494),o=t(495),m=t(4),s=t(484),u=t(428),E=t(19),p=t(42),d=t(69);function h(e){return r.a.createElement(d.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function g(e,a){return{time:e,amount:a}}var f=[g("00:00",0),g("03:00",300),g("06:00",600),g("09:00",800),g("12:00",1500),g("15:00",2e3),g("18:00",2400),g("21:00",2400),g("24:00",void 0)];function v(){var e=Object(E.a)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null,"Today"),r.a.createElement(p.d,null,r.a.createElement(p.c,{data:f,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(p.e,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(p.f,{stroke:e.palette.text.secondary},r.a.createElement(p.a,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(p.b,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1}))))}var b=t(476),y=t(475);function w(e){e.preventDefault()}var x=Object(y.a)({depositContext:{flex:1}});function S(){var e=x();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null,"Recent Deposits"),r.a.createElement(d.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(d.a,{color:"textSecondary",className:e.depositContext},"on 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(b.a,{color:"primary",href:"#",onClick:w},"View balance")))}var k=t(477),M=t(481),N=t(480),B=t(478),C=t(479);function j(e,a,t,n,r,l){return{id:e,date:a,name:t,shipTo:n,paymentMethod:r,amount:l}}var O=[j(0,"16 Mar, 2019","Elvis Presley","Tupelo, MS","VISA \u2800\u2022\u2022\u2022\u2022 3719",312.44),j(1,"16 Mar, 2019","Paul McCartney","London, UK","VISA \u2800\u2022\u2022\u2022\u2022 2574",866.99),j(2,"16 Mar, 2019","Tom Scholz","Boston, MA","MC \u2800\u2022\u2022\u2022\u2022 1253",100.81),j(3,"16 Mar, 2019","Michael Jackson","Gary, IN","AMEX \u2800\u2022\u2022\u2022\u2022 2000",654.39),j(4,"15 Mar, 2019","Bruce Springsteen","Long Branch, NJ","VISA \u2800\u2022\u2022\u2022\u2022 5919",212.79)];function I(e){e.preventDefault()}var T=Object(y.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}}));function A(){var e=T();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null,"Recent Orders"),r.a.createElement(k.a,{size:"small"},r.a.createElement(B.a,null,r.a.createElement(C.a,null,r.a.createElement(N.a,null,"Date"),r.a.createElement(N.a,null,"Name"),r.a.createElement(N.a,null,"Ship To"),r.a.createElement(N.a,null,"Payment Method"),r.a.createElement(N.a,{align:"right"},"Sale Amount"))),r.a.createElement(M.a,null,O.map((function(e){return r.a.createElement(C.a,{key:e.id},r.a.createElement(N.a,null,e.date),r.a.createElement(N.a,null,e.name),r.a.createElement(N.a,null,e.shipTo),r.a.createElement(N.a,null,e.paymentMethod),r.a.createElement(N.a,{align:"right"},e.amount))})))),r.a.createElement("div",{className:e.seeMore},r.a.createElement(b.a,{color:"primary",href:"#",onClick:I},"See more orders")))}var P=t(496),D=t(483),F=Object(y.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}})),L=[];function R(){alert("The button was clicked."),fetch("/campaign",{accept:"application/json"}).then(z).then((function(e){L.push(function(e,a){return{id:e,result:a}}(0,e))})).then(console.log(L))}function z(e){return e.json()}function H(){var e=F();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null,"Query Here"),r.a.createElement(P.a,{id:"standard-full-width",label:"Enter Query",style:{margin:8},placeholder:"Placeholder",helperText:"helper text",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0}}),r.a.createElement("div",{className:e.seeMore},r.a.createElement(D.a,{variant:"outlined",onClick:R},"Submit")),r.a.createElement(k.a,{size:"small"},r.a.createElement(B.a,null,r.a.createElement(C.a,null,r.a.createElement(N.a,null,"Result"))),r.a.createElement(M.a,null,L.map((function(e){return r.a.createElement(C.a,{key:e.id},r.a.createElement(N.a,null,e.result))})))))}function W(e){var a=e.classes,t=Object(m.a)(a.paper,a.fixedHeight);return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{container:!0,spacing:3},r.a.createElement(s.a,{item:!0,xs:12,md:8,lg:9},r.a.createElement(u.a,{className:t},r.a.createElement(v,null))),r.a.createElement(s.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(u.a,{className:t},r.a.createElement(S,null))),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(u.a,{className:a.paper},r.a.createElement(A,null))),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(u.a,{className:a.paper},r.a.createElement(H,null)))))}var J=t(198),K=t(489),V=t(490),G=t(491),$=t(194),Q=t.n($),X=t(195),q=t.n(X),U=t(492),Y=t(498),Z=t(482),_=t(493),ee=t(196),ae=t.n(ee),te=t(485),ne=t(486),re=t(487),le=t(488),ce=t(189),ie=t.n(ce),oe=t(190),me=t.n(oe),se=t(191),ue=t.n(se),Ee=t(192),pe=t.n(Ee),de=t(193),he=t.n(de),ge=t(95),fe=t.n(ge),ve=r.a.createElement("div",null,r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(ie.a,null)),r.a.createElement(re.a,{primary:"Dashboard"})),r.a.createElement(te.a,{button:!0,onClick:function(){alert("clicked")}},r.a.createElement(ne.a,null,r.a.createElement(me.a,null)),r.a.createElement(re.a,{primary:"Orders"})),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(ue.a,null)),r.a.createElement(re.a,{primary:"Customers"})),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(pe.a,null)),r.a.createElement(re.a,{primary:"Reports"})),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(he.a,null)),r.a.createElement(re.a,{primary:"Integrations"}))),be=r.a.createElement("div",null,r.a.createElement(le.a,{inset:!0},"Saved reports"),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(fe.a,null)),r.a.createElement(re.a,{primary:"Current month"})),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(fe.a,null)),r.a.createElement(re.a,{primary:"Last quarter"})),r.a.createElement(te.a,{button:!0},r.a.createElement(ne.a,null,r.a.createElement(fe.a,null)),r.a.createElement(re.a,{primary:"Year-end sale"})));function ye(e){var a=e.classes,t=r.a.useState(!0),n=Object(J.a)(t,2),l=n[0],c=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(K.a,{position:"absolute",className:Object(m.a)(a.appBar,l&&a.appBarShift)},r.a.createElement(V.a,{className:a.toolbar},r.a.createElement(G.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){c(!0)},className:Object(m.a)(a.menuButton,l&&a.menuButtonHidden)},r.a.createElement(Q.a,null)),r.a.createElement(d.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:a.title},"KOALAS"),r.a.createElement(G.a,{color:"inherit"},r.a.createElement(U.a,{badgeContent:4,color:"secondary"},r.a.createElement(q.a,null))))),r.a.createElement(Y.a,{variant:"permanent",classes:{paper:Object(m.a)(a.drawerPaper,!l&&a.drawerPaperClose)},open:l},r.a.createElement("div",{className:a.toolbarIcon},r.a.createElement(G.a,{onClick:function(){c(!1)}},r.a.createElement(ae.a,null))),r.a.createElement(_.a,null),r.a.createElement(Z.a,null,ve),r.a.createElement(_.a,null),r.a.createElement(Z.a,null,be)))}var we=t(93),xe=t(197),Se=Object(y.a)((function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(xe.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(we.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));function ke(){var e=Se();return r.a.createElement("div",{className:e.root},r.a.createElement(i.a,null),r.a.createElement(ye,{classes:e}),r.a.createElement("main",{className:e.content},r.a.createElement("div",{className:e.appBarSpacer}),r.a.createElement(o.a,{maxWidth:"lg",className:e.container},r.a.createElement(W,{classes:e}))))}c.a.render(r.a.createElement(ke,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[240,1,2]]]);
//# sourceMappingURL=main.f114a69d.chunk.js.map