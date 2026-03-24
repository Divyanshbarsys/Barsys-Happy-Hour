    // ---- Intersection Observer for fade-up animations ----
    (function () {
      var fadeEls = document.querySelectorAll('.fade-up');
      if (!fadeEls.length) return;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      fadeEls.forEach(function (el) { obs.observe(el); });
    })();

    // ---- Product image gallery thumbnails (video + image swap) ----
    (function () {
      document.querySelectorAll('.product-card__thumbs').forEach(function (thumbsContainer) {
        var galleryId = thumbsContainer.getAttribute('data-gallery');
        var mainFrame = document.getElementById(galleryId);
        var video = mainFrame.querySelector('video');
        var videoHTML = video ? video.outerHTML : '';
        var thumbs = thumbsContainer.querySelectorAll('.product-card__thumb');

        thumbs.forEach(function (thumb, index) {
          thumb.addEventListener('click', function () {
            thumbs.forEach(function (t) { t.classList.remove('active'); });
            thumb.classList.add('active');

            if (index === 0 && videoHTML) {
              // First thumb = show video again
              var existingImg = mainFrame.querySelector('img.gallery-img');
              if (existingImg) {
                mainFrame.innerHTML = videoHTML;
                var newVideo = mainFrame.querySelector('video');
                if (newVideo) newVideo.play().catch(function(){});
              }
            } else {
              // Other thumbs = show static image
              var src = thumb.querySelector('img').getAttribute('src');
              if (video) {
                var v = mainFrame.querySelector('video');
                if (v) v.pause();
              }
              var existingImg = mainFrame.querySelector('img.gallery-img');
              if (existingImg) {
                existingImg.setAttribute('src', src);
              } else {
                var v = mainFrame.querySelector('video');
                if (v) v.style.display = 'none';
                var img = document.createElement('img');
                img.className = 'gallery-img';
                img.src = src;
                img.alt = thumb.querySelector('img').alt;
                mainFrame.appendChild(img);
              }
            }
          });
        });
      });
    })();

    // ---- Mobile hamburger ----
    (function () {
      var nav = document.querySelector('.nav');
      var hamburger = document.querySelector('.nav__hamburger');
      var navLinks = document.querySelectorAll('.nav__link');
      if (!hamburger || !nav) return;

      function closeMenu() {
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('nav--open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });

      document.querySelectorAll('.nav__mobile-cta a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
          closeMenu();
          hamburger.focus();
        }
      });
    })();

    // ---- Sticky nav background on scroll ----
    (function () {
      var nav = document.querySelector('.nav');
      if (!nav) return;
      window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
      });
    })();
