import Phaser from 'phaser'
import BackgroundScene from './scenes/BackgroundScene'
import LevelSelectScene from './scenes/LevelSelectScene'
import LoadingScene from './scenes/LoadingScene'
import MainScene from './scenes/MainScene'
import OverlayScene from './scenes/OverlayScene'
import PauseScene from './scenes/PauseScene'

import PlayScene from './scenes/PlayScene'
import Preloader from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        width: window.innerWidth,
        height: window.innerHeight
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {x: 0, y: 2500 },
		}
	},
	scene: [Preloader, LoadingScene, BackgroundScene, MainScene, LevelSelectScene, PlayScene, OverlayScene, PauseScene]
}

export default new Phaser.Game(config)