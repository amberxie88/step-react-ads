(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{270:function(e,t,a){e.exports=a(474)},275:function(e,t,a){},474:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(14),c=a.n(l);a(275),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(539),o=a(540),s=a(35),u=a(4),m=a(536),d=a(529),p=a(527),h=a(231),E=a.n(h),g=a(232),f=a.n(g),v=a(537),b=a(93),y=a(546),k=a(532),w=a(538),C=a(233),j=a.n(C),O=a(519),x=a(228),S=a.n(x),P=a(229),I=a.n(P),D=a(230),N=a.n(D),L=a(526),A=a(475),R=a(17),B=a.n(R),F=a(26),T=a(24),W=a(22),M=a(29),Q=a.n(M);function q(e){return r.a.createElement(b.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function z(){var e=Object(T.a)(),t=Object(n.useState)([]),a=Object(s.a)(t,2),l=a[0],c=a[1];return Object(n.useEffect)((function(){!function(){var e=Object(F.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c({data:[{time:"00:00",amount:0},{time:"03:00",amount:300},{time:"06:00",amount:600},{time:"09:00",amount:800},{time:"12:00",amount:1500},{time:"15:00",amount:2e3},{time:"18:00",amount:2400},{time:"21:00",amount:2400},{time:"24:00",amount:"undefined"}]}.data);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Today's Sales"),r.a.createElement(W.h,null,r.a.createElement(W.g,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(W.j,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(W.k,{stroke:e.palette.text.secondary},r.a.createElement(W.d,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(W.f,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1}))))}function H(){var e=Object(T.a)(),t=Object(n.useState)([]),a=Object(s.a)(t,2),l=a[0],c=a[1];return Object(n.useEffect)((function(){!function(){var e=Object(F.a)(B.a.mark((function e(){var t,a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.a.get("/data");case 2:t=e.sent,a=t.data,c(a.response);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Clicks Per Campaign"),r.a.createElement(W.h,null,r.a.createElement(W.b,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(W.c,{strokeDasharray:"3 3"}),r.a.createElement(W.j,{dataKey:"campaign.name",stroke:e.palette.text.secondary}),r.a.createElement(W.k,null),r.a.createElement(W.i,null),r.a.createElement(W.e,null),r.a.createElement(W.a,{dataKey:"metrics.clicks",fill:"#8884d8"}))))}var G=a(520);function K(e){e.preventDefault()}var U=Object(O.a)({depositContext:{flex:1}});function $(){var e=U();return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Total Ad Spend"),r.a.createElement(b.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(b.a,{color:"textSecondary",className:e.depositContext},"as of 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(G.a,{color:"primary",href:"#",onClick:K},"View more")))}var J=a(521),V=a(525),X=a(524),Y=a(522),Z=a(523),_=Object(O.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}}));function ee(){_();var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){!function(){var e=Object(F.a)(B.a.mark((function e(){var t,a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.a.post("/campaign",new URLSearchParams({query:"SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions FROM campaign ORDER BY campaign.id          "}));case 2:t=e.sent,a=t.data,l(a.response);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Campaign Data"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Id"),r.a.createElement(X.a,null,"Name"),r.a.createElement(X.a,null,"Status"),r.a.createElement(X.a,null,"Clicks"),r.a.createElement(X.a,null,"Impressions"))),r.a.createElement(V.a,null,a.map((function(e){return r.a.createElement(Z.a,{key:e["campaign.id"]},r.a.createElement(X.a,null,e["campaign.id"]),r.a.createElement(X.a,null,e["campaign.name"]),r.a.createElement(X.a,null,e["campaign.status"]),r.a.createElement(X.a,null,e["metrics.clicks"]),r.a.createElement(X.a,null,e["metrics.impressions"]))})))))}var te=a(114),ae=a(227),ne=function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(ae.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(te.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}},re=Object(O.a)(ne);function le(e){var t=re(),a=Object(u.a)(t.paper,t.fixedHeight);return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12,md:12,xl:5},r.a.createElement(A.a,{className:a},r.a.createElement(H,null))),r.a.createElement(L.a,{item:!0,xs:12,md:8,xl:5},r.a.createElement(A.a,{className:a},r.a.createElement(z,null))),r.a.createElement(L.a,{item:!0,xs:12,md:4,xl:2},r.a.createElement(A.a,{className:a},r.a.createElement($,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(A.a,{className:t.paper},r.a.createElement(ee,null)))))}var ce=a(51),ie=a(52),oe=a(27),se=a(55),ue=a(53),me=a(543);function de(e){var t=e.rows,a=e.fields,n=r.a.useState(10),l=Object(s.a)(n,2),c=l[0],i=l[1],o=r.a.useState(0),u=Object(s.a)(o,2),m=u[0],d=u[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Query Results"),r.a.createElement(pe,{rows:t,fields:a,rowsPerPage:c,page:m,handleChangePage:function(e,t){d(t)},handleChangeRowsPerPage:function(e){"A"==e.target.value.toString().charAt(0)&&(e.target.value=t.length),i(+e.target.value),d(0)}}))}function pe(e){var t=e.rows,a=e.fields,n=e.rowsPerPage,l=e.page,c=e.handleChangePage,i=e.handleChangeRowsPerPage;return r.a.createElement("div",null,r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,a.map((function(e,t){return r.a.createElement(X.a,{key:"col"+t},e)})))),r.a.createElement(V.a,null,t.slice(l*n,l*n+n).map((function(e){return r.a.createElement(Z.a,{key:"row"+e.id},a.map((function(t){return r.a.createElement(X.a,{key:t},e[t])})))})))),r.a.createElement(me.a,{rowsPerPageOptions:[5,10,25,"All "+t.length.toString()+" Rows"],component:"div",count:t.length,rowsPerPage:n,page:l,onChangePage:c,onChangeRowsPerPage:i}))}var he=a(544),Ee=a(533),ge=Object(O.a)((function(e){return{root:{margin:e.spacing(1)}}}));function fe(e){var t,a,n,r=[];for(t=0;t<e.length;t++)r.push((a=t,(n=e[t]).id=a,n));return r}function ve(e){var t=ge();return r.a.createElement("div",{className:t.root},r.a.createElement(Ee.a,{variant:"outlined",onClick:e.onClick},"Submit"))}var be=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(oe.a)(n)),n.handleQuery=n.handleQuery.bind(Object(oe.a)(n)),n.state={value:"",rows:[],fields:[],rowsPerPage:5,status:"inputRequired",errorMessage:""},n}return Object(ie.a)(a,[{key:"handleQuery",value:function(){var e=Object(F.a)(B.a.mark((function e(){var t,a,n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.value,this.setState({status:"loading"}),e.prev=2,e.next=5,Q.a.post("/campaign",new URLSearchParams({query:t}));case 5:if(a=e.sent,"200"===(n=a.data).meta.status){e.next=11;break}throw new Error(n.meta.message);case 11:this.setState({rows:fe(n.response),fields:n.fieldmask,status:"loaded"});case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),console.log(e.t0.message),this.setState({status:"error",errorMessage:e.t0.message});case 18:case"end":return e.stop()}}),e,this,[[2,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){switch(this.state.status){case"inputRequired":return r.a.createElement(q,null," Enter a query to see the results ");case"loading":return r.a.createElement(q,null," Loading ... ");case"loaded":return r.a.createElement(de,{rows:this.state.rows,fields:this.state.fields,rowsPerPage:this.state.rowsPerPage});case"error":return r.a.createElement(q,null,"Something Went Wrong. Here's the Error Message: "+this.state.errorMessage);default:return r.a.createElement(q,null," Something Went Wrong")}}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Query Here"),r.a.createElement(he.a,{value:this.state.value,onChange:this.handleChange,id:"standard-full-width",label:"Enter Query",style:{margin:8},placeholder:"Placeholder",helperText:"make sure to select an account!",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0}}),r.a.createElement(ve,{onClick:this.handleQuery}),this.pickContentToDisplay())}}]),a}(r.a.Component),ye=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).getClient=n.getClient.bind(Object(oe.a)(n)),n.state={selectedClient:[],status:"none selected"},n}return Object(ie.a)(a,[{key:"getClient",value:function(){var e=Object(F.a)(B.a.mark((function e(){var t,a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({status:"loading"}),e.next=3,Q.a.get("/client");case 3:t=e.sent,a=t.data,console.log(a),a.loginId?this.setState({selectedClient:a,status:"loaded"}):this.setState({status:"none selected"});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){var e=this.state.selectedClient;switch(this.state.status){case"none selected":return r.a.createElement(b.a,{variant:"overline"},"Select a client on the login page.");case"loading":return r.a.createElement(b.a,{variant:"overline"},"Loading . . .");case"loaded":return r.a.createElement(V.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,{key:e.loginId},e.loginId),r.a.createElement(X.a,{key:e.customerId},e.customerId)));default:return r.a.createElement(b.a,{variant:"overline"},"Select a client on the login page.")}}},{key:"componentDidMount",value:function(){this.getClient()}},{key:"render",value:function(){var e=this.state.selectedClient;return console.log(e),r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Selected Client Account to Query"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Customer ID"),r.a.createElement(X.a,null,"Client Account"))),this.pickContentToDisplay()))}}]),a}(r.a.Component),ke=Object(O.a)(ne);function we(e){var t=ke();return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(A.a,{className:t.paper},r.a.createElement(ye,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(A.a,{className:t.paper},r.a.createElement(be,null)))))}var Ce=Object(O.a)({depositContext:{flex:1}});function je(e){var t=Ce();return r.a.createElement("div",{className:t.root},r.a.createElement(Ee.a,{variant:"outlined"},r.a.createElement("a",{style:{textDecoration:"none"},href:e.onClick},"Add Account")))}var Oe=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).handleLogin=n.handleLogin.bind(Object(oe.a)(n)),n.state={redirect:""},n}return Object(ie.a)(a,[{key:"handleLogin",value:function(){var e=this,t=new Request("/oauth",{accept:"application/json",method:"GET"});fetch(t).then((function(e){return e.text()})).then((function(t){console.log(t),e.setState({redirect:t})}))}},{key:"componentDidMount",value:function(){window.addEventListener("load",this.handleLogin)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("load",this.handleLogin)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Authenticate your Ads Account"),r.a.createElement(je,{onClick:this.state.redirect}))}}]),a}(r.a.Component),xe=a(545),Se=function(e){Object(se.a)(a,e);var t=Object(ue.a)(a);function a(e){var n;return Object(ce.a)(this,a),(n=t.call(this,e)).fetchCustomers=n.fetchCustomers.bind(Object(oe.a)(n)),n.handleClick=n.handleClick.bind(Object(oe.a)(n)),n.isSelected=n.isSelected.bind(Object(oe.a)(n)),n.state={customerIds:[],selected:"",status:"none authenticated"},n}return Object(ie.a)(a,[{key:"fetchCustomers",value:function(){var e=Object(F.a)(B.a.mark((function e(){var t,a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({status:"loading"}),e.next=3,Q.a.get("/customer");case 3:t=e.sent,a=t.data,console.log(a.response),a.response?this.setState({customerIds:a.response,status:"loaded"}):this.setState({status:"none authenticated"});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){var e=this,t=this.state.customerIds;switch(console.log(t),this.state.status){case"none authenticated":return r.a.createElement(b.a,{variant:"overline"},"Log in to access your accounts.");case"loading":return r.a.createElement(b.a,{variant:"overline"},"Loading . . .");case"loaded":return r.a.createElement(V.a,null,t.map((function(t){return r.a.createElement(Z.a,{key:t.id,onClick:function(a){return e.handleClick(a,t)},role:"checkbox","aria-checked":e.isSelected(t.id),tabIndex:-1,selected:e.isSelected(t.id),hover:!0},r.a.createElement(X.a,{padding:"checkbox"},r.a.createElement(xe.a,{checked:e.isSelected(t.id)})),r.a.createElement(X.a,{key:t.id},t.id),r.a.createElement(X.a,{key:t.children},t.children),r.a.createElement(X.a,{key:t.name},t.name))})));default:return r.a.createElement(b.a,{variant:"overline"},"Log in to access your accounts.")}}},{key:"componentDidMount",value:function(){this.fetchCustomers(),this.setState({selected:""})}},{key:"isSelected",value:function(e){return this.state.selected===e}},{key:"handleClick",value:function(){var e=Object(F.a)(B.a.mark((function e(t,a){var n,r,l,c;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({selected:a.id}),n=a.id,r=a.children,console.log(a.id),console.log(a.children),e.next=7,Q.a.post("/client",new URLSearchParams({loginId:n,customerId:r}));case 7:l=e.sent,c=l.data,alert(c);case 10:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null,"Available Customer IDs"),r.a.createElement(J.a,{size:"small"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(X.a,null,"Select"),r.a.createElement(X.a,null,"Login ID"),r.a.createElement(X.a,null,"Client Account ID"),r.a.createElement(X.a,null,"Client Account Name"))),this.pickContentToDisplay()))}}]),a}(r.a.Component),Pe=Object(O.a)(ne);function Ie(e){var t=Pe();return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{container:!0,spacing:3},r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(A.a,{className:t.paper},r.a.createElement(Oe,null))),r.a.createElement(L.a,{item:!0,xs:12},r.a.createElement(A.a,{className:t.paper},r.a.createElement(Se,null)))))}var De=[{name:"Login",route:"/",icon:r.a.createElement(S.a,null),component:r.a.createElement(Ie,null)},{name:"Dashboard",route:"/Dashboard",icon:r.a.createElement(I.a,null),component:r.a.createElement(le,null)},{name:"Queries",route:"/Query",icon:r.a.createElement(N.a,null),component:r.a.createElement(we,null)}],Ne=a(528),Le=a(534),Ae=a(535),Re=a(86),Be=function(e){return r.a.createElement(Ne.a,{button:!0,key:e.name,component:Re.b,to:e.route},r.a.createElement(Le.a,null,e.icon),r.a.createElement(Ae.a,{primary:e.name}))},Fe=r.a.createElement("div",null,De.map(Be)),Te=Object(O.a)(ne);function We(e){var t=Te(),a=r.a.useState(!0),n=Object(s.a)(a,2),l=n[0],c=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{position:"absolute",className:Object(u.a)(t.appBar,l&&t.appBarShift)},r.a.createElement(d.a,{className:t.toolbar},r.a.createElement(p.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){c(!0)},className:Object(u.a)(t.menuButton,l&&t.menuButtonHidden)},r.a.createElement(E.a,null)),r.a.createElement(b.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"Google Ads API Web App Demo"),r.a.createElement(p.a,{color:"inherit"},r.a.createElement(v.a,{badgeContent:4,color:"secondary"},r.a.createElement(f.a,null))))),r.a.createElement(y.a,{variant:"permanent",classes:{paper:Object(u.a)(t.drawerPaper,!l&&t.drawerPaperClose)},open:l},r.a.createElement("div",{className:t.toolbarIcon},r.a.createElement(p.a,{onClick:function(){c(!1)}},r.a.createElement(j.a,null))),r.a.createElement(w.a,null),r.a.createElement(k.a,null,Fe)))}var Me=a(16),Qe=function(e){return r.a.createElement(Me.a,{exact:!0,path:e.route},e.component)},qe=function(){return De.map(Qe)},ze=function(){return console.log(qe()),r.a.createElement(Me.c,null,qe())},He=Object(O.a)(ne);function Ge(){var e=He();return r.a.createElement("div",{className:e.root},r.a.createElement(i.a,null),r.a.createElement(Re.a,null,r.a.createElement(We,null),r.a.createElement("main",{className:e.content},r.a.createElement("div",{className:e.appBarSpacer}),r.a.createElement(o.a,{maxWidth:"lg",className:e.container},r.a.createElement(ze,null)))))}c.a.render(r.a.createElement(Ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[270,1,2]]]);
//# sourceMappingURL=main.193677f6.chunk.js.map