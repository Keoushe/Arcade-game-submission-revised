// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y + 55;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPos = this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > ctx.canvas.width) {
    this.x = -200

  } else {
    this.x += 200 * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
    this.height = 75;
    this.width = 65
  }
  update() {
    //did enemey touch
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
        this.reset();
      }
    }
    // did we win
    //x and y destination reached
    if (this.y < 40) {
      this.victory = true;
    }

  }

  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  /** x and y will will interact  depending on arrow keys pressed
   @param {string} input -where to go
   */
  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > -100) {
          this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
}

const player = new Hero();
const bug1 = new Enemy(-110, 0, 200);
const bug2 = new Enemy(-55, 83, 300);
const bug3 = new Enemy((-125 * 2.5), 83, 300);
const allEnemies = [bug1, bug2, bug3];




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
