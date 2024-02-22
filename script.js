const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#ingredients');
const resultsList = document.querySelector('#recipeResults');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=0265daf3&app_key=dcd30de3dbda2265320efd91a1e2ea4a&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultsList.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  const sun = document.getElementById("sun");
  sun.style.display = "none";
});

const themeToggle = document.getElementById("themeToggle");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

themeToggle.onclick = function () {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
     moon.style.display = "none";
     sun.style.display = "flex";
  } else {
     sun.style.display = "none";
     moon.style.display = "flex";
  }
};

document.addEventListener('DOMContentLoaded', function () {
  resultsList.addEventListener('click', function (e) {
    const readMoreBtn = e.target.closest('.read-more');
    if (readMoreBtn) {
      const recipeBox = readMoreBtn.closest('.recipe-box');
      recipeBox.classList.toggle('expanded');
    }
  });
});