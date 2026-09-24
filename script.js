(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var mob=matchMedia('(max-width:900px)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var nav=$('.nav');
$('.burger').onclick=function(){nav.classList.toggle('open')};
$$('.links a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>30)},{passive:true});
$('form').onsubmit=function(e){e.preventDefault();var f=e.target,i=f.querySelectorAll('input,select'),m=encodeURIComponent('Hello Lumina Dental, I would like to book an appointment.\nName: '+i[0].value+'\nPhone: '+i[1].value+'\nTreatment: '+i[2].value);f.innerHTML='<h3>Thank you.</h3><p>We have your request and will call you shortly to confirm your appointment.</p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/916294601364?text='+m+'">Confirm on WhatsApp</a>'};
$$('#treatments .card').forEach(function(c){c.insertAdjacentHTML('afterbegin','<svg class="ico" viewBox="0 0 32 32"><path d="M9 5C6 5 4 8 4.500 12c.4 3 2 5 2.500 9 .3 3 1 6 2.800 6 1.600 0 1.400-5 3.200-5s1.600 5 3.200 5c1.800 0 2.500-3 2.800-6 .5-4 2.100-6 2.500-9C27 8 25 5 22 5c-2 0-2.500 1-4 1S11 5 9 5z"/></svg>')});
var ba=$('.ba');$('.ba input').oninput=function(e){ba.style.setProperty('--p',e.target.value+'%')};

if(!window.gsap||!window.ScrollTrigger||!window.THREE)return;
gsap.registerPlugin(ScrollTrigger);

/* Text reveals */
gsap.set('.rv',{opacity:0,y:40});
ScrollTrigger.batch('.rv',{start:'top 90%',once:true,onEnter:function(els){gsap.to(els,{opacity:1,y:0,duration:1.1,stagger:.12,ease:'power3.out',overwrite:true})}});
$$('[data-n]').forEach(function(el){
 var n=+el.dataset.n,d=+(el.dataset.d||0),s=el.dataset.s||'',o={v:0};
 ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:function(){gsap.to(o,{v:n,duration:2,ease:'power2.out',onUpdate:function(){el.textContent=(d?o.v.toFixed(d):Math.round(o.v).toLocaleString())+s}})}});
});

/* Three.js scene */
var cv=$('#c'),R;
try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!mob,powerPreference:'high-performance'})}catch(e){cv.remove();return}
R.setPixelRatio(Math.min(devicePixelRatio||1,mob?1.4:2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,100);cam.position.z=8;
function size(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}size();
addEventListener('resize',size);

sc.add(new THREE.HemisphereLight(0xfff3e0,0xb86f52,.5));
var dl=new THREE.DirectionalLight(0xffe0b8,2.3);dl.position.set(3,5,5);sc.add(dl);
var fl=new THREE.DirectionalLight(0xfff6e6,.9);fl.position.set(-5,1,4);sc.add(fl);
var pl=new THREE.PointLight(0xc9a46c,2.4,24);pl.position.set(-3,3,-4);sc.add(pl);
var pb=new THREE.PointLight(0xb86f52,1,24);pb.position.set(4,-3,-1);sc.add(pb);
try{var pm=new THREE.PMREMGenerator(R),es=new THREE.Scene();
es.add(new THREE.Mesh(new THREE.SphereGeometry(10,32,16),new THREE.MeshBasicMaterial({color:0x4a3426,side:THREE.BackSide})));
[[0xfff0d8,6,4,5,5,4,5],[0xffd9a8,-7,2,3,2,5,3],[0xc9a46c,0,6,-6,6,1.5,4],[0xb86f52,3,-6,2,5,2,2]].forEach(function(l){var mt=new THREE.MeshBasicMaterial({color:l[0],side:THREE.DoubleSide});mt.color.multiplyScalar(l[6]);var m=new THREE.Mesh(new THREE.PlaneGeometry(l[4],l[5]),mt);m.position.set(l[1],l[2],l[3]);m.lookAt(0,0,0);es.add(m)});
sc.environment=pm.fromScene(es,.04).texture;pm.dispose()}catch(e){}

var rig=new THREE.Group(),tooth=new THREE.Group();rig.add(tooth);sc.add(rig);tooth.position.y=.55;
var crownMat=new THREE.MeshPhysicalMaterial({color:0xefe0c6,roughness:.18,clearcoat:1,clearcoatRoughness:.06,reflectivity:.6,emissive:0x5a3820,emissiveIntensity:.06,envMapIntensity:1.15});
var rootMat=new THREE.MeshPhysicalMaterial({color:0xe4d5ba,roughness:.38,clearcoat:.5,emissive:0xc9803f,emissiveIntensity:0,envMapIntensity:.9});
var g=new THREE.SphereGeometry(1,mob?24:48,mob?18:36),p=g.attributes.position;
for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x);
 if(y>0)y+=.14*Math.cos(2*a)*y*y-.22*Math.exp(-(x*x+z*z)*3)*y;
 p.setXYZ(i,x*1.05,y*.85,z*.9)}
g.computeVertexNormals();
tooth.add(new THREE.Mesh(g,crownMat));
var rg=new THREE.CylinderGeometry(.36,.07,1.5,20),roots=[];
[-1,1].forEach(function(s){var m=new THREE.Mesh(rg,rootMat);m.position.set(s*.45,-1.25,0);m.rotation.z=s*.1;tooth.add(m);roots.push(m)});

/* Accessories shown in the interactive section */
var metal=new THREE.MeshStandardMaterial({color:0xcfc4b3,metalness:.85,roughness:.25}),teal=0xc9a46c;
var screw=new THREE.Group();screw.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.13,1.6,16),metal));
for(i=0;i<6;i++){var th=new THREE.Mesh(new THREE.TorusGeometry(.2-i*.01,.03,8,20),metal);th.rotation.x=Math.PI/2;th.position.y=.6-i*.24;screw.add(th)}
screw.position.y=-1.65;
var brace=new THREE.Group(),bw=new THREE.Mesh(new THREE.TorusGeometry(1.03,.025,8,64),metal);bw.rotation.x=Math.PI/2;bw.scale.y=.88;bw.position.y=.05;
var bk=new THREE.Mesh(new THREE.BoxGeometry(.3,.24,.1),new THREE.MeshStandardMaterial({color:teal,metalness:.4,roughness:.3}));bk.position.set(0,.05,.95);brace.add(bw,bk);
var shell=new THREE.Mesh(g,new THREE.MeshPhysicalMaterial({color:teal,transparent:true,opacity:.22,roughness:.1,clearcoat:1,depthWrite:false}));shell.scale.setScalar(1.09);
var halo=new THREE.Mesh(new THREE.TorusGeometry(1.75,.022,8,90),new THREE.MeshBasicMaterial({color:teal,transparent:true,opacity:.8}));halo.rotation.x=Math.PI/2.2;halo.position.y=.3;
function dot(){var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'#fff');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)}
var dt=dot();
function pts(n,r,sz,col,op){var f=new Float32Array(n*3);for(var i=0;i<n;i++){var a=Math.random()*6.28,b=Math.acos(2*Math.random()-1),d=r*(.7+Math.random()*.6);f[i*3]=d*Math.sin(b)*Math.cos(a);f[i*3+1]=d*Math.cos(b);f[i*3+2]=d*Math.sin(b)*Math.sin(a)}
 var gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.BufferAttribute(f,3));
 return new THREE.Points(gm,new THREE.PointsMaterial({size:sz,map:dt,color:col,transparent:true,opacity:op,depthWrite:false}))}
var spark=pts(16,1.6,.24,0xffffff,1),dust=pts(mob?24:64,2.8,.07,teal,.55);
var ring=new THREE.Mesh(new THREE.TorusGeometry(2.1,.008,6,120),new THREE.MeshBasicMaterial({color:teal,transparent:true,opacity:.55}));ring.rotation.x=Math.PI/2.4;
var acc={screw:screw,brace:brace,shell:shell,halo:halo,spark:spark};
Object.keys(acc).forEach(function(k){acc[k].scale.setScalar(.001);tooth.add(acc[k])});
rig.add(dust,ring);
/* Shadow + scan visualisation */
var shT=(function(){var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d'),gr=x.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(44,33,27,.5)');gr.addColorStop(1,'rgba(44,33,27,0)');x.fillStyle=gr;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
var sh=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),new THREE.MeshBasicMaterial({map:shT,transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=-2.1;rig.add(sh);
var Sc={p:0},hud=$('.hud'),phE=$('.ph'),phK=-1,PH=['Scanning enamel','Precision care','Your healthy smile'];
function sm(x,a,b){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)}
function setPh(k){if(k===phK)return;phK=k;phE.classList.add('f');setTimeout(function(){phE.textContent=PH[k];phE.classList.remove('f')},280)}
var wire=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xc9a46c,wireframe:true,transparent:true,opacity:0,depthWrite:false}));wire.scale.setScalar(1.02);tooth.add(wire);
var line=new THREE.Mesh(new THREE.TorusGeometry(1,.012,6,96),new THREE.MeshBasicMaterial({color:0xf0d9a8,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));line.rotation.x=Math.PI/2;tooth.add(line);
var scanPts=pts(mob?24:60,1.2,.09,0xe0b070,0);tooth.add(scanPts);
function cz(i){return i===2?(mob?7.4:6.6):i===3?(mob?6.8:5.6):8}


/* Scroll-driven camera / position / rotation */
var S={o:1};
function set(sec){var t=sec.dataset.t.split(',').map(Number);
 if(mob){var m=sec.dataset.m;t=m?m.split(',').map(Number):[t[0]*.15,t[1],t[2]*.6,Math.min(t[3],.25)]}
 return {x:t[0],y:t[1],s:t[2],o:t[3]}}
var secs=$$('section[data-t]'),first=set(secs[0]);
rig.position.set(first.x,first.y,0);rig.scale.setScalar(first.s);
secs.forEach(function(sec,i){if(!i)return;var v=set(sec),st={trigger:sec,start:'top 70%',end:'top 20%',scrub:1.2};
 gsap.to(rig.position,{x:v.x,y:v.y,ease:'none',immediateRender:false,scrollTrigger:st});
 gsap.to(rig.scale,{x:v.s,y:v.s,z:v.s,ease:'none',immediateRender:false,scrollTrigger:st});
 gsap.to(S,{o:v.o,ease:'none',immediateRender:false,scrollTrigger:st,onUpdate:function(){cv.style.opacity=S.o}});
 gsap.to(cam.position,{z:cz(i),ease:'none',immediateRender:false,scrollTrigger:st})});
gsap.from(rig.scale,{x:.01,y:.01,z:.01,duration:1.6,ease:'expo.out',delay:.15});

var mx=0,my=0,cx=0,cy=0,pulse=0;
if(fine)addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
gsap.ticker.add(function(t){
 if(S.o<.03||document.hidden)return;
 var pr=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);
 cx+=(mx-cx)*.06;cy+=(my-cy)*.06;
 rig.rotation.y=t*.18+pr*12+cx*.9;rig.rotation.x=cy*.4+Math.sin(t*.6)*.05;
 tooth.position.y=.55+Math.sin(t*1.1)*.06;
 dust.rotation.y=t*.06;ring.rotation.z=t*.12;halo.rotation.z=t*.5;
 spark.material.size=.2+Math.sin(t*4)*.07;
 var p=Sc.p,a=sm(p,0,.12)*(1-sm(p,.5,.66)),k=sm(p,0,.15)*(1-sm(p,.6,.9));
 wire.material.opacity=.3*a;scanPts.material.opacity=.95*a;line.material.opacity=.95*a;scanPts.rotation.y=t*.3;
 var ly=-.5+1.4*Math.sin(t*1.3),ls=ly>-.7?1.1*Math.sqrt(Math.max(0,1-Math.pow(ly/.9,2)))+.14:.95;line.position.y=ly;line.scale.set(ls,ls,1);
 crownMat.roughness=.18+.3*k;crownMat.envMapIntensity=1.15-.6*k;
 hud.style.setProperty('--o',a.toFixed(2));setPh(p<.5?0:p<.78?1:2);

 R.render(sc,cam)});

/* Interactive treatment lab */
var MODES=[
 {n:'Dental Implants',d:'A titanium post replaces the missing root and fuses with the jawbone, topped with a custom crown. It looks, feels and works like a natural tooth.',acc:'screw',roots:0},
 {n:'Teeth Whitening',d:'A professional gel and cool light lift deep stains safely. Most patients leave several shades brighter after a single visit.',acc:'spark',white:1},
 {n:'Root Canal',d:'We clean the infected inside of the tooth, seal it and protect it, ending the pain while keeping your natural tooth.',glow:1},
 {n:'Braces & Aligners',d:'Nearly invisible aligners or modern braces guide teeth into place step by step. We plan the full result digitally before starting.',acc:'brace'},
 {n:'Dental Crowns',d:'A custom ceramic cap covers a weak or damaged tooth, restoring strength and shape, colour-matched to your smile.',acc:'shell'},
 {n:'Preventive Dentistry',d:'Regular check-ups, scaling and fluoride care form a protective shield around your teeth and gums.',acc:'halo'}];
var chips=$('.chips'),cur=0,active=false;
function C(hex){return new THREE.Color(hex)}
function apply(i){var m=i<0?{}:MODES[i],c=C(m.white?0xfffaf0:0xefe0c6),r=C(m.glow?0xe0b070:0xe4d5ba);
 gsap.to(crownMat.color,{r:c.r,g:c.g,b:c.b,duration:.7});gsap.to(rootMat.color,{r:r.r,g:r.g,b:r.b,duration:.7});
 gsap.to(rootMat,{emissiveIntensity:m.glow?.9:0,duration:.7});
 roots.forEach(function(x){gsap.to(x.scale,{x:m.roots===0?.001:1,y:m.roots===0?.001:1,z:m.roots===0?.001:1,duration:.7,ease:'back.out(1.4)'})});
 Object.keys(acc).forEach(function(k){var s=k===m.acc?1:.001;gsap.to(acc[k].scale,{x:s,y:s,z:s,duration:.8,ease:'back.out(1.6)'})})}
MODES.forEach(function(m,i){var b=document.createElement('button');b.className='chip'+(i?'':' on');b.textContent=m.n;b.setAttribute('role','tab');
 b.onclick=function(){cur=i;$$('.chip').forEach(function(c,j){c.classList.toggle('on',i===j)});show(i);if(active)apply(i)};chips.appendChild(b)});
function show(i){$('#lt').textContent=MODES[i].n;$('#ld').textContent=MODES[i].d}show(0);
ScrollTrigger.create({trigger:'#lab',start:'top 55%',end:'bottom 35%',
 onToggle:function(s){active=s.isActive;apply(active?cur:-1)}});
ScrollTrigger.create({trigger:'#lab',start:'top 65%',end:'bottom 35%',onUpdate:function(s){Sc.p=s.progress}});
gsap.from('.ba',{clipPath:'inset(0 100% 0 0)',duration:1.8,ease:'power3.inOut',scrollTrigger:{trigger:'.ba',start:'top 85%',once:true}});
if(!mob)gsap.to('.hero .wrap',{y:-70,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
addEventListener('load',function(){ScrollTrigger.refresh()});
})();
