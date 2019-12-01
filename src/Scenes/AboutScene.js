import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
    constructor () {
        super('About');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'titleBackground');

        var endTime = this.add.text(config.width/4 + 5, config.height*0.4, 'Time passed on Earth =  years', { fontSize: '20px', fill: '#000' });
        

        this.menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');

    }

};
