import PlayScene from "../scenes/PlayScene";

class NewBestScreen extends Phaser.GameObjects.Container {
    private level: number;
    private highestScore: number;
    private highestScoreText: Phaser.GameObjects.Text;
    private currentScene: PlayScene;

    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y);
        this.currentScene = scene;
        this.level = scene.level;
        this.highestScore = scene.scoreManager.getHighScore(scene.level);

        const { width, height } = this.scene.scale;

        const newBestImage = scene.add.image(0, -height/8, 'newBest');

        // newBestImage.setOrigin(0.5, 0.5);
        newBestImage.setDepth(10);

        this.highestScoreText = scene.add.text(
            0,
            -height/8 + 80,
            `${scene.scoreManager.getHighScore(scene.level)}%`,
            { fontSize: '60px', color: '#fff' }
        )
        this.highestScoreText.setStyle({ fontWeight: 'bold' })

        scene.add.existing(this);
        this.add([this.highestScoreText, newBestImage]);

        this.setScrollFactor(0);
    }

    public updateScoreText(): void {
        this.highestScoreText.setText(`${this.currentScene.scoreManager.getHighScore(this.currentScene.level)}%`)
    }


}

export default NewBestScreen;