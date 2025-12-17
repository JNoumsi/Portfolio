/**
 * FABRICE'S PORTFOLIO - MAIN JAVASCRIPT
 * Handles all interactive features
 */

(function() {
  'use strict';

  // ==================== MOBILE MENU ====================
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
    const menuClose = document.querySelector('[data-mobile-menu-close]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const backdrop = document.querySelector('[data-mobile-menu-backdrop]');

    if (!menuToggle || !mobileMenu || !backdrop) return;

    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      backdrop.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  };

  // ==================== DROPDOWN MENUS ====================
  const initDropdowns = () => {
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('[data-dropdown-trigger]');
      const menu = dropdown.querySelector('[data-dropdown-menu]');

      if (!trigger || !menu) return;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('is-open');

        // Close all dropdowns
        dropdowns.forEach(d => d.classList.remove('is-open'));

        // Toggle current dropdown
        if (!isOpen) {
          dropdown.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-dropdown]')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('is-open');
          const trigger = dropdown.querySelector('[data-dropdown-trigger]');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('is-open');
          const trigger = dropdown.querySelector('[data-dropdown-trigger]');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  };

  // ==================== SKILL FILTERS ====================
  const initSkillFilters = () => {
    const filterButtons = document.querySelectorAll('[data-skill-filter]');
    const skillCards = document.querySelectorAll('[data-skill-card]');

    if (filterButtons.length === 0 || skillCards.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-skill-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        // Filter cards
        skillCards.forEach(card => {
          const category = card.getAttribute('data-skill-card');

          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Animate in
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  };

  // ==================== BACK TO TOP ====================
  const initBackToTop = () => {
    const backToTopBtn = document.querySelector('.footer__back-to-top');

    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ==================== HEADER SCROLL EFFECT ====================
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }

      lastScroll = currentScroll;
    });
  };

  // ==================== ANIMATE ON SCROLL ====================
  const initAnimateOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.card, .now-card, .skill-card, .section__header');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  };

  // ==================== LANGUAGE TOGGLE ====================
  const initLanguageToggle = () => {
    const langButtons = document.querySelectorAll('.header__lang-toggle-btn');

    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        langButtons.forEach(btn => {
          btn.classList.remove('header__lang-toggle-btn--active');
          btn.setAttribute('aria-pressed', 'false');
        });

        // Add active class to clicked button
        button.classList.add('header__lang-toggle-btn--active');
        button.setAttribute('aria-pressed', 'true');

        // In a real implementation, you would load the appropriate language content here
        const lang = button.textContent.trim();
        console.log(`Language switched to: ${lang}`);

        // You could dispatch a custom event here that other parts of the app can listen to
        document.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
      });
    });
  };

  // ==================== FORM HANDLING ====================
  const initForms = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // In a real implementation, you would send this to a server
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show success message (you could make this more sophisticated)
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          const originalText = submitButton.textContent;
          submitButton.textContent = 'Submitted!';
          submitButton.disabled = true;

          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            form.reset();
          }, 2000);
        }
      });
    });
  };

  // ==================== ACCESSIBILITY: SCREEN READER ANNOUNCEMENTS ====================
  const announce = (message) => {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  };

  // ==================== INITIALIZE ALL ====================
  const init = () => {
    console.log('🚀 Portfolio initialized');

    initMobileMenu();
    initDropdowns();
    initSkillFilters();
    initBackToTop();
    initSmoothScroll();
    initHeaderScroll();
    initAnimateOnScroll();
    initLanguageToggle();
    initForms();

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      // Alt + H: Go to home
      if (e.altKey && e.key === 'h') {
        window.location.href = 'index.html';
      }
    });

    // Log page view (for analytics)
    const page = document.body.getAttribute('data-page');
    console.log(`Page view: ${page}`);
  };

  // ==================== LOAD ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add CSS animation for fade in
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
})();
