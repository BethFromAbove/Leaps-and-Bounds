import 'phaser';
import Button from '../Objects/Button';

export default class UpgradesScene extends Phaser.Scene {
    constructor () {
        super('Upgrades');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'upgradeBackground');

        this.moneyText = this.add.text(config.width*0.72, config.height*0.33, 'Money:', { fontSize: '45px', fill: '#000' });
        this.moneyText2 = this.add.text(config.width*0.72, config.height*0.43, this.model.money, { fontSize: '45px', fill: '#000' });

        if (this.model.level == 0)
        {
            this.upgrade1Button = this.add.image(170, 220, 'box');
            this.upgrade2Button = this.add.image(170, 300, 'box');
        }
        else if (this.model.level == 1)
        {
            this.upgrade1Button = this.add.image(170, 220, 'checkedBox');
            this.upgrade2Button = this.add.image(170, 300, 'box');
        }
        else if (this.model.level == 2)
        {
            this.upgrade1Button = this.add.image(170, 220, 'checkedBox');
            this.upgrade2Button = this.add.image(170, 300, 'checkedBox');
        }

        this.upgrade1Text = this.add.text(220, 210, 'Buy upgrade 1 (50)', { fontSize: 24, fill: '#000' });
        this.upgrade2Text = this.add.text(220, 290, 'Buy upgrade 2 (100)', { fontSize: 24, fill: '#000' });

        this.upgrade1Button.setInteractive();
        this.upgrade2Button.setInteractive();

        this.upgrade1Button.on('pointerdown', function () {
            if (this.model.money >= 50 && this.model.level == 0)
            {
                this.upgrade1Button.setTexture('checkedBox');
                this.model.level = 1;
                this.model.money -= 50;
                this.moneyText2.setText(this.model.money);
            }
        }.bind(this));

        this.upgrade2Button.on('pointerdown', function () {
            if (this.model.money >= 100 && this.model.level == 1)
            {
                this.upgrade2Button.setTexture('checkedBox');
                this.model.level = 2;
                this.model.money -= 100;
                this.moneyText2.setText(this.model.money);
            }
        }.bind(this));

        
        this.gameButton = new Button(this, config.width/2, config.height*0.7, 'Button', 'ButtonPressed', 'Play', 'Game');

        this.menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');

    }

};
