const breakfastMenu = [
    "Pancakes",
    "Eggs Benedict",
    "Oatmeal",
    "Frittata"
];

const mainCourseMenu = [
    "Steak",
    "Pasta",
    "Burger",
    "Salmon"
];

const dessertMenu = [
    "Cake",
    "Ice Cream",
    "Pudding",
    "Fruit Salad"
];

// Breakfast

document.getElementById(
    "breakfastTotalItems"
).textContent =
    `Total Items: ${breakfastMenu.length}`;

document.getElementById(
    "breakfastMenuItems"
).innerHTML =
    breakfastMenu
        .map(
            (item, index) =>
                `<p>${index + 1}. ${item}</p>`
        )
        .join("");

// Main Course

document.getElementById(
    "maincourseTotalItems"
).textContent =
    `Total Items: ${mainCourseMenu.length}`;

document.getElementById(
    "maincourseMenuItems"
).innerHTML =
    mainCourseMenu
        .map(
            (item, index) =>
                `<p>${index + 1}. ${item}</p>`
        )
        .join("");

// Desserts

document.getElementById(
    "dessertTotalItems"
).textContent =
    `Total Items: ${dessertMenu.length}`;

document.getElementById(
    "dessertMenuItems"
).innerHTML =
    dessertMenu
        .map(
            (item, index) =>
                `<p>${index + 1}. ${item}</p>`
        )
        .join("");