import Player from "../game-objects/Player";

class Spike extends Phaser.GameObjects.Sprite{
    private currentScene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, flipY: boolean = false)
	{
		super(scene, x, y, texture)
        this.currentScene = scene
        this.flipY = flipY
        
        scene.physics.world.enable(this);
        const objectBody = this.body as Phaser.Physics.Arcade.Body; 
        objectBody.setVelocityX(-400);
        objectBody.setSize(this.width, this.height);
        objectBody.setAllowGravity(false);
        objectBody.setImmovable(true)
        scene.add.existing(this); 
	}

    public handleCollisionWithPlayer = (player: Player, sprite: Phaser.Physics.Arcade.Sprite): void => {
        const bodyPlayer = player.body as Phaser.Physics.Arcade.Body;
        const bodySquare = sprite.body as Phaser.Physics.Arcade.Body;

        this.currentScene.scene.restart()

    }
}

export default Spike