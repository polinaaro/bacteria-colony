export default function Enemy(x, y, enemies, bacterias, foodamount, foodnum, ctx) {
    this.x = x;
    this.y = y;
    this.colour = '#ff4751';
    this.points = 15;
    this.energy = 150;
    this.radius = 10;
    this.speed = Math.random() + 0.5
    this.direction = Math.random() * Math.PI * 2

    this.draw = function () {
        drawStar(this.x, this.y, this.points, this.radius * 2, this.radius, this.colour, ctx)

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
                if (bacteria.energy > this.energy) {
                    enemies.splice(enemies.indexOf(this), 1)
                    foodamount.number = foodamount.number + 35

                    foodnum.innerHTML = "food amount: " + foodamount.number
                }
                else {
                    bacterias.splice(i, 1)
                    for (let i = 0; i < 3; i++) {
                        enemies.push(new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, enemies, bacterias, foodamount, foodnum, ctx))
                    }

                }
            }
        }
    }
}
function drawStar(x, y, points, outerRadius, innerRadius, color, ctx) {
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