// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  })

  // Navbar scroll behavior
  const navbar = document.querySelector(".navbar")
  const footer = document.querySelector(".glass-footer")

  // Initially set navbar and footer to fully transparent
  navbar.style.backgroundColor = "transparent"
  footer.style.backgroundColor = "transparent"

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      footer.style.backgroundColor = "rgba(1, 1, 1, 0.5)"
    } else {
      navbar.classList.remove("scrolled")
      footer.style.backgroundColor = "transparent"
    }
  })

  // Video Modal Functionality
  const playButtons = document.querySelectorAll(".play-button")
  const videoModal = document.getElementById("videoModal")

  if (playButtons.length > 0 && videoModal) {
    const videoModalTitle = document.getElementById("videoModalLabel")
    const videoIframe = videoModal.querySelector("iframe")
    const videoModalInstance = new bootstrap.Modal(videoModal)

    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const videoId = this.getAttribute("data-video-id")
        const videoTitle = this.closest(".video-card").querySelector("h3").textContent

        // In a real implementation, you would set the actual YouTube video URL
        // For this example, we're just updating the title
        videoModalTitle.textContent = videoTitle

        // Show the modal
        videoModalInstance.show()
      })
    })

    // Reset iframe when modal is closed
    videoModal.addEventListener("hidden.bs.modal", () => {
      videoIframe.src = videoIframe.src
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animateElements.forEach((element) => {
    observer.observe(element)
  })

  // Add creative background elements
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    if (!section.classList.contains("hero-section") && !section.classList.contains("page-header")) {
      section.classList.add("creative-bg")
    }
  })

  // Contact form validation
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let isValid = true
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      if (!nameInput.value.trim()) {
        isValid = false
        nameInput.classList.add("is-invalid")
      } else {
        nameInput.classList.remove("is-invalid")
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false
        emailInput.classList.add("is-invalid")
      } else {
        emailInput.classList.remove("is-invalid")
      }

      if (!messageInput.value.trim()) {
        isValid = false
        messageInput.classList.add("is-invalid")
      } else {
        messageInput.classList.remove("is-invalid")
      }

      if (isValid) {
        // In a real implementation, you would submit the form data to a server
        // For this example, we'll just show a success message
        const formElements = contactForm.elements
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = true
        }

        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-3"
        successMessage.textContent = "Your message has been sent successfully!"
        contactForm.appendChild(successMessage)

        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset()
          successMessage.remove()
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = false
          }
        }, 3000)
      }
    })
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle hover dropdown for desktop and make About link work
  const aboutDropdown = document.querySelector(".dropdown")
  const aboutLink = document.querySelector(".dropdown-toggle")

  if (aboutDropdown && aboutLink) {
    // For mobile - prevent click from toggling dropdown
    aboutLink.addEventListener("click", (e) => {
      if (window.innerWidth >= 992) {
        // On desktop, clicking "About" goes to about.html
        window.location.href = "about.html"
      }
    })

    // For mobile - make sure clicking About in mobile view works properly
    if (window.innerWidth < 992) {
      aboutLink.setAttribute("data-bs-toggle", "dropdown")
    } else {
      aboutLink.removeAttribute("data-bs-toggle")
    }

    // Update on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        aboutLink.setAttribute("data-bs-toggle", "dropdown")
      } else {
        aboutLink.removeAttribute("data-bs-toggle")
      }
    })
  }
})

