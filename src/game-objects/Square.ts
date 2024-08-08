import Player from "../game-objects/Player"
import PlayScene from "../scenes/PlayScene"

class Square extends Phaser.GameObjects.Sprite{
    private currentScene: PlayScene

    constructor(scene: PlayScene, x: number, y: number, texture: string, flipX: boolean = false, flipY: boolean = false)
	{
		super(scene, x, y, texture)
        this.currentScene = scene
        this.flipX = flipX
        this.flipY = flipY
        this.setSize(this.width, this.displayHeight)
        
        scene.physics.world.enable(this)
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
        const bodyPlayer = player.body as Phaser.Physics.Arcade.Body
        const bodySquare = sprite.body as Phaser.Physics.Arcade.Body

        if(player.getState() === 'player-fly'){
            if (!(bodyPlayer.touching.down || bodyPlayer.touching.up)) {
                this.currentScene.stateMachine.transition('end')

            }
        }
        else{
            if (!(bodyPlayer.touching.down && bodySquare.touching.up)) {
                this.currentScene.stateMachine.transition('end')

            }
        }
    }
}

export default Square