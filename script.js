const container = document.querySelector(".container");
let n_grid = 16;
let mode; 
let gridElements;
function createGrid(n_grid){
    for(i=0;i<n_grid*n_grid;i++){
        const div = document.createElement("div");
        div.classList.add("gridElement");
        container.appendChild(div);
    }
    let size = 480/n_grid;
    size += "px";
    gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach(element => {element.style.width = size;
        element.style.height = size;
        element.style.backgroundColor = "rgb(255,255,255)"})
    gridElements.forEach((element) => {element.addEventListener('mouseover',changeColor)});
}
createGrid(16);
let mouseDown = false;
document.addEventListener('mousedown',() => {mouseDown = true;});
document.addEventListener('mouseup',() => {mouseDown = false;});



function changeColor(e){
    if(!mouseDown){
        return;
    }
    switch(mode){
        case "eraser":
            e.target.style.backgroundColor = "rgb(255,255,255)";
            break;
        case "black":
            e.target.style.backgroundColor = "rgb(0,0,0)";
            break;
        case "random":
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let random_color = `rgb(${r},${g},${b})`;
            e.target.style.backgroundColor = random_color;
            break;
        case "increment_black":
            curr_color = e.target.style.backgroundColor;
            curr_color = curr_color.slice(4,-1);
            let colors = curr_color.split(", ");
            for(let i=0;i<3;i++){
                colors[i] = Number(colors[i]);
            }
            if(colors[0]==colors[1] && colors[0] == colors[2]){
                colors[0] = Math.floor(colors[0]/25.5)*25.5;
                if(colors[0] == 0){
                    break;
                }
                colors[0] -= 25.5;
                let color_val = `rgb(${colors[0]},${colors[0]},${colors[0]})`;
                e.target.style.backgroundColor = color_val;
            }else{
                e.target.style.backgroundColor = "rgb(229.5,229.5,229.5)";
            }

            break;
        default:
            e.target.style.backgroundColor = "rgb(0,0,0)";
    }     
}

const reset = document.querySelector("#reset");


function newGrid(e){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    let n_grid = prompt("Enter the size of grid",15);
    createGrid(n_grid);
}

reset.addEventListener("click",newGrid);

function switchColor(e){
    mode = e.target.id;
}
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click",switchColor);

const black = document.querySelector("#black");
black.addEventListener("click",switchColor);

const random = document.querySelector("#random");
random.addEventListener("click",switchColor);

const increment_black = document.querySelector("#increment_black");
increment_black.addEventListener("click",switchColor);

const clear = document.querySelector("#clear");
clear.addEventListener("click",clearGrid);

function clearGrid(){
    gridElements.forEach(element => {element.style.backgroundColor = "rgb(255,255,255)";})
}