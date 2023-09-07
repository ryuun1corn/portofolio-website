const container= document.querySelector(".grid");
const computedStyles=getComputedStyle(document.documentElement);
const boxSize=parseInt(computedStyles.getPropertyValue("--box-size"));
const settingsForm=document.getElementById("settings-form");
const widthInput=document.getElementById("width"),heightInput=document.getElementById("height");
const statusText=document.querySelector(".game-status");
const easyBtn=document.querySelector(".easy");
const hardBtn=document.querySelector(".hard");
let column=30,row=20;
let path=[],prog=[];
let game=false;
let startY,endX,endY; 
let blackBoxColor="#0D3B66",whiteBoxColor="#FFF";

class Box{ // Box class
    constructor(element,pos,color) {
        this.element=element;
        this.pos=pos;
        this.color=color;
    }
    
    remove() {
        this.element.remove();
    }
}

changeSize();
document.documentElement.style.setProperty("--black-box-color", `${blackBoxColor}`);
document.documentElement.style.setProperty("--white-box-color", `${whiteBoxColor}`);

easyBtn.addEventListener("click", function() {
    document.documentElement.style.setProperty("--box-size", `15px`);
})

hardBtn.addEventListener("click", function() {
    document.documentElement.style.setProperty("--box-size", `10px`);
})

settingsForm.addEventListener("submit", function(e) {
    e.preventDefault();
    column=widthInput.value;
    row=heightInput.value;
    changeSize();
    start(0);

})

// Generate path
start(0);

function changeSize() {
    const columnRange=[20,40],rowRange=[10,30]; // Set boundaries for size
    column=Math.min(columnRange[1],Math.max(column,columnRange[0]));
    row=Math.min(rowRange[1],Math.max(row,rowRange[0]));

    document.documentElement.style.setProperty("--column", `${column}`);
    document.documentElement.style.setProperty("--row", `${row}`);
    widthInput.value=column;
    heightInput.value=row;
}

function addBox(colour) { // Add the boxes at generation
    const newBox=document.createElement('div');
    newBox.classList.add("box");
    newBox.classList.add(`${(colour?"white":"black")}`);
    container.appendChild(newBox);
    return newBox;
}

function findPath(c,r) { // Create horizontal path
    if (c===column-1) {
        endX=c-1;endY=r;
        return;
    }
    path[r][c]=1;
    if (c%2!=0&&c!==column-1) {
        findPath(c+1,slidePath(c,r,2));
    } else {
        findPath(c+1,r);
    }
}

function slidePath(c,r,direction) { // Add vertical travels
    let prob=Math.round(Math.random()*10);
    path[r][c]=1;
    if (direction===2) {
        direction=Math.round(Math.random());
        if (r===1) direction=0;
        else if (r===row-2) direction=1;
    } else if (r===1||r===row-2||prob>8) return r;
    if (direction===0) return slidePath(c,r+1,direction);
    else return slidePath(c,r-1,direction);
}

function triggerWhiteBox(i,j) { // Function to trigger on white boxes
    return function() {
        if (!game&&i===0&&prog.length===0) { // If game is off and pos is at start
            game=true;
            console.log("Start game!");
            statusText.innerHTML="Playing!";
        }
        if (game) { // If game is on
            let len=prog.length;
            const backgroundColor = path[j][i].color;
            if (len===0||(Math.abs(i-prog[len-1][0])+Math.abs(j-prog[len-1][1])<=1&&backgroundColor==="#FFF")) { // If adjacent white box
                prog.push([i,j]);
                this.style.background="#B1CC74";
            }
            if (i===endX&&j===endY) { // If end pos
                console.log("WIN!!");
                statusText.innerHTML="WIN!!!";
                game=false;
                start(1);
                prog=[];
                this.style.background="#8ED081";
            }
        }
    }
}

function triggerBlackBox(i,j) { // Function to trigger on black boxes
    return function() {
        if (game) {
            game=false;
            console.log("Game failed!");
            statusText.innerHTML="Failed...";
            prog.push([i,j]);
            this.style.background="#EF946C";
            start(1);
        }
    }
}

async function start(wait) { // Function to clear the board
    if (wait) { // Check for delay
        await delay(2000);
    } 
    statusText.innerHTML="Idling...";
    if (prog.length===0) { // Check if game is not ongoing
        path.forEach(i => { // Remove old boxes
            i.forEach(j => {
                j.remove();
            }); 
        });

        startY=Math.round(Math.random() * (row-3)+1); // Reset start pos at Y axis
        path=Array.from({length: row}, () => Array(column).fill(0)); 
        findPath(0,startY); // Create new path

        for (var i=0;i<row;i++) { // Add new boxes
            for (var j=0;j<column;j++) {
                let currBox = addBox(path[i][j]);
                if (path[i][j]) {
                    path[i][j]=(new Box(currBox,[i,j],whiteBoxColor));
                    currBox.addEventListener('mouseover', triggerWhiteBox(j,i));
                } else {
                    path[i][j]=(new Box(currBox,[i,j],blackBoxColor));
                    currBox.addEventListener('mouseover', triggerBlackBox(j,i));
                }
            }
        }
    } else {
        prog.forEach(e => { // Just reset the background for each box
            path[e[1]][e[0]].element.style.background=path[e[1]][e[0]].color;
        });
        prog=[]; // Also reset the progress
    }
}

function delay(ms) { // Delay function
    return new Promise(resolve => setTimeout(resolve, ms));
}
