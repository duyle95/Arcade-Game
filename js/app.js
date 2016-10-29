//some of the codes below have sources from Udacity Forum, Stack Overflow
//WRITE A SUPERCLASS FOR ENEMY AND PLAYER
var scores;

var speed = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed(100, 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 800) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.x = 202;
    this.y = 394;
    this.sprite = 'images/char-horn-girl.png';
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    var self = this;
    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - self.x) < 60 && Math.abs(enemy.y - self.y) < 50) {
            self.reset();
            if ($('.hearts li').length !== 0) {
                $('.hearts li').first().remove();
            } else if ($('.hearts li').length === 0) {
                alert("You got " + parseInt($('#points').text()) + " points!!");
                $('#points').text(0);
                $('.hearts').append("<li><img src='images/Heart.png' alt='heart' id='heart1'></li><li><img src='images/Heart.png' alt='heart' id='heart1'></li><li><img src='images/Heart.png' alt='heart' id='heart1'></li>");
            }
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    //press left
    if (direction === 'left' && this.x !== borders.left) {
        this.x -= 101;
    }
    //press right
    if (direction === 'right' && this.x !== borders.right) {
        this.x += 101;
    }
    //press down
    if (direction === 'down' && this.y !== borders.bottom) {
        this.y += 83;
    }
    //press up
    if (direction === 'up' && this.y > 100) {
        this.y -= 83;
    } else if (direction === 'up' && this.y <= 100) {
        this.reset();
        scores = parseInt($('#points').text()) + 100;
        $('#points').text(scores);
    }
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 394;
};
// Now instantiate your objects.
var borders = {
    left: 0,
    right: 404,
    up: 50,
    bottom: 394
};
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-101, 55);
var enemy2 = new Enemy(404, 140);
var enemy3 = new Enemy(-202, 225);
var enemy4 = new Enemy(404, 140);
var enemy5 = new Enemy(-202, 55);
var enemy6 = new Enemy(101, 225);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
//allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

// Place the player object in a variable called player
var player = new Player();

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
