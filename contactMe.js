// cursor effect

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

  gsap.to($bigBall, {
    duration: 0.4,
    x: cursorX - 15,
    y: cursorY - 15
  });
  
  gsap.to($smallBall, {
    duration: 0.1,
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



// emailjs

function sendEmail() {
  let params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }
  emailjs.send("service_36hodbm","template_kq24nxa",params).then(alert("Scheduled meeting successfully"))
  
}