class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super('LevelSelectScene')
    }

    preload(){
    }

    create(){
        const { height, width } = this.scale
        const buttonSpacing = 200; // Khoảng cách giữa các nút

        for (let i = 0; i < 3; i++) {
            const button = this.add.sprite(
                width / 2 - buttonSpacing + i * buttonSpacing,
                height / 2,
                `lv${i+1}Btn`
            ).setInteractive({ useHandCursor: true });

            button.on('pointerdown', () => {
                this.scene.start('PlayScene', { level: i + 1 })
            });
        }
        
    }
}

export default LevelSelectScene