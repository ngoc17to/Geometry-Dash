class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene')
    }

    preload(){
    }

    create(){
        const { height, width } = this.scale

        const button = this.add.sprite(width/2, height/2, 'playBtn');

        button.setInteractive({ useHandCursor: true });

        button.on('pointerdown', () => {
            this.scene.start('LevelSelectScene')
        });
        
    }
}

export default MainScene