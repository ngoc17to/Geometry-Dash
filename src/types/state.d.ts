export interface State {
    enter(data?: any[]): void;
    update(): void;
    exit(): void;
}