import Player from "../game-objects/Player";
import PlayScene from "../scenes/PlayScene";
import { State } from "../types/state";
import StateMachine from "./StateMachine";

class PlayState implements State {
    public stateMachine: StateMachine;
    public scene: PlayScene;

    constructor() {
    }

    enter(scene: PlayScene): void {
        this.scene = scene;
                
        const playSound = scene.sound.add('playSound');
        playSound.play();

        scene.levelMusic = scene.sound.add('level1bmg', { loop: true });
        scene.levelMusic.play();

        this.scene.scene.launch('OverlayScene', { currentScene: scene })
    }

    execute(scene: PlayScene): void {

    }


    exit(): void {
        this.scene.levelMusic.stop();
    }
}

export default PlayState