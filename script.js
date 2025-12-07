document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const navLinks = document.querySelectorAll(".navbar a");
  const logo = document.querySelector(".logo");

  // Initialize mobile menu state
  let isMobileMenuOpen = false;

  // Toggle mobile menu function
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileMenuBtn.classList.toggle("active");
    navbar.classList.toggle("active");
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    // Toggle a class on the body when menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  // Mobile menu button click handler
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMobileMenuOpen &&
      !navbar.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });

  // Dark Mode Toggle
  const body = document.body;

  // Check for saved user preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Using icon instead of emoji
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Using icon instead of emoji
  }

  // Update dark mode toggle to use icons
  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  // Form Submission
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxUaeMi56vmTjb5yvIUN4Q-jeeCp4clIHrnW0SrpcpDB8dQugAvgdP9lDd-Mhscqp6MIg/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("message-display");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML =
          "Thank you for your message! I will get back to you soon.";
        setTimeout(function () {
          msg.innerHTML = " ";
        }, 2000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".home-content, .about-content, .skill-category, .project-card, .contact-info, .contact-form"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for animation
  window.addEventListener("load", function () {
    document
      .querySelectorAll(
        ".home-content, .about-content, .skill-category, .project-card, .contact-info, .contact-form"
      )
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      });

    animateOnScroll();
  });

  window.addEventListener("scroll", animateOnScroll);

  // Toggle between About and Education views (single implementation)
  const moreAboutBtn = document.getElementById("more-about-btn");
  const backToAboutBtn = document.getElementById("back-to-about");
  const mainAboutContent = document.getElementById("main-about-content");
  const educationContent = document.getElementById("education-content");

  if (moreAboutBtn && backToAboutBtn) {
    moreAboutBtn.addEventListener("click", function () {
      mainAboutContent.style.display = "none";
      educationContent.classList.add("active");
    });

    backToAboutBtn.addEventListener("click", function () {
      mainAboutContent.style.display = "flex";
      educationContent.classList.remove("active");
    });
  }

  // Pause marquee on hover
  const marquee = document.querySelector(".social-marquee-content");
  if (marquee) {
    marquee.addEventListener("mouseenter", function () {
      marquee.style.animationPlayState = "paused";
    });
    marquee.addEventListener("mouseleave", function () {
      marquee.style.animationPlayState = "running";
    });
  }

  // Project Slider Navigation
  const projectsContainer = document.querySelector(".projects-container");
  const prevBtn = document.querySelector(".project-nav-left");
  const nextBtn = document.querySelector(".project-nav-right");

  if (projectsContainer && prevBtn && nextBtn) {
    // Navigation click handlers
    prevBtn.addEventListener("click", () => {
      projectsContainer.scrollBy({
        left: -350, // Scroll amount based on card width + gap
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      projectsContainer.scrollBy({
        left: 350, // Scroll amount based on card width + gap
        behavior: "smooth",
      });
    });

    // Touch and drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - projectsContainer.offsetLeft;
      scrollLeft = projectsContainer.scrollLeft;
      projectsContainer.style.cursor = "grabbing";
      projectsContainer.style.scrollBehavior = "auto";
    });

    projectsContainer.addEventListener("mouseleave", () => {
      isDown = false;
      projectsContainer.style.cursor = "grab";
      projectsContainer.style.scrollBehavior = "smooth";
    });

    projectsContainer.addEventListener("mouseup", () => {
      isDown = false;
      projectsContainer.style.cursor = "grab";
      projectsContainer.style.scrollBehavior = "smooth";
    });

    projectsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - projectsContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      projectsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    projectsContainer.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX - projectsContainer.offsetLeft;
      scrollLeft = projectsContainer.scrollLeft;
      projectsContainer.style.scrollBehavior = "auto";
    });

    projectsContainer.addEventListener("touchend", () => {
      isDown = false;
      projectsContainer.style.scrollBehavior = "smooth";
    });

    projectsContainer.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - projectsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      projectsContainer.scrollLeft = scrollLeft - walk;
    });

    // Hide arrows when at scroll extremes
    const checkScrollPosition = () => {
      const maxScroll =
        projectsContainer.scrollWidth - projectsContainer.clientWidth;
      if (projectsContainer.scrollLeft <= 10) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
      }

      if (projectsContainer.scrollLeft >= maxScroll - 10) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
      }
    };

    projectsContainer.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);
    checkScrollPosition(); // Initial check
  }
});
