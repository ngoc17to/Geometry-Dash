import Player from "../game-objects/Player";
import PlayScene from "../scenes/PlayScene";

class Square extends Phaser.GameObjects.Sprite{
    private currentScene: PlayScene

    constructor(scene: PlayScene, x: number, y: number, texture: string, flipX: boolean = false, flipY: boolean = false)
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
        if(player.state === 'ship'){
            if (!(bodyPlayer.touching.down || bodyPlayer.touching.up)) {
                this.currentScene.scene.restart() 
                this.currentScene.levelMusic.stop()
            }
        }
        else{
            if (!(bodyPlayer.touching.down && bodySquare.touching.up)) {
                this.currentScene.scene.restart() 
                this.currentScene.levelMusic.stop()
            }
        }
    }
}

export default Square