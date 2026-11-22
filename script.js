
const board = document.getElementById("ludo-board");

const SIZE = 15;

const homes = [
    { name: "blue", row: 0, col: 0 },
    { name: "red", row: 0, col: 9 },
    { name: "yellow", row: 9, col: 0 },
    { name: "green", row: 9, col: 9 }
];

function createBoard() {
    board.innerHTML = "";
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const cell = document.createElement("div");

            cell.classList.add("cell");

            const home = homes.find(h =>
                row >= h.row &&
                row < h.row + 6 &&
                col >= h.col &&
                col < h.col + 6
            );

            if (home) {
                cell.classList.add("home", home.name);
            } else if (
                row >= 6 && row <= 8 &&
                col >= 6 && col <= 8
            ) {
                cell.classList.add("center");
            } else if (
                row >= 6 && row <= 8 ||
                col >= 6 && col <= 8
            ) {
                cell.classList.add("path");
            } else {
                cell.classList.add("empty");
            }

            board.appendChild(cell);
        }
    }
}

createBoard();

console.log("MISSION LUDO X board initialized!");
