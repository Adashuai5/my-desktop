import{r as o,c as k,j as u}from"./index.dcc52210.js";import"./Footer.9ba39ae7.js";import"./index.d0ce8b1e.js";const b=()=>["AC","+/-","%","\xF7","7","8","9","\xD7","4","5","6","-","1","2","3","+","0",".","="],S=()=>{const[C,g]=o.exports.useState(b()),[t,a]=o.exports.useState({n1:"",n2:""}),[f,p]=o.exports.useState(""),[r,i]=o.exports.useState("0"),d=o.exports.useCallback((e,s)=>{const n={n1:e==="n1"&&t[e]!=="0"?t[e]+s:t.n1,n2:e==="n2"&&t[e]!=="0"?t[e]+s:t.n2};a(n),i(n[e].length>6?x(parseFloat(n[e]).toPrecision(6)):n[e])},[t]),x=e=>(e=/\.\d+?0+$/g.test(e)?e.replace(/0+$/g,""):e,e.replace(/\.0+$/g,"").replace(/\.0+e/,"e").replace(/0+e/,"e").replace(/\.$/,"")),N=o.exports.useCallback((e,s,n)=>{const c=parseFloat(e),l=parseFloat(s),h=parseFloat(r);return n==="+"?(c+l).toPrecision(6):n==="-"?(c-l).toPrecision(6):n==="\xD7"?(c*l).toPrecision(6):n==="\xF7"?l===0?"\u4E0D\u662F\u6570\u5B57":(c/l).toPrecision(6):n==="+/-"?(-(h||c)||0).toPrecision(6):n==="%"?((h||c)/100||0).toPrecision(6):r},[r]),F=o.exports.useCallback(e=>{if(e.target instanceof HTMLButtonElement){const s=e.target.textContent;if("0123456789.".indexOf(s)>=0){const n=b();n.shift(),n.unshift("C"),g(n),d(f?"n2":"n1",s)}else"+-\xD7\xF7".indexOf(s)>=0?(a({n1:t.n1?t.n1:r,n2:t.n2}),p(s)):"=".indexOf(s)>=0?t.n1&&t.n2&&(i(x(N(t.n1,t.n2,f))),a({n1:"",n2:""}),p("")):s==="C"?(i("0"),a({n1:"",n2:""}),p(""),g(b())):"%'+/-'".indexOf(s)>=0&&(t.n1||r)&&i(x(N(t.n1,t.n2,s)))}},[f,t,r,d,N]);return o.exports.useEffect(()=>i(r),[r]),k("div",{className:"calculator-wrapper",children:[u("div",{className:"output-wrapper",children:u("div",{className:"output",children:u("span",{children:r})})}),u("div",{className:"row",onClick:e=>F(e),children:C.map((e,s)=>u("button",{className:[0,1,2].includes(s)?"dark button text-":[3,7,11,15,18].includes(s)?"orange button text-":"button text-"+e,children:e},e))})]})};export{S as default};
