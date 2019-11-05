import 'phaser';
import Button from '../Objects/Button';

var cursors;
var ShipTime = 0;
var ShipTimeText;
var a = 0.6;
var reverseA = -0.6;
var c = 1;
var EarthTime = 0;
var EarthTimeText = 0;
var Time = 0;
var TimeText;
var counter = 0;
var RocketTimer;
var deltaVTimer;
var speed = 0;
var SpeedText;
var AccelerationTimer;
var spaceHeldDuration;
var hasLaunched = false;
var comeHome = false;
var SpaceKey;
var v = 0;
var previousTime;
var startTime;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        // load images
        //this.load.image('logo', 'assets/logo.png');
    }

    create () {

        var config = this.game.config;
        SpaceKey = this.input.keyboard.addKey('SPACE');  // Get key object

        previousTime = Date.now();

        // SpaceKey.on('down', function(event) {
        //     //deltaT = 0;
        //     liftOff = true;});
        // SpaceKey.on('up', function(event) {
        //     //deltaT = spaceHeldDuration;
        //     comeHome = true;});
        // //this.add.image(400, 300, 'logo');

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();


        this.text = this.add.text(300, 100, 'Twin Paradox', { fontSize: 40 });
        this.gameButton = new Button(this, config.width/2, config.height - 100, 'blueButton1', 'blueButton2', 'Button example');

        ShipTimeText = this.add.text(16, 16, 'Ship  Time: 0', { fontSize: '32px', fill: '#FFF' });

        EarthTimeText = this.add.text(16, 50, 'Earth Time: 0', { fontSize: '32px', fill: '#FFF' });

        SpeedText = this.add.text(16, 150, 'Speed: 0.5', { fontSize: '32px', fill: '#FFF' });


    }

    update () {

        if (cursors.left.isDown && v > 0)
        {
            v -= 0.001;

        }
        else if (cursors.right.isDown && v < 0.999)
        {
            v += 0.001;
            if (!hasLaunched)
            {
                startTime = Date.now();
                hasLaunched = true;
            }
        }
        SpeedText.setText('Speed: ' + v.toFixed(3));

        //check current time
        //compare to previous time
        //set previous to current

        var currentTime = Date.now();
        var deltaT = (currentTime - previousTime)/1000;

        previousTime = currentTime;

        if (hasLaunched)
        {
            ShipTimeText.setText('Ship  Time: ' + ((currentTime-startTime)/1000).toFixed(3));
            EarthTime += earthTimeCalculation(v, deltaT);
            EarthTimeText.setText('Earth Time: ' + EarthTime.toFixed(3));

        }





        //call earthTimeCalculation using v and delta t
        // add result to earth time

    }
};


function earthTimeCalculation(v, deltaT)
{
    //where v is in terms of c, eg. 0.9c


    return deltaT/(Math.sqrt(1-(v**2)));

    //EarthTime = (c*Math.sinh((spaceHeldDuration*a)/c)/a);
    //return EarthTime;
}

