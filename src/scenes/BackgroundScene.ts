class BackgroundScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite

    constructor() {
        super({ key: 'BackgroundScene', active: true });
    }
 
    preload(){
        this.load.image('background', 'assets/images/game_bg_01_001-hd.png')
    }
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
        this.background.setScale(2);
        this.background.setTint(0x2936eb)
    }
    update() {
        this.background.tilePositionX += 0.2
    }
}

export default BackgroundScene
