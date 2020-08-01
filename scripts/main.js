//Game Controller
function gameCtlr() {
  const gameBrd = document.querySelector(".board");
  const domId = document.getElementById.bind(document);
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
  let currentTurn = 0;

  function createPlayer() {
    playerOne = prompt("Please enter your name.", "Player One");
    domId("one").textContent = playerOne;
  }

  function createNpc() {
    playerTwo = "Computer";
    domId("two").textContent = playerTwo;
  }

  function setCur(nam) {
    currentPlayer = nam;
    domId(nam).classList.add("current");
  }

  function nextTurn() {
    if (currentPlayer === "one") {
      setCur("two");
      domId("one").classList.remove("current");
    } else {
      setCur("one");
      domId("two").classList.remove("current");
    }
  }

  function filter() {
    arrOne = [];
    arrTwo = [];
    for (let i = 0; i < gameArr.length; i++) {
      if (gameArr[i] === "x") {
        arrOne.push(i);
      } else if (gameArr[i] === "o") {
        arrTwo.push(i);
      }
    }
    checkWinner();
    console.log(arrOne);
    console.log(arrTwo);
  }

  function checkWinner() {
    let checker = (arr, target) => target.every((v) => arr.includes(v));
    for (let i = 0; i < winningCombos.length; i++) {
      if (checker(arrOne, winningCombos[i])) {
        console.log("play 1 wins");
      }
    }

    for (let i = 0; i < winningCombos.length; i++) {
      if (checker(arrTwo, winningCombos[i])) {
        console.log("play 2 wins");
      }
    }

    if (currentTurn === 9) {
      console.log("it's a draw");
    }
    nextTurn();
  }

  //renders to DOM
  function render() {
    clearBoard();
    gameArr.forEach((element, index) => {
      let wrapper = document.createElement("p");

      wrapper.classList.add("marker");
      wrapper.textContent = gameArr[index];
      wrapper.addEventListener("click", (event) => {
        if (currentPlayer === "one") {
          gameArr[index] = "x";
        } else if (currentPlayer === "two") {
          gameArr[index] = "o";
        }
        render();
        currentTurn++;
        console.log(gameArr);
        filter();
        //nextTurn();
      });
      gameBrd.appendChild(wrapper);
    });
  }

  //functions
  function clearBoard() {
    //remove all nodes
    const brdLength = gameBrd.children.length;

    for (let i = brdLength - 1; i >= 0; i--) {
      gameBrd.removeChild(gameBrd.children[i]);
    }
  }

  document.getElementById("new").addEventListener("click", (event) => {
    gameArr = ["", "", "", "", "", "", "", "", ""];
    clearBoard();
    render();
    createPlayer();
    createNpc();
    setCur("one");
  });
}

window.addEventListener("load", (event) => {
  gameCtlr();
});
