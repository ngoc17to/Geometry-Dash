import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class StartState extends State {
    public stateMachine: StateMachine
    public scene: PlayScene

    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        console.log("StartState")
        this.scene.physics.world.TILE_BIAS = 32
        this.scene.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight)

        this.scene.scoreManager.resetScore()
        this.scene.playSound.play()
        this.scene.levelMusic.play()
        this.scene.physics.world.resume();

        this.scene.getPlayer().setPosition(0, this.scene.sys.canvas.height)
        this.scene.getPlayer().getStateMachine().transition('player-slide')
        this.stateMachine.transition('play')
        // scene.scene.resume('PlayScene')
        this.scene.scene.launch('OverlayScene', { scene: this.scene})
    }

    execute(time: number, delta: number): void {
    }


    exit(): void {
    }
}

export default StartState