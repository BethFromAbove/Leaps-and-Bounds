import 'phaser';
import Button from '../Objects/Button';

var cursors;
var shipTimeText;
var earthTimeText;
var speedText;
var targetTimeText;
var earthTime = 0;
var speed = 0;
var hasLaunched = false;
var previousTime;
var startTime;
var targetTime = 50;
var slider;

var moneyText;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {

        var config = this.game.config;

        previousTime = Date.now();

        cursors = this.input.keyboard.createCursorKeys();

        this.text = this.add.text(300, 100, 'Twin Paradox', { fontSize: 40 });

        this.gameButton = new Button(this, 50, 500, 'slider', 'slider', 'Menu', 'Title');

        shipTimeText = this.add.text(16, 16, 'Ship  Time: 0', { fontSize: '32px', fill: '#FFF' });
        earthTimeText = this.add.text(16, 50, 'Earth Time: 0', { fontSize: '32px', fill: '#FFF' });
        speedText = this.add.text(16, 150, 'Speed: 0', { fontSize: '32px', fill: '#FFF' });
        targetTimeText = this.add.text(400, 50, 'Target Time: 50', { fontSize: '32px', fill: '#FFF' });

        moneyText = this.add.text(400, 200, 'Money = 0', { fontSize: '32px', fill: '#FFF' });


    this.add.image(400, 300, 'sliderBG');

    slider = this.add.image(400, 200, 'slider');

    slider.setInteractive();

    this.input.setDraggable(slider);

    slider.on('pointerover', function () {

        slider.setTint(0x44ff44);

    });

    slider.on('pointerout', function () {

        slider.clearTint();

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        //gameObject.x = dragX;
        if (dragY < 400 && dragY > 200)
        {
            gameObject.y = dragY;
        }

    });


    //  The manager also controls which particle texture is used by _all_ emitter
    // var particles = this.add.particles('bluedot');

    // var emitter = particles.createEmitter();

    // emitter.setPosition(400, 300);
    // emitter.setSpeed(200);
    // emitter.setBlendMode(Phaser.BlendModes.ADD);

    // var emitter = particles.createEmitter({
    //     x: 400,
    //     y: 300,
    //     angle: { min: 0, max: 180 },
    //     speed: 200,
    //     gravityY: 350,
    //     lifespan: 4000,
    //     quantity: 6,
    //     scale: { start: 0.1, end: 1 },
    //     blendMode: 'ADD'
    // });

    // var emitter2 = particles.createEmitter({
    //     x: 400,
    //     y: 300,
    //     angle: { min: 180, max: 360 },
    //     speed: 200,
    //     gravityY: 350,
    //     lifespan: 4000,
    //     quantity: 6,
    //     scale: { start: 0.1, end: 1 },
    //     blendMode: 'ADD'
    // });

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
            slider.y --;

        }
        else if (cursors.right.isDown && speed < 0.999)
        {
            speed += 0.001;
            slider.y ++;
        }

        speed = scale(slider.y, 200, 400, 0, 0.9)

        speedText.setText('Speed: ' + speed.toFixed(3));
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
                if (earthTime >= targetTime)
                {
                    speedText.setText('Good job!');
                }
                else
                {
                    speedText.setText('Not there yet');
                } 
                this.gameButton1 = new Button(this, config.width/2, config.height - 100, 'blueButton1', 'blueButton2', 'Go to Upgrades', 'Upgrades');
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
