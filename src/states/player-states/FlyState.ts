import Player from "../../game-objects/Player"
import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class FlyState extends State {
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
        const body = this.player.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(600)

        if (this.cursors?.space.isDown || this.cursors?.up.isDown || this.scene.input.pointer1.isDown) {
            body.setVelocityY(-400)
            this.scene.tweens.add({
                targets: this.player,
                props: { angle: -30 },
                duration: 150,
            })

            this.player.getParticleManager().startFlying()
            this.player.getParticleManager().update()
        } else {
            this.scene.tweens.add({
                targets: this.player,
                props: { angle: body.blocked.down ? 0 : 30 },
                duration: 300,
            })

            this.player.getParticleManager().stopFlying()
        }
    }

    exit(): void {
        return
    }
}

export default FlyState