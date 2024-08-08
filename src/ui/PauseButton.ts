import PlayScene from "../scenes/PlayScene"

class PauseButton extends Phaser.GameObjects.Sprite {
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y, 'pauseBtn')
        this.setInteractive()
        this.setScale(1)
        scene.add.existing(this)
        this.setScrollFactor(0)
        this.on('pointerdown', () => {
            this.setScale(0.8)
            scene.stateMachine.transition('pause')
        })
    }
}

export default PauseButton