

//Contact form validation and EmailJS integration
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");

  // Form submission handler
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    const ethiopianPhoneRegex = /^(\+251|0)?9\d{8}$/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !phone || !message) {
      formMessage.textContent = "⚠️ Please fill all the fields correctly.";
      formMessage.style.color = "red";
      return;
    }

    if (!email.match(emailPattern)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    if (!ethiopianPhoneRegex.test(phone)) {
      formMessage.textContent = "Invalid Ethiopian phone number format!";
      formMessage.style.color = "red";
      return;
    }

    // Simulate message sending
    formMessage.textContent = "📨 Sending message...";
    formMessage.style.color = "blue";

    // Simulated delay to mimic sending
    setTimeout(() => {
      formMessage.textContent = "✅ Your message has been sent successfully (demo only).";
      formMessage.style.color = "green";
      contactForm.reset();
    }, 2000);
  });
  

  // Profile image animation
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.style.transition = "all 1s ease-in-out";
    
    // Create a floating animation
    setInterval(() => {
      profileImg.style.transform = "translateY(-10px)";
      setTimeout(() => {
        profileImg.style.transform = "translateY(0)";
      }, 1500);
    }, 3000);
  }

  // Name animation
  const nameSpan = document.querySelector(".home h1 span");
  if (nameSpan) {
    const text = nameSpan.textContent;
    nameSpan.textContent = "";

    // Letter-by-letter reveal
    let index = 0;
    const interval = setInterval(() => {
      nameSpan.textContent += text[index];
      index++;

      // Add a gentle glow as it types
      nameSpan.style.transition = "all 0.3s ease";
      nameSpan.style.textShadow = "0 0 8px rgba(13, 71, 161, 0.6)";

      if (index === text.length) {
        clearInterval(interval);
        // Final pulse animation when fully revealed
        nameSpan.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.1)" },
            { transform: "scale(1)" }
          ],
          {
            duration: 800,
            easing: "ease-in-out"
          }
        );
      }
    }, 120);
  }

  // Scroll animations for sections
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Project card animations
  const projectCards = document.querySelectorAll(".project-card");
  
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation for each card
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200);
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  projectCards.forEach((card) => projectObserver.observe(card));

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle.checked) {
          menuToggle.checked = false;
        }
      }
    });
  });
});