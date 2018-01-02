import {GameState, Player} from '../state.js';

describe('Hub state', () => {
    function createFakeRemote() {
        return {
            send: jest.fn(),
        };
    }

    let state;

    beforeEach(() => {
        state = new GameState();
    });

    it('has no drawer until nextPlayer called', () => {
        const player = new Player();
        expect(state.players.current).toBe(undefined);
        state = state.setPlayer(player);
        expect(state.players.current).toBe(undefined);
        state = state.nextPlayer();
        expect(state.players.current).toBe(player);
    });

    it('defaults to not ready', () => {
        expect(state.ready).toBe(false);
    });

    it('is ready when all players ready', () => {
        state = state
            .setPlayer(new Player({remote: 1, ready: true}))
            .setPlayer(new Player({remote: 2, ready: true}));
        expect(state.ready).toBe(true);
    });

    it('is not ready if containing unready players', () => {
        state = state
            .setPlayer(new Player({remote: 1, ready: false}))
            .setPlayer(new Player({remote: 2, ready: true}));
        expect(state.ready).toBe(false);
    });

    describe('#updatePlayer', () => {
        it('calls nextPlayer when all players are ready', () => {

        });
    });

    describe('#nextPlayer()', () => {
        const player1 = new Player({remote: createFakeRemote()});
        const player2 = new Player({remote: createFakeRemote()});
        const player3 = new Player({remote: createFakeRemote()});

        beforeEach(() => {
            state = state
                .setPlayer(player1)
                .setPlayer(player2)
                .setPlayer(player3);
        });

        it('sets current player to next', async () => {
            state = await state.nextPlayer();
            expect(state.players.current).toBe(player1);
            expect(player1.remote.send.mock.calls.length).toBe(1);
            expect(player1.remote.send.mock.calls[0]).toEqual([{"type": "drawing", "word": state.word}]);
            expect(player2.remote.send.mock.calls.length).toBe(1);
            expect(player2.remote.send.mock.calls[0]).toEqual([{"type": "guessing"}]);
            expect(player3.remote.send.mock.calls.length).toBe(1);
            expect(player3.remote.send.mock.calls[0]).toEqual([{"type": "guessing"}]);

            state = await state.nextPlayer();
            expect(state.players.current).toBe(player2);
            expect(player2.remote.send.mock.calls.length).toBe(2);
            expect(player2.remote.send.mock.calls[1]).toEqual([{"type": "drawing", "word": state.word}]);
            expect(player1.remote.send.mock.calls.length).toBe(2);
            expect(player1.remote.send.mock.calls[1]).toEqual([{"type": "guessing"}]);
            expect(player3.remote.send.mock.calls.length).toBe(2);
            expect(player3.remote.send.mock.calls[1]).toEqual([{"type": "guessing"}]);

            state = await state.nextPlayer();
            expect(state.players.current).toBe(player3);
            expect(player3.remote.send.mock.calls.length).toBe(3);
            expect(player3.remote.send.mock.calls[2]).toEqual([{"type": "drawing", "word": state.word}]);
            expect(player2.remote.send.mock.calls.length).toBe(3);
            expect(player2.remote.send.mock.calls[2]).toEqual([{"type": "guessing"}]);
            expect(player1.remote.send.mock.calls.length).toBe(3);
            expect(player1.remote.send.mock.calls[2]).toEqual([{"type": "guessing"}]);

            state = await state.nextPlayer();
            expect(state.players.current).toBe(player1);
            expect(player1.remote.send.mock.calls.length).toBe(4);
            expect(player1.remote.send.mock.calls[3]).toEqual([{"type": "drawing", "word": state.word}]);
            expect(player2.remote.send.mock.calls.length).toBe(4);
            expect(player2.remote.send.mock.calls[3]).toEqual([{"type": "guessing"}]);
            expect(player3.remote.send.mock.calls.length).toBe(4);
            expect(player3.remote.send.mock.calls[3]).toEqual([{"type": "guessing"}]);
        });
    });
});
