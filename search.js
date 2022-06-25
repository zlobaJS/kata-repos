import { typeWriter, typingAudio, createElement, animateTitle  } from "/data.js";


// объявляем переменные
const input = document.querySelector("input"), wrapperResult = document.querySelector(".result-wrapper"),
ul = document.createElement("ul"), PER_PAGE = 5, LENGTH = 3, animateTitleh1 = document.querySelector('.animate-output');
const span = document.querySelector('span');


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
    const RESPONSE_URL = `https://api.github.com/search/repositories?q=${input.value}&sort=stars&per_page=${PER_PAGE}`;
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

  if (input.value.length > 3) {
    getResponse().then((response) => {
      
    const totalCount = response.total_count;
    totalCount >= 31000 && totalCount < 99999 ?  animateTitleh1.classList.add('blue') : animateTitleh1.classList.remove('blue');
    totalCount >= 100000 ?  animateTitleh1.classList.add('green') : animateTitleh1.classList.remove('green');
    totalCount < 30000 ?  animateTitleh1.classList.add('default') : animateTitleh1.classList.remove('default');
    

      animateTitle (totalCount);
      const responsItems = response.items.length;
      for (let i = 0; i < responsItems; i++) {
          const item = response.items[i].name;
          const liRender = createElement("li", 'view');
          liRender.innerHTML = item;
          wrapperResult.append(ul);
          arr.push(liRender);
      }
      let newAr = arr.map(el => ul.appendChild(el))
      newAr.forEach(el => {
        el.onclick = (e) => {
          if (e.target.classList.contains('view')) {
            
            
          } else {
            
          }
        }
      })
     
    });
  } else {
    animateTitleh1.textContent = '';
  }
};



// Получаем ip
const getIp = async () => {
 
  const res = await fetch('https://api.db-ip.com/v2/free/self');
  const data = await res.json();
  span.innerText = `IP: ${data.ipAddress} City: ${data.city} Continent: ${data.continentName}`;

}

getIp ();  


// Выводим прогноз погоды.
const getWeather = async () => {
  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?id=499099&appid=c667fe8920587011d92c9698b0a7324e');
  const data = res.json();
  console.log(data)
}

const renderRepoInfo = () => {
 console.log('hello')
};

getWeather()

const debounced = debounce(ViewRender, 800);

input.addEventListener("input", debounced);
input.addEventListener("input", typingAudio);
document.addEventListener("input", typeWriter);


