
import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class PlayState extends State {
    public stateMachine: StateMachine
    public scene: PlayScene
    private pauseKey: Phaser.Input.Keyboard.Key | undefined

    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        console.log("PlayState")
                
        this.scene.levelMusic.resume()
        // scene.scene.resume('PlayScene')
        this.pauseKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    execute(time: number, delta: number): void {
        this.scene.getPlayer().update(time, delta)
        if(this.scene.getPlayer().state === 'square'){
            this.scene.cameras.main.scrollY = this.scene.getPlayer().y - 150
        }
        this.scene.updateScore();
        if(this.scene.scoreManager.getCurrentScore() >= 98){
            this.scene.desEmitter.start()
        }
    }


    exit(): void {

    }
}

export default PlayState