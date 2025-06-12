console.log("...fetching a random cocktail 🍹");

// prepare dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
const ingredientsContainer = document.querySelector("[data-js='ingredients']");
const prepContainer = document.querySelector("[data-js='preparation']");

//Fetch a random Cocktail
fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data here

    // select the first (and only drink of the results)
    const drink = data.drinks[0];

    // check in console
    console.log("drink: ", drink);

    console.log("testing key access: ", drink.strAlcoholic);

    // display title in title container
    titleContainer.innerHTML = drink.strDrink;

    // display drink image to the screen

    // first create an img tag on the fly
    const img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.alt = drink.strDrink;
    imgContainer.appendChild(img);

    //Display preparation
    prepContainer.innerHTML = drink.strInstructions
      .split(/(?<=[.?!])\s+/g) // Split by sentence endings
      .filter((line) => line.trim()) // Remove empty lines
      .map((line) => `- ${line.trim()}`) // Add bullet points
      .join("<br>");

    //ingredients
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
      ingredientsContainer.appendChild(li);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

//Display date & Time
const time = new Date();
document.getElementById("time").innerHTML =
  "Time: " + time.toLocaleTimeString();

const date = new Date();
document.getElementById("date").innerHTML =
  "Date: " + date.toLocaleDateString();

// starts printing animation
document.querySelector(".printbutton").addEventListener("click", () => {
  const printContainer = document.querySelector(".hidden");
  printContainer.classList.add("print");

  // starts scolling
  let userScrollY = window.scrollY;

  const scrolling = setInterval(() => {
    const currentScrollY = window.scrollY;

    window.scrollBy(0, 1.8);

    if (currentScrollY < userScrollY) {
      clearInterval(scrolling);
      return;
    }

    console.log("current:", currentScrollY, "user:", userScrollY);

    userScrollY = currentScrollY;
  }, 10);
});

// changes Style from receiptTexture to receiptTexture2
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
