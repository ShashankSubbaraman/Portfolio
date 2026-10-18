'use strict';
const projects={
 panels:{title:'Spacecraft prototype integration',eyebrow:'Quantum Space · Mechatronics Intern · May–August 2026',lead:'I led the assembly, integration, and verification of four full-scale spacecraft prototype panels, coordinating fit and installation with engineers and technicians.',stats:['4 full-scale panels','10+ printed components','6 fit issues caught'],images:[['ranger-prime-476ebdcd60.webp','Public Ranger Prime mission rendering'],['ranger-detail-1e4530552d.webp','Public mission rendering, detail']],sections:[['My ownership','I coordinated installation of 10+ 3D-printed components as requirements evolved, checked interfaces, and caught six fit issues before final assembly. The work turned evolving layouts into physical mockups that the team could inspect and work with.'],['Drawings that supported the build','I also produced eight fabrication-ready GD&T drawings for propulsion wire-clamp assemblies, modeled missing components, and specified fabrication and installation tolerances across six harnesses.']],note:'The images are public Ranger Prime renderings used for context. They are not photographs of my prototype panels or spacecraft designs authored by me.'},
 robotics:{title:'Camera-controlled robotic arm & hand',eyebrow:'Smart Manufacturing and Robotics Lab · October 2026–Present',lead:'I am developing a robotic arm and hand intended to replicate finger, palm, and wrist movements observed by a computer camera. The project supports the lab’s broader research into VR-based control of manufacturing robots.',stats:['SolidWorks finger CAD','Printable mechanism concepts','Servo-driven cable actuation'],images:[['robotic-finger-concept.webp','Current articulated finger concept in SolidWorks']],sections:[['My ownership','My role spans mechanical design and the connection between hardware and software. Current work focuses on printable finger geometry, joint layout, and cable actuation concepts driven by servos.'],['Where it stands','The finger mechanism is in CAD development. The full arm, actuator selection, camera-to-joint mapping, and physical validation are future work. The design is being developed around compact size and ease of printing.']],note:'Early research concept. A working full arm, motion-tracking performance, actuator sizing, and test results are not yet claimed.'},
 micromouse:{title:'MicroMouse drivetrain & maze',eyebrow:'IEEE · Responsible Engineer, Mechanical Systems · August 2026–Present',lead:'I am designing the mechanical drivetrain for a compact maze-solving robot and developing the physical maze environment used to evaluate it.',stats:['3.5:1 reduction','75 mm chassis','0.5 mm slot error caught'],images:[['micromouse-assembly.webp','MicroMouse CAD assembly context; my contribution focuses on the mechanical drivetrain']],sections:[['Drivetrain design','The Fusion 360 design uses 20T/70T, module 0.3 spur gears at a 13.5 mm center distance. I am evaluating motor torque-speed behavior and clearance for a 25 mm wheel within the chassis packaging constraints.'],['Physical validation','I CNC-machined a maze test-section prototype from CAD, then checked dimensions and wall fit. Those checks caught a 0.5 mm wall-slot tolerance error before full-scale fabrication.']],note:'The assembly image includes electrical hardware for context; it does not imply authorship of the PCB or electronics. Drivetrain design is ongoing.'},
 optics:{title:'Precision through iteration',eyebrow:'Quantum Space · Optomechanical prototype fabrication',lead:'I fabricated and assembled an optomechanical research device, translating an existing optical design into a physical assembly through repeated fit and tolerance checks.',stats:['4 PLA/PETG revisions','0.8 mm → under 0.1 mm','Creo tolerance analysis'],images:[['optics-c70931d83a.webp','Fabricated optical-device prototype'],['mounting-abb690303e.webp','Additional mounting prototype']],sections:[['The challenge','Bandpass filters and dual etalons needed to fit within a multistage printed assembly. Small dimensional errors affected alignment and component integration.'],['My contribution','I owned fabrication and assembly across four PLA/PETG prototype revisions. Using Creo tolerance analysis and fit checks, I reduced misalignment from 0.8 mm to under 0.1 mm.']],note:'My supervisor created the underlying optical-device design. My contribution was fabrication, tolerance analysis, iterative fitting, and assembly.'},
 gearset:{title:'Planetary gearset CAD study',eyebrow:'Personal project · Mechanism design study',lead:'A CAD exploration of how a sun gear, three planet gears, an internal ring gear, and a carrier fit together in a compact mechanism.',stats:['Assembly study','Exploded view'],images:[['planetary-gearset.webp','Planetary gearset assembly view'],['planetary-exploded.webp','Exploded CAD view identifying the carrier, planet gears, sun gear, and ring gear']],sections:[['Assembly','The assembled model brings the gear arrangement and carrier into a single view so the component relationships are clear.'],['Communicating the mechanism','The exploded view separates the components to show how the assembly fits together. This is presented as a CAD study; manufactured hardware and performance testing are not claimed.']],note:'Additional design calculations and test results will be added as the project develops.'},
 ar:{title:'AR-guided harness routing',eyebrow:'Quantum Space · Magic Leap 2 / Unity / Vuforia',lead:'I integrated augmented-reality guidance into spacecraft wire-harness routing so the assembly team could see routing information in context with the hardware.',stats:['13% less assembly time','3 electromechanical subsystems'],images:[['ar-routing-311c951107.webp','AR-guided routing demonstration'],['ar-headset-f97d72ef99.webp','Magic Leap headset used in the workflow']],sections:[['Digital guidance, physical hardware','I worked with Magic Leap 2, Unity, and Vuforia to bring routing guidance into an AR workflow across three electromechanical subsystems.'],['The outcome','The workflow reduced harness assembly time by 13%, connecting software-based guidance with a hands-on fabrication process.']]},
 glove:{title:'Assistive navigation glove',eyebrow:'CURO · Mechanical Design Lead · February–May 2026',lead:'An electromechanical navigation glove that communicates directional information through vibration motors. I improved hardware reliability and cue recognition through hands-on troubleshooting and testing.',stats:['75% fewer cue errors','0 failures in 15+ cycles','15 mm → 30 mm spacing'],images:[['glove-small-67d8d6d3c4.webp','Assistive navigation glove prototype'],['glove-electronics-6dbe79d323.webp','Prototype electronics and connections']],sections:[['Fixing a recurring failure','I traced motor-wire detachment to vulnerable connections and reinforced them with heat-shrink. All three motors stayed connected through 15+ wear/removal cycles with zero failures.'],['Testing the layout','Blindfolded testing revealed interference between closely spaced motors. Increasing the spacing from 15 mm to 30 mm reduced cue misidentification by 75%.']]},
 rover:{title:'A failure that changed the load case',eyebrow:'NASA Human Exploration Rover Challenge · ASME · August 2025–May 2026',lead:'When a chassis support failed at approximately 40% of its predicted torque capacity, I investigated the difference between the expected load and the load the hardware actually experienced.',stats:['Failure at ~40% predicted torque','Calculated safety factor 2.3','6 machined-component drawings'],images:[['rover-f0bfeeb30e.webp','Student rover project']],sections:[['Root cause & analysis','I diagnosed shock loading behind the chassis-support failure and analyzed redesigned supports in ANSYS Mechanical under revised loading. The analysis produced a calculated safety factor of 2.3.'],['Design for the team','I modeled the drivetrain assembly in Fusion 360 and produced GD&T drawings for six machined components, supporting fabrication, mechanical integration, and design review.']],note:'The safety factor is an analytical result under the revised load case, not a physically validated load rating. HERC is a student competition; this was not NASA employment.'},
 perception:{title:'Finding what perception misses',eyebrow:'CAMI Lab · Perception Systems Researcher · December 2025–May 2026',lead:'I supported autonomous-driving perception research by reviewing scenarios and expanding the tools used to find missing or incorrect model identifications.',stats:['1,200+ scenarios','40% contained errors','80+ scenarios in tool expansion'],images:[['perception-d7c36642e8.webp','Autonomous-driving perception research example']],sections:[['Scenario validation','I validated more than 1,200 autonomous-driving scenarios and identified safety-relevant vision-language model errors in 40% of the reviewed cases, supporting training-data corrections.'],['Diagnostic tools','I expanded Python/C++ diagnostic tools to check previously omitted object categories across 80+ autonomous-driving scenarios, extending perception-system validation coverage.']]}
};

const dialog=document.getElementById('project-dialog');
const content=document.getElementById('dialog-content');
let returnFocus=null;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openProject(id,trigger){
 const p=projects[id];if(!p)return;
 returnFocus=trigger;
 content.innerHTML=`<p class="dialog-eyebrow">${escapeHTML(p.eyebrow)}</p><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="dialog-lead">${escapeHTML(p.lead)}</p><div class="dialog-stats">${p.stats.map(s=>`<span>${escapeHTML(s)}</span>`).join('')}</div><div class="dialog-gallery ${p.images.length>1?'two':''}">${p.images.map(([src,caption])=>`<figure><img src="assets/${escapeHTML(src)}" alt="${escapeHTML(caption)}"><figcaption>${escapeHTML(caption)}</figcaption></figure>`).join('')}</div><div class="dialog-sections">${p.sections.map(([title,text])=>`<section><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></section>`).join('')}</div>${p.note?`<p class="dialog-note">${escapeHTML(p.note)}</p>`:''}`;
 dialog.showModal();dialog.scrollTop=0;
 document.documentElement.style.overflow='hidden';
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project,button)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.documentElement.style.overflow='';returnFocus?.focus({preventScroll:true});});

const categoryItems=[...document.querySelectorAll('[data-category]')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 categoryItems.forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter);
 document.querySelector('.more-work').hidden=![...document.querySelectorAll('.work-card')].some(item=>!item.hidden);
 measure();schedule();
}));

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const wide=matchMedia('(min-width: 701px)');
const header=document.querySelector('.site-header');
const progressBar=document.querySelector('.page-progress i');
const chapters=[...document.querySelectorAll('.project-chapter')];
let positions=[],pending=false;
const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
function measure(){positions=chapters.map(el=>({el,top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight}));}
function paint(){
 pending=false;
 const y=scrollY,h=innerHeight,max=document.documentElement.scrollHeight-h;
 progressBar.style.transform=`scaleX(${max>0?clamp(y/max):0})`;
 header.classList.toggle('scrolled',y>40);
 if(!reduced.matches){
  for(const {el,top,height} of positions){
   if(el.hidden||top>y+h||top+height<y)continue;
   const p=clamp((y+h-top)/(height+h));
   el.style.setProperty('--image-scale',String(wide.matches?1.07-p*.1:1));
   el.style.setProperty('--visual-y',wide.matches?`${(1-p)*25-8}px`:'0px');
   const direction=el.matches(':nth-child(even)')?-1:1;
   el.style.setProperty('--photo-shift',wide.matches?`${(1-p)*24*direction}px`:'0px');
  }
 }else{chapters.forEach(el=>{el.style.removeProperty('--image-scale');el.style.removeProperty('--visual-y');el.style.removeProperty('--photo-shift');});}
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(paint);}}
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 document.body.classList.add('motion-enabled');
}
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',()=>{measure();schedule();},{passive:true});
addEventListener('load',()=>{measure();schedule();});
reduced.addEventListener('change',()=>{measure();schedule();});
measure();schedule();
