import { createApp, h, hFragment } from "./../../packages/runtime/dist/naby.js";
const MAX_MOVE = 9;
const checkWinner = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const flatBoard = [
        ...board[0],
        ...board[1],
        ...board[2]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        
        if (
            flatBoard[a] &&
            flatBoard[a] === flatBoard[b] &&
            flatBoard[a] === flatBoard[c]
        ) {
            return flatBoard[a];
        }
    }
    return null;
}

const state = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    players: ['X', 'O'],
    counter: 0,
    winner: null,
}

const reducers = {
    mark: (state, { row, col }) => {
        if (row > 3 || row < 0 || col > 3 || col < 0) {
            throw new Error('Invalid move')
        }
        if (state.board[row][col]) { 
            throw new Error('Invalid move')
        }
        const newBoard = [ 
            state.board[0],
            state.board[1],
            state.board[2]
        ]
        newBoard[row][col] = state.players[state.counter % 2];
        const winner = checkWinner(newBoard);

        return { 
            ...state,
            board: newBoard,
            counter: winner ? state.counter : state.counter + 1,
            winner,
        };
    },
    'reset-board' : (state) => ({...state, counter:0, winner: null, board: [[null, null, null],[null, null, null],[null, null, null]]})   
}

const Board = ({ board, winner, counter }, emit ) => {
    
    return hFragment(board.map((row, i) => {
        return h('tr', {}, [
            hFragment(row.map((col, j) => {
                return h('th',
                {},
                [
                    h('button', 
                        {
                            style:{height:'32px', width: '32px'}, 
                            disabled: !!winner || counter === MAX_MOVE,
                            on: {
                                click: () => {
                                    emit('mark', { row: i, col: j });
                                }
                            },
                        },
                        [col ? col : ''])
                ])
            }))
        ]);
    }));
}

const Header = ({counter, winner, players}) => {
    return h('h1', {}, [!winner 
        ? counter === MAX_MOVE 
            ? 'Game ended in a draw' 
            : `it's ${players[counter%2]} turn` 
        : `the winner is ${players[counter%2]}`]);
}

const app = createApp({
    state,
    reducers,
    view: (state, emit) => {
        return hFragment([
            Header(state),
            Board(state, emit),
            h('button', {on:{click: () => emit('reset-board')}}, ['Reset'])
        ])
    }
});

app.mount(document.getElementById('root'));