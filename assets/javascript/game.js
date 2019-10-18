let myGame;
let idCounter = -1;


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
    remainingEnemies : [],
    myCharacter : 0,
    theOpponent : 0,
    gameStage : 0,
    fightRound : 0
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
  var OpponentDiv = $("#enemy-characters");
  

  var myChar = myGame.allCharacters[myGame.myCharacter];
  var theOpp = myGame.allCharacters[myGame.theOpponent];

  allCharactersDiv.html("");
  myCharacterDiv.html("");
  OpponentDiv.html("");



  
if (myGame.gameStage == 0) {
    //GAME STAGE = 0

  // draws all characters
  for (let i = 0; i < myGame.allCharacters.length; i++) {
    let character = myGame.allCharacters[i];
     allCharactersDiv.append(getCharacterBlock(character));
  }
  
} 

else if (myGame.gameStage == 1) {
    //GAME STAGE = 1, Player has been chosen
    
    // DRAW MY PLAYER 
    myCharacterDiv.html(getCharacterBlock(myChar));

    // draw ENEMEY PLAYERS
    for (let i = 0; i < myGame.remainingEnemies.length; i++) {
        
      let enemyChar = myGame.allCharacters[myGame.remainingEnemies[i]];
        
      allCharactersDiv.append(getCharacterBlock(enemyChar));
      };



} else if (myGame.gameStage == 2) {
  
    //GAME STAGE = 2, First Opponent has been chosen
        // DRAW MY PLAYER 
        myCharacterDiv.html(getCharacterBlock(myChar));

        // DRAW MY OPONENT
        OpponentDiv.html(getCharacterBlock(theOpp));

        // DRAW REMAINING CHAR TILES
        for (let i = 0; i < myGame.remainingEnemies.length; i++) {
        
          let enemyChar = myGame.allCharacters[myGame.remainingEnemies[i]];
            
          allCharactersDiv.append(getCharacterBlock(enemyChar));
          };
        
    // create attack button
          let attackButton = $("<button>");
          attackButton.text('Attack');
          attackButton.addClass('attack-button');
          OpponentDiv.append(attackButton);
           






    
      


// } else if (myGame.gameStage == 3) {


//   // Choose next opponent


};



console.clear();
console.log(myGame);
  

}



$(document).ready(function() {

  reset();
  display();



  // Attack Button on click
  $('body').on('click', '.attack-button', function (){
    

    if (myGame.gameStage == 2) { //game stage is THE FIGHT
      
      myGame.fightRound++;

      // set attach with mutliplier, and counter attack power
      let myAttack = (myGame.fightRound) * (myGame.allCharacters[myGame.myCharacter].attackPower);
      let counterAttack = myGame.allCharacters[myGame.theOpponent].attackPower;
      
       // subtract them from the the object model
      myGame.allCharacters[myGame.theOpponent].health -= myAttack;
      myGame.allCharacters[myGame.myCharacter].health -= counterAttack;
      // update status bar 
      $("header").html(`You attacked <b>${myGame.allCharacters[myGame.theOpponent].name}</b> for ${myAttack} damage.<BR> <b>${myGame.allCharacters[myGame.theOpponent].name}</b> attacked you for ${counterAttack} damage.`);
      
      
      if (myGame.allCharacters[myGame.theOpponent].health <= 0) {
        if (myGame.remainingEnemies.length > 0) {
          $("header").html(`You have defeated <b>${myGame.allCharacters[myGame.theOpponent].name}</b><BR>Choose your next opponent!`);
          myGame.gameStage = 1; //go back to pick next opponent
        } else {
          alert('youv bloody won mate');
          // you have won
        };
        
       
      };
  
    };



    display();





  });


  // Character tile on click
  $('body').on('click', '.charactertile', function (){
    
      if (myGame.gameStage==0) { //game stage is choose my player
          
          for (let i = 0; i < myGame.allCharacters.length; i++) {
              if (i == this.id) {
                  myGame.myCharacter = myGame.allCharacters[this.id].id;
              } else {
                  // let character = myGame.allCharacters[i];
                  myGame.remainingEnemies.push(myGame.allCharacters[i].id);
              };
          };

          myGame.gameStage = 1;
          // update Status bar
          $("header").html(`You have chosen <b>${myGame.allCharacters[myGame.myCharacter].name}</b>. Now choose which enemy to fight first!`);
      
      
        } else if (myGame.gameStage==1) { // game stage is choose first enemy
          
          // check didn't click own character & push opponent theOpponent object
          if (this.id != myGame.allCharacters[myGame.myCharacter].id) {
              myGame.theOpponent = myGame.allCharacters[this.id].id;
              myGame.remainingEnemies

              for(let i = 0; i < myGame.remainingEnemies.length; i++) {

                // remove current opponent from remaining enemies
                if(myGame.remainingEnemies[i] == myGame.theOpponent) myGame.remainingEnemies.splice(i, 1);
              };
              
              myGame.gameStage = 2; 

              // update Status bar
              $("header").html(`You have chosen to fight <b>${myGame.allCharacters[myGame.theOpponent].name}</b>!`);
    

          };

      };



      display();



  });




});
