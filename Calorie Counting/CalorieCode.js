//Creator: Ali Al Anbari

//Import all existing HTML elements
const calorieForm = document.querySelector(".calorieForm");
const foodInput = document.querySelector(".foodInput");
const cardInside = document.querySelector(".cardInside");
const card = document.querySelector(".card");

//Set starting calories at 0
let currentCalories = 0;


//add event listener to listen for new food input
calorieForm.addEventListener("submit", async event => {
    event.preventDefault();

    //grab input name
    const food = foodInput.value;

    if(food){
        try{
            //fetch the food data from CalorieNinja API and log it incase of any errors
            const foodData = await getFoodData(food);
            console.log(foodData);
            //Display data and return current calorie count
            currentCalories = displayFoodData(foodData, currentCalories);
        }
        //If error is caught log the erorr
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Input Food Name");
    }
})

async function getFoodData(food){
    //Import Api Information
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${food}`;
    const Apikey = "oQjxqPJuCkTssxhPZa5ecHJNJuRcczU3vCT3iXUH";

    //fetch results
    const response = await fetch(apiUrl, {
        headers: {
            'X-Api-Key': Apikey
        }
    });
    
    //If information could not be fetched then log eroor
    if (!response.ok){
        throw new Error("Food info could not be found");
    }

    //If fetch sucessful return json form of information
    return await response.json();
}

function displayFoodData(foodData, currentCalories){
    
    //Unwrap the food data
    let {0: {name, calories, carbohydrates_total_g: carbs,
        cholesterol_mg: cholesterol, fat_total_g: fat, 
        protein_g: protein, sodium_mg: sodium, sugar_g: sugar, 
        serving_size_g: grams}} = foodData;

    //Create the box to hold all of the food information
    const box = document.createElement("div");
    box.classList.add("box");

    //Display food name
    const foodDisplay = document.createElement("h1");
    foodDisplay.textContent = name;
    foodDisplay.classList.add("foodDisplay");
    box.appendChild(foodDisplay);

    //Display calories
    const calorieDisplay = document.createElement("h1");
    calorieDisplay.textContent = `Calories: ${calories.toFixed(1)}`;
    calorieDisplay.classList.add("calorieDisplay");
    box.appendChild(calorieDisplay);

    //Display carbs
    const carbsDisplay = document.createElement("p");
    carbsDisplay.textContent = `Carbs: ${carbs.toFixed(2)}`;
    carbsDisplay.classList.add("carbDisplay");
    box.appendChild(carbsDisplay);

    //Display cholesterol
    const cholesterolDisplay = document.createElement("p");
    cholesterolDisplay.textContent = `Cholesterol: ${cholesterol.toFixed(2)}`;
    cholesterolDisplay.classList.add("cholesterolDisplay");
    box.appendChild(cholesterolDisplay);

    //Display fat
    const fatDisplay = document.createElement("p");
    fatDisplay.textContent = `Fat: ${fat.toFixed(2)}`;
    fatDisplay.classList.add("fatDisplay");
    box.appendChild(fatDisplay);

    //Display protein
    const proteinDisplay = document.createElement("p");
    proteinDisplay.textContent = `Protein: ${protein.toFixed(2)}`;
    proteinDisplay.classList.add("proteinDisplay");
    box.appendChild(proteinDisplay);

    //Display sodium
    const sodiumDisplay = document.createElement("p");
    sodiumDisplay.textContent = `Sodium: ${sodium.toFixed(2)}`;
    sodiumDisplay.classList.add("sodiumDisplay");
    box.appendChild(sodiumDisplay);

    //Display sugar
    const sugarDisplay = document.createElement("p");
    sugarDisplay.textContent = `Sugar: ${sugar.toFixed(2)}`;
    sugarDisplay.classList.add("sugarDisplay");
    box.appendChild(sugarDisplay);

    //Display serving (grams)
    const gramDisplay = document.createElement('p');
    gramDisplay.textContent = `Serving Size (Grams):`
    gramDisplay.classList.add("gramDisplay");
    box.appendChild(gramDisplay);

    //insert the latest food item as the first in the list
    const cardInside = document.querySelector(".cardInside");
    const secondChild = cardInside.childNodes[2];
    cardInside.insertBefore(box, secondChild);

    //Update the total calorie counter
    const totalCount = document.querySelector(".count");
    currentCalories=calories + currentCalories;
    totalCount.textContent = currentCalories.toFixed(0);

    //Create the input form and text box to alter grams if needed
    const alterInput = document.createElement("input");
    alterInput.placeholder = "100";
    const alterForm = document.createElement("form")
    alterInput.classList.add("alterInput");
    alterForm.classList.add("alterForm")
    box.appendChild(alterForm);
    alterForm.appendChild(alterInput);


    alterForm.addEventListener("submit", async event => {
        event.preventDefault();

        const grams = parseInt(alterInput.value);

        newCalories = calories * (grams/100);
        calorieDisplay.textContent = `Calories: ${newCalories.toFixed(1)}`;

        newCarbs = carbs * (grams/100);
        carbsDisplay.textContent = `Carbs: ${newCarbs.toFixed(2)}`;

        newCholesterol = cholesterol * (grams/100);
        cholesterolDisplay.textContent = `Cholesterol: ${newCholesterol.toFixed(2)}`;

        newFat = fat * (grams/100);
        fatDisplay.textContent = `Fat: ${newFat.toFixed(2)}`;

        newProtein = protein * (grams/100);
        proteinDisplay.textContent = `Protein: ${newProtein.toFixed(2)}`;

        newSodium = sodium * (grams/100);
        sodiumDisplay.textContent = `Sodium: ${newSodium.toFixed(2)}`;

        newSugar = sugar * (grams/100);
        sugarDisplay.textContent = `Sugar: ${newSugar.toFixed(2)}`;

        currentCalories = currentCalories + newCalories - calories;
        totalCount.textContent = currentCalories.toFixed(0);
        currentCalories = parseInt(currentCalories) - parseInt(newCalories) + parseInt(calories)


    })

   
    return currentCalories;
}