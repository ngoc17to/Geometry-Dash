import Player from "../../game-objects/Player"
import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class SlideState extends State {
    public stateMachine: StateMachine
    public scene: PlayScene
    public player: Player
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(player: Player, scene: PlayScene) {
        super()
        this.player = player
        this.scene = scene
    }

    enter(): void {
        this.cursors = this.scene.input.keyboard?.createCursorKeys()
        this.player.updateSprite()
    }

    execute(time: number, delta: number): void {
        // console.log('slide')
        const body = this.player.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(600)
        if (body.blocked.down) {
            this.player.getParticleManager().startSliding();
            this.player.getParticleManager().update();
        } else {
            this.player.getParticleManager().stopSliding();
        }

        if((this.cursors?.space.isDown || this.cursors?.up.isDown || this.scene.input.pointer1.isDown) 
                && body.blocked.down){
            body.setVelocityY(-1100)
            body.setAccelerationY(2000)

            this.player.rotatePlayer()
        }
    }

    exit(): void {
        return
    }
}

export default SlideState