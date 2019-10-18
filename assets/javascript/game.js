let myGame;
let idCounter = -1;

function createCharacter(name, image, health, atp) {
    idCounter++;
  return {
    id : idCounter,
    name : name,
    image: image,
    health: health,
    attackPower : atp
  }
  
}

function reset() {
  idCounter = -1;

  myGame = {
    allCharacters : [],
    remainingEnemies : [],
    myCharacter : 0,
    theOpponent : 0,
    gameStage : 0,
    fightRound : 0
  }
  myGame.allCharacters.push(createCharacter("Dog","./assets/images/dog.png",100,16));
  myGame.allCharacters.push(createCharacter("Monkey","./assets/images/monkey.png",80,7));
  myGame.allCharacters.push(createCharacter("Turtle","./assets/images/turtle.png",140,10));
  myGame.allCharacters.push(createCharacter("Cat","./assets/images/cat.png", 90,8));

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

function display(statusBar) {
  var allCharactersDiv = $("#all-characters");
  var myCharacterDiv = $("#my-character");
  var OpponentDiv = $("#enemy-characters");
  var attackButtonDiv = $("#attack-button");

  var myChar = myGame.allCharacters[myGame.myCharacter];
  var theOpp = myGame.allCharacters[myGame.theOpponent];

  // Clear game divs
  allCharactersDiv.html("");
  myCharacterDiv.html("");
  OpponentDiv.html("");
  attackButtonDiv.html("");

  console.clear();
console.log(myGame.gameStage);

  //Update the statusbar
  $("footer").html(statusBar);
  
  //GAME STAGE = 0
  if (myGame.gameStage == 0) {
    
    // draws all characters
    for (let i = 0; i < myGame.allCharacters.length; i++) {
      let character = myGame.allCharacters[i];
      allCharactersDiv.append(getCharacterBlock(character));
    }
  
  } else if (myGame.gameStage == 1) {
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
          attackButton.text('Attack!');
          attackButton.addClass('attack-button');
          attackButtonDiv.append(attackButton);
           
    } else if (myGame.gameStage == 3) {
      //GAME STAGE = 3, Player has LOST
      
       // DRAW MY OPONENT
       OpponentDiv.html(getCharacterBlock(theOpp));

      // draw ENEMEY PLAYERS if any left
      for (let i = 0; i < myGame.remainingEnemies.length; i++) {
          
        let enemyChar = myGame.allCharacters[myGame.remainingEnemies[i]];
          
        allCharactersDiv.append(getCharacterBlock(enemyChar));
      };

        //append Rematch button
        let rematchButton = $("<button>");
        rematchButton.text('Rematch!');
        rematchButton.addClass('rematch-button');
        attackButtonDiv.append(rematchButton);
  
  
    } else if (myGame.gameStage == 4) {
      //GAME STAGE = 1, Player has WON
      
      // DRAW MY PLAYER 
      myCharacterDiv.html(getCharacterBlock(myChar));
  
      //append Rematch button
      let rematchButton = $("<button>");
      rematchButton.text('Rematch!');
      rematchButton.addClass('rematch-button');
      attackButtonDiv.append(rematchButton);

    } else if (myGame.gameStage == 5) {
      //GAME STAGE = 5, Double knock out
      
      // draw ENEMEY PLAYERS if any left
      for (let i = 0; i < myGame.remainingEnemies.length; i++) {
    
        let enemyChar = myGame.allCharacters[myGame.remainingEnemies[i]];
          
        allCharactersDiv.append(getCharacterBlock(enemyChar));
      };

      //append Rematch button
      let rematchButton = $("<button>");
      rematchButton.text('Rematch!');
      rematchButton.addClass('rematch-button');
      attackButtonDiv.append(rematchButton);

    };





};



$(document).ready(function() {

  reset();
  display(`Choose your Fighter!`);


  $('body').on('click', '.rematch-button', function (){
    reset();
    display(`Choose your Fighter!`);
  });



  // Attack Button on click
  $('body').on('click', '.attack-button', function (){
    

    if (myGame.gameStage == 2) { //game stage is THE FIGHT
      
      // increment fight round for attack multiplier
      myGame.fightRound++;

      // set attack with mutliplier, and counter attack power
      let myAttack = (myGame.fightRound) * (myGame.allCharacters[myGame.myCharacter].attackPower);
      let counterAttack = myGame.allCharacters[myGame.theOpponent].attackPower;
      
       // subtract them from the the object model
      myGame.allCharacters[myGame.theOpponent].health -= myAttack;
      myGame.allCharacters[myGame.myCharacter].health -= counterAttack;

      // update status bar 
      display(`You attacked <b>${myGame.allCharacters[myGame.theOpponent].name}</b> for ${myAttack} damage.<BR> <b>${myGame.allCharacters[myGame.theOpponent].name}</b> attacked you for ${counterAttack} damage.`);
      

      // all potential end game states are below

      // double knockout various scenarios for extra fun
      if (myGame.allCharacters[myGame.myCharacter].health <= 0 && myGame.allCharacters[myGame.theOpponent].health <= 0) {
        myGame.gameStage = 5;
        if (myGame.remainingEnemies.length == 2) {
          display(`It's a double knockout.<BR><b>${myGame.allCharacters[myGame.remainingEnemies[0]].name}</b> and <b>${myGame.allCharacters[myGame.remainingEnemies[1]].name}</b> win by default!<BR> Click rematch to play again!`)
        
          } else if (myGame.remainingEnemies.length == 1) {
            display(`It's a double knockout.<BR><b>${myGame.allCharacters[myGame.remainingEnemies[0]].name}</b> wins by default!<BR>Click rematch to play again!`)
        
          } else {
          display(`It's a double knockout. You and <b>${myGame.allCharacters[myGame.theOpponent].name}</b> have defeated each other.<BR>  Click rematch to play again!`)
        };

      } else if (myGame.allCharacters[myGame.myCharacter].health <= 0) {
        // you have LOST
        myGame.gameStage = 3; // losing game stage
        display(`You have been defeated by <b>${myGame.allCharacters[myGame.theOpponent].name}</b>.<BR> Click rematch to play again!`)
      
      } else if (myGame.allCharacters[myGame.theOpponent].health <= 0) {
        if (myGame.remainingEnemies.length > 0) {
          
          myGame.gameStage = 1; //go back to pick next opponent
          display(`You have defeated <b>${myGame.allCharacters[myGame.theOpponent].name}</b><BR>Choose your next opponent!`);
          
        } else {
          myGame.gameStage = 4; //winning game stage
          display(`You have defeated all of your enemies. <b>You are victorious!!</b><BR>Click rematch button to play again!`); 
          
        }; 
      };
  
    };



    // display();





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
          display(`You have chosen <b>${myGame.allCharacters[myGame.myCharacter].name}</b>. Now choose your opponent!`);
      
      
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
              display(`You have chosen to fight <b>${myGame.allCharacters[myGame.theOpponent].name}</b>!<BR>Click the button to attack!`);
              
    

          };

      };

      

  });


});
