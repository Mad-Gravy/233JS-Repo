// JavaScript file for V2 of the concntration game. Comments by Brian Bird, winter term 2025.

//Joseph Teague, 4/11/25

// Declare a class named Card.
class Card 
    {
    /* Add properties named isFaceUp and isMatched and initialize them to false. 
        They will be used to keep track of the state of the card. */
    isFaceUp = false;
    isMatched = false;
    /*
        Add a constructor that has two parameters, suit and value.
        In the body of the constructor, set a property named suit and a property named value.
        (These are two additional properties that will be used to identify the card.)    */
    constructor(suit, value) 
        { 
        this.suit = suit;
        this.value = value;
        }
    }

// Declare a class named Board.
class Board 
    {
    /* Add a property named cards and initialize it to an empty array. 
        This array will be used to store the cards that the player will flip over. */
    cards = [];
    
    /* Add a constructor with no parameters.
       In the body call fillCards and shuffleCards. */
    constructor() 
        {
        fillCards()         
            {
            const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
            const suits = ['h', 's'];
            for(let s = 0; s < suits.length; s++)
                {
                for (let v = 0; v < values.length; v++)
                    {
                    this.cards.push(new Card(suits[s], values[v]));
                    }
                }
            }

        shuffleCards() 
            {
                for (let i = 0; i < this.cards.length; i++) 
                    {
                    let rnd = Math.floor(Math.random() * this.cards.length)
                    let temp = this.cards[i];
                    this.cards[i] = this.cards[rnd];
                    this.cards[rnd] = temp;
                    }
            }
        }
    /* Add a method named showCards.
        Get an array of objects referencing the HTML elements with the name attribute of card.
        Use a for loop to iterate over the array of elements.
          In the loop, check each card to see if it is matched, if it is, set  backgroundImage to 'none'.
          If the card isn't matched, check to see if it is face up, if it is, set backgroundImage to the image of the card face.
          If the card isn't matched and isn't face up, set backgroundImage to the image of the card back. */
    showCards()
        {
            const cards = document.getElementsByName("card");
            for (let i = 0; i < cards.length; i++) 
                {
                if (this.cards[i].isMatched) 
                    {
                    cards[i].style.backgroundImage = 'none';
                    } 
                else if (this.cards[i].isFaceUp) 
                    {
                    cards[i].style.backgroundImage = `url(images/${this.cards[i].suit}${this.cards[i].value}.png)`;
                    } 
                else 
                    {
                    cards[i].style.backgroundImage = 'url(images/back.png)';
                    }
                }
        }

    /* Add a method named fillCards.
        Declare local constants named suits and values and 
           initialize them with arrays like the ones in the previous version of this game.
        Use a nested for loops to iterate over the suits values arrays.
        In the inner loop, create a new instance (object) of the Card class, passing the suit and value into it's constructor.
        Push the new card onto the cards array. */
    fillCards()
        {
            const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
            const suits = ['h', 's'];
            for(let s = 0; s < suits.length; s++)
                {
                for (let v = 0; v < values.length; v++)
                    {
                    this.cards.push(new Card(suits[s], values[v]));
                    }
                }
        }

    /* Add a method named shuffleCards.
        In the body of the method shuffle the cards in the cards array. 
        Do this in a way similar to that used in the previous version of the game. */
    shuffleCards()
        {
            for (let i = 0; i < this.cards.length; i++) 
                {
                let rnd = Math.floor(Math.random() * this.cards.length)
                let temp = this.cards[i];
                this.cards[i] = this.cards[rnd];
                this.cards[rnd] = temp;
                }
        }

    /* Add a method named checkCards.
        The method has two parameters: firstPickIndex, secondPickIndex
        Compare the cards at the two indicies and return true if they match. */    
    checkCards(firstPickIndex, secondPickIndex)
        {
            if (this.cards[firstPickIndex].value == this.cards[secondPickIndex].value)
                {
                this.cards[firstPickIndex].isMatched = true;
                this.cards[secondPickIndex].isMatched = true;
                return true;
                }
            else
                {
                return false;
                }
        }
}

// Declare a class named Game.
class Game {
    /* Add and initialize properties named matches, tries, firstPickIndex and secondPickIndex. 
        These properties will be used to keep track of the number of matches, the number of tries 
        and the indicies of the cards that the player has flipped over. 
        Set the firstPickIndex and secondPickIndex properties to -1 since this won't be confused with a valid index. */
    matches = 0;
    tries = 0;
    firstPickIndex = -1;
    secondPickIndex = -1

    /* Add a constructor with no parameters.
        In the body of the constructor, create a new instance of the Board class.
        Get an array of objects referencing the HTML elements with the name attribute of card.
        Use a for loop to iterate over the array of elements and 
        set the onclick property of each one to the event listener named handleClick. */
    constructor() 
        {
            this.board = new Board();
            const cards = document.getElementsByName("card");
            for (let i = 0; i < cards.length; i++) 
                {
                cards[i].onclick = () => this.handleClick(i);
                }
        }

    /* Add a method named handleClick.
        The method has one parameter: index.
        In the body of the method:
        If the firstPickIndex property is -1,
           set the firstPickIndex property to the value of the index parameter,
           set isFaceUp to true and call the showCards method.
        Otherwise if the secondPickIndex property is -1,
            set the secondPickIndex property to the value of the index parameter,
            set isFaceUp to true,
            call the showCards method,
            increment the tries property,
            call the checkCards method,
            set a timeout for 2 seconds after which turnCardsBack will be called */
    handleClick(index)
        {
            if (this.firstPickIndex == -1) 
                {
                this.firstPickIndex = index;
                this.board.cards[index].isFaceUp = true;
                this.board.showCards();
                } 
            else if (this.secondPickIndex == -1) 
                {
                this.secondPickIndex = index;
                this.board.cards[index].isFaceUp = true;
                this.board.showCards();
                this.tries++;
                if (this.board.checkCards(this.firstPickIndex, this.secondPickIndex)) 
                    {
                    this.matches++;
                    this.firstPickIndex = -1;
                    this.secondPickIndex = -1;
                    } 
                else 
                    {
                    setTimeout(() => this.turnCardsBack(), 2000);
                    }
                }
        }

    /* Add a method named turnCardsBack.
        In the body of the method:
        Set the isFaceUp property of the cards at the firstPickIndex and secondPickIndex to false.
        Set the firstPickIndex and secondPickIndex properties to -1.
        Call the showCards method. */
    turnCardsBack()
        {
            this.board.cards[this.firstPickIndex].isFaceUp = false;
            this.board.cards[this.secondPickIndex].isFaceUp = false;
            this.firstPickIndex = -1;
            this.secondPickIndex = -1;
            this.board.showCards();
        }
}


