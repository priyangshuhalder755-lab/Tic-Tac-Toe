let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turnO = true;

const WinPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
       
        if(turnO) {
            box.innerText="O";
            turnO = false;
            box.style.color = "#00ff00";
        } else {
            box.innerText="X";
            turnO = true;
            box.style.color = "#ff0000";
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText= "";
    }
}
const showWinner = (Winner) => {
    msg.innerText=`Congratulations, winner is ${Winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for(let pattern of WinPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val===pos2Val && pos2Val===pos3Val) {
                disableBoxes();
                showWinner(pos1Val);
                return;
            }
        }
    } 
    let allFilled = true;

    for(let box of boxes) {
        if(box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if(allFilled) {
        msg.innerText = "Game is Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

