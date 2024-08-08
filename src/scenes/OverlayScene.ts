import ScoreManager from "../manager/ScoreManager"
import StateMachine from "../states/StateMachine"

class OverlayScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text
    private pauseBtn: Phaser.GameObjects.Sprite
    private stateMachine: StateMachine
    private scoreManager: ScoreManager
// 
    constructor() {
        super({key: 'OverlayScene'})
    }

    init(data: any) {
        this.stateMachine = data.scene.stateMachine
        this.scoreManager = data.scene.scoreManager
    }

    create() {
        const { width } = this.scale
        this.scoreText = this.add.text(5, 5, 'Score: 0 - Coin: 0', { fontSize: '24px', color: '#fff' }).setScrollFactor(0, 1)

        this.pauseBtn = this.add.sprite(width - 5, 5, 'pauseBtn')
        this.pauseBtn.setOrigin(1, 0)
        this.pauseBtn.setInteractive({ useHandCursor: true })
        
        this.pauseBtn.on('pointerdown', () => {
            this.stateMachine.transition('pause')
        })
    }

    update(): void {
        this.scoreText.setText(
            'Score: ' + this.scoreManager.getCurrentScore() + 
            ' - Coins: ' + this.scoreManager.getCurrentCoin())
    }
}

export default OverlayScene