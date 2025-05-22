const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let bacterias = []
let foods = []


function Bacteria(x, y){
    this.x = x;
    this.y = y;
    this.colour = `#cd65af`;
    this.radius = 7;
    this.energy = 10;
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
        if (this.x < 0 || this.x > canvas.width){
            this.direction = Math.PI - this.direction
        }
        if (this.y < 0 || this.y > canvas.height){
            this.direction = -this.direction
        }
    }
    
    this.update = function(){
        this.move()
        this.consume()
        this.energy = this.energy - 0.1
    }

    this.consume = function(){
        for (let i = foods.length - 1; i >= 0; i--){
            let food = foods[i]
            let dx = this.x - food.x
            let dy = this.y - food.y
            let dist = Math.sqrt(dx**2 + dy**2)
            if (dist < this.radius + food.radius){
                this.energy += food.energy
                foods.splice(i, 1)


            }
        }
    }
}


function Food(x, y){
    this.x = x;
    this.y = y;
    this.colour = '#ffabe6';
    this.radius = 3;
    this.energy = 50
    this.draw = function(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.colour
        ctx.fill()
    }

}
 canvas.onclick = function(event){
    foods.push(new Food(event.clientX, event.clientY))
 }




for (let i = 0; i < 5; i++){
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height))

}

function animate(){
    ctx.fillStyle = 'rgb(249, 237, 255)'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    for (let i = bacterias.length-1; i >= 0; i--){
        let b = bacterias[i]
        b.draw()
        b.update()
        if (b.energy <= 0){
            bacterias.splice(i, 1)
        }
    }
    foods.forEach(food => food.draw())

    requestAnimationFrame(animate)
}


animate()