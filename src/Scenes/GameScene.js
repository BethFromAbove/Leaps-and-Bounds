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
var speed = 0;
var SpeedText;
var AccelerationTimer;
var spaceHeldDuration;
var deltaT = 0;
var liftOff = false;
var comeHome = false;
var SpaceKey;

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


        SpaceKey.on('down', function(event) {
            spaceHeldDuration = 0;
            liftOff = true;});
        SpaceKey.on('up', function(event) {
            deltaT = spaceHeldDuration;
            comeHome = true;});
        //this.add.image(400, 300, 'logo');

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();


        this.text = this.add.text(300, 100, 'Twin Paradox', { fontSize: 40 });
        this.gameButton = new Button(this, config.width/2, config.height - 100, 'blueButton1', 'blueButton2', 'Button example');

        ShipTimeText = this.add.text(16, 16, 'Ship Time: 0', { fontSize: '32px', fill: '#FFF' });

        EarthTimeText = this.add.text(16, 50, 'Earth Time: 0', { fontSize: '32px', fill: '#FFF' });

        //TimeText = this.add.text(16, 100, 'Time: 0', { fontSize: '32px', fill: '#FFF' });

        SpeedText = this.add.text(16, 150, 'Speed: 0', { fontSize: '32px', fill: '#FFF' });



        RocketTimer = this.time.addEvent({ delay: 1000, callback: updateCounter, callbackScope: this, loop: true });
        AccelerationTimer = this.time.addEvent({ delay: 1000, callback: accelerationTime, callbackScope: this, loop: true });



    }
};

function updateCounter() {

    counter++;

    //TimeText.setText('Time: ' + counter);


    if (liftOff == true & comeHome == false)
    {
        //EarthTime = (c*Math.sinh((spaceHeldDuration*a)/c)/a);

        EarthTimeText.setText('Earth Time: ' + earthTimeCalculation(a).toFixed(2));

        speed = (a*counter)/(Math.sqrt(1+(a*counter/c)^2));
    }

    if (comeHome == true & spaceHeldDuration<(deltaT*3))
    {
        //EarthTime = (c*Math.sinh((spaceHeldDuration*reverseA)/c)/reverseA);
        EarthTimeText.setText('Earth Time: ' + earthTimeCalculation(reverseA).toFixed(2));
        speed = (reverseA*counter)/(Math.sqrt(1+(reverseA*counter/c)^2));
    }

    if (spaceHeldDuration>deltaT*3)
    {
        //EarthTime = (c*Math.sinh((spaceHeldDuration*a)/c)/a);
        EarthTimeText.setText('Earth Time: ' + earthTimeCalculation(a).toFixed(2));
        speed = (a*counter)/(Math.sqrt(1+(a*counter/c)^2));
    }

    ShipTimeText.setText('Ship Time: ' + counter);

    SpeedText.setText('Speed: ' + speed);

    // @TODO: make into one function that takes a direction of acceleration or just acceleration
    
}

function earthTimeCalculation(a)
{
    EarthTime = (c*Math.sinh((spaceHeldDuration*a)/c)/a);
    return EarthTime;
}

function accelerationTime() {

    spaceHeldDuration++;

}
