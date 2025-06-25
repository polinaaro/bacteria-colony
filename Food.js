export default function Food(x, y, ctx) {
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