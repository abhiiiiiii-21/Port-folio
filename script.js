// glow on hover
let cards = document.querySelectorAll(".toolCard");

cards.forEach(card => {
   
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

        
        const centerX = rect.width / 2; // Calculate rotation values
        const centerY = rect.height / 2;
        const rotateX = -(y - centerY) / 15; 
        const rotateY = (x - centerX) / 15;

        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Apply 3D transform
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});


//project video
const workContainers = document.querySelectorAll('.work1');

workContainers.forEach(container => {
  const video = container.querySelector('.hoverVideo');
  if (video) {
    container.addEventListener("mouseenter", () => {
      video.play();
    });

    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0; // Reset to the start
    });
  }
});


// background music

const audio = document.getElementById("backAudio");
let audioContext;

function toggleAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(audioContext.destination);
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    if (audio.paused) {
        audio.play().catch(err => console.log("Playback failed:", err));
    } else {
        audio.pause();
    }
}



// Dropdowns

const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordionContent = button.parentElement.nextElementSibling;
    const isOpen = accordionContent.style.maxHeight; 

    document.querySelectorAll('.accordion-content').forEach((content) => {
      content.style.maxHeight = null;
      content.previousElementSibling
        .querySelector('.accordion-button')
        .classList.remove('active');
    });

    if (!isOpen) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      button.classList.add('active');
    }
  });
});

// back to top button in smooth scroll
  const workSection = document.querySelector('.stacks');
  const backToTopBtn = document.querySelector('.backToTopBtn');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });
  }, { threshold: 0 });

  observer.observe(workSection);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // Loading
