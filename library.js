// prepare dom elements
const ingredientsContainer = document.querySelector("[data-js='ingredients']");

fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
  .then((response) => response.json())
  .then((data) => {
    data.drinks.forEach((item) => {
      const ingredient = item.strIngredient1;

      const div = document.createElement("div");
      div.textContent = ingredient;
      div.classList.add("textLine");
      ingredientsContainer.appendChild(div);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

const time = new Date();
document.getElementById("time").innerHTML =
  "Time: " + time.toLocaleTimeString();

const date = new Date();
document.getElementById("date").innerHTML =
  "Date: " + date.toLocaleDateString();

document.querySelector(".printbutton").addEventListener("click", () => {
  const printContainer = document.querySelector(".hidden");
  printContainer.classList.add("print");

  const card = document.querySelector(".card");
  let lastScrollY = window.scrollY;

  const scrolling = setInterval(() => {
    const currentScrollY = window.scrollY;

    window.scrollBy(0, 1.8);

    if (currentScrollY < lastScrollY - 2) {
      clearInterval(scrolling);
      return;
    }

    lastScrollY = currentScrollY;

    if (card.offsetHeight >= 1980) {
      clearInterval(scrolling);
    }
  }, 10);
});

document.querySelector(".changeStyle").addEventListener("click", () => {
  const body = document.body;
  const card = document.querySelector(".card");

  if (card.classList.contains("receiptTexture")) {
    card.classList.remove("receiptTexture");
    body.classList.add("receiptTexture2");
  } else {
    card.classList.add("receiptTexture");
    body.classList.remove("receiptTexture2");
  }
});
