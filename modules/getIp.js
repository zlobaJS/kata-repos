// Получаем ip
 const span = document.querySelector('span');

export const getIp = async (url) => {
    const res = await fetch(url);
    const response = await res.json();
    span.innerText = `IP: ${response.ipAddress} City: ${response.city} Continent: ${response.continentName}`;

}