import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload () {
        this.load.image('Logo', 'assets/Logo.png');
    }

    create () {
        this.scene.start('Preloader');
    }
};
