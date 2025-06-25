import Bacteria from './Bacteria.js'
import Enemy from './Enemy.js'
import Food from './Food.js'
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let foodnum = document.getElementById("foodnum")
let foodamount = 50
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let bacterias = []
let foods = []
let enemies = []


foodnum.innerHTML = "food amount:" + foodamount

canvas.onclick = function (event) {
    if (foodamount > 0) {
        foods.push(new Food(event.clientX, event.clientY, ctx))
        foodamount = foodamount - 1
        foodnum.innerHTML = "food amount: " + foodamount
    }
    else {
        foodnum.innerHTML = "no more food"
    }
}




for (let i = 0; i < 5; i++) {
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height, ctx, bacterias, foods))
}

for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, enemies, bacterias, foodamount, foodnum, ctx))
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



