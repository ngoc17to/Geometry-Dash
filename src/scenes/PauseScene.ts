class PauseScene extends Phaser.Scene {
    private progressBar!: Phaser.GameObjects.Graphics;
    private level: number
    private highestScore: number

    constructor(){
        super('PauseScene')
    }

    init(data: any) {
        this.highestScore = data.highestScore
        this.level = data.level
    }

    create(){
        const { height, width } = this.scale

        //pause scene background
        const background = this.add.graphics()
        background.fillStyle(0x000000, 0.5)
        background.fillRoundedRect(width / 4, height / 4, width / 2, height / 2, 20)

        // progress bar
        this.progressBar = this.add.graphics();
        this.updateProgressBar();

        //buttons     
        const buttonSpacing = 100

        const menuBtn = this.add.sprite(
            width / 2 - 2*buttonSpacing,
            height / 2,
            `menuBtn`
        ).setInteractive({ useHandCursor: true })

        menuBtn.on('pointerdown', () => {
            this.scene.stop('PlayScene')
            this.scene.stop('OverlayScene')
            this.scene.start('LevelSelectScene')
        })

        const resumeBtn = this.add.sprite(
            width / 2,
            height / 2,
            `resumeBtn`
        ).setInteractive({ useHandCursor: true })

        resumeBtn.on('pointerdown', () => {
            this.scene.resume('PlayScene')
            this.scene.stop()
        })

        const replayBtn = this.add.sprite(
            width / 2 + 2*buttonSpacing,
            height / 2,
            `replayBtn`
        ).setInteractive({ useHandCursor: true })

        replayBtn.on('pointerdown', () => {
            this.scene.start('PlayScene')
            this.scene.start('OverlayScene')
        })
    }

    private updateProgressBar(): void {
        const { width } = this.scale;
        const progressBarWidth = width / 3;
        const progressBarHeight = 20;
        const progressBarX = (width - progressBarWidth) / 2; // Để căn giữa theo chiều ngang
        const progressBarY = this.scale.height / 4 + 50;

        this.progressBar.clear();

        // Vẽ background của progress bar
        this.progressBar.fillStyle(0x222222, 0.8);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight, 10);

        // Tính toán độ rộng của thanh progress bar dựa trên điểm số cao nhất
        const fillWidth = (this.highestScore / 100) * progressBarWidth;

        // Vẽ thanh progress bar
        this.progressBar.fillStyle(0x00ff00, 1);
        this.progressBar.fillRoundedRect(progressBarX, progressBarY, fillWidth, progressBarHeight, 10);
        console.log(this.highestScore)

        // Tạo text object để hiển thị level
        const levelText = this.add.text(progressBarX + progressBarWidth / 2, progressBarY - 20, `Level ${this.level}`, {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        levelText.setOrigin(0.5);

        // Tạo text object để hiển thị điểm số cao nhất
        // const highestScoreText = this.add.bitmapText(
        //     progressBarX + progressBarWidth / 2,
        //     progressBarY + progressBarHeight / 2,
        //     'bigFont',
        //     `${this.highestScore} %`, 16, 1
        // );
        const highestScoreText = this.add.text(
            progressBarX + progressBarWidth / 2,
            progressBarY + progressBarHeight / 2,
            `${this.highestScore} %`,
            {
                fontSize: '16px',
                color: '#000',
                align: 'center'
            }
        );
        highestScoreText.setOrigin(0.5);
    }
}

export default PauseScene