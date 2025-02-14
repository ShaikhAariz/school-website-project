// Mobile Menu Toggle
const menuToggle = document.querySelector('[data-toggle-menu]');
const navMenu = document.querySelector('[data-nav-menu]');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});


// Gallery Filter
document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.display = filter === 'all' || item.dataset.category === filter ? 
                'block' : 'none';
        });
    });
});
// Add this code after gallery filter in main.js
const animateNumbers = () => {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = +counter.dataset.counter;
        const duration = 2000;
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const increment = Math.min(Math.floor(progress / (duration / target)), target);
            
            counter.textContent = increment;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(animate);
    });
}
// Remove existing smooth scroll code and replace with this:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.global-nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

  
// Trigger when stats section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats-grid'));

// Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    
    if (!name.value.trim()) {
        e.preventDefault();
        name.focus();
        alert('Please enter your name');
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        e.preventDefault();
        email.focus();
        alert('Please enter a valid email');
    }
});
