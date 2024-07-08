import { State } from "../types/state";
import StateMachine from "./StateMachine";

class PauseState implements State {
    public stateMachine: StateMachine;

    constructor() {
    }

    execute(...stateArgs: any[]): void {
    }

    enter(data?: any): void {
    }

    exit(): void {
    }
}

export default PauseState