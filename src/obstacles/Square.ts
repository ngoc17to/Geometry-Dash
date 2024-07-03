import Player from "../game-objects/Player";

class Square extends Phaser.GameObjects.Sprite{
    private currentScene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, flipX: boolean = false, flipY: boolean = false)
	{
		super(scene, x, y, texture)
        this.currentScene = scene
        this.flipX = flipX
        this.flipY = flipY
        this.setSize(this.width, this.displayHeight);
        
        scene.physics.world.enable(this);
        const objectBody = this.body as Phaser.Physics.Arcade.Body; 
        objectBody.setVelocityX(-400);
        objectBody.setAllowGravity(false);
        objectBody.setImmovable(true)
        scene.add.existing(this); 
	}

    public handleCollisionWithPlayer = (player: Player, sprite: Phaser.Physics.Arcade.Sprite): void => {
        const bodyPlayer = player.body as Phaser.Physics.Arcade.Body;
        const bodySquare = sprite.body as Phaser.Physics.Arcade.Body;

        if (bodyPlayer.touching.down && bodySquare.touching.up) {
            // Xử lý khi player đứng lên square
            console.log('aaaaaa')
        } else {
            this.currentScene.scene.restart() 
        }
    }
}

export default Square