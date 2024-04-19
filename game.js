const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset-button");
const newGameButton = document.querySelector("#new-button");
const messageContainer = document.querySelector(".message-container");
const message = document.querySelector("#message");

let turnO = true; //playerX, playerY.

const winingPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    enableBoxes();
    messageContainer.classList.add("hide");
}

resetButton.addEventListener("click", resetGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if (turnO) { //playerO
            box.innerText = "O";
            turnO = false;
        } else { //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        
        checkWinner();
        checkDraw();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (Winner) => {
    message.innerText = `Congratulations, Winner is ${Winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winingPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Exit the function if a winner is found
        }
    }
};

const showDraw = () => {
    message.innerText = ` Game is draw, Please try again`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const checkDraw = () => {
    let draw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }
    if (draw) {
        showDraw();
    }
};

const newGameButtonGame = () => {
    turnO = true;
    enableBoxes();
    messageContainer.classList.add("hide");
}

newGameButton.addEventListener("click", newGameButtonGame);