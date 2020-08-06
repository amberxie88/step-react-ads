(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{284:function(e,t,a){e.exports=a(490)},289:function(e,t,a){},490:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),c=a.n(l);a(289),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=a(25),s=a(555),i=a(556),u=a(4),m=a(553),d=a(546),h=a(544),g=a(246),p=a.n(g),E=a(247),f=a.n(E),v=a(98),b=a(562),k=a(549),w=a(554),y=a(248),C=a.n(y),O=a(536),S=a(243),j=a.n(S),x=a(244),A=a.n(x),P=a(245),I=a.n(P),T=a(543),D=a(491),L=a(16),W=a.n(L),N=a(20),B=a(29),R=a(26),M=a(23),Q=a.n(M),q=a(52);function F(e){return r.a.createElement(v.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function G(){var e=Object(B.a)(),t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)("loading"),i=Object(o.a)(s,2),u=i[0],m=i[1];Object(n.useEffect)((function(){Object(N.a)(W.a.mark((function e(){var t;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(t={meta:{status:q.OK.toString()},response:{data:[{time:"00:00",amount:0},{time:"03:00",amount:300},{time:"06:00",amount:600},{time:"09:00",amount:800},{time:"12:00",amount:1500},{time:"15:00",amount:2e3},{time:"18:00",amount:2400},{time:"21:00",amount:2400},{time:"24:00",amount:"undefined"}]}}).meta.status===q.OK.toString()){e.next=6;break}throw new Error(t.meta.message);case 6:c(t.response.data),m("loaded");case 8:e.next=15;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message),c(e.t0.message),m("error");case 15:case"end":return e.stop()}}),e,null,[[0,10]])})))()}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Today's Sales"),function(){switch(u){case"loading":return r.a.createElement(F,null," Loading ... ");case"loaded":return r.a.createElement(R.h,null,r.a.createElement(R.g,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(R.j,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(R.k,{stroke:e.palette.text.secondary},r.a.createElement(R.d,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(R.f,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1})));case"error":return r.a.createElement(F,null,"Something Went Wrong. Here's the Error Message: "+l);default:return r.a.createElement(F,null," Something Went Wrong")}}())}function H(){var e=Object(B.a)(),t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)("loading"),i=Object(o.a)(s,2),u=i[0],m=i[1];Object(n.useEffect)((function(){Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Q.a.get("/data");case 3:if(t=e.sent,a=t.data,console.log(a),a.meta.status===q.OK.toString()){e.next=10;break}throw new Error(a.meta.message);case 10:c(a.response),m("loaded");case 12:e.next=19;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0.message),c(e.t0.message),m("error");case 19:case"end":return e.stop()}}),e,null,[[0,14]])})))()}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Clicks Per Campaign"),function(){switch(u){case"loading":return r.a.createElement(F,null," Loading ... ");case"loaded":return r.a.createElement(R.h,null,r.a.createElement(R.b,{data:l,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(R.c,{strokeDasharray:"3 3"}),r.a.createElement(R.j,{dataKey:"campaign.name",stroke:e.palette.text.secondary}),r.a.createElement(R.k,null),r.a.createElement(R.i,null),r.a.createElement(R.e,null),r.a.createElement(R.a,{dataKey:"metrics.clicks",fill:"#8884d8"})));case"error":return r.a.createElement(F,null,"Something Went Wrong. Here's the Error Message: "+l);default:return r.a.createElement(F,null," Something Went Wrong")}}())}var U=a(537);function K(e){e.preventDefault()}var z=Object(O.a)({depositContext:{flex:1}});function J(){var e=z();return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Total Ad Spend"),r.a.createElement(v.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(v.a,{color:"textSecondary",className:e.depositContext},"as of 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(U.a,{color:"primary",href:"#",onClick:K},"View more")))}var $=a(538),Y=a(542),V=a(541),X=a(539),Z=a(540),_=Object(O.a)((function(e){return{seeMore:{marginTop:e.spacing(3)}}}));function ee(){_();var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)("loading"),s=Object(o.a)(c,2),i=s[0],u=s[1];Object(n.useEffect)((function(){Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Q.a.post("/campaign",new URLSearchParams({query:"SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions FROM campaign ORDER BY campaign.id          "}));case 3:if(t=e.sent,(a=t.data).meta.status===q.OK.toString()){e.next=9;break}throw new Error(a.meta.message);case 9:l(a.response),u("loaded");case 11:e.next=18;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0.message),l(e.t0.message),u("error");case 18:case"end":return e.stop()}}),e,null,[[0,13]])})))()}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Campaign Data"),function(){switch(i){case"loading":return r.a.createElement(F,null," Loading ... ");case"loaded":return r.a.createElement($.a,{size:"small"},r.a.createElement(X.a,null,r.a.createElement(Z.a,null,r.a.createElement(V.a,null,"Id"),r.a.createElement(V.a,null,"Name"),r.a.createElement(V.a,null,"Status"),r.a.createElement(V.a,null,"Clicks"),r.a.createElement(V.a,null,"Impressions"))),r.a.createElement(Y.a,null,a.map((function(e){return r.a.createElement(Z.a,{key:e["campaign.id"]},r.a.createElement(V.a,null,e["campaign.id"]),r.a.createElement(V.a,null,e["campaign.name"]),r.a.createElement(V.a,null,e["campaign.status"]),r.a.createElement(V.a,null,e["metrics.clicks"]),r.a.createElement(V.a,null,e["metrics.impressions"]))}))));case"error":return r.a.createElement(F,null,"Something Went Wrong. Here's the Error Message: "+a);default:return r.a.createElement(F,null," Something Went Wrong")}}())}var te=a(79),ae=a(120),ne=a(242),re=function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(ne.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(ae.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}},le=[{target:"body",content:r.a.createElement("div",null,r.a.createElement("h1",null,"Welcome to the Query Page!"),r.a.createElement("p",null,"This page is a sample of how the Ads API can be used to obtain information about an account. The queries follow the Google Ads Query Language (",r.a.createElement("a",{href:"https://developers.google.com/google-ads/api/docs/query/interactive-gaql-builder"},"GAQL"),"), which is then processed by the servlet. The code primarily lies in QueryDashboard.js and GetCampaignsServlet.java")),placement:"center"},{target:".selected-account",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Select Your Client Account"),r.a.createElement("p",null,"After authenticating on the Login page, the user is prompted to select a client account to query. Under every Google Ads account, there can be multiple manager accounts, which may manage separate clients or other managers. To learn more about how we keep track of client accounts of different sessions, revisit our login page!"))},{target:".query-card",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Query Card"),r.a.createElement("p",null,"Here, the user may enter any query that follows the GAQL syntax, and the results will be generated below. Users will be notified if any error occurs during the Ads API call. To build your own GAQL queries or learn more about the GAQL syntax, visit ",r.a.createElement("a",{href:"https://developers.google.com/google-ads/api/docs/query/interactive-gaql-builder"},"this link"),"."))}],ce=[{target:"body",content:r.a.createElement("div",null,r.a.createElement("h1",null,"Welcome to the Google Ads API Web App Demo!"),r.a.createElement("p",null,"Throughout the website, we will have a series of tours showing how we implemented the Ads API into a simple web application, and how you can do so as well! Intermediate developers have historically struggled with integrating the API, especially in regards to the OAuth 2.0 web flow, and we hope this will serve as a starter project or example of how the Ads API can be used. Check out our ",r.a.createElement("a",{href:"https://github.com/amberxie88/step-react-ads"},"Github page"),".")),placement:"center"},{target:"body",content:r.a.createElement("div",null,r.a.createElement("h1",null,"This is the Login Page"),r.a.createElement("p",null,"This Login Page implements the OAuth 2.0 procedure, a historically challenging task for Intermediate developers. To implement this, we rely on two main servlets: OAuthServlet.java and CallbackServlet.java, and we use Datastore to maintain credentials and refresh tokens for each session.")),placement:"center"},{target:".login-button",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Login Button"),r.a.createElement("p",null,"This Login Button makes a call to the OAuth servlet, which retrieves the necessary credentials, the redirect URI, and the current HTTP Session to generate a unique URL for login. After the user logs in, they are redirected to the redirect URI, which is the Callback Servlet. The servlet verifies that it is retrieving the correct token for the session, generates the refresh token, and stores it in Datastore. It is important to note that each session is mapped to different refresh tokens."))},{target:".available-accounts",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Available Customer IDs"),r.a.createElement("p",null,"Once the user is logged in, the AccessibleCustomersServlet is called. This makes a call to the Ads API and returns client accounts that the user has access to. The user may choose one, and the SetClientAccServlet is called, which maps the session ID to the selected customer ID, and uploads it to Datastore."))},{target:".logout-button",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Logout Button"),r.a.createElement("p",null,"At any point, if the user chooses to log in, their refresh token will be removed from Datastore via the LogoutServlet."))}],oe=[{target:"body",content:r.a.createElement("div",null,r.a.createElement("h1",null,"Welcome to the Dashboard Page!"),r.a.createElement("p",null,"This page is a sample of how the Ads UI can be replicated and customized using custom calls and charts. The code primarily lies in ReportsDashboard.js and GetCampaignsServlet.java")),placement:"center"},{target:".clicks-per-campaign",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Clicks Per Campaign Chart"),r.a.createElement("p",null,"This chart uses API data from your Ads Account to visualize how well campaigns are doing. This is an example of a chart that can be directly replicated from the Google Ads UI."))},{target:".chart-1",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Sales Chart"),r.a.createElement("p",null,"TODO: Details on how this is used."))},{target:".recent-deposits",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Total Ad Spend"),r.a.createElement("p",null,"TODO: Details on how this is used."))},{target:".campaign-data",content:r.a.createElement("div",null,r.a.createElement("h2",null,"Campaign Data"),r.a.createElement("p",null,"This list of campaign IDs, names, status, clicks, and impressions is generated from a call to the Ads API."))}],se=Object(O.a)(re);var ie=a(42),ue=a(43),me=a(28),de=a(45),he=a(44),ge=a(559);function pe(e){var t=e.rows,a=e.fields,n=r.a.useState(10),l=Object(o.a)(n,2),c=l[0],s=l[1],i=r.a.useState(0),u=Object(o.a)(i,2),m=u[0],d=u[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Query Results"),r.a.createElement(Ee,{rows:t,fields:a,rowsPerPage:c,page:m,handleChangePage:function(e,t){d(t)},handleChangeRowsPerPage:function(e){"A"===e.target.value.toString().charAt(0)&&(e.target.value=t.length),s(+e.target.value),d(0)}}))}function Ee(e){var t=e.rows,a=e.fields,n=e.rowsPerPage,l=e.page,c=e.handleChangePage,o=e.handleChangeRowsPerPage;return r.a.createElement("div",null,r.a.createElement($.a,{size:"small"},r.a.createElement(X.a,null,r.a.createElement(Z.a,null,a.map((function(e,t){return r.a.createElement(V.a,{key:"col"+t},e)})))),r.a.createElement(Y.a,null,t.slice(l*n,l*n+n).map((function(e){return r.a.createElement(Z.a,{key:"row"+e.id},a.map((function(t){return r.a.createElement(V.a,{key:t},e[t])})))})))),r.a.createElement(ge.a,{rowsPerPageOptions:[5,10,25,"All "+t.length.toString()+" Rows"],component:"div",count:t.length,rowsPerPage:n,page:l,onChangePage:c,onChangeRowsPerPage:o}))}var fe=a(560),ve=a(550),be=Object(O.a)((function(e){return{root:{margin:e.spacing(1)}}}));function ke(e){var t,a,n,r=[];for(t=0;t<e.length;t++)r.push((a=t,(n=e[t]).id=a,n));return r}function we(e){var t=be();return r.a.createElement("div",{className:t.root},r.a.createElement(ve.a,{variant:"outlined",onClick:e.onClick},"Submit"))}function ye(e){var t=be();return r.a.createElement("div",{className:t.root},r.a.createElement(ve.a,{variant:"outlined",onClick:e.onClick},"Export to Google Sheets"))}var Ce=function(e){Object(de.a)(a,e);var t=Object(he.a)(a);function a(e){var n;return Object(ie.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(me.a)(n)),n.handleQuery=n.handleQuery.bind(Object(me.a)(n)),n.state={value:"",rows:[],fields:[],rowsPerPage:5,status:"inputRequired",errorMessage:""},n}return Object(ue.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleQuery",value:function(){var e=Object(N.a)(W.a.mark((function e(t,a){var n,r,l;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.value,a||this.setState({status:"loading"}),e.prev=2,e.next=5,Q.a.post("/campaign",new URLSearchParams({query:n,exportTable:a}));case 5:if(r=e.sent,(l=r.data).meta.status===q.OK.toString()){e.next=11;break}throw new Error(l.meta.message);case 11:a?alert("export successful"):this.setState({rows:ke(l.response),fields:l.fieldmask,status:"loaded"});case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),console.log(e.t0.message),this.setState({status:"error",errorMessage:e.t0.message});case 18:case"end":return e.stop()}}),e,this,[[2,14]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){var e=this;switch(this.state.status){case"inputRequired":return r.a.createElement(F,null," Enter a query to see the results ");case"loading":return r.a.createElement(F,null," Loading ... ");case"loaded":return r.a.createElement(r.a.Fragment,null,r.a.createElement(pe,{rows:this.state.rows,fields:this.state.fields,rowsPerPage:this.state.rowsPerPage}),r.a.createElement(ye,{onClick:function(t){return e.handleQuery(t,!0)}}));case"error":return r.a.createElement(F,null,"Something Went Wrong. Here's the Error Message: "+this.state.errorMessage);default:return r.a.createElement(F,null," Something Went Wrong")}}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Query Here"),r.a.createElement(fe.a,{value:this.state.value,onChange:this.handleChange,id:"standard-full-width",label:"Enter Query",style:{margin:8},placeholder:"SELECT campaign.id, campaign.name FROM campaign",helperText:"make sure to select an account!",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0}}),r.a.createElement(we,{onClick:function(t){return e.handleQuery(t,!1)}}),this.pickContentToDisplay())}}]),a}(r.a.Component),Oe=function(e){Object(de.a)(a,e);var t=Object(he.a)(a);function a(e){var n;return Object(ie.a)(this,a),(n=t.call(this,e)).getClient=n.getClient.bind(Object(me.a)(n)),n.state={selectedClient:[],status:"none selected"},n}return Object(ue.a)(a,[{key:"getClient",value:function(){var e=Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({status:"loading"}),e.next=3,Q.a.get("/client");case 3:t=e.sent,a=t.data,console.log(a),a.loginId?this.setState({selectedClient:a,status:"loaded"}):this.setState({status:"none selected"});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){var e=this.state.selectedClient;switch(this.state.status){case"none selected":return r.a.createElement(v.a,{variant:"overline"},"Select a client on the login page.");case"loading":return r.a.createElement(v.a,{variant:"overline"},"Loading . . .");case"loaded":return r.a.createElement(Y.a,null,r.a.createElement(Z.a,null,r.a.createElement(V.a,{key:e.loginId},e.loginId),r.a.createElement(V.a,{key:e.customerId},e.customerId),r.a.createElement(V.a,{key:e.name},e.name)));default:return r.a.createElement(v.a,{variant:"overline"},"Select a client on the login page.")}}},{key:"componentDidMount",value:function(){this.getClient()}},{key:"render",value:function(){var e=this.state.selectedClient;return console.log(e),r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Select a Client Account to Query"),r.a.createElement($.a,{size:"small"},r.a.createElement(X.a,null,r.a.createElement(Z.a,null,r.a.createElement(V.a,null,"Customer ID"),r.a.createElement(V.a,null,"Client Account ID"),r.a.createElement(V.a,null,"Client Account Name"))),this.pickContentToDisplay()))}}]),a}(r.a.Component),Se=Object(O.a)(re);var je=Object(O.a)({depositContext:{flex:1}});function xe(e){var t=je();return r.a.createElement("div",{className:t.root},r.a.createElement(ve.a,{variant:"outlined"},r.a.createElement("a",{style:{textDecoration:"none"},href:e.onClick},"Add Account")))}var Ae=function(e){Object(de.a)(a,e);var t=Object(he.a)(a);function a(e){var n;return Object(ie.a)(this,a),(n=t.call(this,e)).handleLogin=n.handleLogin.bind(Object(me.a)(n)),n.state={redirect:""},n}return Object(ue.a)(a,[{key:"handleLogin",value:function(){var e=Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Q.a.get("/oauth");case 3:t=e.sent,a=t.data,this.setState({redirect:a}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(N.a)(W.a.mark((function e(){return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.handleLogin();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Authenticate your Ads Account"),r.a.createElement(xe,{onClick:this.state.redirect}))}}]),a}(r.a.Component),Pe=Object(O.a)({depositContext:{flex:1}});function Ie(e){var t=Pe();return r.a.createElement("div",{className:t.root},r.a.createElement(ve.a,{variant:"outlined",onClick:e.onClick},"Logout"))}var Te=function(e){Object(de.a)(a,e);var t=Object(he.a)(a);function a(e){var n;return Object(ie.a)(this,a),(n=t.call(this,e)).handleLogout=n.handleLogout.bind(Object(me.a)(n)),n}return Object(ue.a)(a,[{key:"handleLogout",value:function(){var e=Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("clicked"),e.next=3,Q.a.get("/logout");case 3:t=e.sent,a=t.data,alert(a),window.location.reload(!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Logout"),r.a.createElement(Ie,{onClick:this.handleLogout}))}}]),a}(r.a.Component),De=a(561),Le=function(e){Object(de.a)(a,e);var t=Object(he.a)(a);function a(e){var n;return Object(ie.a)(this,a),(n=t.call(this,e)).fetchCustomers=n.fetchCustomers.bind(Object(me.a)(n)),n.handleClick=n.handleClick.bind(Object(me.a)(n)),n.isSelected=n.isSelected.bind(Object(me.a)(n)),n.state={customerIds:[],selected:"",status:"none authenticated",errorMessage:""},n}return Object(ue.a)(a,[{key:"fetchCustomers",value:function(){var e=Object(N.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({status:"loading"}),e.prev=1,e.next=4,Q.a.get("/customer");case 4:if(t=e.sent,"200"===(a=t.data).meta.status){e.next=10;break}throw new Error(a.meta.message);case 10:console.log(a.response),this.setState({customerIds:a.response,status:"loaded"});case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0.message),this.setState({status:"none authenticated",errorMessage:e.t0.message});case 18:case"end":return e.stop()}}),e,this,[[1,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"pickContentToDisplay",value:function(){var e=this,t=this.state.customerIds;switch(this.state.status){case"none authenticated":return r.a.createElement(v.a,{variant:"overline"},"Log in to access your accounts.");case"error":return r.a.createElement(v.a,{variant:"overline"},"Something Went Wrong. Here's the Error Message: "+this.state.errorMessage);case"loading":return r.a.createElement(v.a,{variant:"overline"},"Loading . . .");case"loaded":return r.a.createElement(Y.a,null,t.map((function(t){return r.a.createElement(Z.a,{key:t.id,onClick:function(a){return e.handleClick(a,t)},role:"checkbox","aria-checked":e.isSelected(t.child),tabIndex:-1,selected:e.isSelected(t.child),hover:!0},r.a.createElement(V.a,{padding:"checkbox"},r.a.createElement(De.a,{checked:e.isSelected(t.child)})),r.a.createElement(V.a,{key:t.id},t.id),r.a.createElement(V.a,{key:t.child},t.child),r.a.createElement(V.a,{key:t.name},t.name))})));default:return r.a.createElement(v.a,{variant:"overline"},"Log in to access your accounts.")}}},{key:"componentDidMount",value:function(){this.fetchCustomers(),this.setState({selected:""})}},{key:"isSelected",value:function(e){return this.state.selected===e}},{key:"handleClick",value:function(){var e=Object(N.a)(W.a.mark((function e(t,a){var n,r,l,c,o;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({selected:a.child}),n=a.id,r=a.child,l=a.name,e.next=6,Q.a.post("/client",new URLSearchParams({loginId:n,customerId:r,name:l}));case 6:c=e.sent,o=c.data,alert(o);case 9:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,null,"Available Customer IDs"),r.a.createElement(v.a,{variant:"overline"},"Make sure to select an account before visiting the dashboard or query page."),r.a.createElement($.a,{size:"small"},r.a.createElement(X.a,null,r.a.createElement(Z.a,null,r.a.createElement(V.a,null,"Select"),r.a.createElement(V.a,null,"Login ID"),r.a.createElement(V.a,null,"Client Account ID"),r.a.createElement(V.a,null,"Client Account Name"))),this.pickContentToDisplay()))}}]),a}(r.a.Component),We=Object(O.a)(re);var Ne=[{name:"Login",route:"/",icon:r.a.createElement(j.a,null),component:function(e){var t=We();return r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{steps:ce,continuous:!0,showProgress:!0,showSkipButton:!0,run:e.runTutorial,callback:e.handleJoyrideCallback}),r.a.createElement(T.a,{container:!0,spacing:3},r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" login-button"},r.a.createElement(Ae,null))),r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" available-accounts"},r.a.createElement(Le,null))),r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" logout-button"},r.a.createElement(Te,null)))))}},{name:"Dashboard",route:"/Dashboard",icon:r.a.createElement(A.a,null),component:function(e){var t=se(),a=Object(u.a)(t.paper,t.fixedHeight);return r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{steps:oe,continuous:!0,showProgress:!0,showSkipButton:!0,run:e.runTutorial,callback:e.handleJoyrideCallback}),r.a.createElement(T.a,{container:!0,spacing:3},r.a.createElement(T.a,{item:!0,xs:12,md:12,xl:5},r.a.createElement(D.a,{className:a+" clicks-per-campaign"},r.a.createElement(H,null))),r.a.createElement(T.a,{item:!0,xs:12,md:8,xl:5},r.a.createElement(D.a,{className:a+" chart-1"},r.a.createElement(G,null))),r.a.createElement(T.a,{item:!0,xs:12,md:4,xl:2},r.a.createElement(D.a,{className:a+" recent-deposits"},r.a.createElement(J,null))),r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" campaign-data"},r.a.createElement(ee,null)))))}},{name:"Queries",route:"/Query",icon:r.a.createElement(I.a,null),component:function(e){var t=Se();return r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{steps:le,continuous:!0,showProgress:!0,showSkipButton:!0,run:e.runTutorial,callback:e.handleJoyrideCallback}),r.a.createElement(T.a,{container:!0,spacing:3},r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" selected-account"},r.a.createElement(Oe,null))),r.a.createElement(T.a,{item:!0,xs:12},r.a.createElement(D.a,{className:t.paper+" query-card"},r.a.createElement(Ce,null)))))}}],Be=a(545),Re=a(551),Me=a(552),Qe=a(91),qe=function(e){return r.a.createElement(Be.a,{button:!0,key:e.name,component:Qe.b,to:e.route},r.a.createElement(Re.a,null,e.icon),r.a.createElement(Me.a,{primary:e.name}))},Fe=function(){return r.a.createElement("div",null,Ne.map(qe))},Ge=Object(O.a)(re);function He(e){var t=Ge(),a=r.a.useState(!0),n=Object(o.a)(a,2),l=n[0],c=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{position:"absolute",className:Object(u.a)(t.appBar,l&&t.appBarShift)},r.a.createElement(d.a,{className:t.toolbar},r.a.createElement(h.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){c(!0)},className:Object(u.a)(t.menuButton,l&&t.menuButtonHidden)},r.a.createElement(p.a,null)),r.a.createElement(v.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"Google Ads API Web App Demo"),r.a.createElement(h.a,{color:"inherit",onClick:function(){e.setTutorial(!0)}},r.a.createElement(f.a,null)))),r.a.createElement(b.a,{variant:"permanent",classes:{paper:Object(u.a)(t.drawerPaper,!l&&t.drawerPaperClose)},open:l},r.a.createElement("div",{className:t.toolbarIcon},r.a.createElement(h.a,{onClick:function(){c(!1)}},r.a.createElement(C.a,null))),r.a.createElement(w.a,null),r.a.createElement(k.a,null,r.a.createElement(Fe,{message:"ok"}))))}var Ue=a(18),Ke=function(e,t){return Ne.map((function(a){return function(e,t,a){return r.a.createElement(Ue.a,{exact:!0,path:e.route},r.a.createElement(e.component,{runTutorial:t,handleJoyrideCallback:a}))}(a,e,t)}))},ze=function(e){return r.a.createElement(Ue.c,null,Ke(e.tutorial,e.handleJoyrideCallback))},Je=Object(O.a)(re);function $e(){var e=r.a.useState(!0),t=Object(o.a)(e,2),a=t[0],n=t[1],l=Je();return r.a.createElement("div",{className:l.root},r.a.createElement(s.a,null),r.a.createElement(Qe.a,null,r.a.createElement(He,{setTutorial:n}),r.a.createElement("main",{className:l.content},r.a.createElement("div",{className:l.appBarSpacer}),r.a.createElement(i.a,{maxWidth:"lg",className:l.container},r.a.createElement(ze,{tutorial:a,handleJoyrideCallback:function(e){var t=e.status;e.type,"ready"==t&&n(!1)}})))))}c.a.render(r.a.createElement($e,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[284,1,2]]]);
//# sourceMappingURL=main.2a689a5e.chunk.js.map