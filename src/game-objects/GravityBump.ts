import PlayScene from "../scenes/PlayScene";
import Player from "./Player";

class GravityBump extends Phaser.Physics.Arcade.Sprite {
    private boostVelocity: number;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter

    constructor(scene: PlayScene, x: number, y: number, texture: string, boostVelocity: number) {
        super(scene, x, y, texture);
        this.boostVelocity = boostVelocity;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.emitter = this.scene.add.particles(0, 0, 'particle', {
            x: this.x,
            y: this.y,
            speed: { min: -100, max: 100 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 600,
            frequency: 100,
        })
        this.emitter.start()

        scene.physics.add.collider(
            scene.getPlayer(),
            this,
            this.applyBoost as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        )
    }

    public applyBoost(player: Player, sprite: Phaser.Physics.Arcade.Sprite): void {
        const bodyPlayer = player.body as Phaser.Physics.Arcade.Body;
        bodyPlayer.setVelocityY(-this.boostVelocity)
        bodyPlayer.setAccelerationY(2000)
        bodyPlayer.setVelocityX(600) 
        player.rotatePlayer()
    }

}

export default GravityBump
