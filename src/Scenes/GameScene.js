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

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    create () {

        var config = this.game.config;

        previousTime = Date.now();

        cursors = this.input.keyboard.createCursorKeys();

        this.text = this.add.text(300, 100, 'Twin Paradox', { fontSize: 40 });

        //this.gameButton = new Button(this, config.width/2, config.height - 100, 'blueButton1', 'blueButton2', 'Button example', 'Credits');

        shipTimeText = this.add.text(16, 16, 'Ship  Time: 0', { fontSize: '32px', fill: '#FFF' });
        earthTimeText = this.add.text(16, 50, 'Earth Time: 0', { fontSize: '32px', fill: '#FFF' });
        speedText = this.add.text(16, 150, 'Speed: 0', { fontSize: '32px', fill: '#FFF' });
        targetTimeText = this.add.text(400, 50, 'Target Time: 50', { fontSize: '32px', fill: '#FFF' });
    }

    update () {
        var config = this.game.config;

        if (cursors.left.isDown && speed > 0)
        {
            speed -= 0.001;

        }
        else if (cursors.right.isDown && speed < 0.999)
        {
            speed += 0.001;
            if (!hasLaunched)
            {
                startTime = Date.now();
                hasLaunched = true;
            }
        }

        speedText.setText('Speed: ' + speed.toFixed(3));
        targetTimeText.setText('Target Time: ' + targetTime);


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
                this.gameButton = new Button(this, config.width/2, config.height - 100, 'blueButton1', 'blueButton2', 'Button example', 'Credits');
            }
        }
    }
};

function earthTimeCalculation(speed, deltaT)
{
    //where speed is in terms of c, eg. 0.9c
    return deltaT/(Math.sqrt(1-(speed**2)));
}