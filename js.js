const cnv = document.getElementById('cnv');
const ctx = cnv.getContext('2d')



// cnv.height = 400;


fieldSize = 15; // cells
cellSize = 50; //px
w = h = fieldSize * cellSize;

cnv.width = w;
cnv.height = h;

// function createField {

// }
flag = 0;
pauseBtn = document.getElementById('pauseBtn');
pauseBtn.onclick = () => {
    if (flag==0) {
        flag= 1;
        pauseBtn.innerHTML = "Pause"
    } else {
        flag = 0;
        pauseBtn.innerHTML = "Play"
    }
    
}
// --------------------------------
// ВВОД ПО НАЖАТИЮ МЫШИ

// получить координаты отн холста
// определить ячейку
// закрасить ячейку


field = emptyFieldConstructor(fieldSize)

cnv.addEventListener('click', (e) => {
    let rect = cnv.getBoundingClientRect()
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    cellX = Math.floor(x/cellSize);
    cellY = Math.floor(y/cellSize);

    field[cellY][cellX] = (field[cellY][cellX] == 0) ? 1 : 0
    console.log(field);
    ctx.clearRect(0, 0, w, h);
    Render();
})



// function fieldCreate() {

// }









// --------------------------------


// field = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//          [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
//          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
//          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//          [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
//          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//          [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
//          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],];

// ctx.strokeRect(0, 0, w,h)
ctx.strokeRect(0, 0, w,h)







DrawEmpyCell = (x,y) => {
    ctx.strokeRect(x*50,y*50, 50,50);
}
DrawLivingCell = (x,y) => {
    ctx.fillRect(x*50,y*50, 50,50);
}

function Render() {
    for(let i = 0; i < field.length; i++) {
        for(let j = 0; j<field[i].length; j++) {
            (field[i][j] == 1) ?  DrawLivingCell(j,i) : DrawEmpyCell(j,i);
        }
    }
}

Render()



FindNeighboursCount = (field, i,j)=>{
    let neighbourCount = 0;
    try {
        if(field[i][j+1] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i][j-1] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i+1][j] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i-1][j] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i+1][j+1] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i+1][j-1] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i-1][j+1] == 1) neighbourCount++;
    } catch {}
    try {
        if(field[i-1][j-1] == 1) neighbourCount++;
    } catch {}
    return neighbourCount
}

function emptyFieldConstructor(len) {
    let field = [];
    for(let i = 0; i < len; i++) {
        field[i] = [];
        for(let j = 0; j < len; j++) {
            field[i][j] = 0;
        }
    }
    return field
}
function Update() {
    if(flag == 0) return
    ctx.clearRect(0, 0, w, h);
    let newField = emptyFieldConstructor(fieldSize);
    
                   
                   
                   
                   
    for(let i = 0; i < field.length; i++) {
        for(let j = 0; j<field[i].length; j++) {
            
            neighbourCount = FindNeighboursCount(field, i, j)
            if(field[i][j] == 0) {
                if(neighbourCount == 3) newField[i][j] = 1;
            }
            if(field[i][j] == 1) {
                if (neighbourCount == 2 | neighbourCount == 3) {
                    newField[i][j] = 1;
                } 
                else {
                    newField[i][j] = 0;
                }
            }
            // console.log(newField)
        }
    }
    field = newField
    Render()
}


interval = setInterval(Update, 300)










