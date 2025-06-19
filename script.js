const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let foodnum = document.getElementById("foodnum")
let foodamount = 75
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let bacterias = []
let foods = []
let enemies = []


foodnum.innerHTML = "food amount:" + foodamount

function Bacteria(x, y) {
    this.x = x;
    this.y = y;
    this.colour = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    this.radius = 7;
    this.energy = Math.random() * 100 + 100;
    this.speed = Math.random() + 0.5
    this.direction = Math.random() * Math.PI * 2
    this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour
        ctx.fill()
    }
    this.divide = function () {
        if (this.energy >= 1000) {
            bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height))
            this.energy = 100
        }
    }

    this.move = function () {
        let closestfood = null
        let mindist = Infinity
        foods.forEach((food) => {
            const dx = this.x - food.x
            const dy = this.y - food.y
            const dist = Math.sqrt(dx ** 2 + dy ** 2)
            if (dist < mindist) {
                mindist = dist
                closestfood = food
            }
        })
        if (closestfood && mindist < 150) {
            const angle = Math.atan2(
                closestfood.y - this.y,
                closestfood.x - this.x
            );
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }
        else {
            this.x += Math.cos(this.direction) * this.speed;
            this.y += Math.sin(this.direction) * this.speed;
            if (Math.random() < 0.02) {
                this.direction = Math.random() * Math.PI * 2
            }
        }
        if (this.x < 0 || this.x > canvas.width) {
            this.direction = Math.PI - this.direction
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.direction = -this.direction
        }
    }

    this.update = function () {
        this.move()
        this.consume()
        this.divide()
        this.energy = this.energy - 0.075
        this.radius = Math.max(5, Math.min(this.radius * this.energy / 150, 20))

    }

    this.consume = function () {
        for (let i = foods.length - 1; i >= 0; i--) {
            let food = foods[i]
            let dx = this.x - food.x
            let dy = this.y - food.y
            let dist = Math.sqrt(dx ** 2 + dy ** 2)
            if (dist < this.radius + food.radius) {
                this.energy += food.energy
                foods.splice(i, 1)
            }
        }
    }
}

function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.colour = '#ff4751';
    this.points = 15;
    this.energy = 150;
    this.radius = 10;
    this.speed = Math.random() + 0.5
    this.direction = Math.random() * Math.PI * 2

    this.draw = function () {
        drawStar(this.x, this.y, this.points, this.radius*2, this.radius, this.colour)
        
    }
    this.move = function () {
        let closestbacteria = null
        let mindist = Infinity
        bacterias.forEach((bacteria) => {
            const dx = this.x - bacteria.x
            const dy = this.y - bacteria.y
            const dist = Math.sqrt(dx ** 2 + dy ** 2)
            if (dist < mindist) {
                mindist = dist
                closestbacteria = bacteria
            }
        })
        if (closestbacteria && mindist < 150) {
            const angle = Math.atan2(
                closestbacteria.y - this.y,
                closestbacteria.x - this.x
            );
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }
        else {
            this.x += Math.cos(this.direction) * this.speed;
            this.y += Math.sin(this.direction) * this.speed;
            if (Math.random() < 0.02) {
                this.direction = Math.random() * Math.PI * 2
            }
        }
        if (this.x < 0 || this.x > canvas.width) {
            this.direction = Math.PI - this.direction
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.direction = -this.direction
        }


    }
    this.update = function () {
        this.move()
        this.consume()
    }
    this.consume = function () {
        for (let i = bacterias.length - 1; i >= 0; i--) {
            let bacteria = bacterias[i]
            let dx = this.x - bacteria.x
            let dy = this.y - bacteria.y
            let dist = Math.sqrt(dx ** 2 + dy ** 2)
            if (dist < this.radius + bacteria.radius) {
                bacterias.splice(i, 1)
            }
        }
    }
}




function Food(x, y) {
    this.x = x;
    this.y = y;
    this.colour = '#ffabe6';
    this.radius = 3;
    this.energy = 50
    this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour
        ctx.fill()
    }

}
canvas.onclick = function (event) {
    foods.push(new Food(event.clientX, event.clientY))
    foodamount = foodamount - 1
    foodnum.innerHTML = "food amount:" + foodamount
}




for (let i = 0; i < 5; i++) {
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height))
}

for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(Math.random() * canvas.width, Math.random() * canvas.height))
}
function drawStar(x, y, points, outerRadius, innerRadius, color) {
    let angle = Math.PI / points;
    

    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 2 * points; i++) {
        let radius = i % 2 === 0 ? outerRadius : innerRadius;
        let xPos = x + Math.cos(i * angle) * radius;
        let yPos = y + Math.sin(i * angle) * radius;
        ctx.lineTo(xPos, yPos);
    }
    ctx.closePath();
    ctx.fill();
}

function animate() {
    ctx.fillStyle = 'rgb(249, 237, 255)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = bacterias.length - 1; i >= 0; i--) {
        let b = bacterias[i]
        b.draw()
        b.update()
        if (b.energy <= 0) {
            bacterias.splice(i, 1)
        }
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i]
        e.draw()
        e.update()
    }
    foods.forEach(food => food.draw())
    requestAnimationFrame(animate)
}


animate()
console.log(e);



