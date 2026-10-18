// Pure screen-space layout, shared by the WebGL graphic and its SVG fallback.
export const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
export function roomAt(point,view,photos,padding=18){
 let radius=Math.min(point.x-view.left,view.right-point.x,point.y-view.top,view.bottom-point.y);
 for(const photo of photos){
  const dx=Math.max(photo.left-point.x,0,point.x-photo.right);
  const dy=Math.max(photo.top-point.y,0,point.y-photo.bottom);
  radius=Math.min(radius,Math.hypot(dx,dy)-padding);
 }
 return Math.max(0,radius);
}
export function openPlacement({desired,current,view,photos,radius,padding=18}){
 const width=view.right-view.left,height=view.bottom-view.top;
 const xs=[desired.x,current?.x??desired.x,view.left+width*.5];
 const ys=[desired.y,current?.y??desired.y,view.top+height*.5];
 for(const fraction of [.12,.25,.38,.5,.62,.75,.88])xs.push(view.left+width*fraction);
 for(const fraction of [.18,.35,.5,.65,.82])ys.push(view.top+height*fraction);
 for(const photo of photos){
  xs.push(photo.left-radius-padding,photo.right+radius+padding);
  ys.push(photo.top-radius-padding,photo.bottom+radius+padding);
 }
 let best=null;
 for(const px of xs)for(const py of ys){
  const x=clamp(px,view.left+12,view.right-12),y=clamp(py,view.top+12,view.bottom-12);
  const available=Math.min(radius,roomAt({x,y},view,photos,padding));
  if(available<12)continue;
  const distance=((x-desired.x)/width)**2+((y-desired.y)/height)**2;
  const continuity=current?((x-current.x)/width)**2+((y-current.y)/height)**2:0;
  const score=(1-available/radius)*6+distance*1.7+continuity*.65;
  if(!best||score<best.score)best={x,y,radius:available,score};
 }
 // Main-page photo layouts leave open gutters; this also covers tiny viewports.
 return best??{x:view.left+width*.5,y:view.top+height*.5,radius:0,score:Infinity};
}
