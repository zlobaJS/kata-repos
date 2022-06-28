export { typeWriter, typingAudio, createElement, animateTitle }


let i = 0;

function typeWriter() {
  let txt = "...";
  let txt2 = "";
  let speed = 150;
  if (i < txt.length) {
    document.getElementById("message").innerText += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    document.getElementById("message").innerText = txt2.charAt(i);
    i = 0;
  }
}

const typingAudio = () => {
    const audio = new Audio();
    audio.src = "./click.mp3";
    audio.play();
  };


const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
        if (className) {
            element.classList.add(className)
        }
    return element;    
}


const animateTitle = data => {
 
  var typed = new Typed('.animate-output', {
    strings: [`${data}`],
    typeSpeed: 50,
    backSpeed: 0,
    fadeOut: true,
    loop: false,
    cursorChar: '',
  });
}