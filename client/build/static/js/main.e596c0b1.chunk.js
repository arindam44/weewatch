(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{124:function(e,t,n){},125:function(e,t,n){},148:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=148},174:function(e,t){},179:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n(0),o=n.n(c),i=n(10),s=n.n(i),r=(n(124),n(125),n(215)),l=n(78),d=n.n(l)()({styles:{palette:{primary:{light:"#7986cb",main:"#3f51b5",dark:"#303f9f",contrastText:"#fff"},secondary:{light:"#ec407a",main:"#e91e63",dark:"#d81b60",contrastText:"#fff"}},button:{borderRadius:20,textTransform:"none",width:"80%"}}}),j=n(58),u=n(11),b=n(13),m=n(19),O=n.p+"static/media/logo.d9ba0f21.png",f=n(221),h=n(106),v=n.n(h),x=n(107),g=n.n(x)()("http://localhost:5000"),p=new v.a;console.log(p),p.on("open",(function(e){console.log("aasdasA"+e)}));var y=n(31),w=n.n(y),S=n(223),N=n(212),C=n(213),I=n(214),E=n(108),k=n(220);var T=w()((function(e){return Object(m.a)(Object(m.a)({},e.styles),{},{text:{marginLeft:"5%"}})}))((function(e){var t=e.classes,n=e.open,c=e.setOpen,o=e.userName,i=(e.userId,e.call);return Object(a.jsxs)(S.a,{open:n,maxWidth:"sm",fullWidth:!0,children:[Object(a.jsx)(N.a,{children:"Joining Request"}),Object(a.jsx)(C.a,{children:Object(a.jsxs)(E.a,{variant:"h6",color:"textPrimary",align:"left",className:t.text,children:[Object(a.jsx)("b",{children:o})," wants to join"]})}),Object(a.jsxs)(I.a,{children:[Object(a.jsx)(k.a,{variant:"outlined",color:"secondary",onClick:function(){c(!1)},className:t.button,children:"Reject"}),Object(a.jsx)(k.a,{variant:"contained",color:"primary",onClick:function(){i&&navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){console.log("stream---",e),i.answer(e),c(!1)}))},className:t.button,children:"Accept"})]})]})})),F=n(216);var L=w()((function(e){return Object(m.a)(Object(m.a)({},e.styles),{},{ownVideoContainer:{position:"relative"},ownVideo:{width:"100%",objectFit:"cover",bottom:20,right:10},name:{marginLeft:10}})}))((function(e){var t=e.classes,n=e.name,o=e.roomId,i=e.userStream,s=Object(u.f)(),r=Object(u.g)(),l=Object(c.useState)(!1),d=Object(b.a)(l,2),j=d[0],m=d[1],O=Object(c.useState)(null),f=Object(b.a)(O,2),h=f[0],v=f[1],x=Object(c.useState)(null),y=Object(b.a)(x,2),w=y[0],S=y[1],N=Object(c.useState)(null),C=Object(b.a)(N,2),I=C[0],k=C[1];Object(c.useEffect)((function(){if(n&&g&&p){console.log("socket------",g),console.log("peer-------",p);window.location.pathname;var e="/room/".concat(o);window.history.pushState(null,null,e);var t=document.getElementById("ownVideo");if(navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){e,t.srcObject=e,t.addEventListener("loadedmetadata",(function(){t.play()}))})),p.on("call",(function(e){m(!0),k(e)})),g.on("user-connected",(function(e,t){console.log("user connected---",e,t),v(e),S(t)})),i){var a=document.createElement("video");L(a,i)}}else{var c=r.pathname.split("/");c=(c=c[c.length-1].split(","))[0],console.log(c),s.push({pathname:"/",state:{roomId:c}})}}),[]),Object(c.useEffect)((function(){if(I){var e=document.createElement("video");I.on("stream",(function(t){L(e,t)}))}}),[I]);var L=function(e,t){e.srcObject=t,e.addEventListener("loadedmetadata",(function(){e.play()})),document.getElementById("videoGrid").append(e)};return Object(a.jsxs)(F.a,{container:!0,children:[Object(a.jsxs)(F.a,{item:!0,sm:10,xs:12,children:[Object(a.jsx)(E.a,{variant:"h6",align:"left",className:t.name,children:n}),Object(a.jsx)("div",{className:t.videoGrid,id:"videoGrid"})]}),Object(a.jsx)(F.a,{item:!0,sm:2,xs:12,className:t.ownVideoContainer,children:Object(a.jsx)("video",{muted:!0,id:"ownVideo",className:t.ownVideo})}),Object(a.jsx)(T,{userName:w,userId:h,open:j,setOpen:m,call:I})]})})),M=n(218),W=n(217);var D=w()((function(e){return Object(m.a)(Object(m.a)({},e.styles),{},{spinnerContainer:{width:"100%",display:"flex",justifyContent:"center",marginTop:20,marginBottom:20}})}))((function(e){var t=e.classes;return Object(a.jsx)(S.a,{open:!0,maxWidth:"sm",fullWidth:!0,children:Object(a.jsxs)(W.a,{children:[Object(a.jsx)(E.a,{variant:"h5",children:"Asking To Join"}),Object(a.jsx)(E.a,{variant:"h6",children:"You will join as soon as someone lets you in..."}),Object(a.jsx)("div",{className:t.spinnerContainer,children:Object(a.jsx)(M.a,{color:"primary"})})]})})})),V=n(219);var B=w()((function(e){return Object(m.a)(Object(m.a)({},e.styles),{},{logo:{width:"15vw",height:"15vw",margin:"auto"},input:{margin:"20px auto"},buttonContainer:{display:"flex",justifyContent:"center"}})}))((function(e){var t=e.classes,n=(Object(u.f)(),Object(u.g)()),o=Object(c.useState)(n.state&&n.state.roomId||Object(f.a)()),i=Object(b.a)(o,2),s=i[0],r=(i[1],Object(c.useState)("")),l=Object(b.a)(r,2),d=l[0],j=l[1],m=Object(c.useState)(!1),h=Object(b.a)(m,2),v=h[0],x=h[1],y=Object(c.useState)(!1),w=Object(b.a)(y,2),S=w[0],N=w[1],C=Object(c.useState)(null),I=Object(b.a)(C,2),E=I[0],T=I[1],M=Object(c.useState)(null),W=Object(b.a)(M,2),B=W[0],J=W[1];return Object(c.useEffect)((function(){E&&E.on("stream",(function(e){x(!1),J(e),N(!0)}))}),[E]),Object(a.jsxs)(a.Fragment,{children:[v&&Object(a.jsx)(D,{}),S?Object(a.jsx)(L,{name:d,roomId:s,userStream:B}):Object(a.jsxs)(F.a,{container:!0,children:[Object(a.jsx)(F.a,{item:!0,sm:4}),Object(a.jsxs)(F.a,{item:!0,sm:4,xs:12,style:{padding:20,border:"2 px solid lightgray"},children:[Object(a.jsx)("img",{src:O,alt:"We Watch",className:t.logo}),Object(a.jsx)(V.a,{type:"text",variant:"outlined",className:t.input,fullWidth:!0,required:!0,value:d,label:"Name",onChange:function(e){j(e.target.value)}}),Object(a.jsx)("div",{className:t.buttonContainer,children:Object(a.jsx)(k.a,{variant:"contained",color:"primary",type:"submit",onClick:function(){console.log(s),console.log(p._lastServerId),s&&p._lastServerId&&(g.emit("join-room",s,p._lastServerId,d),n.state&&n.state.roomId?(x(!0),g.on("owner-id",(function(e){console.log(e),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(t){var n=p.call(e,t);console.log("calling---",e),T(n)}))}))):N(!0))},className:t.button,children:n.state&&n.state.roomId?"Join Meeting":"Start Meeting"})})]})]})]})}));var J=function(){return Object(a.jsx)(r.a,{theme:d,children:Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(j.a,{children:Object(a.jsxs)(u.c,{children:[Object(a.jsx)(u.a,{exact:!0,path:"/",component:B}),Object(a.jsx)(u.a,{exact:!0,path:"/room/:roomId",component:L})]})})})})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,225)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),o(e),i(e)}))};s.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(J,{})}),document.getElementById("root")),U()}},[[179,1,2]]]);
//# sourceMappingURL=main.e596c0b1.chunk.js.map