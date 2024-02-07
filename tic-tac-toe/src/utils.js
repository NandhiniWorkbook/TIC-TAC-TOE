const winningPatterns = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
]

export function findWinner(currentBoard) {
    const foundMatch = winningPatterns.find((row, rowIndex) => {
        const firstEntry = currentBoard[row[0][0]][row[0][1]];
        const firstPattern = firstEntry !== null ? firstEntry.symbol : null;
        
        const foundMatch = row.every((col, colIndex) => {
            const pattern = currentBoard[col[0]][col[1]] !== null ? currentBoard[col[0]][col[1]].symbol : null;
            return firstPattern === pattern;
        });

        return foundMatch;
    })

    if(foundMatch) {
        return currentBoard[foundMatch[0][0]][foundMatch[0][1]]
    }
    return undefined;
}

export function findIsGameOver(currentGameBoard) {
    for (const row of currentGameBoard) {
        const isBoxUntouched = row.find(col => {
            return col === null
        })

        if(isBoxUntouched !== undefined) {
            return false;   
        }
    }

    return true;
}