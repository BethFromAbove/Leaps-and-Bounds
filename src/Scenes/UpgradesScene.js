import 'phaser';
import Button from '../Objects/Button';

export default class UpgradesScene extends Phaser.Scene {
    constructor () {
        super('Upgrades');
    }


    create () {
        this.model = this.sys.game.globals.model;

        this.text = this.add.text(300, 100, 'Upgrades', { fontSize: 40 });
        this.moneyText = this.add.text(500, 100, 'Money = ' + this.model.money, { fontSize: 40 });

        if (this.model.level == 0)
        {
            this.upgrade1Button = this.add.image(200, 200, 'box');
            this.upgrade2Button = this.add.image(200, 300, 'box');
        }
        else if (this.model.level == 1)
        {
            this.upgrade1Button = this.add.image(200, 200, 'checkedBox');
            this.upgrade2Button = this.add.image(200, 300, 'box');
        }
        else if (this.model.level == 2)
        {
            this.upgrade1Button = this.add.image(200, 200, 'checkedBox');
            this.upgrade2Button = this.add.image(200, 300, 'checkedBox');
        }

        this.upgrade1Text = this.add.text(250, 190, 'Buy upgrade 1 (50)', { fontSize: 24 });
        this.upgrade2Text = this.add.text(250, 290, 'Buy upgrade 2 (100)', { fontSize: 24 });

        this.upgrade1Button.setInteractive();
        this.upgrade2Button.setInteractive();

        this.upgrade1Button.on('pointerdown', function () {
            if (this.model.money >= 50 && this.model.level == 0)
            {
                this.upgrade1Button.setTexture('checkedBox');
                this.model.level = 1;
                this.model.money -= 50;
                this.moneyText.setText('Money = ' + this.model.money);
            }
        }.bind(this));

        this.upgrade2Button.on('pointerdown', function () {
            if (this.model.money >= 100 && this.model.level == 1)
            {
                this.upgrade2Button.setTexture('checkedBox');
                this.model.level = 2;
                this.model.money -= 100;
                this.moneyText.setText('Money = ' + this.model.money);
            }
        }.bind(this));

        

        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    }

};
