import Player from "../game-objects/Player";

class Portal extends Phaser.GameObjects.Container {
    private currentScene: Phaser.Scene;

    constructor(scene: Phaser.Scene, xFront: number, yFront: number, xBack: number, yBack: number, textureFront: string, textureBack: string) {
        super(scene, xFront, yFront);
        this.currentScene = scene;

        // Create sprites and add to container
        const backSprite = this.currentScene.add.sprite(xBack - xFront, yBack - yFront, textureBack).setOrigin(0.5, 0.5);
        const frontSprite = this.currentScene.add.sprite(0, 0, textureFront).setOrigin(0.5, 0.5);
        this.add([backSprite, frontSprite]);
        
        const width = Math.max(frontSprite.displayWidth, backSprite.displayWidth);
        const height = Math.max(frontSprite.displayHeight, backSprite.displayHeight);
        this.setSize(width, height);

        // Set physics properties for container
        this.currentScene.physics.world.enable(this);
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setVelocityX(-400);
        body.setImmovable(true);

        // Add portal container to scene
        this.currentScene.add.existing(this);
    }
}

export default Portal