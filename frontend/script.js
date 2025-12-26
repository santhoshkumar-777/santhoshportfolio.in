
// EmailJS initialization
emailjs.init("Oh607FW11K0ukZKuA");

// IIFE wrapper start
(function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  // Only nav icons that are hash links
  const navIcons = document.querySelectorAll('.nav-icon[href^="#"]');

  // Handle both nav links and nav icons (hash links only)
  const allNavElements = [...navLinks, ...navIcons];

  allNavElements.forEach(element => {
    element.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // Only intercept hash links
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate the target position with precise offset
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 30; // 30px extra for perfect positioning

        // Add creative scroll effect with easing
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2 seconds for smooth animation
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth animation
        function easeInOutCubic(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t + b;
          t -= 2;
          return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);

        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinksContainer && navLinksContainer.classList.contains('show')) {
          navLinksContainer.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }

        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);

        // Update active states for both nav links and icons
        updateActiveStates(targetId);
      }
    });
  });

  // Function to update active states
  function updateActiveStates(targetId) {
    // Remove active class from all nav elements
    navLinks.forEach(link => link.classList.remove('active'));
    navIcons.forEach(icon => icon.classList.remove('active'));

    // Add active class to current elements
    const activeNavLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
    const activeNavIcon = document.querySelector(`.nav-icon[href="${targetId}"]`);

    if (activeNavLink) activeNavLink.classList.add('active');
    if (activeNavIcon) activeNavIcon.classList.add('active');
  }
}
)();

// Initialize smooth scrolling - function removed as functionality is handled elsewhere

// Advanced particle system for hero section
function initParticleSystem() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create particle container
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    `;
  hero.appendChild(particleContainer);

  // Create particles
  for (let i = 0; i < 20; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, var(--primary), var(--accent));
      border-radius: 50%;
      opacity: 0.6;
      animation: floatParticle 8s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 8}s;
    `;
  container.appendChild(particle);
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0px) translateX(0px); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
    }
  `;
document.head.appendChild(style);

// Initialize particle system
initParticleSystem();

// Simple hover effect for cards
function initSimpleHover() {
  const cards = document.querySelectorAll('.card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
    });
  });
}

// Initialize simple hover
initSimpleHover();

// Enhanced typing effect with more dynamic behavior
function initEnhancedTyping() {
  const words = [
    'AI Enthusiast',
    'Web Developer',
    'Chatbot Creator',
    'Freelancer',
    'Problem Solver',
    'Creative Thinker'
  ];

  const typedEl = document.getElementById('typed-words');
  const caret = document.querySelector('.caret');

  if (!typedEl) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let typingSpeed = 80;
  let pauseTime = 1200;

  function type() {
    const full = words[wordIndex];

    if (!deleting) {
      typedEl.textContent = full.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === full.length) {
        deleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      typedEl.textContent = full.slice(0, Math.max(0, charIndex - 1));
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 45 : typingSpeed);
  }

  type();
}

// Initialize enhanced typing
initEnhancedTyping();

// Scroll progress indicator
function initScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');

  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      scrollProgress.style.width = scrollPercent + '%';
    });
  }
}

// Initialize scroll progress
initScrollProgress();

// Creative scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const sections = document.querySelectorAll('section[id]');

  if (!scrollIndicator) return;

  // Show scroll indicator after scrolling
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      scrollIndicator.classList.add('visible');
    } else {
      scrollIndicator.classList.remove('visible');
    }

    // Update active dot based on current section
    let currentSection = '';
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    scrollDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === currentSection) {
        dot.classList.add('active');
      }
    });
  });

  // Click functionality for scroll dots
  scrollDots.forEach(dot => {
    dot.addEventListener('click', function () {
      const targetSection = this.getAttribute('data-section');
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 30;

        // Creative scroll animation
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function scrollAnimation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        function easeInOutQuart(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t * t + b;
          t -= 2;
          return -c / 2 * (t * t * t * t - 2) + b;
        }

        requestAnimationFrame(scrollAnimation);

        // Add click effect
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
          this.style.transform = 'scale(1.3)';
        }, 100);
      }
    });
  });
}

// Initialize scroll indicator
initScrollIndicator();

// Enhanced section reveal with creative effects
function initEnhancedReveal() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('in-view');

        // Add staggered animation for grid items
        if (entry.target.parentElement && entry.target.parentElement.classList.contains('skills-grid')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }

        // Add creative entrance effect
        entry.target.style.animation = 'sectionInView 0.8s ease-out';

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

// Initialize enhanced reveal
initEnhancedReveal();

// Enhanced navigation with active state
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
}

// Initialize active navigation
initActiveNavigation();

// Enhanced form interactions
function initEnhancedForm() {
  const formFields = document.querySelectorAll('.form-field input, .form-field textarea');

  formFields.forEach(field => {
    field.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    field.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Auto-resize textarea
    if (field.tagName === 'TEXTAREA') {
      field.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
    }
  });
}

// Initialize enhanced form
initEnhancedForm();

// Mobile nav toggle
var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('show');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Simple hover effect for social buttons
document.querySelectorAll('.tilt-mini').forEach(function (btn) {
  btn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-3px) scale(1.05)';
    this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
  });
  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  });
});

// Floating Contact button click -> navigate to Contact page
var contactFab = document.getElementById('contactBtn');
if (contactFab) {
  contactFab.addEventListener('click', function () {
    window.location.href = 'contact.html';
  });
}

// logo feature removed

// Contact form: validate, send, clear, toast
// Contact form logic moved to sendemail() function to support backend integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendemail();
  });
}

function showToast(text) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 3500);
}

// Simple hover on contact card
var contactCard = document.getElementById('contact-card');
if (contactCard) {
  contactCard.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
  });
  contactCard.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  });
}

// Typewriter modal functionality for About Me section
function initTypewriterModal() {
  const aboutSection = document.getElementById('about');
  const typewriterModal = document.getElementById('typewriterModal');
  const typewriterText = document.getElementById('typewriterText');
  const typewriterCursor = document.getElementById('typewriterCursor');
  const closeBtn = document.querySelector('.typewriter-close');

  if (!aboutSection || !typewriterModal) return;

  const aboutContent = "💡 I'm an AI Developer & Junior Web Developer, driven by a passion for building intelligent solutions and seamless digital experiences.🧠 My curiosity for AI programming pushes me to explore machine learning and automation, turning complex problems into smart, practical solutions.📱 On the web side, I focus on creating modern, responsive, and user-friendly applications that blend performance with design.✨ With a mindset of continuous learning, I aim to combine creativity and technology to craft impactful projects that truly make a difference.";

  let isTyping = false;

  // Open modal on about section click
  aboutSection.addEventListener('click', function () {
    openTypewriterModal();
  });

  // Close modal functionality
  closeBtn.addEventListener('click', closeTypewriterModal);
  typewriterModal.querySelector('.modal-backdrop').addEventListener('click', closeTypewriterModal);

  function openTypewriterModal() {
    typewriterModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    startTypewriter();
  }

  function closeTypewriterModal() {
    typewriterModal.classList.remove('show');
    document.body.style.overflow = '';
    isTyping = false;
    typewriterText.textContent = '';
    typewriterCursor.style.opacity = '1';
  }

  function startTypewriter() {
    if (isTyping) return;

    isTyping = true;
    typewriterText.textContent = '';
    typewriterCursor.style.opacity = '1';

    let charIndex = 0;

    function typeChar() {
      if (!isTyping) return;

      if (charIndex < aboutContent.length) {
        typewriterText.textContent += aboutContent.charAt(charIndex);
        charIndex++;

        // Add slight delay for better effect
        setTimeout(typeChar, 50);
      } else {
        // Hide cursor when done
        setTimeout(() => {
          typewriterCursor.style.opacity = '0';
        }, 500);
      }
    }

    typeChar();
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && typewriterModal.classList.contains('show')) {
      closeTypewriterModal();
    }
  });
}

// Initialize typewriter modal
initTypewriterModal();

// Enhanced success/error display
function showFormMessage(message, type = 'success') {
  // Remove existing message
  const existingMsg = document.getElementById('form-message');
  if (existingMsg) existingMsg.remove();

  // Create new message element
  const msgDiv = document.createElement('div');
  msgDiv.id = 'form-message';
  msgDiv.textContent = message;
  msgDiv.style.cssText = `
      margin-top: 15px;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

  // Insert after the form
  const form = document.getElementById('contact-form');
  if (form) form.appendChild(msgDiv);

  // Auto-hide after 5 seconds
  setTimeout(() => { if (msgDiv) msgDiv.remove(); }, 5000);
}


async function sendemail() {
  const emailField = document.getElementById("email");
  const firstNameField = document.getElementById("firstName");
  const lastNameField = document.getElementById("lastName");
  const messageField = document.getElementById("message");
  const sendBtn = document.getElementById("sendBtn");

  const email = emailField.value.trim();
  const firstName = firstNameField.value.trim();
  const lastName = lastNameField.value.trim();
  const from_name = firstName + ' ' + lastName;
  const message = messageField.value.trim();

  // Basic Validation
  if (!email || !firstName || !lastName || !message) {
    showFormMessage("Please fill in all fields correctly.", 'error');
    return;
  }

  // Visual Feedback: Loading
  const originalBtnText = sendBtn.textContent;
  sendBtn.textContent = "SENDING...";
  sendBtn.disabled = true;

  console.log('🚀 Sending to components:', { firstName, lastName, email });

  try {
    // 1. INTEGRATION: Backend & Database
    const response = await fetch('http://localhost:9000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    if (response.ok) {
      console.log('✅ DATABASE SYNC: Success');
    } else {
      throw new Error('Database sync failed');
    }

    // 2. INTEGRATION: EmailJS (Mail Notifications)
    const templateParams = { email, from_name, message };
    await emailjs.send('service_fim7h74', 'template_kmwoyta', templateParams);

    console.log('✅ EMAILJS SYNC: Success');
    showFormMessage("Message sent and saved successfully!", 'success');
    document.getElementById('contact-form').reset();

  } catch (error) {
    console.error('❌ INTEGRATION ERROR:', error);
    showFormMessage("Action failed. Check if local server is running.", 'error');
  } finally {
    sendBtn.textContent = originalBtnText;
    sendBtn.disabled = false;
  }
}

// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Resume Modal Functionality
function initResumeModal() {
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  if (!resumeBtn || !resumeModal) return;

  function openModal() {
    resumeModal.classList.add('resume-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal.classList.remove('resume-modal-open');
    document.body.style.overflow = '';
  }

  resumeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeModal);
  }

  // Close on click outside
  resumeModal.addEventListener('click', function (e) {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && resumeModal.classList.contains('resume-modal-open')) {
      closeModal();
    }
  });
}

// Initialize Resume Modal
initResumeModal();

// Project Filtering
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');

        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.style.display = 'block';
          // Trigger reflow/animation
          setTimeout(() => {
            card.classList.add('visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
            card.classList.remove('visible');
          }, 300);
        }
      });
    });
  });
}

// Initialize Project Filter
initProjectFilter();
