'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
menuToggle?.addEventListener('click', () => {const open = navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded', String(open));menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');}));
const modals = [...document.querySelectorAll('.modal')];
let previousFocus = null;
function openModal(id) {const modal=document.getElementById(id);if(!modal||!modal.classList.contains('modal'))return;closeAllModals(false);previousFocus=document.activeElement;modal.classList.add('is-open');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label',modal.querySelector('h2')?.textContent||'Информация');document.body.style.overflow='hidden';modal.querySelector('.close-btn')?.focus();}
function closeAllModals(restore=true){modals.forEach(modal=>modal.classList.remove('is-open'));document.body.style.overflow='';if(restore&&previousFocus?.focus)previousFocus.focus();}
function closeModal(id){if(document.getElementById(id)?.classList.contains('is-open'))closeAllModals();}
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.modal)));
modals.forEach(modal=>{modal.addEventListener('click',event=>{if(event.target===modal)closeAllModals()});modal.querySelector('.close-btn')?.addEventListener('click',()=>closeAllModals());modal.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const focusables=[...modal.querySelectorAll('button,a[href],input,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}})});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeAllModals();navLinks?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false')}});
const progress=document.querySelector('#progress');let scrollScheduled=false;
function updateScroll(){scrollScheduled=false;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
const revealElements=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver' in window&&!reducedMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.1});revealElements.forEach(el=>observer.observe(el));}else{revealElements.forEach(el=>el.classList.add('is-visible'))}
if(!reducedMotion&&window.matchMedia('(pointer:fine)').matches){const panel=document.querySelector('#tilt-panel');const art=document.querySelector('.hero-art');art?.addEventListener('pointermove',event=>{const rect=art.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;panel.style.transform=`perspective(850px) rotateY(${x*11}deg) rotateX(${-y*10}deg) rotateZ(-7deg)`});art?.addEventListener('pointerleave',()=>{panel.style.transform='rotate(-7deg)'})}
