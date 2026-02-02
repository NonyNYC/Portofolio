// Particle System
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Dynamic Role Rotation
const roles = [
    'Mahasiswa Informatika',
    'Data Analyst',
    'UI/UX Designer', 
    'Web Developer',
    'Network Specialist'
];
let roleIndex = 0;

function changeRole() {
    const roleEl = document.querySelector('.dynamic-role');
    roleEl.style.opacity = '0';
    setTimeout(() => {
        roleEl.textContent = roles[roleIndex];
        roleEl.style.opacity = '1';
        roleIndex = (roleIndex + 1) % roles.length;
    }, 500);
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling & Active Nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'transparent';
    }
    
    // Active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill Progress Bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger skill bars when skills section visible
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.glass-section, .exp-card, .skills, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
    
    // Simulate form submission
    console.log('Form submitted:', Object.fromEntries(new FormData(e.target)));
});

// Mouse Follower (Optional subtle effect)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.classList.add('cursor');
        document.body.appendChild(newCursor);
    }
    const cursorEl = document.querySelector('.cursor');
    cursorEl.style.left = e.clientX + 'px';
    cursorEl.style.top = e.clientY + 'px';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Start typing animation
    setTimeout(() => {
        const heroTitle = document.querySelector('.typing-text h2');
        const fullText = heroTitle.textContent;
        heroTitle.textContent = '';
        typeWriter(heroTitle, fullText, 80);
    }, 500);
    
    // Role changer
    setInterval(changeRole, 3000);
    
    // Add cursor trail particles
    document.body.classList.add('loaded');
});

// ===== CV Modal & Download =====
function openCVModal(event) {
  if (event) event.preventDefault();
  
  const modal = document.createElement('div');
  modal.id = 'cv-modal';
  modal.className = 'cv-modal';
  modal.innerHTML = `
    <div class="cv-modal-content">
      <div class="cv-modal-header">
        <h3>Curriculum Vitae</h3>
        <button class="cv-modal-close" onclick="closeCVModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cv-modal-body">
        <embed id="pdf-viewer" src="cv.pdf" type="application/pdf">
      </div>
      <div class="cv-modal-footer">
        <a href="cv.pdf" download="cv.pdf" class="cta primary">
          <i class="fas fa-download"></i> Download CV
        </a>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'flex';
  
  // Close ketika click di luar modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCVModal();
  });
}

function closeCVModal() {
  const modal = document.getElementById('cv-modal');
  if (modal) modal.remove();
}


