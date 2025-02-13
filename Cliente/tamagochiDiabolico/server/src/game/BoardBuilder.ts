import { Board } from "./entities/Board";

export class BoardBuilder {
    private board: Board;
    public size = 8;
    constructor() {
        this.board = {
            size: this.size,
            elements: []
        }
        const map: Array<number[]> = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0],
            [0, 5, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 0, 0, 0, 0, 0]
        ];
        
        let bushCount = 0;
        map.forEach(row => {
            bushCount += row.filter(cell => cell === 5).length;
        });
        
        const positions = new Set<string>();
        const isCorner = (x: number, y: number) => {
            return (x === 0 && y === 0) ||
                (x === 0 && y === this.board.size - 1) ||
                (x === this.board.size - 1 && y === 0) ||
                (x === this.board.size - 1 && y === this.board.size - 1);
        };
        const isAdjacent = (x: number, y: number) => {
            for (const pos of positions) {
                const [px, py] = pos.split(',').map(Number);
                if (Math.abs(px - x) <= 1 && Math.abs(py - y) <= 1) {
                    return true;
                }
            }
            return false;
        };
        while (positions.size < bushCount) {
            const x = Math.floor(Math.random() * this.board.size);
            const y = Math.floor(Math.random() * this.board.size);
            if (isCorner(x, y) || isAdjacent(x, y)) continue;
            positions.add(`${x},${y}`);
        }
        positions.forEach(pos => {
            const [x, y] = pos.split(',').map(Number);
            this.board.elements.push({ x, y });
        });
    }

    public getBoard(): Board {
        return this.board;
    }
}