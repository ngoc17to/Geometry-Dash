export interface State {
    public stateMachine: StateMachine
    abstract enter(...stateArgs: any[]): void;
    abstract execute(...stateArgs: any[]): void;
    abstract exit(): void;
}