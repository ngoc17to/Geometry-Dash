import { State } from "../types/state"

class StateMachine {
    private currentState: State
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    setState(state: State): void {
        if (this.currentState) {
            this.currentState.exit()
        }
        this.currentState = state
        this.currentState.enter()
    }
}

export default StateMachine