import 'phaser';
import Button from '../Objects/Button';

var shipTimeText;
var earthTimeText;
var speedText;
var speedDigitsText1;
var speedDigitsText2;
var speedDigitsText3;
var targetTimeText;
var earthTime = 0;
var speed = 0;
var hasLaunched = false;
var previousTime;
var startTime;
var targetTime;
var starSpeed;
var emitter;

var dial1;
var pointer1;
var dial2;
var pointer2;
var dial3;
var pointer3;


var faster;
var slower;
var fasterIsHeld = false;
var slowerIsHeld = false;
var menuButton;

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

        

        if (this.model.level == 0)
        {
            targetTime = 15;
            this.add.image(config.width/2, config.height/2, 'background');
            dial1 = this.add.image(config.width/2, config.height/2 + 40, 'dial');
            pointer1 = this.add.image(config.width/2, config.height/2 + 40, 'pointer');
            speedDigitsText1 = this.add.text(config.width*0.46, config.height*0.53, '0', { fontSize: '40px', fill: '#FFF' });

        }
        else if (this.model.level == 1)
        {
            targetTime = 25;
            this.add.image(config.width/2, config.height/2, 'background2');
            dial1 = this.add.image(config.width*0.35, config.height/2 + 40, 'dial');
            pointer1 = this.add.image(config.width*0.35, config.height/2 + 40, 'pointer');
            dial2 = this.add.image(config.width*0.65, config.height/2 + 40, 'dial');
            pointer2 = this.add.image(config.width*0.65, config.height/2 + 40, 'pointer');
            speedDigitsText1 = this.add.text(config.width*0.3, config.height*0.53, '0', { fontSize: '40px', fill: '#FFF' });
            speedDigitsText2 = this.add.text(config.width*0.59, config.height*0.54, '0', { fontSize: '40px', fill: '#FFF' });

        }
        else if (this.model.level == 2)
        {
            targetTime = 35;
            this.add.image(config.width/2, config.height/2, 'background3');
            dial1 = this.add.image(config.width/4, config.height/2 + 40, 'dial');
            pointer1 = this.add.image(config.width/4, config.height/2 + 40, 'pointer');
            dial2 = this.add.image(config.width/2, config.height/2 + 40, 'dial');
            pointer2 = this.add.image(config.width/2, config.height/2 + 40, 'pointer');
            dial3 = this.add.image(config.width*0.75, config.height/2 + 40, 'dial');
            pointer3 = this.add.image(config.width*0.75, config.height/2 + 40, 'pointer');
            speedDigitsText1 = this.add.text(config.width*0.2, config.height*0.53, '0', { fontSize: '40px', fill: '#FFF' });
            speedDigitsText2 = this.add.text(config.width*0.45, config.height*0.54, '0', { fontSize: '40px', fill: '#FFF' });
            speedDigitsText3 = this.add.text(config.width*0.7, config.height*0.54, '0', { fontSize: '40px', fill: '#FFF' });

        }


        previousTime = Date.now();


        menuButton = this.add.image(config.width*0.25, config.height-50, 'Button');
        menuButton.setInteractive();
        menuButton.on('pointerdown', function(){
            earthTime = 0;
            previousTime = 0;
            startTime = 0;
            hasLaunched = false;
            speed = 0;
            this.scene.start('Title');
        }.bind(this));
        menuButton.on('pointerover', function() {
            menuButton.setTexture('ButtonPressed');
        }.bind(this));
        menuButton.on('pointerout', function () {
            menuButton.setTexture('Button');
        }.bind(this));
        var MenuButtonText = this.add.text(config.width*0.2, config.height-70, 'Menu', { fontSize: '32px', fill: '#000' });

        speedText = this.add.text(config.width*0.07, config.height*0.7, 'Speed', { fontSize: '25px', fill: '#FFF', backgroundColor: '#444' });
        var speedTextcont = this.add.text(config.width*0.1, config.height*0.74, 'speed of light', { fontSize: '25px', fill: '#FFF', backgroundColor: '#444' });

        shipTimeText = this.add.text(config.width*0.65, config.height*0.8, 'Ship Time: 0', { fontSize: '25px', fill: '#FFF', backgroundColor: '#444' });
        earthTimeText = this.add.text(config.width*0.65, config.height*0.9, 'Earth Time: 0', { fontSize: '25px', fill: '#FFF' , backgroundColor: '#444'});
        targetTimeText = this.add.text(config.width*0.65, config.height*0.7, 'Target Time: ' + targetTime, { fontSize: '25px', fill: '#FFF', backgroundColor: '#444' });

        slower = this.add.image(config.width*0.45, config.height*0.75, 'downArrow');
        faster = this.add.image(config.width*0.55, config.height*0.75, 'upArrow');

        this.add.text(config.width*0.51, config.height*0.8, 'Faster',{ fontSize: '20px', fill: '#000'} ) ;
        this.add.text(config.width*0.4, config.height*0.8, 'Slower',{ fontSize: '20px', fill: '#000'} ) ;

        faster.setInteractive();
        slower.setInteractive();


        faster.on('pointerdown', function () {
            fasterIsHeld = true;
        }.bind(this));
        faster.on('pointerup', function() {
            fasterIsHeld = false;
        }.bind(this));

        faster.on('pointerover', function () {
            faster.setTexture('upArrowPressed');
        }.bind(this));

        faster.on('pointerout', function () {
            faster.setTexture('upArrow');
        }.bind(this));

        slower.on('pointerdown', function () {
            slowerIsHeld = true;
        }.bind(this));
        slower.on('pointerup', function() {
            slowerIsHeld = false;
        }.bind(this));

        slower.on('pointerover', function () {
            slower.setTexture('downArrowPressed');
        }.bind(this));

        slower.on('pointerout', function () {
            slower.setTexture('downArrow');
        }.bind(this));

        var cursorLeft = this.input.keyboard.addKey('DOWN');  // Get key object
        cursorLeft.on('down', function(event) { slowerIsHeld = true;});
        cursorLeft.on('up', function(event) { slowerIsHeld = false; });

        var cursorRight = this.input.keyboard.addKey('UP');  // Get key object
        cursorRight.on('down', function(event) { fasterIsHeld = true;});
        cursorRight.on('up', function(event) { fasterIsHeld = false; });

    }

    update () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;


        if (!hasLaunched && speed > 0)
        {
            startTime = Date.now();
            hasLaunched = true;
        }

        var increment0 = 0.01;
        var increment1 = 0.0001;
        var increment2 = 0.000001;

        if (fasterIsHeld && (speed < 0.99))
        {
            speed += increment0;
        }
        else if (fasterIsHeld && (this.model.level > 0) && (speed >= 0.99) && (speed < 0.9999))
        {
            speed += increment1;
        }
        else if (fasterIsHeld && (this.model.level > 1) && (speed >= 0.9999) && (speed < 0.999999))
        {
            speed += increment2;
        }


        if (slowerIsHeld && speed > 0 && speed <= 0.99)
        {
            speed -= increment0;
        }
        else if (slowerIsHeld && (this.model.level > 0) && (speed > 0.99) && (speed <= 0.9999))
        {
            speed -= increment1;
        }
        else if (slowerIsHeld && (this.model.level > 1) && (speed > 0.9999))
        {
            speed -= increment2;
        }

        speed = parseFloat(speed.toFixed(6));

        starSpeed = speed*500;
        emitter.setSpeed(starSpeed);

        //change th position of the dial pointers
        if (this.model.level == 0)
        {
            pointer1.angle = speed*240;
        }
        else if (this.model.level == 1)
        {
            pointer1.angle = speed*240;

            if (speed > 0.99)
            {
                pointer2.angle = (speed - 0.99)*100*240;  
            }
        }
        else if (this.model.level == 2)
        {
            pointer1.angle = speed*240;
            
            if ((speed > 0.99) && (speed < 0.9999))
            {
                pointer2.angle = (speed - 0.99)*100*240;  
            }
            if (speed > 0.9999)
            {
                pointer3.angle = (speed - 0.9999)*10000*240;
            }
        }


        var speedPercent = speed*100;

        //var displaySpeed = Math.min(speedPercent.toFixed(0), 99);
        if (this.model.level == 0)
        {
            speedDigitsText1.setText(Math.min(speedPercent.toFixed(0), 99));
        }
        else if (this.model.level == 1)
        {
            speedDigitsText1.setText(Math.min(speedPercent.toFixed(0), 99));
            if (speedPercent > 99)
            {
                speedDigitsText1.setColor('#ffff00');
                speedDigitsText2.setColor('#ffffff');
                var str = speedPercent.toFixed(2);
                speedDigitsText2.setText(str.substring(str.length - 2, str.length));
            }
            else
            {
                speedDigitsText1.setColor('#ffffff');
                speedDigitsText2.setText("00");
                speedDigitsText2.setColor('#ffff00');
            }

        }
        else if (this.model.level == 2)
        {
            speedDigitsText1.setText(Math.min(speedPercent.toFixed(0), 99));
            if (speedPercent > 99 && speedPercent < 99.99)
            {
                speedDigitsText1.setColor('#ffff00');
                speedDigitsText2.setColor('#ffffff');
                speedDigitsText3.setColor('#ffff00');
                var str = speedPercent.toFixed(2);
                speedDigitsText2.setText(str.substring(str.length - 2, str.length));
            }
            else if (speedPercent > 99.99) 
            {
                speedDigitsText1.setColor('#ffff00');
                speedDigitsText2.setColor('#ffff00');
                speedDigitsText3.setColor('#ffffff');
                speedDigitsText2.setText("99");
                var str = speedPercent.toFixed(4);
                speedDigitsText3.setText(str.substring(str.length - 2, str.length));
            }
            else
            {
                speedDigitsText1.setColor('#ffffff');
                speedDigitsText2.setText("00");
                speedDigitsText2.setColor('#ffff00');
                speedDigitsText3.setText("00");
                speedDigitsText3.setColor('#ffff00');
            }

        }

        targetTimeText.setText('Target Time: ' + targetTime);

        //moneyText.setText('Money = ' + this.model.money);

        speedText.setText('Speed = ' + speedPercent.toFixed(4) + ' %');


        //check current time and compare to last logged time
        var currentTime = Date.now();
        var deltaT = (currentTime - previousTime)/1000;

        //reset last logged time
        previousTime = currentTime;


        // Only update time once user changes speed
        if (hasLaunched)
        {
            shipTimeText.setText('Ship  Time: ' + ((currentTime-startTime)/1000).toFixed(1));
            earthTime += earthTimeCalculation(speed, deltaT);
            earthTimeText.setText('Earth Time: ' + earthTime.toFixed(1));

            if (speed <= 0)
            {
                var popup = this.add.image(config.width/2, config.height/2, 'popup')

                this.gameButton1 = new Button(this, config.width/2, config.height - 150, 'Button', 'ButtonPressed', 'Upgrades', 'Upgrades');

                if (Math.abs(earthTime-targetTime)<=10)
                {
                    this.add.text(config.width/4 + 5, config.height*0.2, '"Nice, right on time!"', { fontSize: '25px', fill: '#000' });
                    this.add.text(config.width/4 + 10, config.height*0.25, 'You got 50 spacebucks!', { fontSize: '25px', fill: '#000' });
                    this.model.money += 50;
                }
                else if ((earthTime-targetTime)>10)
                {
                    this.add.text(config.width/4 + 5, config.height*0.2, '"Oh, he died years ago..."', { fontSize: '25px', fill: '#000' });
                    this.add.text(config.width/4 + 10, config.height*0.25, 'You got paid 5 spacebucks', { fontSize: '25px', fill: '#000' });
                    this.model.money += 5;
                } 
                else if ((earthTime-targetTime)<-10)
                {
                    this.add.text(config.width/4 + 5, config.height*0.2, '"Back so soon?"', { fontSize: '25px', fill: '#000' });
                    this.add.text(config.width/4 + 10, config.height*0.25, 'You got paid 5 spacebucks', { fontSize: '25px', fill: '#000' });
                    this.model.money += 5;
                }
                moneyText = this.add.text(config.width/3 + 5, config.height*0.32 , 'Total Money = ' + this.model.money, { fontSize: '25px', fill: '#FFF', backgroundColor: '#000' });
                this.add.text(config.width/3, config.height*0.4, 'Target Time: ' + targetTime + ' years', { fontSize: '20px', fill: '#000' });
                this.add.text(config.width/3, config.height*0.45 + 5, 'Time passed on Earth', { fontSize: '20px', fill: '#000' });
                this.add.text(config.width/3 + 50, config.height*0.5 + 5, earthTime.toFixed(1) + ' years', { fontSize: '20px', fill: '#000' });
                
                this.add.text(config.width/3, config.height*0.55 + 5, 'Time passed on the Rocket', { fontSize: '20px', fill: '#000' });
                this.add.text(config.width/3 + 50, config.height*0.6 + 5, ((currentTime-startTime)/1000).toFixed(1) + ' years', { fontSize: '20px', fill: '#000' });

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
