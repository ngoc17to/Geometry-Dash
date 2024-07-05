import PlayScene from "../scenes/PlayScene"

class Coin extends Phaser.Physics.Arcade.Sprite {
    private currentScene: PlayScene
    constructor(scene: PlayScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.currentScene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)

        scene.anims.create({
            key: 'spin',
            frames: [
                { key: 'coin01' },
                { key: 'coin02' },
                { key: 'coin03' },
                { key: 'coin04' },
            ],
            frameRate: 10,
            repeat: -1
        })

        this.play('spin')
    }

    public collect(): void {
        this.currentScene.tweens.add({
            targets: this,
            y: this.y - 200,
            alpha: { from: 1, to: 0 },
            duration: 500,
            onComplete: () => {
                this.destroy()
            }
        })
        const collectSound = this.currentScene.sound.add('collectCoin');
        collectSound.play();
    }
}

export default Coin