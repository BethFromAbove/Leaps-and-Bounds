export default class Model {
    constructor() {
        this._soundOn = true;
        this._musicOn = true;
        this._bgMusicPlaying = false;
        this._money = 0;
        this._level = 0;
        this._totalRocket = 0;
        this._totalEarth = 0;
    }
    
    set musicOn(value) {
        this._musicOn = value;
    }
    
    get musicOn() {
        return this._musicOn;
    }
    
    set soundOn(value) {
        this._soundOn = value;
    }
    
    get soundOn() {
        return this._soundOn;
    }
    
    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }
    
    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }

    set money(value) {
        this._money = value;
    }

    get money() {
        return this._money;
    }

    set level(value) {
        this._level = value;
    }

    get level() {
        return this._level;
    }

    set totalRocket(value) {
        this._totalRocket = value;
    }

    get totalRocket() {
        return this._totalRocket;
    }

    set totalEarth(value) {
        this._totalEarth = value;
    }

    get totalEarth() {
        return this._totalEarth;
    }
}
