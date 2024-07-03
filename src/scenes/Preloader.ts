class Preloader extends Phaser.Scene {
    constructor(){
        super('preloader')
    }

    preload(){
        this.load.image('background', 'assets/images/game_bg_01_001-hd.png')
        this.load.image('title', 'assets/images/GJ_LaunchSheet-hd/GJ_logo_001.png')
        this.load.image('sliderGroove', 'assets/images/slidergroove-hd.png')
        this.load.image('sliderBar', 'assets/images/sliderBar-hd.png')
    }

    create(){
        this.scene.start('LoadingScene')
    }
}

export default Preloader