/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

//console.log(GAMES_DATA);
//console.log(GAMES_JSON);
//console.log(GAMES_JSON[0].name);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++) {
        
        //console.log(games.length);

        // create a new div element, which will become the game card
        const newGameDiv = document.createElement("div");

        // add the class game-card to the list
        newGameDiv.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        //console.log(games[i].name);
        
        newGameDiv.innerHTML =  `
                                 <img class="game-img" src="${games[i].img}"/>
                                 <h3>${games[i].name}</h3>
                                 <p>${games[i].description}</p>
                                 <p>Backers: ${games[i].backers}</p>
                                 <p> Goal: ${games[i].goal}</p>
                                 <p>Pledged: ${games[i].pledged}</p>
                                 `;

        // append the game to the games-container
        gamesContainer.appendChild(newGameDiv);

    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce( (acc, count) => {
    return acc + count.backers;
}, 0);

//console.log(totalContributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString('en-US')}</p>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, count) => {
    return acc + count.pledged;
}, 0);

//console.log(totalRaised);

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString('en-US')}</p>`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `<p>${totalGames}</p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

   
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged > game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

function searchForGame(event) {

    let searchTerm = document.getElementById("search-bar").value;

    // Used for testing purposes
    // console.log(searchTerm);

    // filter through the list of objects 
    let foundGame = GAMES_JSON.filter( (game) => game.name.toLowerCase().includes(searchTerm)); // using the filter option the user can enter a portion of a game title and return any matching game titles that include that word

    // Used for testing purposes
    // console.log(foundGame);

    // clear any other games that are visible on the screen 
    deleteChildElements(gamesContainer);

    //only send the games that were found using the filter
    addGamesToPage(foundGame);

    // clears the search bar when the search button is pressed or enter is pressed on the keyboard
    document.getElementById("search-bar").value = "";

}

// user can submit their search by click the search button or pressing enter on the keyboard
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

searchButton.addEventListener("click", searchForGame);
searchBar.addEventListener("keydown", function(event) {
    if(event.key == "Enter") {
        searchForGame(event);
    }
});

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numOfUnfundedGames = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});

//console.log(numOfUnfundedGames.length);



// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `${numOfUnfundedGames.length > 1 ? `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${numOfUnfundedGames.length} games remain unfunded. We need your help funding these amazing games!` : 
                                               `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames.length} games. Currently, ${numOfUnfundedGames.length} game remains unfunded. We need your help funding these amazing games!`
                    }`;

// console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container

const newDescElement = document.createElement("p");

newDescElement.append(displayStr);

descriptionContainer.appendChild(newDescElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

//console.log(sortedGames);

let [topFundedGame, runnerUpGame, ...others] = sortedGames;

//console.log(topFundedGame);
//console.log(runnerUpGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element

const newTopGame = document.createElement("p");

newTopGame.append(topFundedGame.name);

firstGameContainer.appendChild(newTopGame);

// do the same for the runner up item

const newRunnerUp = document.createElement("p");

newRunnerUp.append(runnerUpGame.name);

secondGameContainer.appendChild(newRunnerUp);