import Player from "../game-objects/Player"

class Portal extends Phaser.GameObjects.Container {
    private currentScene: Phaser.Scene

    constructor(scene: Phaser.Scene, xFront: number, yFront: number, xBack: number, yBack: number, textureFront: string, textureBack: string) {
        super(scene, xFront, yFront)
        this.currentScene = scene

        const backSprite = this.currentScene.add.sprite(xBack - xFront, yBack - yFront, textureBack).setOrigin(0.5, 0.5)
        const frontSprite = this.currentScene.add.sprite(0, 0, textureFront).setOrigin(0.5, 0.5)
        this.add([backSprite, frontSprite])
        
        const width = Math.max(frontSprite.displayWidth, backSprite.displayWidth)
        const height = Math.max(frontSprite.displayHeight, backSprite.displayHeight)
        this.setSize(width, height)

        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)
    }
}

export default Portal