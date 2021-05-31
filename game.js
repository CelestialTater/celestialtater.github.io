//VER: 0.1
var icon;
var p1X = Math.floor(Math.random() * 350 + 10);
var p1Y = Math.floor(Math.random() * 350 + 10);
var p2X = Math.floor(Math.random() * 350 + 10);
var p2Y = Math.floor(Math.random() * 350 + 10);
var p3X = Math.floor(Math.random() * 350 + 10);
var p3Y = Math.floor(Math.random() * 350 + 10);
var count = 0;
var time = 0;
var electronEnergy = 0
var photonCoords;
var canvasRef;

async function startGame(){
    await sleep(1000)
    //document.getElementById("introimg").src="http://celestialtater.github.io/electron.png";
    document.getElementById("introimg").style.display = "none"
    document.getElementById("start").style.display = "none"
    document.getElementById("energylv").innerHTML = "Energy Level: 0 eV"
    document.getElementById("intro").style.display = "none"
    myGameArea.start()
    // ---- ACTUAL URLS ----
    icon = new component("icon", 30, 30, "https://celestialtater.github.io/electron.png", 10, 190, "image");
    photon1 = new component("photon1", 30, 30, "https://celestialtater.github.io/photonwave.png", p1X, p1Y, "image", 3);
    photon2 = new component("photon2", 30, 30, "https://celestialtater.github.io/photonwave.png", p2X, p2Y, "image", 4);
    photon3 = new component("photon3", 30, 30, "https://celestialtater.github.io/photonwave.png", p3X, p3Y, "image", 5);
    
    // ---- TESTING URLS ----
    // icon = new component("icon", 30, 30, "http://127.0.0.1:5500/electron.png", 10, 190, "image");
    // photon1 = new component("photon1", 30, 30, "http://127.0.0.1:5500/photonwave.png", p1X, p1Y, "image", 3);
    // photon2 = new component("photon2", 30, 30, "http://127.0.0.1:5500/photonwave.png", p2X, p2Y, "image", 4);
    // photon3 = new component("photon3", 30, 30, "http://127.0.0.1:5500/photonwave.png", p3X, p3Y, "image", 5);
    photonCoords = [
        [p1X, p1Y, photon1],
        [p2X, p2Y, photon2],
        [p3X, p3Y, photon3]
    ]
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 400,
        this.canvas.height = 400,
        this.context = this.canvas.getContext("2d"),
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyleft', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyright', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

}
function component(id, width, height, color, x, y, type="default", energy=0){
    this.id = id;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.energy = energy;
    if(type == "image"){
        this.image = new Image();
        this.image.src = color;
        
    }
    this.update = function(){
        ctx = myGameArea.context;
        if(type == "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.font = "20px Arial"
            if(energy != 0) {
                ctx.fillText(energy, this.x + 10, this.y+20)
            }
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.delete = function(){
        this.x = 600
        this.y = 600
        this.width = 0
        this.height = 0
        this.energy = 0
    }
}

function updateGameArea(){
    myGameArea.clear();
    icon.speedX = 0;
    icon.speedY = 0;
    if(count % 7 == 0) {
        randomMove(photon1)
        randomMove(photon2)
        randomMove(photon3)
        
    }
    photon1.update()
    photon2.update()
    photon3.update()
    if (myGameArea.keys && myGameArea.keys[37] && icon.x > 10) {icon.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39] && icon.x < 360) {icon.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38] && icon.y > 10) {icon.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40] && icon.y < 360) {icon.speedY = 2; }
    icon.newPos();
    icon.update();
    for(var c of photonCoords) {
        if(icon.x - c[0] < 10 && icon.x - c[0] > -10 && icon.y - c[1] < 10 && icon.y - c[1] > -10) {
            electronEnergy += c[2].energy
             c[2].delete()
             c[2].update()
             photonCoords.splice(photonCoords.indexOf(c), 1)
             document.getElementById("energylv").innerHTML = "Energy Level: " + electronEnergy + " eV"
             console.log(electronEnergy)
        }
    }
    document.getElementById("time").innerHTML = "Time: " + time + "ms"
    count++
    time += 20
    
    if(time > 1000) {
        //myGameArea.canvas.remove();
    }
    
}

function moveUp(obj){
    obj.speedY--;
}
function moveDown(obj){
    obj.speedY++;
}
function moveLeft(obj){
    obj.speedX--;
}
function moveRight(obj){
    obj.speedX++;
}
function clearmove(obj){
    obj.speedX = 0; 
    obj.speedY = 0; 
}
function randomMove(obj) {
    var loc;
    var hit = false;
    var valid = true;
    xdist = Math.floor(Math.random() * 21 - 10)
    ydist = Math.floor(Math.random() * 21 - 10)
    console.log(obj.id)
    for(var b = 0; b < photonCoords.length; b++) {
        if(obj.id == photonCoords[b][2].id){
            loc = b;
            hit = true;
        }
    }
    if(!hit) {
        valid = false;
    }
    if(valid) {
        for(t = 0; t < 5; t++){
            if(xdist >= 0) {
                if(obj.x < 350) {
                    obj.x += xdist/5
                    photonCoords[loc][0] = obj.x
                }
            }else{
                if(obj.x > 20) {
                    obj.x += xdist/5
                    photonCoords[loc][0] = obj.x
                }
            }
            if(ydist > 0) {
                if(obj.y < 350) {
                    obj.y += ydist/5
                    photonCoords[loc][1] = obj.y
                }
            }else{
                if(obj.y > 20) {
                    obj.y += ydist/5
                    photonCoords[loc][1] = obj.y
                }
            }
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
