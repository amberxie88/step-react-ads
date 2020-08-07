(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{264:function(e,t,a){e.exports=a(468)},269:function(e,t,a){},468:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(14),c=a.n(l);a(269),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=a(532),i=a(533),s=a(49),u=a(4),m=a(528),d=a(529),p=a(524),E=a(228),h=a.n(E),f=a(229),g=a.n(f),v=a(530),b=a(90),y=a(537),j=a(522),k=a(531),w=a(230),x=a.n(w),O=a(514),C=a(225),S=a.n(C),I=a(226),N=a.n(I),A=a(227),D=a.n(A),L=a(521),B=a(469),F=a(39),P=a.n(F),R=a(66),T=a(27),Q=a(21),q=a(82),W=a.n(q);function z(e){return r.a.createElement(b.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function G(){var e=Object(T.a)(),t=Object(n.useState)([]),a=Object(s.a)(t,2),l=a[0],c=a[1];return Object(n.useEffect)((function(){!function(){var e=Object(R.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c({data:[{time:"00:00",amount:0},{time:"03:00",amount:300},{time:"06:00",amount:600},{time:"09:00",amount:800},{time:"12:00",amount:1500},{time:"15:00",amount:2e3},{time:"18:00",amount:2400},{time:"21:00",amount:2400},{time:"24:00",amount:"undefined"}]}.data);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Today's Sales"),r.a.createElement(Q.h,null,r.a.createElement(Q.g,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(Q.j,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(Q.k,{stroke:e.palette.text.secondary},r.a.createElement(Q.d,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(Q.f,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1}))))}function H(){var e=Object(T.a)(),t=Object(n.useState)([]),a=Object(s.a)(t,2),l=a[0],c=a[1];return Object(n.useEffect)((function(){!function(){var e=Object(R.a)(P.a.mark((function e(){var t;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W.a.get("/data");case 2:t=e.sent,c(t.data.response);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Clicks Per Campaign"),r.a.createElement(Q.h,null,r.a.createElement(Q.b,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(Q.c,{strokeDasharray:"3 3"}),r.a.createElement(Q.j,{dataKey:"campaign.name",stroke:e.palette.text.secondary}),r.a.createElement(Q.k,null),r.a.createElement(Q.i,null),r.a.createElement(Q.e,null),r.a.createElement(Q.a,{dataKey:"metrics.clicks",fill:"#8884d8"}))))}var M=a(515);function K(e){e.preventDefault()}var U=Object(O.a)({depositContext:{flex:1}});function $(){var e=U();return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Total Ad Spend"),r.a.createElement(b.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(b.a,{color:"textSecondary",className:e.depositContext},"as of 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(M.a,{color:"primary",href:"#",onClick:K},"View more")))}var J=a(516),V=a(520),X=a(519),Y=a(517),Z=a(518),_=Object(O.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}}));function ee(){_();var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){!function(){var e=Object(R.a)(P.a.mark((function e(){var t;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W.a.post("/campaign",new URLSearchParams({query:"SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions\n      FROM campaign"}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 2:t=e.sent,l(t.data.response);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Campaign Data"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Id"),r.a.createElement(X.a,null,"Name"),r.a.createElement(X.a,null,"Status"),r.a.createElement(X.a,null,"Clicks"),r.a.createElement(X.a,null,"Impressions"))),r.a.createElement(V.a,null,a.map((function(e){return r.a.createElement(Z.a,{key:e["campaign.id"]},r.a.createElement(X.a,null,e["campaign.id"]),r.a.createElement(X.a,null,e["campaign.name"]),r.a.createElement(X.a,null,e["campaign.status"]),r.a.createElement(X.a,null,e["metrics.clicks"]),r.a.createElement(X.a,null,e["metrics.impressions"]))})))))}var te=a(111),ae=a(224),ne=function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(ae.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(te.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}},re=Object(O.a)(ne);function le(e){var t=re(),a=Object(u.a)(t.paper,t.fixedHeight);return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12,md:12,xl:5},r.a.createElement(B.a,{className:a},r.a.createElement(H,null))),r.a.createElement(L.a,{item:!0,xs:12,md:8,xl:5},r.a.createElement(B.a,{className:a},r.a.createElement(G,null))),r.a.createElement(L.a,{item:!0,xs:12,md:4,xl:2},r.a.createElement(B.a,{className:a},r.a.createElement($,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(B.a,{className:t.paper},r.a.createElement(ee,null)))))}var ce=a(46),oe=a(47),ie=a(24),se=a(52),ue=a(50);function me(e){var t=e.rows,a=e.fields;return console.log(t),console.log(a),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Query Results"),r.a.createElement(de,{rows:t,fields:a}))}function de(e){var t=e.rows,a=e.fields;return console.log(t),console.log(a),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,a.map((function(e,t){return r.a.createElement(X.a,{key:"col"+t},e)})))),r.a.createElement(V.a,null,t.map((function(e){return r.a.createElement(Z.a,{key:"row"+e.id},a.map((function(t){return r.a.createElement(X.a,{key:t},e[t])})))}))))}var pe=a(534),Ee=a(523),he=Object(O.a)((function(e){return{root:{margin:e.spacing(1)}}}));function fe(e){var t,a,n,r=[];for(t=0;t<e.length;t++)r.push((a=t,(n=e[t]).id=a,n));return console.log(r),r}function ge(e){return e.json()}function ve(e){var t=he();return r.a.createElement("div",{className:t.root},r.a.createElement(Ee.a,{variant:"outlined",onClick:e.onClick},"Submit"))}var be=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(ie.a)(n)),n.handleQuery=n.handleQuery.bind(Object(ie.a)(n)),n.state={value:"",rows:[],fields:[]},n}return Object(oe.a)(a,[{key:"handleQuery",value:function(){var e=this;alert("A query was submitted: "+this.state.value);var t=this.state.value,a=new URLSearchParams;a.append("query",t);var n=new Request("/campaign",{accept:"application/json",method:"POST",body:a});fetch(n).then(ge).then((function(t){console.log(t),e.setState({rows:fe(t.response),fields:t.fieldmask})}))}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Query Here"),r.a.createElement(pe.a,{value:this.state.value,onChange:this.handleChange,id:"standard-full-width",label:"Enter Query",style:{margin:8},placeholder:"Placeholder",helperText:"helper text",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0}}),r.a.createElement(ve,{onClick:this.handleQuery}),r.a.createElement(me,{rows:this.state.rows,fields:this.state.fields}))}}]),a}(r.a.Component);function ye(e){return e.json()}Object(O.a)({depositContext:{flex:1}});var je=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).getClient=n.getClient.bind(Object(ie.a)(n)),n.state={selectedClient:[]},n}return Object(oe.a)(a,[{key:"getClient",value:function(){var e=this;console.log("getting clients");var t=new Request("/client",{accept:"application/json",method:"GET"});fetch(t).then(ye).then((function(t){console.log(t),e.setState({selectedClient:t})}))}},{key:"componentDidMount",value:function(){this.getClient()}},{key:"render",value:function(){var e=this.state.selectedClient;return console.log(e),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Selected Client Account to Query"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Customer ID"),r.a.createElement(X.a,null,"Client Account"))),r.a.createElement(V.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,{key:e.loginId},e.loginId),r.a.createElement(X.a,{key:e.customerId},e.customerId)))))}}]),a}(r.a.Component),ke=Object(O.a)(ne);function we(e){var t=ke();Object(u.a)(t.paper,t.fixedHeight);return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(B.a,{className:t.paper},r.a.createElement(je,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(B.a,{className:t.paper},r.a.createElement(be,null)))))}var xe=Object(O.a)({depositContext:{flex:1}});function Oe(e){var t=xe();return r.a.createElement("div",{className:t.root},r.a.createElement(Ee.a,{variant:"outlined"},r.a.createElement("a",{style:{textDecoration:"none"},href:e.onClick},"Add Account")))}var Ce=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).handleLogin=n.handleLogin.bind(Object(ie.a)(n)),n.state={redirect:""},n}return Object(oe.a)(a,[{key:"handleLogin",value:function(){var e=this,t=new Request("/oauth",{accept:"application/json",method:"GET"});fetch(t).then((function(e){return e.text()})).then((function(t){console.log(t),e.setState({redirect:t})}))}},{key:"componentDidMount",value:function(){window.addEventListener("load",this.handleLogin)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("load",this.handleLogin)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Authenticate your Ads Account"),r.a.createElement(Oe,{onClick:this.state.redirect}))}}]),a}(r.a.Component),Se=a(536);function Ie(e){return e.json()}Object(O.a)({depositContext:{flex:1}});var Ne=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).handleClick=function(e,t){n.setState({selected:t.id});var a=new URLSearchParams;a.append("loginId",t.id),a.append("customerId",t.children),console.log(t.id),console.log(t.children);var r=new Request("/client",{accept:"application/json",method:"POST",body:a});fetch(r).then((function(e){return e.text()})).then((function(e){alert(e)}))},n.fetchCustomers=n.fetchCustomers.bind(Object(ie.a)(n)),n.handleClick=n.handleClick.bind(Object(ie.a)(n)),n.isSelected=n.isSelected.bind(Object(ie.a)(n)),n.state={customerIds:[],selected:""},n}return Object(oe.a)(a,[{key:"fetchCustomers",value:function(){var e=this;console.log("fetching customers");var t=new Request("/customer",{accept:"application/json",method:"GET"});fetch(t).then(Ie).then((function(t){console.log(t.response),e.setState({customerIds:t.response})}))}},{key:"componentDidMount",value:function(){this.fetchCustomers()}},{key:"isSelected",value:function(e){return this.state.selected===e}},{key:"render",value:function(){var e=this,t=this.state.customerIds;return console.log(t),r.a.createElement(r.a.Fragment,null,r.a.createElement(z,null,"Available Customer IDs"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Select"),r.a.createElement(X.a,null,"Login ID"),r.a.createElement(X.a,null,"Client Account ID"),r.a.createElement(X.a,null,"Client Account Name"))),r.a.createElement(V.a,null,t.map((function(t){return r.a.createElement(Z.a,{key:t.id,onClick:function(a){return e.handleClick(a,t)},role:"checkbox","aria-checked":e.isSelected(t.id),tabIndex:-1,selected:e.isSelected(t.id),hover:!0},r.a.createElement(X.a,{padding:"checkbox"},r.a.createElement(Se.a,{checked:e.isSelected(t.id)})),r.a.createElement(X.a,{key:t.id},t.id),r.a.createElement(X.a,{key:t.children},t.children),r.a.createElement(X.a,{key:t.name},t.name))})))))}}]),a}(r.a.Component),Ae=Object(O.a)(ne);function De(e){var t=Ae();return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(B.a,{className:t.paper},r.a.createElement(Ce,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(B.a,{className:t.paper},r.a.createElement(Ne,null)))))}var Le=[{name:"Login",route:"/",icon:r.a.createElement(S.a,null),component:r.a.createElement(De,null)},{name:"Dashboard",route:"/Dashboard",icon:r.a.createElement(N.a,null),component:r.a.createElement(le,null)},{name:"Queries",route:"/Query",icon:r.a.createElement(D.a,null),component:r.a.createElement(we,null)}],Be=a(525),Fe=a(526),Pe=a(527),Re=a(83),Te=function(e){return r.a.createElement(Be.a,{button:!0,key:e.name,component:Re.b,to:e.route},r.a.createElement(Fe.a,null,e.icon),r.a.createElement(Pe.a,{primary:e.name}))},Qe=r.a.createElement("div",null,Le.map(Te)),qe=Object(O.a)(ne);function We(e){var t=qe(),a=r.a.useState(!0),n=Object(s.a)(a,2),l=n[0],c=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{position:"absolute",className:Object(u.a)(t.appBar,l&&t.appBarShift)},r.a.createElement(d.a,{className:t.toolbar},r.a.createElement(p.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){c(!0)},className:Object(u.a)(t.menuButton,l&&t.menuButtonHidden)},r.a.createElement(h.a,null)),r.a.createElement(b.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"Google Ads API Web App Demo"),r.a.createElement(p.a,{color:"inherit"},r.a.createElement(v.a,{badgeContent:4,color:"secondary"},r.a.createElement(g.a,null))))),r.a.createElement(y.a,{variant:"permanent",classes:{paper:Object(u.a)(t.drawerPaper,!l&&t.drawerPaperClose)},open:l},r.a.createElement("div",{className:t.toolbarIcon},r.a.createElement(p.a,{onClick:function(){c(!1)}},r.a.createElement(x.a,null))),r.a.createElement(k.a,null),r.a.createElement(j.a,null,Qe)))}var ze=a(16),Ge=function(e){return r.a.createElement(ze.a,{exact:!0,path:e.route},e.component)},He=function(){return Le.map(Ge)},Me=function(){return console.log(He()),r.a.createElement(ze.c,null,He())},Ke=Object(O.a)(ne);function Ue(){var e=Ke();return r.a.createElement("div",{className:e.root},r.a.createElement(o.a,null),r.a.createElement(Re.a,null,r.a.createElement(We,null),r.a.createElement("main",{className:e.content},r.a.createElement("div",{className:e.appBarSpacer}),r.a.createElement(i.a,{maxWidth:"lg",className:e.container},r.a.createElement(Me,null)))))}c.a.render(r.a.createElement(Ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[264,1,2]]]);
//# sourceMappingURL=main.7af17b47.chunk.js.map