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

    this.move = function(){
        this.x += Math.cos(this.direction)*this.speed;
        this.y += Math.sin(this.direction)*this.speed;
    }

    this.update = function(){
        this.move()
    }
}


let bacterias = []


for (let i = 0; i < 5; i++){
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height))

}

function animate(){
    ctx.fillStyle = 'rgb(255, 230, 215)'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    for (let i = bacterias.length-1; i >= 0; i--){
        let b = bacterias[i]
        b.draw()
        b.update()
    }
    requestAnimationFrame(animate)
}

animate()