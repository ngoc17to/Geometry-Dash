import Player from "../game-objects/Player";
import PlayScene from "../scenes/PlayScene";

class Spike extends Phaser.GameObjects.Sprite{
    private currentScene: PlayScene

    constructor(scene: PlayScene, x: number, y: number, texture: string, flipY: boolean = false)
	{
		super(scene, x, y, texture)
        this.currentScene = scene
        this.flipY = flipY
        
        scene.physics.world.enable(this)
        const objectBody = this.body as Phaser.Physics.Arcade.Body
        objectBody.setSize(this.width-30, this.height-30)
        scene.add.existing(this)
        scene.physics.add.collider(
            scene.getPlayer(),
            this,
            this.handleCollisionWithPlayer as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        )
	}

    public handleCollisionWithPlayer = (player: Player, sprite: Phaser.GameObjects.Sprite): void => {   
        this.currentScene.stateMachine.transition('end')

    }
}

export default Spike