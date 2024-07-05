import Player from "../game-objects/Player";

class JumpRing extends Phaser.Physics.Arcade.Sprite {
    private currentScene: Phaser.Scene
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.currentScene = scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    public onJump(player: Player): void {
        const cursors = this.currentScene.input.keyboard?.createCursorKeys()
        if(cursors?.space.isDown || cursors?.up.isDown){
            const bodyPlayer = player.body as Phaser.Physics.Arcade.Body;
            bodyPlayer.setVelocityY(-1100)
            bodyPlayer.setAccelerationY(2000)
            bodyPlayer.setVelocityX(600) 
        }
    }

}

export default JumpRing
