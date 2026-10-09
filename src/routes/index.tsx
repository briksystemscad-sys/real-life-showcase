import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Menu, X, Pause, Play, Flame, Leaf, UtensilsCrossed, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/mango-coal-logo.png';
import grill from '@/assets/grill.jpg.asset.json';
import chicken from '@/assets/chicken.jpg.asset.json';
import fish from '@/assets/fish.jpg.asset.json';
import kitchen from '@/assets/kitchen.jpg.asset.json';
import video from '@/assets/fire-cooking.mp4.asset.json';
import webVideo from '@/assets/fire-cooking.webm.asset.json';
import poster from '@/assets/fire-cooking-poster.jpg.asset.json';

import { RestaurantExtras } from '@/components/restaurant-extras';

export const Route = createFileRoute('/')({
 head: () => ({meta:[
  {title:'Mango & Coal — Good Fire. Big Flavour. | Caribbean Kitchen'},
  {name:'description',content:'Discover Mango & Coal: coal-kissed jerk chicken, slow-braised oxtail, bright island flavours and Caribbean feasts made for sharing.'},
  {property:'og:title',content:'Mango & Coal — Good Fire. Big Flavour.'},
  {property:'og:description',content:'Caribbean flavour. Slow fire. An open door. Explore the house menu and sharing feasts.'},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'}
 ]}), component:Index,
});
const menuData = {
 Plates:[['Coal-kissed jerk chicken','coconut rice, mango chow',24],['Sunday oxtail','butter beans, thyme gravy',29],['Market snapper','escovitch vegetables, lime',31],['Curry goat','roti, tamarind chutney',27]],
 Sides:[['Rice & peas','coconut rice, red kidney beans',7],['Sweet plantain','golden edges, sea salt',8],['Callaloo greens','garlic, onion, gentle spice',9],['Festival bread','golden fried, lightly sweet',7]],
 Sweets:[['Rum cake','dark rum, warm spice',11],['Coconut drops','ginger, toasted coconut',8],['Mango ice','fresh mango, a squeeze of lime',9],['Sorrel poached pear','hibiscus, warming spices',12]],
 Drinks:[['Sorrel fizz','hibiscus, ginger, sparkling water',7],['Pineapple ting','pineapple, citrus, soda',7],['Island old fashioned','aged rum, bitters, orange',15],['Ginger beer','fiery ginger, fresh lime',6]],
} satisfies Record<string, [string,string,number][]>;
type Category = keyof typeof menuData;
const nav = [['Menu','#menu'],['Our story','#story'],['Catering','#catering'],['Visit','#visit']];
function Brand(){return <a className="brand" href="#top" aria-label="Mango & Coal home"><img src={logo} alt="Mango & Coal logo" width={1024} height={1024}/><span>MANGO & COAL</span></a>}
function Index(){
 const [category,setCategory]=useState<Category>('Plates');
 const [mobileOpen,setMobileOpen]=useState(false);
 const [enquiryOpen,setEnquiryOpen]=useState(false);
 const [playing,setPlaying]=useState(true);
 const [scrolled,setScrolled]=useState(false);
 const videoRef=useRef<HTMLVideoElement>(null);
 const triggerRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced){videoRef.current?.pause();setPlaying(false)}},[]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>80);onScroll();window.addEventListener('scroll',onScroll,{passive:true});const nodes=document.querySelectorAll('.section-head,.food-card,.story-photo,.story-photo + div,.menu-section,.values-grid article,.journal-photo,.dining-questions,.visit');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}})},{threshold:0.08});nodes.forEach(node=>{node.classList.add('scroll-reveal');observer.observe(node)});return()=>{observer.disconnect();window.removeEventListener('scroll',onScroll)}}return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{if(!enquiryOpen)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setEnquiryOpen(false)};document.addEventListener('keydown',escape);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',escape);triggerRef.current?.focus()}},[enquiryOpen]);
 async function toggleVideo(){const el=videoRef.current;if(!el)return;if(el.paused){try{await el.play();setPlaying(true)}catch{setPlaying(false)}}else{el.pause();setPlaying(false)}}
 return <>
 <header className={scrolled?'site-header is-scrolled':'site-header'}><Brand/><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><Button variant="pepper" asChild className="header-cta"><a href="#visit">Find our table <ArrowRight/></a></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={mobileOpen?'Close navigation':'Open navigation'} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X/>:<Menu/>}</Button>{mobileOpen&&<nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label,href])=><a href={href} key={href} onClick={()=>setMobileOpen(false)}>{label}</a>)}</nav>}</header>
 <main>
 <section className="hero" id="top" aria-label="Mango & Coal Caribbean kitchen">
 <video className="hero-media" ref={videoRef} poster={poster.url} autoPlay muted loop playsInline preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} aria-hidden="true"><source src={webVideo.url} type="video/webm"/><source src={video.url} type="video/mp4"/></video>
 <div className="hero-wash"/><div className="hero-bottom"/>
 <Button variant="ghost" size="icon" className="video-control" onClick={toggleVideo} aria-label={playing?'Pause background video':'Play background video'} title={playing?'Pause video':'Play video'}>{playing?<Pause/>:<Play/>}</Button>
 <div className="hero-content"><p className="eyebrow">Caribbean kitchen · Slow fire · Open door</p><h1>Good fire.<span>Big flavour.</span></h1><p className="hero-copy">Jerk smoke, bright citrus, slow-braised comfort. Caribbean food made loudly and served with an open door.</p><div className="hero-actions"><Button variant="sunshine" asChild><a href="#menu">Explore the menu <ArrowDown/></a></Button><Button variant="chalk" asChild><a href="#catering">Bring the feast</a></Button></div></div>
 <div className="hero-tag">FIRE-COOKED · ISLAND-INSPIRED</div>
 </section>
 <div className="marquee" aria-label="Jerk chicken, whole snapper, curry goat, rum cake, oxtail, sorrel fizz"><div className="marquee-track" aria-hidden="true">{Array.from({length:4},(_,i)=>['JERK CHICKEN','WHOLE SNAPPER','CURRY GOAT','RUM CAKE','OXTAIL','SORREL FIZZ'].map(t=><span key={i+t} className="flex items-center gap-8">{t}<i>✦</i></span>))}</div></div>
 <section className="section"><div className="section-head"><div><p className="eyebrow">House favourites</p><h2 className="section-title">Three reasons to come hungry.</h2></div><p className="section-description">Recipes with roots, sharpened by smoke, acid, and the best produce we can find.</p></div><div className="favourites-grid">
 {[{image:grill,title:'Slow fire',sub:'Deep char · bright island spice'},{image:chicken,title:'Big flavour',sub:'Coal-kissed chicken · fresh citrus'},{image:fish,title:'Fresh from the market',sub:'Whole fish · seasonal ingredients'}].map((f,i)=><article className="food-card" key={f.title}><div className="food-photo"><img src={f.image.url} alt={i===0?'Real grilled meat with vegetables':i===1?'Grilled chicken with fresh vegetables and lemon':'Fresh whole fish ready for the kitchen'} width={1000} height={900} loading="lazy"/><span className="food-number">(0{i+1})</span></div><div className="food-label"><h3>{f.title}</h3><ArrowUpRight size={22}/></div><p>{f.sub}</p></article>)}
 </div></section>
 <div className="story-band"><section className="section story" id="story"><div className="story-photo"><img src={kitchen.url} alt="A real flame-grilled feast with charred vegetables and chicken" loading="lazy" width={1600} height={2400}/><div className="photo-caption"><span>THE HEART OF THE KITCHEN</span><span>FIRE · SPICE · SOUL</span></div></div><div><p className="eyebrow">Our story</p><h2 className="section-title">From a backyard grill to a room full of regulars.</h2><p>Good Caribbean cooking starts long before the first plate reaches the table. With a fragrant spice blend, a patient fire, and food that brings people together.</p><p>That’s the spirit of Mango & Coal: build the fire slowly, season with patience, and make enough for whoever arrives next.</p><blockquote>“The table gets better when it gets louder.”</blockquote></div></section></div>
 <section className="section menu-section" id="menu"><div className="section-head"><div><p className="eyebrow">Eat with us</p><h2 className="section-title">The house menu</h2></div><p className="section-description">Prices in CAD · Menu changes with the market</p></div><div className="menu-tabs" role="tablist" aria-label="Menu categories">{(Object.keys(menuData) as Category[]).map(c=><Button variant="menuTab" key={c} role="tab" id={'tab-'+c} aria-selected={c===category} aria-controls="menu-panel" onClick={()=>setCategory(c)}>{c}</Button>)}</div><div key={category} className="menu-items" role="tabpanel" id="menu-panel" aria-labelledby={'tab-'+category}>{menuData[category].map(([name,details,price])=><article className="menu-row" key={name}><div><h3>{name}</h3><p>{details}</p></div><span className="menu-price">${price}</span></article>)}</div></section>
 <section className="catering" id="catering"><img className="catering-image" src={kitchen.url} alt="A generous spread of grilled food and vegetables" loading="lazy" width={1600} height={2400}/><div className="hero-wash"/><div className="section catering-content"><p className="eyebrow">Catering</p><h2 className="section-title">Put the whole island on the table.</h2><p>A gathering of ten or a room full of hungry guests. Start with your favourite plates, add the sides, and make it a feast worth sharing.</p><Button ref={triggerRef} variant="sunshine" onClick={()=>setEnquiryOpen(true)}>Plan your catering feast <ArrowUpRight/></Button></div></section>
 <section className="values"><div className="section values-grid"><article><Flame/><h3>Low and slow.</h3><p>Coal-kissed chicken. Slow-braised comfort. The kind of flavour you can’t rush.</p></article><article><Leaf/><h3>Bright by nature.</h3><p>Mango, citrus, fresh herbs and island spice. A little sunshine on every plate.</p></article><article><UtensilsCrossed/><h3>Better together.</h3><p>Pass the plates. Share the sides. There’s always a reason to gather around the table.</p></article></div></section>
 <RestaurantExtras/>
 <section className="section visit" id="visit"><div><p className="eyebrow">Come through</p><h2 className="section-title">Find the<br/>green door.</h2></div><div className="visit-details"><div><h3>Our kitchen</h3><p>Mango & Coal<br/>Caribbean kitchen</p></div><div><h3>At the table</h3><p>Island plates.<br/>Good company.</p></div><div><h3>Find us</h3><p>Address to be confirmed.</p></div><div><h3>Kitchen hours</h3><p>Hours to be confirmed.</p></div><p className="visit-note">Location and contact details will be available here once confirmed. Reservations and catering enquiries are not yet open.</p></div></section>
 </main>
 <footer className="site-footer"><div className="footer-main"><div><Brand/><p>Caribbean food, slow fire, open door.</p></div><nav className="footer-links" aria-label="Footer navigation"><a href="#menu">Menu</a><a href="#catering">Catering</a><a href="#visit">Visit</a><a href="#top" aria-label="Back to top"><ArrowUpRight size={18}/></a></nav></div><div className="footer-bottom"><span>© 2026 MANGO & COAL</span><span>GOOD FIRE. BIG FLAVOUR.</span></div></footer>
 {enquiryOpen&&<EnquiryDialog onClose={()=>setEnquiryOpen(false)}/>}
 </>;
}
function EnquiryDialog({onClose}:{onClose:()=>void}){
 const [downloaded,setDownloaded]=useState(false);const dialogRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus()},[]);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget);const text=`MANGO & COAL — CATERING ENQUIRY DRAFT\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nDate: ${data.get('date')}\nGuests: ${data.get('guests')}\nOccasion: ${data.get('occasion')}\nDetails: ${data.get('details')}\n\nThis is a personal draft. No enquiry has been sent and no booking is confirmed.`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='mango-and-coal-catering-enquiry.txt';a.click();URL.revokeObjectURL(url);setDownloaded(true)}
 return <div className="dialog-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div ref={dialogRef} className="enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onKeyDown={e=>{if(e.key!=='Tab')return;const nodes=dialogRef.current?.querySelectorAll<HTMLElement>('button,input,textarea,select');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(!first||!last)return;if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}><Button variant="ghost" size="icon" className="dialog-close" aria-label="Close catering planner" onClick={onClose}><X/></Button><p className="eyebrow">Bring the feast</p><h2 id="enquiry-title">A table worth sharing.</h2><p>Prepare your catering enquiry. Contact details are still being confirmed, so this saves a draft for you—it doesn’t send a request.</p><form className="enquiry-form" onSubmit={submit}><label className="form-field">Your name<input name="name" required autoComplete="name"/></label><label className="form-field">Email<input name="email" type="email" required autoComplete="email"/></label><label className="form-field">Event date<input name="date" type="date" required/></label><label className="form-field">Number of guests<input name="guests" type="number" min="1" max="10000" required/></label><label className="form-field form-wide">Occasion<select name="occasion"><option>Family gathering</option><option>Office lunch</option><option>Wedding or celebration</option><option>Other</option></select></label><label className="form-field form-wide">What do you have in mind?<textarea name="details" rows={3} placeholder="Favourite plates, dietary needs, location…"/></label><Button variant="sunshine" className="form-wide" type="submit"><Download/>Save enquiry draft</Button>{downloaded&&<p role="status" className="draft-status form-wide">Your draft has been downloaded. Nothing has been sent or booked.</p>}</form></div></div>
}
