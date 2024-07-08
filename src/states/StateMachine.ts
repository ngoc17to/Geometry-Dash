import { State } from "../types/state"

class StateMachine {
    private state: string | null
    private initialState: string
    private possibleStates: { [state: string]: State }
    private stateArgs: any[]

    constructor(initialState: string, possibleStates: { [state: string]: State } = {}, stateArgs: any[] = []) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;
        
        for (const state of Object.values(this.possibleStates)) {
            state.stateMachine = this;
        }
    }
    public step(): void {
        // On the first step, the state is null and we need to initialize the first state.
        if (this.state === null) {
            this.state = this.initialState;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }
        // Run the current state's execute
        this.possibleStates[this.state].execute(...this.stateArgs);
    }
    public transition(newState: string, ...enterArgs: any[]): void {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

export default StateMachine