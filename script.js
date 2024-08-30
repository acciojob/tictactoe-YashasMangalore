// script.js
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const formSection = document.getElementById('form-section');
    const gameSection = document.getElementById('game-section');
    const messageDiv = document.getElementById('message');
    
    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    
    const cells = document.querySelectorAll('.cell');
    
    const checkWin = () => {
        const winPatterns = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
            [1, 5, 9], [3, 5, 7] // diagonals
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (document.getElementById(a).textContent &&
                document.getElementById(a).textContent === document.getElementById(b).textContent &&
                document.getElementById(a).textContent === document.getElementById(c).textContent) {
                return document.getElementById(a).textContent;
            }
        }
        
        return [...cells].every(cell => cell.textContent) ? 'draw' : null;
    };
    
    const handleClick = (e) => {
        const cell = e.target;
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            const winner = checkWin();
            if (winner) {
                if (winner === 'draw') {
                    messageDiv.textContent = "It's a draw!";
                } else {
                    messageDiv.textContent = `${winner === 'X' ? player1Name : player2Name}, congratulations you won!`;
                }
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`;
            }
        }
    };
    
    submitButton.addEventListener('click', () => {
        player1Name = document.getElementById('player-1').value;
        player2Name = document.getElementById('player-2').value;
        
        if (player1Name && player2Name) {
            formSection.style.display = 'none';
            gameSection.style.display = 'block';
            messageDiv.textContent = `${player1Name}, you're up!`;
            cells.forEach(cell => cell.addEventListener('click', handleClick));
        } else {
            alert('Please enter names for both players.');
        }
    });
});
