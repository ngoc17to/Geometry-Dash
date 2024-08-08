import Player from "../game-objects/Player";
import PlayScene from "../scenes/PlayScene";

class JumpRing extends Phaser.Physics.Arcade.Sprite {
    private currentScene: Phaser.Scene

    constructor(scene: PlayScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.currentScene = scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.physics.add.overlap(
            scene.getPlayer(),
            this,
            this.onJump as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        )
    }

    public onJump(player: Player, sprite: Phaser.Physics.Arcade.Sprite): void {
        const cursors = this.currentScene.input.keyboard?.createCursorKeys()
        if(cursors?.space.isDown || cursors?.up.isDown){
            const bodyPlayer = player.body as Phaser.Physics.Arcade.Body;
            bodyPlayer.setVelocityY(-1100)
            bodyPlayer.setAccelerationY(2000)
            bodyPlayer.setVelocityX(600) 
            player.rotatePlayer()
        }
    }

}

export default JumpRing
