//Game Controller
function gameCtlr() {
  const gameBrd = document.querySelector(".board");
  const domId = document.getElementById.bind(document);
  const domClass = document.querySelector.bind(document);
  const p1 = domId("one").textContent.value;
  const p2 = domId("two").textContent.value;
  const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  let gameArr = [];
  let currentPlayer = "";
  let playerOne = "";
  let playerTwo = "";
  let arrOne = [];
  let arrTwo = [];
  let currentTurn = 1;
  let winner = "";

  //Player Creation
  function createPlayer() {
    playerOne = domId("name").value;
    playerOne = playerOne.toUpperCase();
    domId("one").textContent = playerOne;
  }

  function createNpc() {
    playerTwo = "CPU";
    domId("two").textContent = playerTwo;
  }

  //--Turn Functions//
  //CPU - Easy Mode
  function cpuTurnEasy() {
    function randomNum() {
      return Math.floor(Math.random() * 9);
    }
    let b = [];
    let c = randomNum();

    for (let i = 0; i < gameArr.length; i++) {
      if (gameArr[i] === "") {
        b.push(i);
      }
    }

    function inArray() {
      if (b.includes(c)) {
        gameArr[c] = "o";
      } else {
        c = randomNum();
        inArray();
      }
    }
    inArray();
    b = [];
    currentTurn++;
    render();
    checkWinner();
  }

  //renders each marker on grid and provides event listener for player click/turn
  function render() {
    clearBoard();
    gameArr.forEach((element, index) => {
      let wrapper = document.createElement("p");
      wrapper.classList.add("marker");
      wrapper.textContent = gameArr[index];
      wrapper.addEventListener("click", (event) => {
        if (wrapper.textContent === "") {
          gameArr[index] = "x";
        } else {
          return false;
        }

        render();
        currentTurn++;
        checkWinner();
        //nextTurn();
      });
      gameBrd.appendChild(wrapper);
    });
  }

  //checks winner
  function checkWinner() {
    let checker = (arr, target) => target.every((v) => arr.includes(v));
    console.log(gameArr);
    arrOne = [];
    arrTwo = [];

    function resultText() {
      domId("plateA").style.display = "none";
      domId("plateB").style.display = "none";
      domId("winText").style.display = "flex";
      if (winner === "") {
        domId("winText").textContent = `IT'S A DRAW!`;
      } else if (winner != "") {
        domId("winText").textContent = `${winner} WINS!`;
      }
    }
    for (let i = 0; i < gameArr.length; i++) {
      if (gameArr[i] === "x") {
        arrOne.push(i);
      } else if (gameArr[i] === "o") {
        arrTwo.push(i);
      }
    }
    if (currentPlayer === "one") {
      for (let i = 0; i < winningCombos.length; i++) {
        if (checker(arrOne, winningCombos[i])) {
          winner = playerOne;
          resultText();
        }
      }
    } else if (currentPlayer === "two") {
      for (let i = 0; i < winningCombos.length; i++) {
        if (checker(arrTwo, winningCombos[i])) {
          winner = playerTwo;
          resultText();
        }
      }
    }
    if (winner === "" && currentTurn != 10) {
      nextTurn();
    } else if (currentTurn === 10 && winner === "") {
      resultText();
    }
    return false;
  }

  //clears grid
  function clearBoard() {
    const brdLength = gameBrd.children.length;
    for (let i = brdLength - 1; i >= 0; i--) {
      gameBrd.removeChild(gameBrd.children[i]);
    }
  }

  //displays results of game and hides player nameplates

  function setCur(nam) {
    currentPlayer = nam;
    domId(nam).classList.add("current");
  }

  function nextTurn() {
    if (currentPlayer === "one") {
      setCur("two");
      domId("one").classList.remove("current");
      cpuTurnEasy();
    } else if (currentPlayer === "two") {
      setCur("one");
      domId("two").classList.remove("current");
    }
  }

  function newGame() {
    gameArr = ["", "", "", "", "", "", "", "", ""];
    currentTurn = 1;
    winner = "";
    domId("plateA").style.display = "flex";
    domId("plateB").style.display = "flex";
    domId("winText").textContent = ``;
    domId("winText").style.display = "none";
    clearBoard();
    render();
    createPlayer();
    createNpc();
    setCur("one");
  }

  domId("submit").addEventListener("click", (event) => {
    newGame();
    domId("modal").style.display = "none";
    domClass(".btn-wrapper").style.height = "60px";
    domClass(".btn-wrapper").style.width = "100px";
    domClass(".btn-wrapper").style.border = "none";
  });

  document.getElementById("new").addEventListener("click", (event) => {
    domId("modal").style.display = "flex";
    domClass(".btn-wrapper").style.height = "150px";
    domClass(".btn-wrapper").style.width = "250px";
    domClass(".btn-wrapper").style.border = "4px solid black";
  });
}

window.addEventListener("load", (event) => {
  gameCtlr();
});
