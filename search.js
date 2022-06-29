// объявляем переменные
const input = document.querySelector("input");
const wrapperResult = document.querySelector(".result-wrapper");
const ul = document.createElement("ul");
const searchBox = document.querySelector('.searchBox');

const PER_PAGE = 5;
const LENGTH_LIMIT = 3;

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

const span = document.querySelector('span');

const getIp = async (url) => {
  const res = await fetch(url);
  const response = await res.json();
  span.innerText = `IP: ${response.ipAddress} City: ${response.city} Continent: ${response.continentName}`;

}

// сheckStatus // querySelector
const animateTitleH1 = document.querySelector('.animate-output');

// сheckStatus
const checkStatus = data => {
  data.total_count >= 31000 && data.total_count < 99999
      ?  animateTitleH1.classList.add('blue') : animateTitleH1.classList.remove('blue');
  data.total_count >= 100000
      ?  animateTitleH1.classList.add('green') : animateTitleH1.classList.remove('green');
  data.total_count <= 30000
      ?  animateTitleH1.classList.add('default') : animateTitleH1.classList.remove('default');
  animateTitle (data.total_count);
}

// debounce - создаем задержку
function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}


const getResponse = async () => {
  try {
    const RESPONSE_URL = `http://api.github.com/search/repositories?q=${input.value}&sort=stars&per_page=${PER_PAGE}`;
    const response = await fetch(RESPONSE_URL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Ошибка");
    }
  } catch (Error) {
    console.log(Error);
  }
};

const ViewRender = () => {

  let arr = [];
  if (ul.hasChildNodes()) {
    while (ul.firstChild) {
      ul.removeChild(ul.lastChild);
    }
  }
  if (popup.classList.contains('active')) {
    popup.classList.remove('active')
    ul.hidden = false;
  }

  if (input.value.length > LENGTH_LIMIT) {

    getResponse().then((response) => {
      checkStatus(response)
      const responsItems = response.items.length;
      for (let i = 0; i < responsItems; i++) {
          const item = response.items[i].name;
          const liRender = createElement("li", 'view');
          liRender.innerHTML = item;
          wrapperResult.append(ul);
          arr.push(liRender);
      }
      arr.map(el => ul.appendChild(el))

      activeLi(response.items)

    });
  } else {
    document.querySelector('.popup').classList.remove('active')
    animateTitleH1.textContent = '';
  }
};

const activeLi = (data) => {
  ul.addEventListener('click', (e) => {
        data.forEach((el, i) => {
            if(e.target.textContent == data[i].name) {
              console.log(data[i])
              const stars = data[i].stargazers_count;
              const login = data[i].owner.login;
              const name = data[i].name;
              const avatar = data[i].owner.avatar_url;
              spans.innerHTML = `Stars: ${stars} <br>
              Login: ${login} <br>
              Name: ${name} <img src="${avatar}" alt="">`;
            }
        })
      popup.classList.add('active')
      popup.append(spans);
      searchBox.append(popup)
      ul.hidden = true
      document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) {
          popup.classList.remove('active');
          ul.hidden = false;
        }
      })

  })
}

const popup = createElement('div', 'popup');
const spans = createElement('span', 'out-show')


getIp ('http://api.db-ip.com/v2/free/self');


const debounced = debounce(ViewRender, 800);
input.addEventListener("input", debounced);
document.addEventListener("input", typeWriter);


