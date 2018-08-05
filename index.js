"use strict";

document.addEventListener("DOMContentLoaded", function(event){

  // DOM Elements
  var playOneButton = document.getElementById("playOne")
  var answerBox = document.getElementById("answer")

  var playManyButton = document.getElementById("playMany")
  var timesBox = document.getElementById("timesBox")

  // Set default number of times
  timesBox.value = timesBox.value != "" ? timesBox.value : 20

  // Attach event listeners for each play button.
  playOneButton.addEventListener("click", playOne)
  playManyButton.addEventListener("click", playMany)

  /**
   * Updates the DOM with graphs to
   */
  function playMany( ){
    var times = parseInt(timesBox.value, 10)
    var payoffs = []
    var movingAverage = []
    for(var n = 0; n < times; n++){

      let currentPayoff = stPete()
      let sum = 0
      payoffs[n] = currentPayoff
      sum += currentPayoff
      movingAverage[n] = sum / (n + 1)
    }

    // Average payoff over time https://plot.ly/javascript/line-charts/
    var traceMA = {
      //x: [1, 2, 3, 4],
      y: movingAverage,
      type: 'scatter',
      name: 'Moving Average'
    }
    var tracePayoffs = {
      //x: [1, 2, 3, 4],
      y: payoffs,
      type: 'scatter',
      name: "Exact Payoffs"
    }
    Plotly.newPlot('line', [traceMA, tracePayoffs])

    // Payoff histogram https://plot.ly/javascript/histograms/
    var traceHisto = {
        x: payoffs,
        type: 'histogram',
      }
    Plotly.newPlot('histo', [traceHisto])
  }

  /**
   * Plays one game and writes the result to the DOM.
   */
  function playOne(){
    document.getElementById("answer").innerHTML = stPete()
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
