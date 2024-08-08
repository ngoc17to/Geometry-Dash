import PlayScene from "../scenes/PlayScene"

class Button extends Phaser.GameObjects.Sprite {
    private onClick: () => void

    constructor(
        scene: PlayScene, 
        x: number, 
        y: number, 
        texture:string,
        onClick: () => void
    ) {
        super(scene, x, y, texture)
        this.setInteractive({useHandCursor: true})
        this.setScale(1)
        this.setScrollFactor(0)
        this.onClick = onClick

       // Sự kiện hover
        this.on('pointerover', () => {
            scene.tweens.add({
                targets: this,
                scale: 1.1,
                duration: 200,
                ease: 'Power1'
            });
        });

        // Sự kiện không hover nữa
        this.on('pointerout', () => {
            scene.tweens.add({
                targets: this,
                scale: 1,
                duration: 200,
                ease: 'Power1'
            });
        });

        // Sự kiện click
        this.on('pointerdown', () => {
            scene.tweens.add({
                targets: this,
                scale: 0.8,
                duration: 200,
                ease: 'Power1',
                onComplete: () => {
                    this.setScale(1)
                }
            });
            this.onClick()
        });

        scene.add.existing(this)
    }

}

export default Button