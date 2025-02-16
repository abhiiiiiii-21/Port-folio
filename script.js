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


// Custom cursor


const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('a, button, .btn, [onclick], input, label');


let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('scroll', onScroll);

function onMouseMove(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    TweenMax.to($bigBall, .4, {
        x: cursorX - 15,
        y: cursorY - 15
    });
    TweenMax.to($smallBall, .1, {
        x: cursorX - 5,
        y: cursorY - 7
    });

    // Check which section the cursor is in
    const element = document.elementFromPoint(cursorX, cursorY);
    const workSection = element.closest('.work');
    const projectsSection = element.closest('.upcomingProjects');

    if (workSection || projectsSection) {
        $bigBall.querySelector('circle').style.fill = '#000000';
        $smallBall.querySelector('circle').style.fill = '#ffffff';
    } else {
        $bigBall.querySelector('circle').style.fill = '#f7f8fa';
        $smallBall.querySelector('circle').style.fill = '#f7f8fa';
    }
}

function onScroll() {
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: cursorX,
        clientY: cursorY
    });
    document.dispatchEvent(mouseEvent);
}

// Hover effects - now only adding 'behind' class without scaling
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

function onMouseHover() {
    $bigBall.classList.add('behind');
}

function onMouseHoverOut() {
    $bigBall.classList.remove('behind');
}


