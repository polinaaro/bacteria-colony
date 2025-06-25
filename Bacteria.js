export default function Bacteria(x, y, ctx, bacterias, foods) {
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
            bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height, ctx, bacterias, foods))
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