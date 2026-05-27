import{a as J,g as K,j as r}from"./index-CW0BVTe7.js";import{h as Q,r as U,s as V,t as ee,u as te}from"./index-DX6q9OMK.js";var b={},G;function ne(){if(G)return b;G=1;function u(a){if(typeof window>"u")return;const c=document.createElement("style");return c.setAttribute("type","text/css"),c.innerHTML=a,document.head.appendChild(c),a}Object.defineProperty(b,"__esModule",{value:!0});var e=J();function p(a){return a&&typeof a=="object"&&"default"in a?a:{default:a}}var s=p(e);u(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const z=e.forwardRef(function({style:c={},className:W="",autoFill:m=!1,play:d=!0,pauseOnHover:j=!1,pauseOnClick:R=!1,direction:t="left",speed:v=50,delay:M=0,loop:q=0,gradient:L=!1,gradientColor:I="white",gradientWidth:y=200,onFinish:$,onCycleComplete:B,onMount:S,children:g},O){const[N,P]=e.useState(0),[x,T]=e.useState(0),[w,_]=e.useState(1),[E,X]=e.useState(!1),Y=e.useRef(null),i=O||Y,f=e.useRef(null),h=e.useCallback(()=>{if(f.current&&i.current){const n=i.current.getBoundingClientRect(),D=f.current.getBoundingClientRect();let o=n.width,l=D.width;(t==="up"||t==="down")&&(o=n.height,l=D.height),_(m&&o&&l&&l<o?Math.ceil(o/l):1),P(o),T(l)}},[m,i,t]);e.useEffect(()=>{if(E&&(h(),f.current&&i.current)){const n=new ResizeObserver(()=>h());return n.observe(i.current),n.observe(f.current),()=>{n&&n.disconnect()}}},[h,i,E]),e.useEffect(()=>{h()},[h,g]),e.useEffect(()=>{X(!0)},[]),e.useEffect(()=>{typeof S=="function"&&S()},[]);const C=e.useMemo(()=>m?x*w/v:x<N?N/v:x/v,[m,N,x,w,v]),Z=e.useMemo(()=>Object.assign(Object.assign({},c),{"--pause-on-hover":!d||j?"paused":"running","--pause-on-click":!d||j&&!R||R?"paused":"running","--width":t==="up"||t==="down"?"100vh":"100%","--transform":t==="up"?"rotate(-90deg)":t==="down"?"rotate(90deg)":"none"}),[c,d,j,R,t]),H=e.useMemo(()=>({"--gradient-color":I,"--gradient-width":typeof y=="number"?`${y}px`:y}),[I,y]),F=e.useMemo(()=>({"--play":d?"running":"paused","--direction":t==="left"?"normal":"reverse","--duration":`${C}s`,"--delay":`${M}s`,"--iteration-count":q?`${q}`:"infinite","--min-width":m?"auto":"100%"}),[d,t,C,M,q,m]),k=e.useMemo(()=>({"--transform":t==="up"?"rotate(90deg)":t==="down"?"rotate(-90deg)":"none"}),[t]),A=e.useCallback(n=>[...Array(Number.isFinite(n)&&n>=0?n:0)].map((D,o)=>s.default.createElement(e.Fragment,{key:o},e.Children.map(g,l=>s.default.createElement("div",{style:k,className:"rfm-child"},l)))),[k,g]);return E?s.default.createElement("div",{ref:i,style:Z,className:"rfm-marquee-container "+W},L&&s.default.createElement("div",{style:H,className:"rfm-overlay"}),s.default.createElement("div",{className:"rfm-marquee",style:F,onAnimationIteration:B,onAnimationEnd:$},s.default.createElement("div",{className:"rfm-initial-child-container",ref:f},e.Children.map(g,n=>s.default.createElement("div",{style:k,className:"rfm-child"},n))),A(w-1)),s.default.createElement("div",{className:"rfm-marquee",style:F},A(w))):null});return b.default=z,b}var re=ne();const ae=K(re),se=[{href:"https://github.com/GipsyDanger-dev",Icon:Q,name:"GitHub"},{href:"https://www.instagram.com/adamfrzz_/?hl=id",Icon:U,name:"Instagram"},{href:"https://discordapp.com/users/747396909399801856",Icon:V,name:"Discord"},{href:"https://x.com/AdamF184953",Icon:ee,name:"Twitter"},{href:"https://wa.me/6281229497848",Icon:te,name:"WhatsApp"}],ie=["GipsyDanger-dev™","Full Stack Developer","React • Laravel • Python","Open to Collaborate","Based in Indonesia","GipsyDanger-dev™","Full Stack Developer","React • Laravel • Python","Open to Collaborate","Based in Indonesia"],ce=()=>r.jsxs("footer",{className:"bg-white dark:bg-gray-900",children:[r.jsx("div",{className:"py-3 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700/50",children:r.jsx(ae,{gradient:!1,speed:50,children:ie.map((u,e)=>r.jsx("code",{className:"text-gray-500 dark:text-gray-400 text-sm mx-8",children:u},e))})}),r.jsx("div",{className:"mx-auto w-full max-w-7xl p-4 py-6",children:r.jsxs("div",{className:"sm:flex sm:items-center sm:justify-between",children:[r.jsxs("span",{className:"text-sm text-gray-500 sm:text-center dark:text-gray-400",children:["© ",new Date().getFullYear()," ",r.jsx("a",{href:"https://github.com/GipsyDanger-dev",className:"hover:underline",children:"GipsyDanger-dev™"}),". All Rights Reserved."]}),r.jsx("div",{className:"flex mt-4 sm:justify-center sm:mt-0 space-x-5",children:se.map(({href:u,Icon:e,name:p})=>r.jsxs("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"text-gray-500 hover:text-blue-500 dark:hover:text-white",children:[r.jsx(e,{className:"w-5 h-5"}),r.jsx("span",{className:"sr-only",children:p})]},p))})]})})]});export{ce as Footer,ce as default};
