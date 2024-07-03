import Phaser from 'phaser'
import Square from '../obstacles/Square'
import Platform from '../game-objects/Platform'
import Player from '../game-objects/Player'
import Spike from '../obstacles/Spike'
import Portal from '../obstacles/Portal'

class PlayScene extends Phaser.Scene
{
    public player!: Player
    private level: number;
    private platforms!: Platform
    private squareObstacles: Phaser.Physics.Arcade.Group
    private spikeObstacles: Phaser.Physics.Arcade.Group
    private portals: Phaser.Physics.Arcade.Group
    private visitedPortals: Portal[] = []
    private map: Phaser.Tilemaps.Tilemap
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

	constructor()
	{
		super({ key: "PlayScene" })
	}

    init(data: any) {
        this.level = data.level
    }

    create()
    {        
        this.physics.world.TILE_BIAS = 32
        this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight)
        const { height, width } = this.scale


        //============================CREATE OBJECTS=================================
        this.player = new Player({
            scene: this,
            x: 0,
            y: 3/2*this.sys.canvas.height  ,
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
			this.map.addTilesetImage('GD_lv1', 'plank' + num)
        }
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

        //================PORTAL================
        this.map.addTilesetImage('GD_lv1', 'portal04f')
        this.map.addTilesetImage('GD_lv1', 'portal04b')

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
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0)
        this.cameras.main.setFollowOffset(-this.sys.canvas.width / 3, 0)
        this.cameras.main.setLerp(0.1, 0.2) 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)        
    //======================COLLISION=========================
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.overlap(this.player, this.portals, this.changeState as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

    //========================================================
        this.cursors = this.input.keyboard?.createCursorKeys()

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

    update() {
        this.player.update()        
        if(this.cursors?.down.isDown){
            if(this.player.state == 'square'){
                this.player.setState('ship')
            }
            else this.player.setState('square')
            this.player.updateSprite()
        }
        //             // console.log(this.player.y, this.cameras.main.scrollY, this.cameras.main.height)
        // if (this.player.y - this.cameras.main.scrollY < 150) {
        //     this.cameras.main.scrollY = this.player.y - 150
        // } else if (this.player.y - this.cameras.main.scrollY + this.cameras.main.height > 200) {
        //     this.cameras.main.scrollY = this.player.y + 200
        // } else {
        //     // Giữ camera y cố định nếu player nằm trong khoảng không gian
        //     this.cameras.main.scrollY = this.cameras.main.scrollY;
        // }
        this.cameras.main.scrollY = this.player.y - 150
        if(this.player.state === 'ship'){
            
            this.cameras.main.setFollowOffset(-this.sys.canvas.width / 3, this.sys.canvas.height / 8)
        }

    }
}

export default PlayScene
