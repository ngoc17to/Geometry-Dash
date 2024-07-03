class Platform extends Phaser.GameObjects.TileSprite{
    private currentScene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, texture: string)
	{
		super(scene, x, y, width, height, texture)
        this.currentScene = scene
        this.currentScene.add.existing(this)
        this.currentScene.physics.add.existing(this,true)

        this.setTint(0x0410af)
	}

    create(){
    }
    update() {
        // this.tilePositionX += 10;
    }
}

export default Platform