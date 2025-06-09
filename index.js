console.log("...fetching a random cocktail 🍹");

// prepare dom elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
const ingredientsContainer = document.querySelector("[data-js='ingredients']")
const prepContainer = document.querySelector("[data-js='preparation']")

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data here

    // select the first (and only drink of the results)
    const drink = data.drinks[0];

    // check in console
    console.log("drink: ", drink);

    // display title in title container
    titleContainer.innerHTML = drink.strDrink;

    // display drink image to the screen

    // first create an img tag on the fly
    const img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.alt = drink.strDrink;
    imgContainer.appendChild(img);

    //ingredients
    const ingredients = [];
  for (let i = 1; i <= 15; i++) {
  const ingredient = drink[`strIngredient${i}`];
  const measure = drink[`strMeasure${i}`];
  if (ingredient) {
    ingredients.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`);
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

