const search = document.getElementById('search'),
  random = document.getElementById('random'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

  var submitForm  = document.getElementById('submit1');

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();
  
    // Clear single meal
 
  
    // Get search term
    const term = search.value;
  
    // Check for empty
    if (term.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(function(data) {
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
         
            const recipesArr = data.meals;
        
            var row  =  document.getElementById('row');
        
            for(let i = 0; i< recipesArr.length; i++){
                var div = document.createElement('div')
                var  divhead = document.createElement('h4')
                var img = document.createElement('img')
                img.setAttribute('src',recipesArr[i].strMealThumb)
                img.className=' Img ';
                div.className = 'meal';
                divhead.className ='meal-info';
                var text = document.createTextNode(recipesArr[i].strMeal)
                divhead.appendChild(text)
            div.appendChild(divhead)
            div.appendChild(img)
            row.appendChild(div)
        
          }  }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}


function getRandomMeal() {
    // Clear meals and heading
   
  
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
  
        addMealToDOM(meal);
      });
  }
  
  // Add meal to DOM
  function addMealToDOM(meal) {
    const ingredients = [];
  
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  
}

submit1.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
