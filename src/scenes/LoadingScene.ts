class LoadingScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite
    
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
        this.background.setScale(2)
        this.background.setTint(0x2936eb)
        
        this.add.image(width/2, height/2, 'title').setScale(0.75)
        const sliderGroove = this.add.image(width / 2, height * 2 / 3, 'sliderGroove')
        sliderGroove.setOrigin(0.5)

        const sliderBars: Phaser.GameObjects.Image[] = []
        const maxBars = 7

        this.load.on('progress', (value: number) => {
            // Xóa các sliderBar cũ
            sliderBars.forEach(bar => bar.destroy())
            sliderBars.length = 0
        
            // Tạo và cập nhật sliderBar mới
            const numBars = Math.ceil(value * maxBars)
            const grooveLeft = sliderGroove.x - sliderGroove.displayWidth / 2
            const barWidth = sliderGroove.displayWidth / maxBars
            const startX = grooveLeft + barWidth / 2
        
            for (let i = 0; i < numBars; i++) {
                const sliderBar = this.add.image(
                    startX + i * barWidth,
                    sliderGroove.y,
                    'sliderBar'
                );
                sliderBar.setOrigin(0.5, 0.5);
                sliderBars.push(sliderBar);
            }
        });
        
        this.load.on('complete', () => {
            sliderBars.forEach(bar => bar.destroy())
            sliderGroove.destroy()
        });

        for (let i = 1; i <= 8; i++) {
			const num = i.toString().padStart(2, '0')
            this.load.image('square' + num, `assets/images/GJ_GameSheet-hd/square_${num}_001.png`)
        }
        for (let i = 1; i <= 4; i++) {
			const num = i.toString().padStart(2, '0')
            this.load.image('spike' + num, `assets/images/GJ_GameSheet-hd/spike_${num}_001.png`)
            this.load.image('spikes' + num, `assets/images/GJ_GameSheet-hd/d_spikes_${num}_001.png`)
        }
        for (let i = 1; i <= 4; i++) {
			const num = i.toString().padStart(2, '0')
            this.load.image('coin' + num, `assets/images/GJ_GameSheet02-hd/secretCoin_${num}_001.png`)
        }
        for (let i = 1; i <= 4; i++) {
			const num = i.toString().padStart(2, '0')
            this.load.image('portal' + num + 'f', `assets/images/GJ_GameSheet02-hd/portal_${num}_front_001.png`)
            this.load.image('portal' + num + 'b', `assets/images/GJ_GameSheet02-hd/portal_${num}_back_001.png`)
        }
        this.load.image('plank01', `assets/images/GJ_GameSheet-hd/plank_01_001.png`)
        this.load.image('bump', 'assets/images/GJ_GameSheet-hd/gravbump_01_001.png')
        this.load.image('bumpGlow', 'assets/images/GJ_GameSheetGlow-hd/gravbump_01_glow_001.png')
        this.load.image('jumpRing', 'assets/images/GJ_GameSheet-hd/gravJumpRing_01_001.png')
        this.load.tilemapTiledJSON('level1', 'assets/resource/GD_level_01.json')

        this.load.image('platform', 'assets/images/groundSquare_01_001-hd.png')
        this.load.image('ground', 'assets/images/GJ_GameSheet02-hd/smartBlock01_001.png')

        this.load.image('player1', 'assets/icons-hd/player_02/player_02_glow_001.png')
        this.load.image('player2', 'assets/icons-hd/player_02/player_02_001.png')
        this.load.image('player3', 'assets/icons-hd/player_02/player_02_2_001.png')
        this.load.image('ship1', 'assets/icons-hd/ship_02/ship_02_glow_001.png')
        this.load.image('ship2', 'assets/icons-hd/ship_02/ship_02_001.png')
        this.load.image('ship3', 'assets/icons-hd/ship_02/ship_02_2_001.png')

        this.load.image('particle', 'assets/images/GJ_ParticleSheet-hd/particle_25_001.png')
        this.load.image('shipParticle', 'assets/images/GJ_ParticleSheet-hd/particle_25_001.png')
        this.load.image('squareParticle', 'assets/images/GJ_ParticleSheet-hd/particle_00_001.png')

        this.load.image('playBtn', 'assets/images/GJ_GameSheet03-hd/GJ_playBtn_001.png')
        this.load.image('lv1Btn', 'assets/images/GJ_GameSheet03-hd/difficulty_01_btn_001.png')
        this.load.image('lv2Btn', 'assets/images/GJ_GameSheet03-hd/difficulty_02_btn_001.png')
        this.load.image('lv3Btn', 'assets/images/GJ_GameSheet03-hd/difficulty_03_btn_001.png')
        this.load.image('resumeBtn', 'assets/images/GJ_GameSheet03-hd/GJ_playBtn2_001.png')
        this.load.image('pauseBtn', 'assets/images/GJ_GameSheet03-hd/GJ_pauseEditorBtn_001.png')
        this.load.image('replayBtn', 'assets/images/GJ_GameSheet03-hd/GJ_replayBtn_001.png')
        this.load.image('menuBtn', 'assets/images/GJ_GameSheet03-hd/GJ_menuBtn_001.png')

        this.load.audio('level1bmg', 'assets/sounds/StereoMadness.mp3');

        this.load.bitmapFont('bigFont', 'assets/images/bigFont-hd.png', 'assets/fonts/bigFont-hd.fnt');
        this.load.on('filecomplete', (fileKey: string, type: string, file: any) => {
            if (fileKey === 'bigFont') {
                console.log('Bitmap font loaded:', fileKey);
            }
        });
    }

    create(): void {
        this.scene.start('MainScene');
    }
}

export default LoadingScene