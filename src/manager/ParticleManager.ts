class ParticleManager {
    private scene: Phaser.Scene
    private player: Phaser.GameObjects.Container
    private squareEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    private shipEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    private squareEmitterPaused: boolean = false;
    private shipEmitterPaused: boolean = false;

    constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Container, squareParticleKey: string, shipParticleKey: string) {
        this.scene = scene
        this.player = player

        this.squareEmitter = scene.add.particles(player.x, player.y, squareParticleKey, {
            lifespan: 200,
            color: [ 0x96e0da, 0x937ef3 ],
            colorEase: 'quad.out',
            speed: { min: 200, max: 400 },
            scale: { start: 0.4, end: 0, ease: 'sine.in' },
            angle: { min: 180, max: 210 },
            quantity: 1,
        })
        this.shipEmitter = scene.add.particles(player.x, player.y, shipParticleKey, {
            color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
            colorEase: 'quad.out',
            lifespan: 200,
            speed: { min: 200, max: 400 },
            angle: { min: 180, max: 200 },
            gravityY: 500,
            quantity: 1,
        })
        this.squareEmitter.stop()
        this.shipEmitter.stop()
    }

    public update() {
        const angle = Phaser.Math.DegToRad(this.player.angle);
        const offsetX = -this.player.displayWidth / 2;
        const offsetY = this.player.displayHeight / 2;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const rotatedX = offsetX * cos - offsetY * sin;
        const rotatedY = offsetX * sin + offsetY * cos;

        this.squareEmitter.setPosition(this.player.x + offsetX, this.player.y + offsetY)
        this.shipEmitter.setAngle(angle)
        this.shipEmitter.setPosition(this.player.x + rotatedX, this.player.y + rotatedY)
    }

    public startSliding() {
        this.squareEmitter.start()
        this.shipEmitter.stop()
    }

    public stopSliding() {
        this.squareEmitter.stop()
    }

    public startFlying() {
        this.shipEmitter.start()
        this.squareEmitter.stop()
    }

    public stopFlying() {
        this.shipEmitter.stop()
    }

    public pause(): void {
        // Pause square emitter
        if (!this.squareEmitterPaused) {
            this.squareEmitter.pause();
            this.squareEmitterPaused = true;
        }
    
        // Pause ship emitter
        if (!this.shipEmitterPaused) {
            this.shipEmitter.pause();
            this.shipEmitterPaused = true;
        }
    }
    
    public resume(): void {
        // Resume square emitter
        if (this.squareEmitterPaused) {
            this.squareEmitter.resume();
            this.squareEmitterPaused = false;
        }
    
        // Resume ship emitter
        if (this.shipEmitterPaused) {
            this.shipEmitter.resume();
            this.shipEmitterPaused = false;
        }
    }
}

export default ParticleManager
