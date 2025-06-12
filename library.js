// prepare dom elements
const ingredientsContainer = document.querySelector("[data-js='ingredients']");
const chosenIngredient = document.querySelector(".chosenIngredient");
const drinkFilter = document.querySelector("[data-js='filter']");
const drinkDetails = document.querySelector("[data-js='details']");

fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
  .then((response) => response.json())
  .then((data) => {
    data.drinks.forEach((item) => {
      const ingredient = item.strIngredient1;

      const allIngredients = document.createElement("div");
      allIngredients.textContent = ingredient;
      allIngredients.classList.add("textLine");
      ingredientsContainer.appendChild(allIngredients);

      allIngredients.addEventListener("click", () => {
        allIngredients.style.color = "blue";

        chosenIngredient.innerHTML = ingredient;
        fetchDrinksByIngredient(ingredient);

        /*const chosenIngredients = document.createElement("p");
        chosenIngredients.textContent = ingredient;
        chosenIngredient.appendChild(chosenIngredients);*/
      });
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

function fetchDrinksByIngredient(ingredient) {
  console.log("trying to fetch drinks with ", ingredient);
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.drinks.forEach((cocktail) => {
        const drink = cocktail.strDrink;
        const thumbnail = cocktail.strDrinkThumb;
        const drinkID = cocktail.idDrink;

        const drinkName = document.createElement("p");
        drinkName.classList.add("textLine");
        drinkName.textContent = drink;

        const idDrink = drinkID;

        drinkFilter.appendChild(drinkName);

        drinkName.addEventListener("click", () => {
          fetchDrinksByName(drinkID);
        });

        //const drinkImg = document.createElement("img");
        // drinkImg.src = thumbnail;
        // drinkFilter.appendChild(drinkImg);

        // drinkFilter.innerHTML = drink;
      });
    });
}

function fetchDrinksByName(drinkID) {
  console.log("trying to fetch drinks with ", drinkID);
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then((response) => response.json())
    .then((data) => {
      const drink = data.drinks[0];

      drinkDetails.innerHTML = drink.strDrink;
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
    });
}

const time = new Date();
document.getElementById("time").innerHTML =
  "Time: " + time.toLocaleTimeString();

const date = new Date();
document.getElementById("date").innerHTML =
  "Date: " + date.toLocaleDateString();

ingredientsContainer.addEventListener("click", () => {
  const printContainer = document.querySelector(".hidden");

  printContainer.classList.remove("print");
  void printContainer.offsetHeight;
  printContainer.classList.add("print");

  setTimeout(scrollingDown, 50);

  function scrollingDown() {
    printContainer.scrollIntoView({ behavior: "auto", block: "start" });

    requestAnimationFrame(() => {
      let lastScrollY = window.scrollY;

      const scrolling = setInterval(() => {
        const currentScrollY = window.scrollY;
        window.scrollBy(0, 1.8);

        // Stop if user scrolls manually
        if (currentScrollY < lastScrollY) {
          clearInterval(scrolling);
          return;
        }
        lastScrollY = currentScrollY;
      }, 10);
    });
  }
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

document.querySelector(".printbutton").addEventListener("click", () => {
  ingredientsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
});
