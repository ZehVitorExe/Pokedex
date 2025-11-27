import { menuOptions } from "./config/menuConfig.js";

function generateMenu() {
    const display = document.querySelector(".windown-view");
    display.innerHTML = ""; 

    menuOptions.forEach(option  => {
        display.innerHTML += `<button><a href="${option.link}">${option.name}</a></button>`
    });
}

generateMenu();
