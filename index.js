"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // Attach event listeners for play button.
  document.getElementById("play").addEventListener("click", () => {
    var times = parseInt(document.getElementById("timesBox").value, 10)
    var payoffs = repeatedPlay(times)

    var mean = payoffs.reduce((x, y) => (x+y))
    document.getElementById("answer").innerHTML = "average: " + mean

    //TODO Payoff histogram

    //TODO Average payoff over time

  })

  /**
   * Plays the St Petersburg game the given number of times calculating
   * statistical data about the run.
   * @param n The number of games to play
   * @return List of the resulting payouts
   */
  function repeatedPlay(n) {
    var turns = []
    while (--n >= 0) {
      turns[n] = stPete()
    }
    return turns
  }

  /**
   * Simulates the St Petersburg paradox with a pot starting at 1.
   * Simulation is done by generating a random bitstring until the first true bit.
   * @return The game's final payout
   */
  function stPete(){
    var streak = 0;

    while (Math.random() < 0.5){
      streak++
    }

    return 2 ** streak;
  }
})
