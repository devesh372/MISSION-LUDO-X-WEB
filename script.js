
const board = document.getElementById("ludo-board");

const SIZE = 15;

const players = [
    { name: "blue", row: 0, col: 0 },
    { name: "red", row: 0, col: 9 },
    { name: "green", row: 9, col: 9 },
    { name: "yellow", row: 9, col: 0 }
];

// Four traditional safe-zone positions
const safeStars = new Set([
    "6,11",
    "2,6",
    "12,8",
    "8,2"
]);

function getHome(row, col) {
    return players.find(player =>
        row >= player.row &&
        row < player.row + 6 &&
        col >= player.col &&
        col < player.col + 6
    );
}

function isCenter(row, col) {
    return row >= 6 && row <= 8 &&
           col >= 6 && col <= 8;
}

function isHomeLane(row, col) {
    return (
        (row === 7 && col >= 1 && col <= 5) ||
        (col === 7 && row >= 1 && row <= 5) ||
        (row === 7 && col >= 9 && col <= 13) ||
        (col === 7 && row >= 9 && row <= 13)
    );
}

function createPawnSlots(home, row, col) {
    const yardRow = row - home.row;
    const yardCol = col - home.col;

    return (
        yardRow >= 1 && yardRow <= 4 &&
        yardCol >= 1 && yardCol <= 4 &&
        (
            (yardRow === 1 || yardRow === 4) &&
            (yardCol === 1 || yardCol === 4)
        )
    );
}

function createBoard() {
    board.innerHTML = "";

    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            const home = getHome(row, col);

            if (isCenter(row, col)) {
                cell.classList.add("center");

                if (row === 7 && col === 7) {
                    cell.classList.add("finish");
                    cell.textContent = "★";
                }
            }

            else if (home) {
                cell.classList.add("home", home.name);

                if (createPawnSlots(home, row, col)) {
                    cell.classList.add("yard");

                    const pawn = document.createElement("div");
                    pawn.className = `pawn ${home.name}`;

                    cell.appendChild(pawn);
                }
            }

            else if (isHomeLane(row, col)) {
                cell.classList.add("lane");

                if (row === 7 && col <= 5) {
                    cell.classList.add("lane-blue");
                }

                if (col === 7 && row <= 5) {
                    cell.classList.add("lane-red");
                }

                if (row === 7 && col >= 9) {
                    cell.classList.add("lane-green");
                }

                if (col === 7 && row >= 9) {
                    cell.classList.add("lane-yellow");
                }
            }

            else if (
                (row >= 6 && row <= 8) ||
                (col >= 6 && col <= 8)
            ) {
                cell.classList.add("path");
            }

            else {
                cell.classList.add("empty");
            }

            // Add safe-zone stars
            if (safeStars.has(`${row},${col}`)) {
                const star = document.createElement("span");
                star.className = "safe-star";
                star.textContent = "☆";
                cell.appendChild(star);
            }

            board.appendChild(cell);
        }
    }

    console.log("MISSION LUDO X board created with four safe stars!");
}

createBoard();
