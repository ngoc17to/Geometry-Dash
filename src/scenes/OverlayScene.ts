import ScoreManager from "../manager/ScoreManager"

class OverlayScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text
    private pauseBtn: Phaser.GameObjects.Sprite
    private scoreManager: ScoreManager
    private level: number

    constructor() {
        super({key: 'OverlayScene'})
    }

    init(data: any) {
        this.scoreManager = data.scoreManager
        this.level = data.level
    }

    create() {
        const { width, height } = this.scale
        this.scoreText = this.add.text(5, 5, 'Score: 0 - Coin: 0', { fontSize: '24px', color: '#fff' }).setScrollFactor(0, 1);

        this.pauseBtn = this.add.sprite(width - 5, 5, 'pauseBtn')
        this.pauseBtn.setOrigin(1, 0)
        this.pauseBtn.setInteractive({ useHandCursor: true })
        
        this.pauseBtn.on('pointerdown', () => {
            this.scene.pause('PlayScene')
            this.scene.launch('PauseScene', 
                { highestScore: this.scoreManager.getHighScore(this.level), level: this.level })
        })
    }

    update(): void {
        this.scoreText.setText('Score: ' + this.scoreManager.getCurrentScore() + ' - Coins: ' + this.scoreManager.getCurrentCoin())
    }
}

export default OverlayScene