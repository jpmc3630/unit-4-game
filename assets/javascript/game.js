let myGame;
let idCounter = -1;
let gameStage = 0;

function createCharacter(name, image, health, atp, ctp) {
    idCounter++;
  return {
    id : idCounter,
    name : name,
    image: image,
    health: health,
    attackPower : atp,
    counterPower : ctp
  }
  
}

function reset() {
  myGame = {
    allCharacters : [],
    enemyCharacters : [],
    myCharacter : 0,
    enemyCharacter : 0
  }
  myGame.allCharacters.push(createCharacter("Boba Fett","https://via.placeholder.com/100",100,10,5));
  myGame.allCharacters.push(createCharacter("Darth Vader","https://via.placeholder.com/100",150,20,2));
  myGame.allCharacters.push(createCharacter("Obi Wan","https://via.placeholder.com/100",50,5,50));
  myGame.allCharacters.push(createCharacter("Luke","https://via.placeholder.com/100", 125,15,40));

}

function getCharacterBlock(character) {
  return `
    <div id="${character.id}" class="charactertile">
      <p>${character.name}</p>
      <img src="${character.image}">
      <p>${character.health}</p>
    </div>
  `
}

function display() {
  var allCharactersDiv = $("#all-characters");
  var myCharacterDiv = $("#my-character");
  var enemyCharactersDiv = $("#enemy-characters");
  var statusBar = $("header");


  allCharactersDiv.html("");
  myCharacterDiv.html("");
  

  
if (gameStage == 0) {
    //GAME STAGE = 0
  // draws all characters
  for (let i = 0; i < myGame.allCharacters.length; i++) {
    let character = myGame.allCharacters[i];
     allCharactersDiv.append(getCharacterBlock(character));
  }
  
} 

else if (gameStage == 1) {
    //GAME STAGE = 1
    // DRAW MY PLAYER 


         myCharacterDiv.html(getCharacterBlock(myGame.myCharacter));


    // draw ENEMEY PLAYERS

    for (let i = 0; i < myGame.enemyCharacters.length; i++) {
        let character = myGame.enemyCharacters[i];
        
         enemyCharactersDiv.append(getCharacterBlock(character));
      };

      // update Status bar
      statusBar.html(`You have chosen <b>${myGame.myCharacter.name}</b>. Now choose which enemy to fight first!`);

};




  

// allCharactersDiv.text(myGame.allCharacters[0].id);
// console.log(myGame);



}



$(document).ready(function() {

reset();
display();

// myGame.playerCharacter = myGame.allCharacters[0];

// display();

$(".charactertile").on("click", function () {
    


    if (gameStage==0) { //game stage is choose my player
        
        for (let i = 0; i < myGame.allCharacters.length; i++) {
            if (i == this.id) {
                myGame.myCharacter = myGame.allCharacters[this.id];
            } else {
                let character = myGame.allCharacters[i];
                myGame.enemyCharacters.push(myGame.allCharacters[i]);
            };
        };
        gameStage = 1; 
    };


    if (gameStage==1) { // game stage is choose my first enemy
        
    // identify enemy character 
    //moves seleced enemy TILE into the FIGHT ZONE
    // create attack button




    gameStage = 2; 
    };

console.log(myGame);

    display();



});


});
