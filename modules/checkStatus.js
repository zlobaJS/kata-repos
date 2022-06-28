import {animateTitle} from "../data.js";


export const animateTitleH1 = document.querySelector('.animate-output');

export const checkStatus = data => {

    data.total_count >= 31000 && data.total_count < 99999
        ?  animateTitleH1.classList.add('blue') : animateTitleH1.classList.remove('blue');
    data.total_count >= 100000
        ?  animateTitleH1.classList.add('green') : animateTitleH1.classList.remove('green');
    data.total_count <= 30000
        ?  animateTitleH1.classList.add('default') : animateTitleH1.classList.remove('default');
    animateTitle (data.total_count);
}