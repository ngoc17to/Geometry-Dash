import Phaser from 'phaser'
import Square from '../obstacles/Square'
import Platform from '../game-objects/Platform'
import Player from '../game-objects/Player'
import Spike from '../obstacles/Spike'
import Portal from '../obstacles/Portal'
import Coin from '../game-objects/Coin'
import GravityBump from '../obstacles/GravityBump'
import JumpRing from '../obstacles/JumpRing'
import ScoreManager from '../manager/ScoreManager'
import StateMachine from '../states/StateMachine'
import PlayState from '../states/PlayState'

class PlayScene extends Phaser.Scene
{
    private player!: Player
    private level: number;
    private platforms!: Platform
    private squareObstacles: Phaser.Physics.Arcade.Group
    private spikeObstacles: Phaser.Physics.Arcade.Group
    private coins: Phaser.Physics.Arcade.Group
    private bumps: Phaser.Physics.Arcade.Group
    private jumpRings: Phaser.Physics.Arcade.Group
    private portals: Phaser.Physics.Arcade.Group
    private visitedPortals: Portal[] = []
    private visitedCoins: Coin[] = []
    private map: Phaser.Tilemaps.Tilemap
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private initialCameraZoom: number
    private scoreManager: ScoreManager
    private desEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    public levelMusic: Phaser.Sound.BaseSound
    public stateMachine: StateMachine

	constructor()
	{
		super({ key: "PlayScene" })
        this.scoreManager = new ScoreManager();

	}

    init(data: any) {
        this.level = data.level
    }

    create()
    {        
        this.physics.world.TILE_BIAS = 32
        this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight)
        
        // const playSound = this.sound.add('playSound');
        // playSound.play();

        // Create and play background music
        this.levelMusic = this.sound.add('level1bmg', { loop: true });
        this.levelMusic.play();

        this.scoreManager.resetScore()
        this.scene.launch('OverlayScene', { scoreManager: this.scoreManager, level: this.level })
        //============================CREATE STATES=================================
        // this.stateMachine = new StateMachine('play', {
        //     play: new PlayState(),
        //     pause: new PlayState(),
        // }, [this])
        //============================CREATE OBJECTS=================================
            //================PLAYER================
        this.player = new Player({
            scene: this,
            x: 0,
            y: this.sys.canvas.height,
            textureKeys: ['player1', 'player2', 'player3', 'ship1', 'ship2', 'ship3'],
        })
        this.player.create()

        //============================CREATE OBSTACLES=================================
        this.map = this.make.tilemap({ key: `level${this.level}` })
        //================PLATFORM================
        const platformTileset = this.map.addTilesetImage('platformTileset', 'platform')
        const platformLayer = this.map.createLayer('platform', platformTileset!, 0, 0)
        const floorLayer = this.map.createLayer('floor', platformTileset!, 0, 0)
        platformLayer!.setCollisionByProperty({ collides: true })
        floorLayer!.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.player, platformLayer!)
        this.physics.add.collider(this.player, floorLayer!)
        platformLayer!.setTint(0x0410af)
        floorLayer!.setTint(0x0410af)

        //================SQUARE================
        for (let i = 1; i < 9; i++) {
			const num = i.toString().padStart(2, '0')
			this.map.addTilesetImage('GD_lv1', 'square' + num)
        }
        this.map.addTilesetImage('GD_lv1', 'plank01')
        const squareLayer = this.map.getObjectLayer('squareLayer')
        this.squareObstacles = this.physics.add.group()
        squareLayer?.objects.forEach((obj) => {
            const square = new Square(this, (obj.x as number) + (obj.width as number)/2, (obj.y as number) - (obj.height as number)/2, obj.name, obj.flippedHorizontal, obj.flippedVertical)
            this.physics.add.collider(this.player, square, square.handleCollisionWithPlayer.bind(this) as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this  )
            this.squareObstacles.add(square)
        })

        this.squareObstacles.children.iterate((square: Phaser.GameObjects.GameObject) => {
            const body = square.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        

        //================SPIKE================ 
        for (let i = 1; i < 5; i++) {
			const num = i.toString().padStart(2, '0') 
			this.map.addTilesetImage('GD_lv1', 'spike' + num)
			this.map.addTilesetImage('GD_lv1', 'spikes' + num)
        }

        const spikeLayer = this.map.getObjectLayer('spikeLayer')
        this.spikeObstacles = this.physics.add.group()

        spikeLayer?.objects.forEach((obj) => {
            const spike = new Spike(this, (obj.x as number) + (obj.width as number)/2, (obj.y as number) - (obj.height as number)/2, obj.name, obj.flippedVertical)
            this.physics.add.collider(this.player, spike, spike.handleCollisionWithPlayer.bind(this) as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this  )
            this.spikeObstacles.add(spike)
        })

        this.spikeObstacles.children.iterate((spike: Phaser.GameObjects.GameObject) => {
            const body = spike.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        //================COIN================ 
        this.map.addTilesetImage('GD_lv1', 'coin01')

        const coinLayer = this.map.getObjectLayer('coinLayer')
        this.coins = this.physics.add.group({
            classType: Coin,
            runChildUpdate: true
        });

        coinLayer?.objects.forEach((obj) => {
            const coin = new Coin(this, (obj.x as number) + (obj.width as number)/2, (obj.y as number) - (obj.height as number)/2, obj.name)
            this.coins.add(coin)
        })

        this.coins.children.iterate((coin: Phaser.GameObjects.GameObject) => {
            const body = coin.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        //================BUMP================ 
        this.map.addTilesetImage('GD_lv1', 'bump')
        const bumpLayer = this.map.getObjectLayer('bumpLayer')
        this.bumps = this.physics.add.group({
            classType: GravityBump,
            runChildUpdate: true
        });

        bumpLayer?.objects.forEach((obj) => {
            const bump = new GravityBump(this, (obj.x as number) + (obj.width as number)/2, (obj.y as number) - (obj.height as number)/2, obj.name, 1500)
            this.bumps.add(bump)
        })

        this.bumps.children.iterate((bump: Phaser.GameObjects.GameObject) => {
            const body = bump.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        //================JUMP RING================ 
        this.map.addTilesetImage('GD_lv1', 'jumpRing')
        const jumpRingLayer = this.map.getObjectLayer('jumpRingLayer')
        this.jumpRings = this.physics.add.group({
            classType: JumpRing,
            runChildUpdate: true
        });

        jumpRingLayer?.objects.forEach((obj) => {
            const jumpRing = new JumpRing(this, (obj.x as number) + (obj.width as number)/2, (obj.y as number) - (obj.height as number)/2, obj.name)
            this.jumpRings.add(jumpRing)
        })

        this.jumpRings.children.iterate((jumpRing: Phaser.GameObjects.GameObject) => {
            const body = jumpRing.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        //================PORTAL================
        for (let i = 1; i < 5; i++) {
			const num = i.toString().padStart(2, '0') 
			this.map.addTilesetImage('GD_lv1', 'portal' + num + 'f')
			this.map.addTilesetImage('GD_lv1', 'portal' + num + 'b')
        }

        const portalLayer = this.map.getObjectLayer('portalLayer')
        this.portals = this.physics.add.group()

        const portalObjects = portalLayer?.objects || []

        // Group portal objects into pairs
        for (let i = 0; i < portalObjects.length; i += 2) {
            const front = portalObjects[i]
            const back = portalObjects[i + 1]
    
            const xFront = (front.x as number) + (front.width as number)/2
            const yFront = (front.y as number) - (front.height as number)/2
            const xBack = (back.x as number) + (back.width as number)/2
            const yBack = (back.y as number) - (back.height as number)/2
            const portal = new Portal(this, xFront, yFront, xBack, yBack, front.name, back.name)
            this.portals.add(portal)
        }

        this.portals.children.iterate((portal: Phaser.GameObjects.GameObject) => {
            const body = (portal as Phaser.Physics.Arcade.Sprite).body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
    //======================SETTING CAMERA=========================
        this.initialCameraZoom = this.cameras.main.zoom;
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0)
        this.cameras.main.setFollowOffset(-this.sys.canvas.width / 3, 0)
        this.cameras.main.setLerp(0.1, 0.2) 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)        
    //======================COLLISION=========================
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.overlap(this.player, this.portals, this.changeState as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        this.physics.add.overlap(this.player, this.coins, this.collectCoin as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.player, this.bumps, this.hitGravityBump as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.player, this.jumpRings, this.onJumpRing as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    //========================================================
        this.cursors = this.input.keyboard?.createCursorKeys()


        // Tạo Particle Manager và Emitter
        this.desEmitter = this.add.particles(this.map.widthInPixels, this.cameras.main.height/2, 'particle', {
            color: [ 0xc3e98d ],
            lifespan: 3000,
            speed: { min: 100, max: 300 },
            angle: { min: 90, max: 270 },
            quantity: 1,
        })
        this.desEmitter.stop()
        
    }

    private collectCoin(player: Player, coin: Coin): void {
        coin.collect();
        const coinIndex = this.visitedCoins.indexOf(coin)
        if (coinIndex === -1) {
            this.visitedCoins.push(coin)
            this.scoreManager.updateCoin()
        }
    }

    private hitGravityBump(player: Player, bump: GravityBump): void {
        bump.applyBoost(player);
    }

    private onJumpRing(player: Player, jumpRing: JumpRing): void {
        jumpRing.onJump(player)
    }

    public changeState(player: Player, portal: Portal): void {
        const portalIndex = this.visitedPortals.indexOf(portal)
        if (portalIndex === -1) {
            if(player.state == 'square'){
                player.setState('ship')
            }
            else player.setState('square') 
            player.updateSprite()

            this.visitedPortals.push(portal)
        }
    }

    private updateScore(): void {
        const percentageProgress = Math.min(this.player.x / this.map.widthInPixels, 1)
        const score = Math.floor(percentageProgress * 100)
        this.scoreManager.updateScore(score, this.level)
    }

    update() {
        this.player.update()        
        if(this.player.state === 'ship'){
            const { height } = this.scale;
            const mapHeight = this.map.heightInPixels;
            const zoomLevel = height / mapHeight;

            this.cameras.main.setZoom(zoomLevel);
        }
        else{
            this.cameras.main.setZoom(this.initialCameraZoom)
            this.cameras.main.scrollY = this.player.y - 150
        }
        this.updateScore();
        if(this.scoreManager.getCurrentScore() >= 98){
            this.desEmitter.start()
        }
        // this.stateMachine.step();
    }
}

export default PlayScene
