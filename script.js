// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeKey = 'ahsan-theme-preference';

// Function to update theme icon
const updateThemeIcon = () => {
  const isLight = html.classList.contains('light');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
};

// Load saved theme
const savedTheme = localStorage.getItem(themeKey);
if (savedTheme === 'light') {
  html.classList.add('light');
}
updateThemeIcon(); // Set initial icon

themeToggle.addEventListener('click', () => {
  html.classList.toggle('light');
  const isLight = html.classList.contains('light');
  localStorage.setItem(themeKey, isLight ? 'light' : 'dark');
  
  // Update icon
  updateThemeIcon();
  
  // Add animation feedback
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 150);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuToggle.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.innerHTML = '☰';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuToggle.innerHTML = '☰';
    }
  });
}

// Scroll Indicator
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollIndicator.style.width = scrollPercent + '%';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Email
const contactBtn = document.getElementById('contactBtn');
const emailBtn = document.getElementById('emailBtn');

const handleEmailClick = (e) => {
  e.preventDefault();
  const u = 'ahmed.bitsandbytes';
  const d = 'gmail.com';
  window.location.href = `mailto:${u}@${d}?subject=${encodeURIComponent('Hello Ahsan - Let\'s Connect')}`;
};

if (contactBtn) {
  contactBtn.addEventListener('click', handleEmailClick);
}
if (emailBtn) {
  emailBtn.addEventListener('click', handleEmailClick);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .timeline-item, .education-card, .project-card, .publication-item, .ml-focus-item').forEach(el => {
  el.classList.add('loading');
  observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent);
  }
  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// Parallax effect for hero section (disabled to prevent overlap)
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const hero = document.querySelector('.hero');
//   if (hero && scrolled < window.innerHeight) {
//     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
//   }
// });

// Add typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
  const originalText = subtitle.textContent;
  // This is optional - can be enabled if desired
  // Uncomment to enable typing effect
  /*
  let i = 0;
  subtitle.textContent = '';
  const typeWriter = () => {
    if (i < originalText.length) {
      subtitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  setTimeout(typeWriter, 1000);
  */
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

