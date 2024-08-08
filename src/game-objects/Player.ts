import Phaser from 'phaser'
import { ISpriteConstructor } from '../types/sprite'
import ParticleManager from '../manager/ParticleManager'
import PlayScene from '../scenes/PlayScene'
import StateMachine from '../states/StateMachine'
import SlideState from '../states/player-states/SlideState'
import FlyState from '../states/player-states/FlyState'

class Player extends Phaser.GameObjects.Container
{
    private stateMachine: StateMachine
    private currentScene: PlayScene
    private textureKeys: string[]
    private runSprites: Phaser.GameObjects.Sprite[];
    private flySprites: Phaser.GameObjects.Sprite[];
    private particleManager: ParticleManager;
    private rotateTweens: Phaser.Tweens.Tween;

	constructor(scene: PlayScene, x: number, y: number, textureKeys: string[])
	{
        super(scene, x, y)
        this.textureKeys = textureKeys
        
        this.currentScene = scene
        this.currentScene.add.existing(this)
        this.currentScene.physics.add.existing(this)

        this.stateMachine = new StateMachine('player-slide', {
            'player-slide': new SlideState(this, scene),
            'player-fly': new FlyState(this, scene),
        })
	}

    public updateSprite(): void{        
        if(this.stateMachine.getState() === 'player-slide'){
            this.runSprites.forEach(sprite => sprite.setVisible(true));
            this.flySprites.forEach(sprite => sprite.setVisible(false));
            this.setSize(this.runSprites[0].displayWidth, this.runSprites[0].displayHeight);
        }
        else if(this.stateMachine.getState() === 'player-fly'){
            this.runSprites.forEach(sprite => sprite.setVisible(false));
            this.flySprites.forEach(sprite => sprite.setVisible(true));
            this.setSize(this.flySprites[3].displayWidth, this.flySprites[3].displayHeight);
        }
    }

    create()
    {
        // Create run sprites
        this.runSprites = [
            this.currentScene.add.sprite(0, 0, this.textureKeys[0]).setOrigin(0.5, 0.5).setTint(0x000000),
            this.currentScene.add.sprite(0, 0, this.textureKeys[1]).setOrigin(0.5, 0.5).setTint(0x7cfd00),
            this.currentScene.add.sprite(0, 0, this.textureKeys[2]).setOrigin(0.5, 0.5).setTint(0x00fcfc)
        ];
        this.runSprites.forEach(sprite => this.add(sprite));
        
        // Create fly sprites
        this.flySprites = [
            this.currentScene.add.sprite(0, 0, this.textureKeys[0]).setOrigin(0.5, 0.5).setScale(0.5).setTint(0x000000),
            this.currentScene.add.sprite(0, 0, this.textureKeys[1]).setOrigin(0.5, 0.5).setScale(0.5).setTint(0x7cfd00),
            this.currentScene.add.sprite(0, 0, this.textureKeys[2]).setOrigin(0.5, 0.5).setScale(0.5).setTint(0x00fcfc),
            this.currentScene.add.sprite(0, 0, this.textureKeys[3]).setOrigin(0.5, 0).setTint(0x000000),
            this.currentScene.add.sprite(0, 0, this.textureKeys[4]).setOrigin(0.5, 0).setTint(0x7cfd00),
            this.currentScene.add.sprite(0, 0, this.textureKeys[5]).setOrigin(0.5, 0).setTint(0x00fcfc)
        ];
        this.flySprites.forEach(sprite => this.add(sprite));


        this.particleManager = new ParticleManager(this.currentScene, this, 'squareParticle', 'shipParticle');
        const body = this.body as Phaser.Physics.Arcade.Body

        body.setVelocityX(600)
        this.currentScene.physics.world.enable(this)
    }

    update(time: number, delta: number): void {
        this.stateMachine.update(time, delta)
    }

    public rotatePlayer(): void {
        const body = this.body as Phaser.Physics.Arcade.Body
        const angle = this.angle + 180
        let targetAngle = angle

        if (angle % 90 !== 0) {
            targetAngle += 90 - (angle % 90)
        }

        console.log(this.angle, targetAngle)
        this.rotateTweens = this.scene.tweens.add({
            targets: this,
            angle: { from: this.angle, to: targetAngle },
            duration: 400,
        })
    }
    
    public getStateMachine(): StateMachine{
        return this.stateMachine
    }

    public getState(): string | null{
        return this.stateMachine.getState()
    }

    public getParticleManager(): ParticleManager{
        return this.particleManager
    }

    public pause(): void {    
        this.rotateTweens.pause()
        this.particleManager.pause();
    }
    
    public resume(): void {
        this.rotateTweens.resume()
        this.particleManager.resume();
    }
}

export default Player
