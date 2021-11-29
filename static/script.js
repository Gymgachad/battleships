var cPlayer1 = document.querySelector(".player1");
var cPlayer2 = document.querySelector(".player2");
var ships = document.querySelector(".ships");
var shipSelected = false;
var shipSelectedSize = 0;
var shipCor = 0;
function createcanvas(player){
    for(let i = 0;i < 100;i++){
        player.appendChild(document.createElement("div"));
    }
}

function ship(size){
    let ship1 = document.createElement("div");
    ship1.classList.add("ship");
    for(let i = 0;i < size;i++){
        ship1.appendChild(document.createElement("div"));
    }
    ships.appendChild(ship1);
}
function addships(){
    ship(5);
    ship(4);
    ship(3);
    ship(2);
    ship(1);
}
addships();
createcanvas(cPlayer1);
createcanvas(cPlayer2);

//select tiles
var yMap = document.querySelectorAll(".player1 div");
var eMap = document.querySelectorAll(".player2 div");
var chooseShip = document.querySelectorAll(".ship");

var shipMap = [];
var shipPoz = [];

var shipSizePlacement = {

}
shipMap.fill(0,0);

chooseShip = Array.from(chooseShip);
yMap = Array.from(yMap);
eMap = Array.from(eMap);

var previPlaceDir = [];

function checked(){
    var dir = document.querySelector('input[type=checkbox]');
    return dir.checked;
}
// clear board
function clearboard(){
    for(let i = 0;i < 100;i++){
        if(shipMap[i] != 1) {
            yMap[i].style.backgroundColor = "#3E39A0";
        }
        else if(shipMap[i] == 1){
            yMap[i].style.backgroundColor = "red";
        }
    }
}
document.querySelector("input[type=checkbox]").addEventListener("change",clearboard);
function placeship(e,index){
    console.log(previPlaceDir[0]);
    let inc = 1;
    if(checked()) inc = 10;
    shipCor = index;
    let check = true;
    for(let k = 0;k < shipSelectedSize * inc;k += inc){
        if(shipMap[index + k] == 1){
            check = false;
            break;
        }
    }   
    // bound for X
    if(!checked()){
        if(Math.floor(shipCor/ 10) != Math.floor((shipCor+shipSelectedSize - 1) / 10)){
            check = false;
        }
    }
    else{
        if(shipCor+((shipSelectedSize - 1)*10) >= 100){
            check = false;
        }
    }
        if(check){
            // remove ship
            if(previPlaceDir[0] != null) {
                for(let i = 0;i < shipSelectedSize * inc;i += inc){
                    if(yMap[previPlaceDir[0] + i] != null){
                        
                        yMap[previPlaceDir[0] + i].style.backgroundColor  = "#3E39A0";
                    } 
                }
            }
            // draw ship
            if(shipSelected){
                previPlaceDir[0] = index;
                inc = 1;
                if(checked()) inc = 10;
                for(let i = 0;i < shipSelectedSize * inc;i += inc){
                    if(yMap[shipCor + i] != null) yMap[shipCor + i].style.backgroundColor  = "red";
                }
            }
        }
    e.target.addEventListener("click",(e) => {
        inc = 1;
        if(checked()) inc = 10;
        previPlaceDir[0] = null;
        shipSelected = false;
        shipPoz[shipSelectedSize] = [shipCor,0,checked()];
        for(let i = 0;i < shipSelectedSize * inc;i += inc){
            shipMap[shipCor + i] = 1;
            yMap[shipCor + i].removeEventListener("mouseover",placeship);
        }
        shipSelectedSize = 0;
        shipCor = 0;
    })
}
yMap.forEach((tile,index) => { tile.addEventListener("mouseover",(e) => placeship(e,index))});
// choose ship from collection
chooseShip.forEach((newship,index) => {newship.addEventListener("click",() => {
    shipSelected = true;
    shipSelectedSize = 5 - index;

    if(shipPoz[shipSelectedSize] != undefined){
        let inc = 1;
        if(shipPoz[shipSelectedSize][2])inc = 10;
        for(let i = 0;i < shipSelectedSize * inc;i += inc){
            yMap[shipPoz[shipSelectedSize][0] + i].style.backgroundColor = "#3E39A0";
            shipMap[shipPoz[shipSelectedSize][0] + i] = 0;
        }
    }
    clearboard();
    
})})