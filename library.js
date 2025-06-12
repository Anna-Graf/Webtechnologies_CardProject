// prepare dom elements
const ingredientsContainer = document.querySelector("[data-js='ingredients']");
const chosenIngredient = document.querySelector(".chosenIngredient");
const drinkFilter = document.querySelector("[data-js='filter']");
const drinkDetails = document.querySelectorAll("[data-js='details']");
const drinkPreparation = document.querySelector("[data-js='drinkPrep']");
const drinkIngredient = document.querySelector("[data-js='drinkIngredient']");
const drinkImage = document.querySelector("[data-js='drinkImage']");

//Get list of all ingredients and display them
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

//Function so that only cocktails get fetched with chosen ingredient
function fetchDrinksByIngredient(ingredient) {
  console.log("trying to fetch drinks with ", ingredient);
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  )
    .then((response) => response.json())
    .then((data) => {
      drinkFilter.innerHTML = "";
      data.drinks.forEach((cocktail) => {
        const drink = cocktail.strDrink;
        const drinkID = cocktail.idDrink;

        const drinkName = document.createElement("p");
        drinkName.classList.add("textLine");
        drinkName.textContent = drink;

        drinkFilter.appendChild(drinkName);

        drinkName.addEventListener("click", () => {
          fetchDrinksByName(drinkID);
        });
      });
    });
}
//Function so that only cocktails gets shown that was chosen
function fetchDrinksByName(drinkID) {
  console.log("trying to fetch drinks with ", drinkID);
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then((response) => response.json())
    .then((data) => {
      const drink = data.drinks[0];

      drinkDetails.forEach((el) => (el.innerHTML = ""));
      drinkPreparation.innerHTML = "";
      drinkIngredient.innerHTML = "";
      drinkImage.innerHTML = "";

      drinkDetails.forEach((el) => {
        el.innerHTML = drink.strDrink;
      });

      drinkPreparation.innerHTML = drink.strInstructions;

      const cocktailImage = document.createElement("img");
      cocktailImage.src = drink.strDrinkThumb;
      cocktailImage.alt = drink.strDrink;
      drinkImage.appendChild(cocktailImage);

      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(
            // if (measure) {
            //    measure.trim()
            // } else {
            //    ""
            // }
            `${measure ? measure.trim() : ""} ${ingredient.trim()}`
          );
        }
      }

      ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        drinkIngredient.appendChild(li);
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
    });
}

//Add time & Date
const time = new Date();
document.getElementById("time").innerHTML =
  "Time: " + time.toLocaleTimeString();

const date = new Date();
document.getElementById("date").innerHTML =
  "Date: " + date.toLocaleDateString();

//Starts printing animation & resets it
ingredientsContainer.addEventListener("click", () => {
  const printContainer = document.querySelector(".hidden");

  printContainer.classList.remove("print");
  void printContainer.offsetHeight;
  printContainer.classList.add("print");

  //Auto-Scrolling
  setTimeout(scrollingDown, 50);

  function scrollingDown() {
    printContainer.scrollIntoView({ behavior: "auto", block: "start" });

    requestAnimationFrame(() => {
      let userScrollY = window.scrollY;

      const scrolling = setInterval(() => {
        const currentScrollY = window.scrollY;
        window.scrollBy(0, 1.8);

        // Stop if user scrolls manually
        if (currentScrollY < userScrollY) {
          clearInterval(scrolling);
          return;
        }
        userScrollY = currentScrollY;
      }, 10);
    });
  }
});

//starts printing part 2
document.querySelector(".cocktailContainer").addEventListener("click", () => {
  const printContainer2 = document.querySelector(".hidden2");

  printContainer2.classList.remove("print2");
  void printContainer2.offsetHeight;
  printContainer2.classList.add("print2");

  //Auto-Scrolling
  setTimeout(scrollingDown, 50);

  function scrollingDown() {
    printContainer2.scrollIntoView({ behavior: "auto", block: "start" });

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

//Style change button
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

//Scroll to ingredietns
document.querySelector(".printbutton").addEventListener("click", () => {
  ingredientsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
});
