import Phaser from 'phaser'
import { ISpriteConstructor } from '../types/sprite'

class Player extends Phaser.GameObjects.Container
{
    private currentScene: Phaser.Scene
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private textureKeys: string[]
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter
    private runSprites: Phaser.GameObjects.Sprite[];
    private flySprites: Phaser.GameObjects.Sprite[];

	constructor(params: ISpriteConstructor)
	{
        super(params.scene, params.x, params.y)
        this.textureKeys = params.textureKeys
        
        this.currentScene = params.scene
        this.currentScene.add.existing(this)
        this.currentScene.physics.add.existing(this)
        this.setState('square')
	}

    public updateSprite(){        
        if(this.state === 'square'){
            this.runSprites.forEach(sprite => sprite.setVisible(true));
            this.flySprites.forEach(sprite => sprite.setVisible(false));
            this.setSize(this.runSprites[0].displayWidth, this.runSprites[0].displayHeight);
        }
        else if(this.state === 'ship'){
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
        this.updateSprite();


        //  Our emitter
        this.emitter = this.currentScene.add.particles(0, 0, 'particle', {
            lifespan: 2000,
            speed: { min: 200, max: 400 },
            angle: { min: 180, max: 200 },
            gravityY: 500,
            quantity: 2,
        })
        this.emitter.setPosition(-this.width/2, this.height/2)
        this.add(this.emitter)

        // Thêm container vào physics world
        this.currentScene.physics.world.enable(this)
        
        // Thiết lập body cho container
        const body = this.body as Phaser.Physics.Arcade.Body
        // playerContainerBody.setCollideWorldBounds(true)    
        body.setVelocityX(600) 
        this.cursors = this.currentScene.input.keyboard?.createCursorKeys()
    }

    private handleKeyboard(){
        if(!this.cursors){return}
        if(this.state === 'square'){
            const body = this.body as Phaser.Physics.Arcade.Body

            if((this.cursors.space.isDown || this.cursors.up.isDown) && body.blocked.down){
                console.log(this.x)
                body.setVelocityY(-1100)
                body.setAccelerationY(2000)

                const angle = this.angle + 180
                let targetAngle = angle

                if (angle % 90 !== 0) {
                    targetAngle += 90 - (angle % 90)
                }

                this.currentScene.tweens.add({
                    targets: this,
                    angle: { from: this.angle, to: targetAngle },
                    duration: 400,
                })
            }
        }
        else if(this.state === 'ship'){
            const body = this.body as Phaser.Physics.Arcade.Body;
            if((this.cursors.space.isDown || this.cursors.up.isDown)){
                body.setVelocityY(-400)
                this.scene.tweens.add({
                    targets: this,
                    props: { angle: -30 },
                    duration: 150,
                });
            }
            else if((this.cursors.space.isUp || this.cursors.up.isUp)){
                this.scene.tweens.add({
                    targets: this,
                    props: { angle: body.blocked.down ? 0 : 30 },
                    duration: 300,
                });
            }
        }
    }
    private updateEmitterPosition() {
        const angle = Phaser.Math.RadToDeg(this.rotation)
        
        if(angle === -180) {
            this.emitter.setPosition(this.width / 2, -this.height / 2)
        }
        else if(angle === 0){
            this.emitter.setPosition(-this.width / 2, this.height / 2)
        }
        this.emitter.setAngle(-angle)
    }
    update() {
        // this.setX(this.currentScene.sys.canvas.width / 4)
        this.handleKeyboard()
        const body = this.body as Phaser.Physics.Arcade.Body
        if(this.state === 'square'){
            if (body.blocked.down) {
                this.updateEmitterPosition()
                this.emitter.start()
            } else {
                this.emitter.stop()
            }
        }
        else{
            this.emitter.start()
        }
    }
}

export default Player
