import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class PauseState extends State {
    public stateMachine: StateMachine
    public scene: PlayScene

    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        console.log("PauseState")

        this.scene.levelMusic.pause()
        this.scene.menuSound.play()

        this.scene.physics.world.pause();
        this.scene.transition.fadeIn(this.scene.pauseMenu);
        this.scene.scene.pause('OverlayScene');
        this.scene.newBestScreen.setVisible(false)
        // scene.scene.launch('PauseScene', {scene: scene })
    }

    execute(time: number, delta: number): void {
    }


    exit(): void {
        this.scene.menuSound.stop()
        this.scene.physics.world.resume();
        this.scene.transition.fadeOut(this.scene.pauseMenu);
        this.scene.scene.resume('OverlayScene');

    }
}

export default PauseState