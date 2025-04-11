/*  

    Joseph Teague, 4/10/25
    
    Overview
    This application simulates a simple stop watch on the page.  The user 
    can start, stop or reset the clock using the buttons and link on the page.

    There are 3 global variables that are used to keep track of the "state"
    of the application.
    -  isRunning - is a boolean that keeps track of whether the stopwatch is running or paused
    -  elapsedTime - is an integer that represents number of seconds that the stopwatch has been running
    -  timer - a reference to the code that fires at 1 second intervals that updates the clock

    There are 3 functions that are associated with the click event handler for the buttons
    and link on the page.  stopTimer, startTimer and resetTimer.

    There are 3 "helper" functions
    -   init is called when the page loads to set up the page
    -   incrementTimer is called at one second intervals to update the page
    -   pad is used to make sure that min or sec that are 1 digit can be displayed as 2
        digits by adding a leading zero
*/
/*
    Create 3 global variables: isRunning, timer and elapsedTime.
    Initialize them to false, null and 0 respectively.
*/
let isRunning = false;
let timer = null;
let elapsedTime = 0;

function init()
{
    // Get the button element with an id of 'start' and put it in a variable
    let startButton = document.getElementById('start');
    let stopButton = document.getElementById('stop');
    let resetButton = document.getElementById('reset');
    // Do the same for the stop button and the reset button
    // Add an onclick event handler to each of the buttons
    startButton.onclick = startTimer;
    stopButton.onclick = stopTimer;
    resetButton.onclick = resetTimer;
    // The function startTimer, stopTimer or resetTimer should be called when 
    // the appropriate button is clicked
}


function startTimer() {
    // if the timer is NOT running, start it by doing the following:
    if (!isRunning) {
        // set the isRunning variable to true
        let isRunning = true;
        // call the function setInterval (wich will call the function incrementTimer every second)
        // save the timer in the timer variable so you can stop the timer later on
        timer = setInterval(incrementTimer, 1000);
    //end if
    }
}

function incrementTimer() {
    // increment the elapsedTime
    elapsedTime += 1;
    // calculate the minutes and seconds from the elapsedTime
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;      
    // calculate the number of minutes and seconds as follows:
         // minutes = the integer portion of (elapsedTime / 60)
         // seconds = the remainder when dividing elapsedTime by 60
    // call the function pad (to make sure there's a leading 0 on minutes if necessary)
    // write minutes to the element on the page
    // call the function pad (to make sure there's a leading 0 on seconds if necessary)
    // write minutes to the element on the page
    // write seconds to the element on the page
    document.getElementById('minutes').innerHTML = pad(minutes);
    document.getElementById('seconds').innerHTML = pad(seconds);
}

function pad(number) {
    if (number < 10) {
        number = '0' + number;
    }
    return number;
    // add a leading 0 to number if the number is < 10
    // (To keep the minutes and seconds at 2 digits)
    // return number as a string
}

function stopTimer() {
    // if the timer is running, stop it by doing the following:
    if (isRunning = true) {
        // set isRunning to false
        isRunning = false;
        // call the function clearInterval to stop the timer
        clearInterval(timer);
    // end if
    }
}

function resetTimer() {
    // stop the timer by calling stopTimer
    stopTimer();
    // set the elapsedTime back to 0
    elapsedTime = 0;
    // write 00 to the elements on the page for minutes and seconds
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
}

// When the page has finished loading, call the function init
window.onload = init;
