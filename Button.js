// Create a button element
const button = document.createElement('button');
button.textContent = 'Click me';

// Add styles to make the button responsive
button.style.padding = '10px 20px';
button.style.fontSize = '16px';
button.style.border = 'none';
button.style.backgroundColor = 'blue';
button.style.color = 'white';
button.style.cursor = 'pointer';

// Add event listener to handle button click
button.addEventListener('click', function () {
    console.log('Button clicked');
  });

// Append the button to the document body
const meatButton = document.createElement('button');
meatButton.textContent = 'Meat';
meatButton.style.padding = '10px 20px';
meatButton.style.fontSize = '16px';
meatButton.style.border = 'none';
meatButton.style.backgroundColor = 'blue';
meatButton.style.color = 'white';
meatButton.style.cursor = 'pointer';
meatButton.addEventListener('click', function () {
  console.log('Meat button clicked');
});

const chickenButton = document.createElement('button');
chickenButton.textContent = 'Chicken';
chickenButton.style.padding = '10px 20px';
chickenButton.style.fontSize = '16px';
chickenButton.style.border = 'none';
chickenButton.style.backgroundColor = 'blue';
chickenButton.style.color = 'white';
chickenButton.style.cursor = 'pointer';
chickenButton.addEventListener('click', function () {
  console.log('Chicken button clicked');
});

const potatoButton = document.createElement('button');
potatoButton.textContent = 'Potato';
potatoButton.style.padding = '10px 20px';
potatoButton.style.fontSize = '16px';
potatoButton.style.border = 'none';
potatoButton.style.backgroundColor = 'blue';
potatoButton.style.color = 'white';
potatoButton.style.cursor = 'pointer';
potatoButton.addEventListener('click', function () {
  console.log('Potato button clicked');
});

const tomatoButton = document.createElement('button');
tomatoButton.textContent = 'Tomato';
tomatoButton.style.padding = '10px 20px';
tomatoButton.style.fontSize = '16px';
tomatoButton.style.border = 'none';
tomatoButton.style.backgroundColor = 'blue';
tomatoButton.style.color = 'white';
tomatoButton.style.cursor = 'pointer';
tomatoButton.addEventListener('click', function () {
  console.log('Tomato button clicked');
});

document.body.appendChild(meatButton);
document.body.appendChild(chickenButton);
document.body.appendChild(potatoButton);
document.body.appendChild(tomatoButton);

// Get a reference to the 'meals' collection in Firestore
const mealsRef = db.collection('meals');

// Get all documents in the 'meals' collection
mealsRef.get().then((querySnapshot) => {
  // Loop through the documents
  querySnapshot.forEach((doc) => {
    // Get the data of each document
    const meal = doc.data();

    // Select the container where you want to add the meals
    const ingredientsContainer = document.querySelector('.ingredients');

    // Create a button for each meal
    const mealButton = document.createElement('button');
    mealButton.type = 'button';
    mealButton.innerHTML = `
      <img src="${meal.img}" alt="${meal.name}">
      <p>${meal.name}</p>
    `;

    // Add event listener to the button to navigate to the ingredients
    mealButton.addEventListener('click', () => {
      window.location.href = `/ingredients/${doc.id}`; // Navigate to the ingredients page of the clicked meal
    });

    // Add the button to the container
    ingredientsContainer.appendChild(mealButton);
  });
});