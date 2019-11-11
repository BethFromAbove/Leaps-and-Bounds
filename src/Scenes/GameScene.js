import 'phaser';
import Button from '../Objects/Button';

var cursors;
var shipTimeText;
var earthTimeText;
var speedText;
var speedDigitsText;
var targetTimeText;
var earthTime = 0;
var speed = 0;
var hasLaunched = false;
var previousTime;
var startTime;
var targetTime = 50;
var starSpeed;
var emitter;
var pointer;

var faster;
var slower;
var fasterIsHeld = false;
var slowerIsHeld = false;

var moneyText;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {

        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        var particles = this.add.particles('bluedot');

        emitter = particles.createEmitter({
            x: 400,
            y: 150,
            angle: { min: 0, max: 360 },
            speed: 0,
            gravityY: 0,
            lifespan: 4000,
            quantity: 6,
            scale: { start: 0.1, end: 1 },
            blendMode: 'ADD'
        });

        this.add.image(config.width/2, config.height/2, 'background');
        pointer = this.add.image(config.width/2, config.height/2 + 40, 'pointer');


        previousTime = Date.now();

        cursors = this.input.keyboard.createCursorKeys();

        //this.text = this.add.text(300, 100, 'Twin Paradox', { fontSize: 40 });

        this.gameButton = new Button(this, config.width*0.25, config.height-50, 'blueButton1', 'blueButton2', 'Menu', 'Title');

        shipTimeText = this.add.text(config.width*0.1, config.height*0.7, 'Ship Time: 0', { fontSize: '20px', fill: '#000' });
        earthTimeText = this.add.text(config.width*0.7, config.height*0.7, 'Earth Time: 0', { fontSize: '20px', fill: '#000' });
        speedText = this.add.text(config.width*0.45, config.height*0.6, 'Speed', { fontSize: '20px', fill: '#FFF' });
        speedDigitsText = this.add.text(config.width*0.45, config.height*0.5, '0', { fontSize: '32px', fill: '#FFF' });
        targetTimeText = this.add.text(config.width*0.7, config.height*0.6, 'Target Time: 50', { fontSize: '20px', fill: '#000' });

        moneyText = this.add.text(400, 600, 'Money = 0', { fontSize: '32px', fill: '#000' });

        this.gameButton1 = new Button(this, config.width*0.75, config.height - 50, 'blueButton1', 'blueButton2', 'Upgrades', 'Upgrades');

        slower = this.add.image(config.width*0.44, config.height*0.73, 'box');
        faster = this.add.image(config.width*0.56, config.height*0.73, 'box');

        faster.setInteractive();
        slower.setInteractive();

        if (this.model.level == 0)
        {
            //this.add.image(400, 300, 'sliderBG');

        }
        else if (this.model.level == 1)
        {
            // this.add.image(400, 300, 'sliderBG');
            // this.add.image(600, 300, 'sliderBG');
        }

        faster.on('pointerdown', function () {
            fasterIsHeld = true;
        }.bind(this));
        faster.on('pointerup', function() {
            fasterIsHeld = false;
        }.bind(this));

        faster.on('pointerover', function () {
            faster.setTexture('checkedBox');
        }.bind(this));

        faster.on('pointerout', function () {
            faster.setTexture('box');
        }.bind(this));

        slower.on('pointerdown', function () {
            slowerIsHeld = true;
        }.bind(this));
        slower.on('pointerup', function() {
            slowerIsHeld = false;
        }.bind(this));

        slower.on('pointerover', function () {
            slower.setTexture('checkedBox');
        }.bind(this));

        slower.on('pointerout', function () {
            slower.setTexture('box');
        }.bind(this));

    }

    update () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;


        if (!hasLaunched && speed > 0)
        {
            startTime = Date.now();
            hasLaunched = true;
        }

        if (cursors.left.isDown && speed > 0)
        {
            speed -= 0.001;

        }
        else if (cursors.right.isDown && speed < 0.999)
        {
            speed += 0.001;
        }

        if (fasterIsHeld && speed < 0.999)
        {
            speed += 0.001;
        }
        if (slowerIsHeld && speed > 0)
        {
            speed -= 0.001;
        }


        starSpeed = speed*500;
        emitter.setSpeed(starSpeed);

        pointer.angle = speed*240;

        var speedPercent = speed*100;

        speedDigitsText.setText(speedPercent.toFixed(1) + '%');
        targetTimeText.setText('Target Time: ' + targetTime);

        moneyText.setText('Money = ' + this.model.money);


        //check current time and compare to last logged time
        var currentTime = Date.now();
        var deltaT = (currentTime - previousTime)/1000;

        //reset last logged time
        previousTime = currentTime;


        // Only update time once user changes speed
        if (hasLaunched)
        {
            shipTimeText.setText('Ship  Time: ' + ((currentTime-startTime)/1000).toFixed(3));
            earthTime += earthTimeCalculation(speed, deltaT);
            earthTimeText.setText('Earth Time: ' + earthTime.toFixed(3));

            if (speed <= 0)
            {
                if (Math.abs(earthTime-targetTime)<=10)
                {
                    speedText.setText('Good job!');
                    console.log('less than ten');
                    this.model.money += 50;
                }
                else
                {
                    speedText.setText('Not there yet');
                    this.model.money += 5;
                } 
                earthTime = 0;
                previousTime = 0;
                startTime = 0;
                hasLaunched = false;
            }
        }
    }
};

function earthTimeCalculation(speed, deltaT)
{
    //where speed is in terms of c, eg. 0.9c
    return deltaT/(Math.sqrt(1-(speed**2)));
}

function scale (num, in_min, in_max, out_min, out_max)
{
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
