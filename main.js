// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWptEEHOgipjaj1bDfyqZ32RpVNdUCkuM",
  authDomain: "recipe-finder-6d3b4.firebaseapp.com",
  projectId: "recipe-finder-6d3b4",
  storageBucket: "recipe-finder-6d3b4.appspot.com",
  messagingSenderId: "499910906851",
  appId: "1:499910906851:web:a7e44fdc7af610f48386d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app);
const storage = getStorage(app);

// Select the container where you want to add the meals
const mealsContainer = document.getElementById("meals_container");

// Select the modal and its components
const modal = document.getElementById("myModal");
const modalClose = document.querySelector(".close");
const modalMealName = document.getElementById("modal-meal-name");
const modalIngredients = document.getElementById("modal-ingredients");

// Store the selected ingredients in a Set for uniqueness
let selectedIngredients = new Set();

// Function to create meal element
function createMealElement(meal) {
  let mealElement = document.createElement('div');
  mealElement.classList.add('meal');
  mealElement.innerHTML = `
    <h3>${meal.name}</h3>
    <img src="${meal.product_img}" alt="${meal.name}" data-ingredients='${JSON.stringify(meal)}'>
  `;
  mealElement.querySelector('img').addEventListener('click', () => {
    showModal(meal);
  });
  return mealElement;
}

// Function to show the modal with meal details
function showModal(meal) {
  modalMealName.textContent = meal.name;
  modalIngredients.innerHTML = `
    ${Object.keys(meal)
      .filter(key => key.startsWith('ingredient_'))
      .map(key => `<li>${meal[key]}</li>`)
      .join('')
    }
  `;
  modalIngredients.innerHTML += `
    <li><h5>HowToMake<h5>${meal.howtomake}</li>
  `;
  
  modal.style.display = "block";
}

// Close modal when the user clicks on <span> (x)
modalClose.onclick = function() {
  modal.style.display = "none";
};

// Close modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Fetch and display meals based on selected ingredients
const fetchAndDisplayMeals = async () => {
  mealsContainer.innerHTML = ''; // Clear the container
  const querySnapshot = await getDocs(collection(db, 'Meals'));
  
  querySnapshot.forEach((doc) => {
    const meal = doc.data();
    const mealIngredients = Object.keys(meal)
      .filter(key => key.startsWith('ingredient_'))
      .map(key => meal[key].toLowerCase());
    
    console.log(`Meal: ${meal.name}`);
    console.log(`Ingredients: ${mealIngredients}`);
    console.log(`Selected Ingredients: ${Array.from(selectedIngredients)}`);
    
    // Check if the meal contains all selected ingredients
    if ([...selectedIngredients].every(ingredient => mealIngredients.includes(ingredient))) {
      const mealElement = createMealElement(meal);
      mealsContainer.appendChild(mealElement);
    }
  });
};

// Add event listeners to ingredient buttons
['chicken', 'meat', 'potato', 'tomato'].forEach(id => {
  const button = document.getElementById(id);
  button.addEventListener('click', () => {
    const ingredient = id.toLowerCase();
    
    if (selectedIngredients.has(ingredient)) {
      selectedIngredients.delete(ingredient); // Deselect the ingredient
      button.classList.remove('selected'); // Remove visual selection
    } else {
      selectedIngredients.add(ingredient); // Select the ingredient
      button.classList.add('selected'); // Add visual selection
    }
    
    console.log(`Selected Ingredients Updated: ${Array.from(selectedIngredients)}`);
    
    fetchAndDisplayMeals();
  });
});

// Initial fetch of all meals
fetchAndDisplayMeals();
