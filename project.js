let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".newGame");
let reset =  document.querySelector(".reset");
let msg =  document.querySelector(".msg");
let win =  document.querySelector(".winMsg");

let turn0 = true
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const boxEnable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
  }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `The Winner is ${winner}`;
    win.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2&& pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

const gameDraw = () => {
    msg.innerText = "the game was a draw";
    win.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true; 
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }    
    });
});

const resetGame = () => {
    turn0 = true;
    count = 0;
    boxEnable();
    win.classList.add("hide");
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
