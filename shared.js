/* ================================================================
   VCPRF SHARED JAVASCRIPT
   Veritas Centre for Policy Research Foundation
================================================================ */
 
(function () {
  'use strict';
 
  /* ---- DARK MODE ---- */
  const html = document.documentElement;
  function applyTheme(dark) {
    html.classList.toggle('dark', dark);
    document.querySelectorAll('.icon-moon').forEach(el => el.style.display = dark ? 'none'  : 'block');
    document.querySelectorAll('.icon-sun').forEach(el  => el.style.display = dark ? 'block' : 'none');
  }
  const stored = localStorage.getItem('vcprf-theme');
  applyTheme(stored === 'dark');
 
  function toggleTheme() {
    const isDark = !html.classList.contains('dark');
    localStorage.setItem('vcprf-theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  }
 
  /* ---- PAGE TRANSITIONS ---- */
  const overlay = document.getElementById('page-transition');
 
  function navigateTo(url) {
    if (!overlay) { window.location.href = url; return; }
    overlay.classList.add('is-leaving');
    setTimeout(() => { window.location.href = url; }, 500);
  }
 
  function interceptLinks() {
    document.querySelectorAll('a[data-transition]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
        e.preventDefault();
        navigateTo(href);
      });
    });
  }
 
  /* ---- ENTRY ANIMATION (wipe in on load) ---- */
  function playEntryAnim() {
    if (!overlay) return;
    overlay.classList.add('is-entering');
    setTimeout(() => {
      overlay.classList.remove('is-entering');
    }, 500);
  }
 
  /* ---- NAVBAR SCROLL SHADOW ---- */
  function initNavbar() {
    const nav = document.getElementById('vcprf-nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
 
  /* ---- HAMBURGER ---- */
  function initHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a[data-transition]').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }
 
  /* ---- SCROLL REVEAL ---- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }
 
  /* ---- ACTIVE NAV LINK ---- */
  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });
  }
 
  /* ---- THEME BUTTON LISTENERS ---- */
  function bindThemeButtons() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }
 
  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', () => {
    playEntryAnim();
    initNavbar();
    initHamburger();
    initReveal();
    interceptLinks();
    setActiveNav();
    bindThemeButtons();
  });
 
})();