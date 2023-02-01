import { menu } from "./data.js";

const menuContainer = document.querySelector(".menu-container");
const buttonContainer = document.querySelector(".button-container");

const diplayMenuItems = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    const {
      id,
      category,
      name,
      description,
      ingredients,
      alergens,
      price,
      image,
    } = item;

    return `<article class="menu-item">
            <img src=${image} alt="${name}" />
            <div>
              <header class="menu-item-header">
                <h3>${name}</h3>
                <p class="price">€ ${price}</p>
              </header>

              <p class="description">${description}</p>
              <p class="ingredients"><span>Ingredients: </span>${ingredients}</p>
              <!-- <p class="ingredients"><span>Alergens: </span>${alergens}</p> -->
            </div>
          </article>`;
  });
  displayMenu = displayMenu.join("");
  console.log(displayMenu);

  menuContainer.innerHTML = displayMenu;
};
const displayMenuButtons = () => {
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryButtons = categories
    .map((category) => {
      return `<button type="button" class="filter-button" data-id=${category}>
          ${category}
        </button>`;
    })
    .join("");

  buttonContainer.innerHTML = categoryButtons;
  const filterButtons = buttonContainer.querySelectorAll(".filter-button");
  console.log(filterButtons);

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        diplayMenuItems(menu);
      } else {
        diplayMenuItems(menuCategory);
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  diplayMenuItems(menu);
  displayMenuButtons();
});

//form
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// date
const dateSelector = document.querySelector(".form-time");

let date = new Date(new Date().toString().split("GMT")[0] + " UTC")
  .toISOString()
  .split(".")[0];
date = date.toString().slice(0, -3);

const formDate = () => {
  dateSelector.innerHTML = ` 
  <label for="datetime">Date and time</label>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                value=${date}
                min=${date}
                max="2099-06-14T00:00"
              />
  `;
};
formDate();
