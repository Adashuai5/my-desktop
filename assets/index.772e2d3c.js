var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,i=(e,t)=>{for(var n in t||(t={}))r.call(t,n)&&s(e,n,t[n]);if(a)for(var n of a(t))o.call(t,n)&&s(e,n,t[n]);return e},l=(e,a)=>t(e,n(a));import{o as c,a as d,b as u,r as m,R as g,c as p,m as h,C as v,l as f,d as x}from"./vendor.3b950300.js";var E=Object.defineProperty,k=Object.getOwnPropertyDescriptor,b=(e,t,n,a)=>{for(var r,o=a>1?void 0:a?k(t,n):t,s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a?r(t,n,o):r(o))||o);return a&&o&&E(t,n,o),o};class w{constructor(){this.queue=[]}addModal(e){!this.queue.find((t=>t===e))&&this.queue.push(e)}removeModal(e){const t=this.queue.indexOf(e);-1!==t&&this.queue.splice(t,1)}}b([c],w.prototype,"queue",2),b([d],w.prototype,"addModal",1),b([d],w.prototype,"removeModal",1);var y=new w;var C=u((({children:e,domEl:t,data:n})=>{const[a,r]=m.exports.useState(1),o=document.getElementById(n.id),s=document.getElementById(n.moveId),c=localStorage.getItem(n.id)||null,d=c?JSON.parse(c):{x:-1===n.width?0:(window.innerWidth-n.width)/2,y:-1===n.height?0:(window.innerHeight-n.height)/2},[u,p]=m.exports.useState({isDragging:!1,origin:{x:0,y:0},position:d}),h=m.exports.useCallback((({clientX:e,clientY:t})=>{r(a+y.queue.length+1),p((n=>l(i({},n),{isDragging:!0,origin:{x:e-n.position.x,y:t-n.position.y}})))}),[a]),v=m.exports.useCallback((({clientX:e,clientY:t,target:n})=>{if(!u.isDragging||s&&n!==s)return;let a=e-u.origin.x,r=t-u.origin.y;a<=0?a=0:a>window.innerWidth-o.offsetWidth&&(a=window.innerWidth-o.offsetWidth),r<=0?r=0:r>window.innerHeight-o.offsetHeight&&(r=window.innerHeight-o.offsetHeight);const c={x:a,y:r};p((e=>l(i({},e),{position:c})))}),[u.isDragging,u.origin,s,o]),f=m.exports.useCallback((()=>{u.isDragging&&p((e=>l(i({},e),{isDragging:!1})))}),[u.isDragging]);m.exports.useEffect((()=>{-1===n.width&&p({isDragging:!1,origin:{x:0,y:0},position:{x:0,y:0}})}),[n.width]),m.exports.useEffect((()=>{if(t)return t.addEventListener("mousemove",v),t.addEventListener("mouseup",f),()=>{t.removeEventListener("mousemove",v),t.removeEventListener("mouseup",f),-1!==n.width&&localStorage.setItem(n.id,JSON.stringify(u.position))}}),[t,v,f,n.id,n.width,u.position]);const x=m.exports.useMemo((()=>({left:`${u.position.x}px`,top:`${u.position.y}px`,zIndex:a,display:n.isShow?"block":"none",position:"absolute"})),[u.position.x,u.position.y,a,n.isShow]);return g.createElement("div",{id:n.id,style:x,onMouseDown:h},e)}));const S=g.memo((({children:e,data:t})=>{const n=document.getElementById("main-view");return n?p.createPortal(g.createElement(C,{domEl:n,data:t},e),n):null})),L=e=>{const[t,n]=m.exports.useState(!1),a=m.exports.useCallback((()=>{n(!0),y.addModal(e)}),[e]),r=m.exports.useCallback((()=>{n(!1),y.removeModal(e)}),[e]);return{open:a,close:r,RenderModal:({children:e,data:n})=>g.createElement(g.Fragment,null,t&&g.createElement(S,{data:n,closeModal:r},e))}};const D=document.createElement("script");D.src="//at.alicdn.com/t/font_1848517_ds8sk573mfk.js",document.body.appendChild(D);const N=({className:e,type:t,style:n,svgRef:a,clickEvent:r})=>g.createElement("svg",{ref:a,className:e?"icon-font "+e:"icon-font","aria-hidden":"true",style:n,onClick:r},g.createElement("use",{xlinkHref:`#${t}`})),I=g.memo((()=>{const{open:e,close:t,RenderModal:n}=L("SettingView"),[a,r,o,s,c,d,u,p]=m.exports.useContext(q),v=[{title:"图标默认大小",value:1*u.length,max:"128",min:"25"},{title:"图标缩放后大小",value:1*u.bigLength,max:"256",min:"25"},{title:"图标之间距离大小",value:1*u.itemMargin,max:"10",min:"0"},{title:"Dock 距离屏幕边缘大小",value:1*u.distance,max:"100",min:"0"}],[f,x]=m.exports.useState("通用");m.exports.useEffect((()=>a.type?e():t()),[t,a,e]);const E=m.exports.useCallback(((e,t)=>{switch(t.title){case"图标默认大小":return void p({name:"change",dockData:l(i({},u),{length:e})});case"图标缩放后大小":return void p({name:"change",dockData:l(i({},u),{bigLength:e})});case"图标之间距离大小":return void p({name:"change",dockData:l(i({},u),{itemMargin:e})});case"Dock 距离屏幕边缘大小":return void p({name:"change",dockData:l(i({},u),{distance:e})})}}),[u,p]);return g.createElement(n,{data:{width:684,height:466,id:"SettingView",moveId:"SettingMove",isShow:o}},g.createElement(g.Fragment,null,g.createElement(h.TitleBar,{id:"SettingMove",controls:!0,inset:!0,isFullscreen:!1,onCloseClick:()=>{t(),r(l(i({},a),{type:!1})),localStorage.setItem("dockData",JSON.stringify(u)),localStorage.setItem("position",JSON.stringify(c))},onMinimizeClick:()=>{s(!1)},onMaximizeClick:e}),g.createElement("div",{className:"mainSet"},g.createElement(h.View,{className:"leftSet"},g.createElement(h.ListView,null,[{title:"通用"}].map(((e,t)=>g.createElement(h.ListViewRow,{key:e.title+t,onClick:()=>x(e.title),background:f===e.title?"#bfbfbf":null,padding:"11px 20px"},g.createElement(N,{type:"icon-ios-home",style:{marginRight:"6px"}}),g.createElement(h.Text,{color:"#414141",size:"14",bold:!0},e.title)))))),g.createElement(h.View,{className:"rightSet"},g.createElement(h.Text,{bold:!0,marginBottom:"10px",size:"20"},f),g.createElement("div",{className:"divide"}),v.map(((e,t)=>g.createElement("div",{className:"options",key:t+e.value},"图标缩放后大小"===e.title?g.createElement(h.Checkbox,{label:e.title,onChange:()=>p({name:"change",dockData:l(i({},u),{isDockBig:!u.isDockBig})}),defaultChecked:u.isDockBig}):g.createElement(h.Text,{bold:!0,marginBottom:"10px"},e.title),g.createElement("input",{min:e.min,max:e.max,type:"range",value:e.value,onChange:t=>{E(t.target.value,e)}}),g.createElement("span",null,e.value)))),g.createElement(h.Text,{bold:!0,marginBottom:"10px"},"Dock 所在屏幕位置"),g.createElement(h.View,{style:{lineHeight:"22px"}},["left","bottom","right","top"].map(((e,t)=>g.createElement("div",{style:{paddingRight:28},key:t+e},g.createElement(h.Radio,{label:e,name:e,onChange:e=>{d({name:"change",position:e.target.value})},defaultValue:e,defaultChecked:e===c})))))))))}));const M=()=>{const[e,t]=m.exports.useState({n1:"",n2:""}),[n,a]=m.exports.useState(""),[r,o]=m.exports.useState("0"),s=m.exports.useCallback(((n,a)=>{const r={n1:"n1"===n?e[n]+a:e.n1,n2:"n2"===n?e[n]+a:e.n2};t(r),o(r[n].length>6?i(parseFloat(r[n]).toPrecision(6)):r[n])}),[e]),i=e=>(e=/\.\d+?0+$/g.test(e)?e.replace(/0+$/g,""):e).replace(/\.0+$/g,"").replace(/\.0+e/,"e").replace(/0+e/,"e").replace(/\.$/,""),l=m.exports.useCallback(((e,t,n)=>{const a=parseFloat(e),o=parseFloat(t),s=parseFloat(r);return"+"===n?(a+o).toPrecision(6):"-"===n?(a-o).toPrecision(6):"×"===n?(a*o).toPrecision(6):"÷"===n?0===o?"不是数字":(a/o).toPrecision(6):"+/-"===n?(-(s||a)||0).toPrecision(6):"%"===n?((s||a)/100||0).toPrecision(6):r}),[r]),c=m.exports.useCallback((c=>{if(c.target instanceof HTMLButtonElement){const d=c.target.textContent;"0123456789.".indexOf(d)>=0?s(n?"n2":"n1",d):"+-×÷".indexOf(d)>=0?(t({n1:e.n1?e.n1:r,n2:e.n2}),a(d)):"=".indexOf(d)>=0?e.n1&&e.n2&&(o(i(l(e.n1,e.n2,n))),t({n1:"",n2:""}),a("")):"C"===d?(o("0"),t({n1:"",n2:""}),a("")):"%'+/-'".indexOf(d)>=0&&(e.n1||r)&&o(i(l(e.n1,e.n2,d)))}}),[n,e,r,s,l]);return m.exports.useEffect((()=>o(r)),[r]),g.createElement("div",{className:"calculator-wrapper"},g.createElement("div",{className:"output-wrapper"},g.createElement("div",{className:"output"},g.createElement("span",null,r))),g.createElement("div",{className:"row",onClick:e=>c(e)},["C","+/-","%","÷","7","8","9","×","4","5","6","-","1","2","3","+","0",".","="].map(((e,t)=>g.createElement("button",{className:[0,1,2].includes(t)?"dark button text-":[3,7,11,15,18].includes(t)?"orange button text-":"button text-"+e,key:t},e)))))},R=g.memo((()=>{const{open:e,close:t,RenderModal:n}=L("CalculatorView"),[a,r,o,s]=m.exports.useContext(q);return m.exports.useEffect((()=>a.type?e():t()),[t,a,e]),g.createElement(n,{data:{width:410,height:560,id:"CalculatorView",moveId:"calculatorMove",isShow:o}},g.createElement(g.Fragment,null,g.createElement(h.TitleBar,{id:"calculatorMove",transparent:!0,controls:!0,isFullscreen:!1,onCloseClick:()=>{t(),r(l(i({},a),{type:!1}))},onMinimizeClick:()=>{s(!1)},onMaximizeClick:e}),g.createElement(M,null)))}));var O="/my-desktop/assets/Drawing.9202b739.png";const P=({width:e,height:t,onRef:n})=>{const a=m.exports.useRef(null),r=m.exports.useRef(null),o=m.exports.useRef(null),[s,c]=m.exports.useState("#000000"),[d,u]=m.exports.useState(5),[p,f]=m.exports.useState(!1),[x,E]=m.exports.useState(!1),[k,b]=m.exports.useState(void 0),[w,y]=m.exports.useState(-1),[C,S]=m.exports.useState([]),L=e=>{if(a.current)return{x:e.offsetX,y:e.offsetY}},D=m.exports.useCallback((()=>{if(y(w+1),!a.current)return;const e=a.current;if(C.push(e.toDataURL()),S(C),!r.current||!o.current)return;const t=r.current,n=o.current;t.classList.add("active"),n.classList.remove("active")}),[w,C]),I=m.exports.useCallback((e=>{const t=L(e);t&&(b(t),E(!0))}),[]),M=m.exports.useCallback(((e,t)=>{if(!a.current)return;const n=a.current.getContext("2d");n&&(n.strokeStyle=s,n.lineJoin="round",n.lineWidth=d,n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.closePath(),n.stroke())}),[d,s]),R=m.exports.useCallback((({x:e,y:t,width:n,height:r})=>{if(!a.current)return;const o=a.current.getContext("2d");o&&o.clearRect(e,t,n,r)}),[]),P=m.exports.useCallback((e=>{if(x){const t=L(e);k&&t&&(p?R({x:t.x-d/2,y:t.y-d/2,width:d,height:d}):(M(k,t),b(t)))}}),[x,p,k,d,M,R]),_=m.exports.useCallback((()=>{E(!1),b(void 0),D()}),[D]),T=m.exports.useCallback((()=>{E(!1),b(void 0)}),[]);m.exports.useEffect((()=>{if(!a.current)return;const e=a.current;return e.addEventListener("mousedown",I),e.addEventListener("mousemove",P),e.addEventListener("mouseup",_),e.addEventListener("mouseleave",T),()=>{e.removeEventListener("mousedown",I),e.removeEventListener("mousemove",P),e.removeEventListener("mouseup",_),e.removeEventListener("mouseleave",T)}}),[I,P,_,T]);const[B,z]=m.exports.useState(!0),V=m.exports.useCallback((()=>{z(!B)}),[B]),F=m.exports.useCallback(((e,t)=>{const n=e.currentTarget;n.classList[1]||(f("canvas_eraser"===t),n.classList.add("active"),n.parentNode.childNodes.forEach((e=>{e.matches("svg")&&e!==n&&e.classList.remove("active")})))}),[]),H=m.exports.useCallback((e=>{u(e.target.value)}),[]),$=m.exports.useCallback((([e,t,n])=>{const a=e.target;a.className.includes("active")||(c(n),a.classList.add("active"),a.parentNode.childNodes.forEach((e=>{e.matches(t)&&e!==a&&e.classList.remove("active")})))}),[]),j=m.exports.useCallback((e=>{c(e.target.value)}),[]),{openDialog:W,closeDialog:A,RenderDialog:J}=(()=>{const[e,t]=m.exports.useState(!1);return{openDialog:()=>t(!0),closeDialog:()=>t(!1),RenderDialog:({width:t,height:n,id:a,title:r,message:o,imgSrc:s,onCheck:i,onClose:l})=>{const c=m.exports.useMemo((()=>({width:t,height:n,left:`calc(50vw - ${t/2}px)`,top:`calc(50vh - ${n}px)`,borderRadius:4})),[t,n]);return g.createElement(g.Fragment,null,e&&g.createElement("div",{id:a,style:c},g.createElement(h.Dialog,{title:r,message:o,icon:(()=>{if(s)return g.createElement("img",{src:s,width:"52",height:"52",alt:"tip"})})(),buttons:[g.createElement(h.Button,{onClick:l},"取消"),g.createElement(h.Button,{color:"blue",onClick:i},"确认")]})))}}})(),[X,Y]=m.exports.useState(!1),[U,G]=m.exports.useState(!1);m.exports.useImperativeHandle(n,(()=>({drawingCloseClick:()=>{if(-1===w)Q(l(i({},K),{type:!1}));else if(X)return;G(!0)}}))),m.exports.useEffect((()=>{U?X||(ae({title:"退出将丢失该画布！",message:"确认退出画板？"}),Y(!0)):ae({title:"您确定要清空该画布吗？",message:"一旦清空将无法撤回。"})}),[U,X]);const[K,Q]=m.exports.useContext(q);m.exports.useEffect((()=>X?W():A()),[A,X,W]);const Z=m.exports.useCallback((()=>{if(!a.current)return;const n=a.current,r=n.getContext("2d");if(r){const a=r.globalCompositeOperation;r.globalCompositeOperation="destination-over",r.fillStyle="#fff",r.fillRect(0,0,e,t);const o=n.toDataURL("image/png");r.putImageData(r.getImageData(0,0,e,t),0,0),r.globalCompositeOperation=a;const s=document.createElement("a");document.body.appendChild(s),s.href=o,s.download="myPaint",s.target="_blank",s.click()}}),[e,t]),ee=m.exports.useCallback((n=>{if(!a.current||!r.current||!o.current)return;const s=a.current.getContext("2d"),i=r.current,l=o.current;if(s){let a=-1;if("back"===n&&w>=0)a=w-1,l.classList.add("active"),a<0&&i.classList.remove("active");else{if(!("go"===n&&w<C.length-1))return;a=w+1,i.classList.add("active"),a===C.length-1&&l.classList.remove("active")}s.clearRect(0,0,e,t);const r=new Image;r.src=C[a],r.addEventListener("load",(()=>{s.drawImage(r,0,0)})),y(a)}}),[C,w,e,t]),te=m.exports.useCallback((e=>{switch(e){case"canvas_clear":if(-1===w)return;Y(!0);break;case"canvas_save":Z();break;case"turn_left_flat":ee("back");break;case"turn_right_flat":ee("go")}}),[Z,ee,w]),[ne,ae]=m.exports.useState({title:"您确定要清空该画布吗？",message:"一旦清空将无法撤回。"}),re=m.exports.useCallback((()=>{Y(!1),U&&G(!1)}),[Y,U,G]),oe=m.exports.useCallback((()=>{if(R({x:0,y:0,width:e,height:t}),S([]),y(-1),re(),!r.current||!o.current)return;const n=r.current,a=o.current;n.classList.remove("active"),a.classList.remove("active"),U&&(Q(l(i({},K),{type:!1})),G(!1))}),[re,R,e,t,U,G,K,Q]);return g.createElement(g.Fragment,null,g.createElement("canvas",{id:"canvas",ref:a,height:t,width:e}),g.createElement("div",{id:"toolbox-open",style:{borderRadius:B?null:5}},g.createElement(N,{type:B?"icon-upward_flat":"icon-downward_flat",style:{width:"100%",fontSize:32},clickEvent:V})),g.createElement(v,{in:B,timeout:300,classNames:"toolbox",unmountOnExit:!0},g.createElement("div",{id:"toolbox"},g.createElement("span",null,"Options"),g.createElement("div",{className:"options"},["canvas_save","canvas_clear","turn_left_flat","turn_right_flat"].map(((e,t)=>g.createElement(N,{svgRef:"turn_right_flat"===e?o:"turn_left_flat"===e?r:void 0,key:t+e,className:e,type:"icon-"+e,style:{fontSize:50},clickEvent:()=>te(e)})))),g.createElement("span",null,"Toolbox"),g.createElement("div",{className:"tools"},["canvas_paint","canvas_eraser"].map(((e,t)=>g.createElement(N,{key:t+e,className:"canvas_eraser"===e?p?"active":"":p?"":"active",type:"icon-"+e,style:{fontSize:50},clickEvent:t=>F(t,e)})))),g.createElement("div",{className:"sizes"},g.createElement("input",{style:{backgroundColor:p?"#ebeff4":s},type:"range",id:"range",name:"range",min:"1",max:"20",value:d,onChange:H})),g.createElement("ol",{className:"colors"},["#000000","#ff0000","#00ff00","0000ff"].map(((e,t)=>g.createElement("li",{className:e===s?e+" active":e,key:t+e,onClick:t=>$([t,"li",e])}))),g.createElement("input",{type:"color",value:s,onChange:j,id:"currentColor"})))),g.createElement(J,{width:300,height:120,id:"clear-dialog",title:ne.title,message:ne.message,imgSrc:O,onCheck:oe,onClose:re}))};P.defaultProps={width:window.innerWidth,height:window.innerHeight};const _=g.memo((()=>{const{open:e,close:t,RenderModal:n}=L("DrawingView"),[a,,r,o]=m.exports.useContext(q),[s,i]=m.exports.useState({width:1e3,height:600}),[l,c]=m.exports.useState(!1);m.exports.useEffect((()=>a.type?e():t()),[t,a,e]);const d=m.exports.useCallback((()=>{i(l?{width:1e3,height:600}:{width:-1,height:-1}),c(!l)}),[l]),u=m.exports.useRef();return g.createElement(n,{data:{width:s.width,height:s.height,id:"DrawingView",moveId:"DrawingMove",isShow:r}},g.createElement("div",{className:"drawing-wrapper"},g.createElement(h.TitleBar,{controls:!0,id:"DrawingMove",isFullscreen:l,onCloseClick:()=>{u.current&&u.current.drawingCloseClick()},onMinimizeClick:()=>{o(!1)},onMaximizeClick:d,onResizeClick:d}),g.createElement(P,{onRef:u,height:l?document.body.clientHeight-32:s.height,width:l?document.body.clientWidth:s.width})))})),T={x:0,y:0},B=({children:e,id:t,onDrag:n,onDragEnd:a})=>{const[r,o]=m.exports.useState({isDragging:!1,origin:T,translation:T}),s=m.exports.useCallback((({clientX:e,clientY:t})=>{o((n=>l(i({},n),{isDragging:!0,origin:{x:e,y:t}})))}),[]),c=m.exports.useCallback((({clientX:e,clientY:a})=>{const s={x:e-r.origin.x,y:a-r.origin.y};o((e=>l(i({},e),{translation:s}))),n({translation:s,id:t})}),[r.origin,n,t]),d=m.exports.useCallback((()=>{o((e=>l(i({},e),{isDragging:!1}))),a()}),[a]);m.exports.useEffect((()=>{r.isDragging?(window.addEventListener("mousemove",c),window.addEventListener("mouseup",d)):(window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d),o((e=>l(i({},e),{translation:{x:0,y:0}}))))}),[r.isDragging,c,d]);const u=m.exports.useMemo((()=>({cursor:r.isDragging?"-webkit-grabbing":"-webkit-grab",transform:`translate(${r.translation.x}px, ${r.translation.y}px)`,transition:r.isDragging?"none":"transform 500ms",zIndex:r.isDragging?2:1})),[r.isDragging,r.translation]);return g.createElement("div",{style:u,onMouseDown:s},e)};var z="/my-desktop/assets/PrefApp.308a35b6.png",V="/my-desktop/assets/Chrome.b4d8139e.png",F="/my-desktop/assets/Calculator.fe7118ef.png";const H=({isVisible:e,dockItemClick:t})=>{const[n]=m.exports.useState([z,V,F,O]),[a,r]=m.exports.useContext(q),o=f.exports.range(n.length),[s,c]=m.exports.useState({dragging:!1,order:o,dragOrder:o,draggedIndex:null}),d=m.exports.useCallback((({translation:e,id:t})=>{c((e=>l(i({},e),{dragging:!0})));const n=Math.round(e.x/100),a=s.order.indexOf(t),r=s.order.filter((e=>e!==t));f.exports.inRange(a+n,0,o.length)&&(r.splice(a+n,0,t),c((e=>l(i({},e),{draggedIndex:t,dragOrder:r}))))}),[s.order,o.length]),u=m.exports.useCallback((()=>{c((e=>l(i({},e),{order:e.dragOrder,draggedIndex:null})))}),[]),p=m.exports.useCallback((({keyCode:t})=>{27===t&&e&&r(!a)}),[r,a,e]),h=m.exports.useCallback((({target:t})=>{if(!e)return;const n=document.getElementsByClassName("LaunchpadImg");for(let e=0;e<n.length;e++)if(n[e]===t)return;r(!a)}),[r,a,e]);return m.exports.useEffect((()=>(window.addEventListener("click",h),window.addEventListener("keyup",p),()=>{window.removeEventListener("click",h),window.removeEventListener("keyup",p)})),[p,h,r,a]),g.createElement(g.Fragment,null,e&&g.createElement("div",{id:"Launchpad"},g.createElement("div",{id:"LaunchpadItemWrapper"},n.map(((e,n)=>{const a=s.draggedIndex===n,r=200*s.dragOrder.indexOf(n),o=200*s.order.indexOf(n),m=(e.split("/").pop()||"").split(".")[0];return g.createElement(B,{key:n,id:n,onDrag:d,onDragEnd:u},g.createElement("div",{className:"LaunchpadItem",style:{left:a?o:r,transition:a?"none":"all 500ms"}},g.createElement("div",{className:"LaunchpadImg",style:{backgroundImage:"url("+e+")",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},onClick:()=>{s.dragging?c((e=>l(i({},e),{dragging:!1}))):t(e,n)}}),g.createElement("span",{style:{color:"#fff"}},m)))})))))},$=(e,t)=>{switch(t.name){case"change":return t.position;default:return e}},j=(e,t)=>{switch(t.name){case"change":return t.dockData;default:return e}};var W="/my-desktop/assets/Launchpad.a38577d7.png";const q=m.exports.createContext([]),A=g.memo((()=>{const[e]=m.exports.useState(["/my-desktop/assets/Finder.ed608870.png",W,z,V,"/my-desktop/assets/Terminal.ff1c0f4d.png",F,O]),[t,n]=m.exports.useReducer($,"bottom"),[a,r]=m.exports.useReducer(j,{length:78,bigLength:156,itemMargin:0,distance:0,isDockBig:!0}),[o,s]=m.exports.useState({type:!1,index:2}),[c,d]=m.exports.useState({type:!1,index:5}),[u,p]=m.exports.useState({type:!1,index:6}),[h,v]=m.exports.useState(!0),[f,x]=m.exports.useState(!0),[E,k]=m.exports.useState(!0),[b,w]=m.exports.useState(!1),[y,C]=m.exports.useState(null),S=m.exports.useCallback(((e,t)=>{if(!N.current)return;const n=N.current.childNodes[t];switch(e){case V:if(y)y.close(),C(null);else{const e=window.open("http://www.google.com/","","width=1000,height=600,left=500,top=300,menubar=no,toolbar=no,status=no,scrollbars=yes");C(e)}return;case z:return o.type?void v(!h):b?(s(l(i({},o),{type:!o.type})),void w(!1)):(n.classList.add("bounce"),void setTimeout((()=>{s({type:!o.type,index:t}),n.classList.remove("bounce")}),2500));case F:return c.type?void x(!f):b?(d(l(i({},c),{type:!c.type})),void w(!1)):(n.classList.add("bounce"),void setTimeout((()=>{d({type:!c.type,index:t}),n.classList.remove("bounce")}),2500));case O:return u.type?void k(!E):b?(p(l(i({},u),{type:!u.type})),void w(!1)):(n.classList.add("bounce"),void setTimeout((()=>{p({type:!u.type,index:t}),n.classList.remove("bounce")}),2500));case W:return void w(!b)}}),[o,h,c,f,u,E,b,y]),[L,D]=m.exports.useState({}),N=m.exports.useRef(null),M=m.exports.useCallback(((e,t)=>{const n="top"===t?e.offsetTop:e.offsetLeft;return null==e.offsetParent?n:n+M(e.offsetParent,t)}),[]),P=m.exports.useCallback((({clientX:e,clientY:n})=>{if(!N.current)return;const r=N.current.childNodes;for(let o=0;o<r.length;o++){const s=r[o];let i,l;"bottom"===t?(i=s.offsetLeft+a.length/2-e,l=s.offsetTop+M(N.current,"top")+s.offsetHeight/2-n):"right"===t?(i=s.offsetTop+a.length/2-n,l=s.offsetLeft+M(N.current,"left")+s.offsetWidth/2-e):(i=s.offsetTop+a.length/2-n,l=s.offsetLeft+a.length/2-e);let c=1-Math.sqrt(i*i+l*l)/(r.length*a.length);c<a.length/a.bigLength&&(c=a.length/a.bigLength);const d=a.bigLength/a.length;a.bigLength/a.length&&(s.style.height=s.style.width=a.length*d*c+"px")}}),[t,a.length,a.bigLength,M]),T=m.exports.useCallback((()=>{if(!N.current)return;D("bottom"===t?{height:1*a.length+10,marginBottom:1*a.distance}:"top"===t?{height:1*a.length+10,marginTop:1*a.distance}:"left"===t?{width:1*a.length+10,marginLeft:1*a.distance}:{width:1*a.length+10,marginRight:1*a.distance});const e=N.current.childNodes;for(let t=0;t<e.length;t++){const n=e[t];n.style.width=n.style.height=a.length+"px"}}),[t,a.length,a.distance]);m.exports.useEffect(T,[T]),m.exports.useEffect((()=>{const e=localStorage.getItem("dockData")||null;e&&r({name:"change",dockData:JSON.parse(e)});const t=localStorage.getItem("position")||null;t&&n({name:"change",position:JSON.parse(t)})}),[]),m.exports.useEffect((()=>{if(!N.current)return;const e=N.current.childNodes;[o,c,u].forEach((t=>{if(t.index){const n=e[t.index];t.type?n.classList.add("active"):setTimeout((()=>null==n?void 0:n.classList.remove("active")),500)}})),o&&localStorage.getItem("SettingView")&&localStorage.removeItem("SettingView"),c&&localStorage.getItem("CalculatorView")&&localStorage.removeItem("CalculatorView"),u&&localStorage.getItem("DrawingView")&&localStorage.removeItem("DrawingView")}),[o,c,u,t]),m.exports.useEffect((()=>{if(!N.current||!a.isDockBig)return;const e=N.current;return e.addEventListener("mousemove",P),e.addEventListener("mouseleave",T),()=>{e.removeEventListener("mousemove",P),e.removeEventListener("mouseleave",T)}}),[P,T,a.isDockBig]);const B=m.exports.useMemo((()=>"top"===t||"bottom"===t?{marginLeft:1*a.itemMargin,marginRight:1*a.itemMargin}:{marginTop:1*a.itemMargin,marginBottom:1*a.itemMargin}),[t,a.itemMargin]);return g.createElement(g.Fragment,null,g.createElement(q.Provider,{value:[o,s,h,v,t,n,a,r]},g.createElement(I,null)),g.createElement(q.Provider,{value:[c,d,f,x]},g.createElement(R,null)),g.createElement(q.Provider,{value:[u,p,E,k]},g.createElement(_,null)),g.createElement(q.Provider,{value:[b,w]},g.createElement(H,{isVisible:b,dockItemClick:S})),g.createElement("footer",{className:t,id:"AppFooter"},g.createElement("div",{id:"Docker",ref:N,className:t,style:L},e.map(((e,n)=>g.createElement("div",{className:[W,z,V,F,O].includes(e)?"pointer DockItem "+t:t+" DockItem",style:i({backgroundImage:`url(${e})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},B),key:n+e,onClick:()=>S(e,n)}))))))}));x.locale("zh-cn");const J=()=>{const e=m.exports.useRef(null),[t,n]=m.exports.useState(x().format("M月DD日 周dd HH:mm")),[a,r]=m.exports.useState(!1),[o,s]=m.exports.useState(!1),[i,l]=m.exports.useState("Ada"),c=m.exports.useCallback((({target:t})=>{if(o||a){if(t.parentNode===e.current||t.parentNode.parentNode===e.current)return;r(!1),s(!1)}}),[o,a]);return m.exports.useEffect((()=>{const e=setInterval((()=>{const e=x().format("M月DD日 周dd HH:mm");n(e)}),6e4);return window.addEventListener("click",c),()=>{window.removeEventListener("click",c),window.clearInterval(e)}}),[c]),g.createElement("header",{className:"AppFinder"},g.createElement("div",{className:"FinderLeft"},g.createElement("div",null,g.createElement(N,{type:"icon-apple",style:{fontSize:22}})),g.createElement("div",{onClick:()=>r(!0),ref:e,className:"pointer"},o?g.createElement("input",{value:i,onChange:e=>l(e.target.value)}):g.createElement("span",{className:a?"text active":"text"},i),g.createElement("ul",{className:a?"menu active":"menu"},g.createElement("li",{onClick:()=>s(!0)},"自定义标题"),g.createElement("div",{className:"line"}),g.createElement("li",null,"你好"),g.createElement("div",{className:"line"}),g.createElement("li",null,"我是周元达"),g.createElement("div",{className:"line"}),g.createElement("li",null,"感谢来到这里的你"),g.createElement("div",{className:"line"}),g.createElement("li",null,"我正在找工作"),g.createElement("div",{className:"line"}),g.createElement("li",null,"如有意请联系我"),g.createElement("div",{className:"line"}),g.createElement("li",null,"点击右边人头可查看我的简历"))),g.createElement("div",null,"文件"),g.createElement("div",null,"编辑"),g.createElement("div",null,"显示"),g.createElement("div",null,"前往"),g.createElement("div",null,"窗口"),g.createElement("div",null,"帮助")),g.createElement("div",{className:"FinderRight"},g.createElement("div",null,t),g.createElement("a",{href:"https://adashuai5.github.io/resume-2020/"},g.createElement(N,{type:"icon-ren",style:{fontSize:22}})),g.createElement("a",{href:"https://github.com/Adashuai5"},g.createElement(N,{type:"icon-github",style:{fontSize:22}}))))};const X=()=>g.createElement("div",{className:"AppMain"},g.createElement("div",{id:"main-view"}));const Y=()=>g.createElement("div",{className:"App"},g.createElement(J,null),g.createElement(X,null),g.createElement(A,null));p.render(g.createElement(g.StrictMode,null,g.createElement(Y,null)),document.getElementById("root"));
