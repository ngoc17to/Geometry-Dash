class ScoreManager {
    private currentScore: number = 0
    private currentCoin: number = 0
    private highScores: { [key: number]: number };

    constructor() {
        this.currentScore = 0
        this.currentCoin = 0

        this.highScores = {};
        const storedScores = localStorage.getItem('highScores');
        if (storedScores) {
            this.highScores = JSON.parse(storedScores);
        }
    }

    public getCurrentScore(): number {
        return this.currentScore
    }

    public getCurrentCoin(): number {
        return this.currentCoin
    }

    public getHighScore(levelKey: number): number {
        return this.highScores[levelKey] || 0;
    }

    public updateScore(score: number, levelKey: number): void {
        this.currentScore = score
        const currentHighScore = this.getHighScore(levelKey);
        if (this.currentScore > currentHighScore) {
            this.highScores[levelKey] = this.currentScore;
            localStorage.setItem('highScores', JSON.stringify(this.highScores));
        }
    }

    public updateCoin(): void {
        this.currentCoin++
    }

    public resetScore(): void {
        this.currentScore = 0
        this.currentCoin = 0
    }
}

export default ScoreManager