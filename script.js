const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealElement =document.getElementById("meals");
const resultHeading =document.getElementById("result-heading");
const singleMeal =document.getElementById("single-meal");

// search Meal
function searchMeal(element){
    element.preventDefault();

    // clear single Meal
    singleMeal.innerHTML="";

    // get search meal
    const searchValue=search.value;

    //check for empty
    if(searchValue.trim()){
        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
            ).then((res) => res.json())
            .then((data) => {
               
            
                resultHeading.innerHTML=`<h2>Search Result For ${searchValue}</h2>`;
                if(data.meals==null){
                    resultHeading.innerHTML=`<h2>There Are No Search Result For ${searchValue}</h2>`;
                }else {
                    mealElement.innerHTML=data.meals.map(
                        meal=>`
                          <div class="meal"> 
                          <img src="${meal.strMealThumb}" alt="${meal.strMeal}>
                          <div class="meal-info" "data-mealID=${meal.idMeal}"> 
                              <h3>${meal.strMeal}</h3>
                          </div>
                          </div>


                        ` )
                        .join("");
                }

            });
    }else {
        alert("please inset a value")
    }  


}

// get meal by id 
function getMealById(mealID){
    fetch(
        `www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
        ).then((res) => res.json())
         .then((data) =>{
            console.log(data);
             const meal= data.meals;
             addMealToDom(meal);

            });
}

// add meal to dom function
function addMealToDom(meal){
     const ingredients =[];
    for (let i=0; i<=20; i++){
        if(meal[`strIngredients${i}`]){
            ingredients.push(
                `${meal[`strIngredients${i}`]}-${meal[`strMeasure${i}`]}
                `
                );
        }else{
            break;
        }
    }   

     singleMeal.innerHTML=`
     <div class="single-meal">
         <h1>${meal.strMeal}</h1>
         <img src="${meal.strMealThumb}"alt="${meal.strMeal}>
         <div class="single-meal-info">${meal.strCategory ? `<p>${meal.strCategory}</p>` :''}
         ${meal.strArea ? `<p>${meal.strArea}</p>` :''}                     
         </div>
         <div class="main">
             <p>${meal.strInstructions}</p>
             <h2>Ingredients</h2>
             <ul>
             ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
             </ul>

         </div>
     </div>
     
     `
}

// add event lisenener
submit.addEventListener('submit',searchMeal);
mealElement.addEventListener('click',element => {
    const mealInfo = element.path.find(item =>{
       
      if(item.classList){
      
          return item.classList.contains("meal-info");

      }else{
          return false;
      }
   
     
    })
  
    if(mealInfo){
        const mealID=mealInfo.getAttribute("data-mealID");
        
        
        getMealById(mealID);
    }
})

