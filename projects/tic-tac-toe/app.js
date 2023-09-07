const playerXScore_span = document.getElementById("xplayer-score");
const playerOScore_span = document.getElementById("oplayer-score");
const result_div = document.querySelector(".result > p");
var game_choices = []
var x_choices = []
var o_choices = []
let stat=[];
let boxes=[];
let divs=[];
let win_condition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let playerX = true;

for (var i=0;i<9;i++) { 
    boxes.push(document.getElementById(`${String.fromCharCode(i+97)}img`));
    stat.push(`${String.fromCharCode(i+97)}`)
    divs.push(document.getElementById(`${String.fromCharCode(i+97)}`))
    divs[i].addEventListener('click', gameClicked(i));
}

function changeImage(choice, player) { 
    switch (player) {
        case "x":
            boxes[choice].src='images/x.png';
            break

        case "o":
            boxes[choice].src='images/o.png';
            break

        case "y":
            boxes.forEach(box => {
                box.src="images/square.png"; 
            });;
            break
    }
}

function draw() { 
    for (var i=0;i<9;i++) {
        stat[i]=`${String.fromCharCode(i+97)}`;
    }
    game_choices = [];
    x_choices = [];
    o_choices = [];
    result_div.innerHTML = "It's a draw!";
    changeImage(9, "y")
}

function win(player) { 
    for (var i=0;i<9;i++) {
        stat[i]=`${String.fromCharCode(i+97)}`;
    }
    game_choices = [];
    x_choices = [];
    o_choices = [];
    if (player === "x") {
        playerXScore_span.innerHTML++;
        result_div.innerHTML = "Player X beat Player O!";
    } else {
        playerOScore_span.innerHTML++;
        result_div.innerHTML = "Player O beat Player X!";
    }
    changeImage(9, "y")
    console.log(player);
}

function game(player_array, choice, player) { 
    for (var y = 0; y < game_choices.length; y++) {
        if (choice === game_choices[y]) {
            return;
        }
    }
    game_choices.push(choice);
    player_array.push(`${String.fromCharCode(choice+97)}`);
    changeImage(choice, player);
    playerX=!playerX;

    for (var i=0;i<9;i++) {
        if (`${String.fromCharCode(choice+97)}`===stat[i]) {
            stat[i]=player;
        }
    }
    win_condition.forEach(condition => {
        let gamestate="";
        for (var i=0;i<3;i++) {
            gamestate+=stat[condition[i]];
        }
        if (gamestate==="xxx"||gamestate==="ooo") {
            win(player);
            return;
        }
    });
    if (game_choices.length===9) draw();
}

function gameClicked(choice) { 
    return function() {
        if (playerX) {
            game(x_choices, choice, "x");
        } else {
            game(o_choices, choice, "o");
        }
    }
}
