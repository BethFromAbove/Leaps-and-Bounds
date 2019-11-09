import 'phaser';
import Button from '../Objects/Button';

export default class UpgradesScene extends Phaser.Scene {
    constructor () {
        super('Upgrades');
    }


    create () {
        this.model = this.sys.game.globals.model;

        this.text = this.add.text(300, 100, 'Upgrades', { fontSize: 40 });
        this.upgrade1Button = this.add.image(200, 200, 'checkedBox');
        this.upgrade1Text = this.add.text(250, 190, 'Buy upgrade 1/add money', { fontSize: 24 });

        this.upgrade2Button = this.add.image(200, 300, 'checkedBox');
        this.upgrade2Text = this.add.text(250, 290, 'Buy upgrade 2', { fontSize: 24 });

        this.upgrade1Button.setInteractive();
        this.upgrade2Button.setInteractive();

        this.upgrade1Button.on('pointerdown', function () {
            this.model.money += 5;
        }.bind(this));

        this.upgrade2Button.on('pointerdown', function () {
        }.bind(this));

        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    }

};
