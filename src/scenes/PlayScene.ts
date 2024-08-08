import Phaser from 'phaser'
import Square from '../game-objects/Square'
import Player from '../game-objects/Player'
import Spike from '../game-objects/Spike'
import Portal from '../game-objects/Portal'
import Coin from '../game-objects/Coin'
import GravityBump from '../game-objects/GravityBump'
import JumpRing from '../game-objects/JumpRing'
import ScoreManager from '../manager/ScoreManager'
import StateMachine from '../states/StateMachine'
import PauseState from '../states/game-states/PauseState'
import EndState from '../states/game-states/EndState'
import Button from '../ui/Button'
import Transition from '../ui/Transition'
import PauseMenu from '../ui/PauseMenu'
import StartState from '../states/game-states/StartState'
import PlayState from '../states/game-states/PlayState'
import NewBestScreen from '../ui/NewBestScreen'

class PlayScene extends Phaser.Scene
{
    public level: number;
    private map: Phaser.Tilemaps.Tilemap

    private player!: Player
    private squareObstacles: Phaser.Physics.Arcade.Group
    private spikeObstacles: Phaser.Physics.Arcade.Group
    private coins: Phaser.Physics.Arcade.Group
    private bumps: Phaser.Physics.Arcade.Group
    private jumpRings: Phaser.Physics.Arcade.Group
    private portals: Phaser.Physics.Arcade.Group

    private visitedPortals: Portal[] = []
    private visitedCoins: Coin[] = []

    private initialCameraZoom: number
    public scoreManager: ScoreManager
    public stateMachine: StateMachine

    public desEmitter: Phaser.GameObjects.Particles.ParticleEmitter

    public levelMusic: Phaser.Sound.BaseSound
    public playSound: Phaser.Sound.BaseSound
    public menuSound: Phaser.Sound.BaseSound
    public rewardSound: Phaser.Sound.BaseSound

    public pauseButton: Button
    public transition: Transition
    public scoreText: Phaser.GameObjects.Text
    public pauseMenu: PauseMenu
    public newBestScreen: NewBestScreen

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
        //============================AUDIO=================================
        this.levelMusic = this.sound.add('level1bmg', { loop: true })
        this.playSound = this.sound.add('playSound')
        this.rewardSound = this.sound.add('rewardSound')
        this.menuSound = this.sound.add('menuSound', { loop: true })
        //============================CREATE OBJECTS=================================
            //================PLAYER================
        this.player = new Player(this, 0, this.sys.canvas.height, ['player1', 'player2', 'player3', 'ship1', 'ship2', 'ship3'])
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
        const squareLayer = this.map.getObjectLayer('squareLayer')
        this.squareObstacles = this.physics.add.group({ classType: Square })
        squareLayer?.objects.forEach((obj) => {
            const square = new Square(
                this, (obj.x as number) + (obj.width as number)/2,
                (obj.y as number) - (obj.height as number)/2,
                obj.name,
                obj.flippedHorizontal,
                obj.flippedVertical)
            this.squareObstacles.add(square)
        })

        this.squareObstacles.children.iterate((square: Phaser.GameObjects.GameObject) => {
            const body = square.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
            //================SPIKE================ 
        const spikeLayer = this.map.getObjectLayer('spikeLayer')
        this.spikeObstacles = this.physics.add.group({ classType: Spike })

        spikeLayer?.objects.forEach((obj) => {
            const spike = new Spike(
                this,
                (obj.x as number) + (obj.width as number)/2,
                (obj.y as number) - (obj.height as number)/2,
                obj.name,
                obj.flippedVertical)
            this.spikeObstacles.add(spike)
        })

        this.spikeObstacles.children.iterate((spike: Phaser.GameObjects.GameObject) => {
            const body = spike.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
        //================COIN================ 
        const coinLayer = this.map.getObjectLayer('coinLayer')
        this.coins = this.physics.add.group({ classType: Coin })

        coinLayer?.objects.forEach((obj) => {
            const coin = new Coin(
                this,
                (obj.x as number) + (obj.width as number)/2,
                (obj.y as number) - (obj.height as number)/2, 
                obj.name)
            this.coins.add(coin)
        })

        this.coins.children.iterate((coin: Phaser.GameObjects.GameObject) => {
            const body = coin.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
            //================BUMP================ 
        const bumpLayer = this.map.getObjectLayer('bumpLayer')
        this.bumps = this.physics.add.group({ classType: GravityBump });

        bumpLayer?.objects.forEach((obj) => {
            const bump = new GravityBump(
                this,
                (obj.x as number) + (obj.width as number)/2,
                (obj.y as number) - (obj.height as number)/2, 
                obj.name,
                1500)
            this.bumps.add(bump)
        })

        this.bumps.children.iterate((bump: Phaser.GameObjects.GameObject) => {
            const body = bump.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
            //================JUMP RING================ 
        const jumpRingLayer = this.map.getObjectLayer('jumpRingLayer')
        this.jumpRings = this.physics.add.group({ classType: JumpRing });

        jumpRingLayer?.objects.forEach((obj) => {
            const jumpRing = new JumpRing(
                this,
                (obj.x as number) + (obj.width as number)/2,
                (obj.y as number) - (obj.height as number)/2,
                obj.name)
            this.jumpRings.add(jumpRing)
        })

        this.jumpRings.children.iterate((jumpRing: Phaser.GameObjects.GameObject) => {
            const body = jumpRing.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            body.setImmovable(true)
            return true
        })
            //================PORTAL================
        const portalLayer = this.map.getObjectLayer('portalLayer')
        this.portals = this.physics.add.group({ classType: Portal })

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
        const { width, height } = this.cameras.main
        this.initialCameraZoom = this.cameras.main.zoom;
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0)
        this.cameras.main.setFollowOffset(-this.sys.canvas.width / 3, 0)
        this.cameras.main.setLerp(0.1, 0.2) 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels) 

    //======================COLLISION=========================
        this.physics.add.overlap(this.player, this.portals, this.changeState as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        this.physics.add.overlap(this.player, this.coins, this.collectCoin as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

    //============================CREATE STATES=================================
        // this.stateMachine = new StateMachine('play', {
        //     play: new PlayState(),
        //     resume: new ResumeState(),
        //     pause: new PauseState(),
        //     level: new LevelSelectState(),
        //     end: new EndState(),
        // }, [this])

        this.pauseMenu = new PauseMenu(this, width / 2, height / 2)
        this.newBestScreen = new NewBestScreen(this, width / 2, height / 4)
        this.newBestScreen.setVisible(false)
        this.pauseMenu.setVisible(false)
        // this.gameOverScreen = new GameOverScreen(this, width / 2, height / 2)
        // this.gameOverScreen.setVisible(false)
        this.transition = new Transition(this)
        this.stateMachine = new StateMachine('start', {
            start: new StartState(this),
            play: new PlayState(this),
            pause: new PauseState(this),
            end: new EndState(this),
        })

    }

    private collectCoin(player: Player, coin: Coin): void {
        coin.collect();
        const coinIndex = this.visitedCoins.indexOf(coin)
        if (coinIndex === -1) {
            this.visitedCoins.push(coin)
            this.scoreManager.updateCoin()
        }
    }

    public changeState(player: Player, portal: Portal): void {
        const portalIndex = this.visitedPortals.indexOf(portal)
        if (portalIndex === -1) {
            if(player.getState() == 'player-slide'){
                player.getStateMachine().transition('player-fly')
                
                const { height } = this.scale;
                const mapHeight = this.map.heightInPixels;
                const zoomLevel = height / mapHeight;
                
                this.tweens.addCounter({
                    from: this.cameras.main.zoom,
                    to: zoomLevel,
                    duration: 500,
                    onUpdate: (t) => {
                        this.cameras.main.setZoom(t.getValue())
                    }
                })
            }
            else {
                player.getStateMachine().transition('player-slide')
                this.tweens.addCounter({
                    from: this.cameras.main.zoom,
                    to: this.initialCameraZoom,
                    duration: 500,
                    onUpdate: (t) => {
                        this.cameras.main.setZoom(t.getValue())
                    }
                })
            }

            this.visitedPortals.push(portal)
        }
    }

    public updateScore(): void {
        const percentageProgress = Math.min(this.player.x / this.map.widthInPixels, 1)
        const score = Math.floor(percentageProgress * 100)
        this.scoreManager.updateScore(score, this.level)
    }

    public getPlayer(): Player {
        return this.player
    }

    update(time: number, delta: number): void {
        this.stateMachine.update(time, delta)
    }
}

export default PlayScene
