
// Actor()
// Base constructor for moveable, animateable, collideable objects
// in a scene.

export default function Actor() {
    this.mass     = 0;
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
}

Object.assign(Actor.prototype, {
    contains: function(point) {
        return point.x === this.position.x
            && point.y === this.position.y;
    },

    update: function(time) {
        const duration = time - this.time;
        this.position.x = this.position.x + this.velocity.x * duration;
        this.position.y = this.position.y + this.velocity.y * duration;
        this.time = time;
        return this;
    },

    // Legacy to support original non-time-dependent animation update
    // move() method
    move: function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
});
