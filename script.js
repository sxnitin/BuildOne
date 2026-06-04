// script.js

// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Determine current page for Navbar state
const path = window.location.pathname;
let currentView = 'home';
if (path.includes('orderflow.html')) currentView = 'orderflow';
else if (path.includes('brands.html')) currentView = 'brands';
else if (path.includes('about.html')) currentView = 'about';
else if (path.includes('contact.html')) currentView = 'contact';

// 3. Navigation UI Update
function updateNavUI() {
    const isScrolled = window.scrollY > 20;
    const isDarkBackground = (currentView === 'home');
    const nav = document.getElementById('main-nav');
    
    const dynamicLogo = document.getElementById('dynamic-logo');
    const ctaBtn = document.getElementById('nav-cta');
    const mobileToggle = document.getElementById('mobile-toggle');

    if (nav) {
        if (isScrolled) {
            if (isDarkBackground) {
                nav.className = "fixed top-0 w-full z-50 border-b transition-all duration-300 bg-[#010614]/90 backdrop-blur-md border-white/10";
            } else {
                nav.className = "fixed top-0 w-full z-50 border-b transition-all duration-300 bg-white/90 backdrop-blur-md border-slate-200";
            }
        } else {
            nav.className = "fixed top-0 w-full z-50 border-b transition-all duration-300 bg-transparent border-transparent";
        }
    }

    if (isDarkBackground) {
        if (dynamicLogo) dynamicLogo.src = "assets/logo.png"; 
        if (mobileToggle && mobileToggle.classList.contains('text-slate-900')) {
            mobileToggle.classList.replace('text-slate-900', 'text-white');
        }
        if (ctaBtn) ctaBtn.className = "inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[0.98] border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30 !px-4 !py-1.5 !text-sm";
    } else {
        if (dynamicLogo) dynamicLogo.src = "assets/black.png"; 
        if (mobileToggle && mobileToggle.classList.contains('text-white')) {
            mobileToggle.classList.replace('text-white', 'text-slate-900');
        }
        if (ctaBtn) ctaBtn.className = "inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[0.98] bg-[#0f172a] text-white hover:bg-[#1e293b] !px-4 !py-1.5 !text-sm";
    }

    // Handle underlines
    document.querySelectorAll('.nav-link').forEach(link => {
        const target = link.getAttribute('data-target');
        
        if (isDarkBackground) {
            link.classList.remove('text-slate-900');
            link.classList.add('text-white');
        } else {
            link.classList.remove('text-white');
            link.classList.add('text-slate-900');
        }

        const underline = link.querySelector('.nav-underline');
        if (underline) {
            if (target === currentView) {
                link.classList.replace('opacity-60', 'opacity-100');
                underline.classList.replace('scale-x-0', 'scale-x-100');
                underline.classList.remove('group-hover:scale-x-100');
            } else {
                link.classList.replace('opacity-100', 'opacity-60');
                underline.classList.replace('scale-x-100', 'scale-x-0');
                underline.classList.add('group-hover:scale-x-100');
            }
        }
    });
}

window.addEventListener('scroll', updateNavUI);
document.addEventListener('DOMContentLoaded', updateNavUI);

// 4. Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if(menu) menu.classList.toggle('hidden');
}

// 5. Google Form Logic (Only runs if the form is present on the page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        btn.innerText = 'Sending...';
        btn.disabled = true;

        const form = e.target;
        const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeZhNS4Cul17PiPnk6H3kSPA1vZiMpyXNXHTebpSU8ZFK-2QQ/formResponse';
        
        const formBody = new URLSearchParams();
        formBody.append('entry.1082714252', form.firstName.value); 
        formBody.append('entry.1049403009', form.lastName.value);
        formBody.append('entry.90279281', form.email.value);
        formBody.append('entry.1742706633', form.enquireAbout.value);
        formBody.append('entry.1560558867', form.source.value);

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody.toString()
            });
            
            document.getElementById('contact-form').classList.add('hidden');
            document.getElementById('success-state').classList.replace('hidden', 'flex');
        } catch (error) {
            console.error("Error submitting: ", error);
            alert("Something went wrong. Please try again.");
        } finally {
            btn.innerText = 'Contact us';
            btn.disabled = false;
        }
    });
}

function resetForm() {
    if(contactForm) {
        contactForm.reset();
        document.getElementById('success-state').classList.replace('flex', 'hidden');
        contactForm.classList.remove('hidden');
    }
}