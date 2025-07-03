import Bacteria from './Bacteria.js'
import Enemy from './Enemy.js'
import Food from './Food.js'
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let foodnum = document.getElementById("foodnum")
let foodamount = {
    number: 50
}
let restart = document.getElementById("restart")
let gameover = document.getElementById("gameover")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let bacterias = []
let foods = []
let enemies = []

foodnum.innerHTML = "food amount:" + foodamount.number

canvas.onclick = function (event) {
    if (foodamount.number > 0) {
        foods.push(new Food(event.clientX, event.clientY, ctx))
        foodamount.number = foodamount.number - 1
        foodnum.innerHTML = "food amount: " + foodamount.number
    }
    else {
        foodnum.innerHTML = "no more food"
    }
}


restart.onclick = function (event) {
    gameover.style.opacity = 0
    gameover.style.pointerEvents = "none"
    for (let i = 0; i < 5; i++) {
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height, ctx, bacterias, foods))
}

    
}

for (let i = 0; i < 5; i++) {
    bacterias.push(new Bacteria(Math.random() * canvas.width, Math.random() * canvas.height, ctx, bacterias, foods))
}

for (let i = 0; i < 10; i++) {
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
    if (Math.random() < 0.000001){
             enemies.push(new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, enemies, bacterias, foodamount, foodnum, ctx))

    }
    foods.forEach(food => food.draw())
    requestAnimationFrame(animate)
    if (bacterias.length == 0){
         gameover.style.opacity = 1
        gameover.style.pointerEvents = "auto"
      }
      else{
        gameover.style.opacity = 0
        gameover.style.pointerEvents = "none"
      }
}


animate()



