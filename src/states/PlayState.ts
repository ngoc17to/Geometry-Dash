import { State } from "../types/state";

class PlayState implements State{
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    update(): void {
        throw new Error("Method not implemented.");
    }

    enter(): void {
        this.scene.scene.start('PlayScene')
    }

    exit(): void {
        this.scene.scene.stop('PlayScene')
    }
}