import PlayScene from "../scenes/PlayScene";
import Button from "./Button";

class PauseMenu extends Phaser.GameObjects.Container {
    private progressBar: Phaser.GameObjects.Graphics;
    private level: number;
    private highestScore: number;
    private background: Phaser.GameObjects.Graphics;
    private currentScene: PlayScene;
    private highestScoreText: Phaser.GameObjects.Text;

    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y);
        this.currentScene = scene;
        this.level = scene.level;
        this.highestScore = scene.scoreManager.getHighScore(scene.level);

        this.createBackground();
        this.createProgressBar();
        this.createButtons();

        scene.add.existing(this);
        this.setScrollFactor(0);

    }

    private createBackground(): void {
        const { height, width } = this.scene.scale;
        this.background = this.scene.add.graphics();
        this.background.fillStyle(0x000000, 0.5);
        this.background.fillRoundedRect(-width / 4, -height / 4, width / 2, height / 2, 20);
        this.add(this.background);
    }

    private createProgressBar(): void {
        const { width, height } = this.scene.scale;
        const progressBarWidth = width / 3;
        const progressBarHeight = 20;
        const progressBarX = - (progressBarWidth / 2);
        const progressBarY = -height/6;

        this.progressBar = this.scene.add.graphics();
        this.progressBar.fillStyle(0x222222, 0.8);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight, 10);

        const fillWidth = (this.highestScore / 100) * progressBarWidth;
        this.progressBar.fillStyle(0x00ff00, 1);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, fillWidth, progressBarHeight, 10);

        const levelText = this.scene.add.text(progressBarX + progressBarWidth / 2, progressBarY - 20, `Level ${this.level}`, {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        });
        levelText.setOrigin(0.5);

        this.highestScoreText = this.scene.add.text(
            progressBarX + progressBarWidth / 2,
            progressBarY + progressBarHeight / 2,
            `${this.highestScore} %`,
            {
                fontSize: '16px',
                color: '#000',
                align: 'center'
            }
        );
        this.highestScoreText.setOrigin(0.5);

        this.add([this.progressBar, levelText, this.highestScoreText]);
    }

    public updateBar(): void {
 
        this.highestScore = this.currentScene.scoreManager.getHighScore(this.currentScene.level);
        const { width } = this.scene.scale;
        const progressBarWidth = width / 3;
        const progressBarHeight = 20;
        const progressBarX = - (progressBarWidth / 2);
        const progressBarY = -this.scene.scale.height / 6;
    
        this.progressBar.clear();
    
        this.progressBar.fillStyle(0x222222, 0.8);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight, 10);
    
        const fillWidth = (this.highestScore / 100) * progressBarWidth;
        this.progressBar.fillStyle(0x00ff00, 1);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, fillWidth, progressBarHeight, 10);
    
        this.highestScoreText.setText(`${this.highestScore} %`);
    }

    private createButtons(): void {
        const buttonSpacing = 100;

        const menuBtn = new Button(
            this.scene as PlayScene,
            - 2*buttonSpacing,
            buttonSpacing/4,
            'menuBtn',
            () => {this.currentScene.scene.start('LevelSelectScene'); }
        );

        const resumeBtn = new Button(
            this.scene as PlayScene,
            0,
            buttonSpacing/4,
            'resumeBtn',
            () => { this.currentScene.stateMachine.transition('play'); }
        );

        const replayBtn = new Button(
            this.scene as PlayScene,
            2*buttonSpacing,
            buttonSpacing/4,
            'replayBtn',
            () => { this.currentScene.stateMachine.transition('start'); }
        );

        this.add([menuBtn, resumeBtn, replayBtn]);
        
    }
}

export default PauseMenu;