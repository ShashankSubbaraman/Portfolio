import * as THREE from './vendor/three.module.js';
import {roomAt,openPlacement} from './atom-layout.js';

// The atom follows full-page scroll while steering around visible photographs.
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width:700px)');
const canvas=document.getElementById('atom-canvas');
const fallback=document.getElementById('atom-fallback');
const route=[
 {p:0,x:.58,y:.05}, {p:.15,x:-.48,y:.2},
 {p:.32,x:.62,y:-.12}, {p:.5,x:-.55,y:.1},
 {p:.68,x:.57,y:-.16}, {p:.84,x:-.46,y:.15},
 {p:1,x:.56,y:.04}
];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
function positionAt(p){
 let b=route.findIndex(k=>k.p>=p);if(b<=0)return {...route[0]};
 const a=route[b-1],z=route[b],t=clamp((p-a.p)/(z.p-a.p));
 const ease=t*t*(3-2*t);
 return {x:a.x+(z.x-a.x)*ease,y:a.y+(z.y-a.y)*ease};
}
function createAtom(){
 let renderer;
 try{
  renderer=new THREE.WebGLRenderer({canvas,antialias:devicePixelRatio<2,alpha:true,powerPreference:'low-power'});
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.25;
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-innerWidth/2,innerWidth/2,innerHeight/2,-innerHeight/2,.1,3000);
  camera.position.z=1000;
  const atom=new THREE.Group();scene.add(atom);
  scene.add(new THREE.HemisphereLight('#e6efda','#2c3d50',2.2));
  const key=new THREE.DirectionalLight('#e7f8ce',5);key.position.set(4,4,5);scene.add(key);
  const rim=new THREE.DirectionalLight('#8caee5',4);rim.position.set(-3,-1,3);scene.add(rim);
  const nucleus=new THREE.Group();atom.add(nucleus);
  const sphere=new THREE.SphereGeometry(1,24,18);
  const silver=new THREE.MeshStandardMaterial({color:'#b9c7b3',metalness:.55,roughness:.3});
  const green=new THREE.MeshStandardMaterial({color:'#cfe58d',metalness:.4,roughness:.25,emissive:'#45512c',emissiveIntensity:.12});
  const nucleons=[[0,0,.1,.32],[-.31,.12,0,.29],[.28,.17,0,.29],[.1,-.27,.13,.29],[-.14,-.13,-.27,.29],[.1,.1,-.3,.27],[-.1,.32,.15,.27]];
  nucleons.forEach(([x,y,z,r],i)=>{const n=new THREE.Mesh(sphere,i%2?green:silver);n.position.set(x,y,z);n.scale.setScalar(r);nucleus.add(n);});
  const paths=[];
  const orbitGeometry=new THREE.TorusGeometry(2.05,.012,6,mobile.matches?140:200);
  const orbitMaterial=new THREE.MeshBasicMaterial({color:'#c1d6a6',transparent:true,opacity:.62});
  const electronMaterial=new THREE.MeshStandardMaterial({color:'#e6ff80',emissive:'#adc34d',emissiveIntensity:1.3,metalness:.2,roughness:.2});
  const orientations=[[Math.PI/2.9,.22,-.48],[-Math.PI/2.9,-.2,.48],[.05,Math.PI/2.8,Math.PI/2]];
  orientations.forEach((angles,i)=>{
   const path=new THREE.Group();path.rotation.set(...angles);atom.add(path);
   path.add(new THREE.Mesh(orbitGeometry,orbitMaterial));
   const electron=new THREE.Mesh(sphere,electronMaterial);electron.scale.setScalar(.085);path.add(electron);
   const trail=[];
   for(let j=0;j<7;j++){
    const bead=new THREE.Mesh(sphere,new THREE.MeshBasicMaterial({color:'#d7ed90',transparent:true,opacity:.24*(1-j/7)}));
    bead.scale.setScalar(.035*(1-j/10));path.add(bead);trail.push(bead);
   }
   paths.push({electron,trail,phase:i*2.1,speed:i%2?-1:1});
  });
  function resize(){
   camera.left=-innerWidth/2;camera.right=innerWidth/2;
   camera.top=innerHeight/2;camera.bottom=-innerHeight/2;camera.updateProjectionMatrix();
   renderer.setPixelRatio(Math.min(devicePixelRatio,mobile.matches?1.25:1.6));
   renderer.setSize(innerWidth,innerHeight);
  }
  function render({x,y,radius,p,time}){
   atom.position.set(x-innerWidth/2,innerHeight/2-y,0);
   atom.scale.setScalar(radius/2.25);
   atom.rotation.set(.16+p*.65,.2+p*Math.PI*2,-.12+p*.8);
   nucleus.rotation.y=p*Math.PI*3;
   paths.forEach(({electron,trail,phase,speed})=>{
    const angle=phase+(time*.45+p*9)*speed;
    electron.position.set(Math.cos(angle)*2.05,Math.sin(angle)*2.05,0);
    trail.forEach((bead,j)=>{const a=angle-speed*(j+1)*.055;bead.position.set(Math.cos(a)*2.05,Math.sin(a)*2.05,0);});
   });
   renderer.render(scene,camera);
   document.body.classList.add('scene-ready');
  }
  renderer.debug.onShaderError=()=>{document.body.classList.remove('scene-ready');failed=true;};
  resize();return {resize,render};
 }catch{
  renderer?.dispose();return null;
 }
}
let failed=false;
let visual=createAtom();
let frame=0,lastFrame=0,lastTime=0,progress=0,target=0;
let maxScroll=1,placement=null;
const photoElements=[...document.querySelectorAll('.about-photo,.project-visual,.work-image,.personal-note img')];
const header=document.querySelector('.site-header');
function photoLayout(){
 const photos=[];
 for(const el of photoElements){
  if(el.closest('[hidden]'))continue;
  const box=el.getBoundingClientRect();
  if(box.width>0&&box.height>0&&box.bottom>0&&box.top<innerHeight){
   photos.push({left:box.left,right:box.right,top:box.top,bottom:box.bottom});
  }
 }
 return photos;
}
function fitAtom(point,dt){
 const view={left:14,right:innerWidth-14,top:header.getBoundingClientRect().bottom+14,bottom:innerHeight-18};
 const photos=photoLayout(),padding=mobile.matches?12:20;
 const preferredRadius=mobile.matches?Math.min(100,innerWidth*.23):Math.min(185,innerWidth*.145,innerHeight*.23);
 const desired={x:innerWidth*(.5+point.x*.42),y:innerHeight*(.5-point.y*.38)};
 const goal=openPlacement({desired,current:placement,view,photos,radius:preferredRadius,padding});
 if(!placement||motion.matches)placement=goal;
 else{
  const ease=1-Math.exp(-dt*5);
  const next={x:placement.x+(goal.x-placement.x)*ease,y:placement.y+(goal.y-placement.y)*ease};
  const available=roomAt(next,view,photos,padding);
  const radius=Math.min(placement.radius+(goal.radius-placement.radius)*ease,available);
  if(radius>=Math.min(34,goal.radius))placement={...next,radius};
  else placement=openPlacement({desired:next,current:placement,view,photos,radius:goal.radius,padding});
 }
 return placement;
}
function measure(){maxScroll=Math.max(1,document.documentElement.scrollHeight-innerHeight);target=clamp(scrollY/maxScroll);}
function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(draw);}
function draw(now){
 frame=0;if(document.hidden)return;
 if(!motion.matches&&now-lastFrame<1000/30){schedule();return;}
 const dt=Math.min((now-(lastTime||now))/1000,.1);lastTime=now;lastFrame=now;
 progress=motion.matches?0:progress+(target-progress)*(1-Math.exp(-dt*9));
 const p=motion.matches?0:progress;
 const point=positionAt(p);
 const {x,y,radius}=fitAtom(point,dt);
 fallback.style.width=`${radius*2}px`;
 fallback.style.height=`${radius*2}px`;
 fallback.style.transform=`translate3d(${x-radius}px,${y-radius}px,0) rotate(${p*200}deg)`;
 if(visual&&!failed){
  try{visual.render({x,y,radius,p,time:motion.matches?0:now*.001});}
  catch{failed=true;document.body.classList.remove('scene-ready');}
 }
 if(!motion.matches)schedule();
}
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();failed=true;document.body.classList.remove('scene-ready');});
canvas.addEventListener('webglcontextrestored',()=>{visual=createAtom();failed=false;schedule();});
addEventListener('scroll',()=>{target=clamp(scrollY/maxScroll);schedule();},{passive:true});
addEventListener('resize',()=>{placement=null;visual?.resize();measure();schedule();},{passive:true});
addEventListener('load',()=>{measure();schedule();});
if('ResizeObserver' in window)new ResizeObserver(()=>{measure();schedule();}).observe(document.body);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
motion.addEventListener('change',schedule);
measure();progress=target;schedule();
