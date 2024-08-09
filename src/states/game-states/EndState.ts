import PlayScene from "../../scenes/PlayScene"
import State from "../../types/State"
import StateMachine from "../StateMachine"

class EndState extends State {
    public stateMachine: StateMachine
    public scene: PlayScene
    private elapsedTime: number
    private isNewBest: boolean

    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        this.elapsedTime = 0;
        this.isNewBest = false
        this.scene.levelMusic.stop()
        this.scene.physics.world.pause();

        if(this.scene.scoreManager.updateHighScore(this.scene.level)){
            this.elapsedTime = 0;
            this.isNewBest = true
            this.scene.newBestScreen.updateScoreText();
            this.scene.pauseMenu.updateBar()
            this.scene.rewardSound.play()
            this.scene.transition.fadeIn(this.scene.newBestScreen);   
        }
        else{
            this.scene.stateMachine.transition('start');
        }
    }

    execute(time: number, delta: number): void {    
        if(this.isNewBest){
            this.elapsedTime += delta
            if(this.elapsedTime > 1500)
                this.scene.transition.fadeOut(this.scene.newBestScreen);   
            if(this.elapsedTime > 1800) this.scene.stateMachine.transition('start');
        }
    }


    exit(): void {
        this.scene.menuSound.stop()
        this.elapsedTime = 0;
        this.isNewBest = false;
    }
}

export default EndState