const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight


function Bacteria(x, y){
    this.x = x;
    this.y = y;
    this.colour = `rgb(${Math.random()*50+200}, 150, 150)`;
    this.radius = 5;
    this.energy = 100;
    this.speed = Math.random()+0.5
    this.direction = Math.random()*Math.PI*2
    this.draw = function(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.colour
        ctx.fill()
    }
}

let b = new Bacteria(100, 200)
b.draw()