import { typeWriter, typingAudio, createElement, animateTitle  } from "/data.js";
import  { getIp } from "/modules/getIp.js";
import  { checkStatus, animateTitleH1  } from '/modules/checkStatus.js';

// объявляем переменные
const input = document.querySelector("input");
const wrapperResult = document.querySelector(".result-wrapper");
const ul = document.createElement("ul");
const PER_PAGE = 5;
const LENGTH_LIMIT = 3;

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
     const newArray = arr.map(el => ul.appendChild(el))
    });
  } else {
    animateTitleH1.textContent = '';
  }
};


getIp ('http://api.db-ip.com/v2/free/self');

console.log('hui');
const debounced = debounce(ViewRender, 800);
input.addEventListener("input", debounced);
input.addEventListener("input", typingAudio);
document.addEventListener("input", typeWriter);


