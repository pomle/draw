import {matching, getRandomWord} from '../word.js';

Math.random = jest.fn();

describe('Words', () => {
    describe('#matching()', () => {
        it('is case insensitive', () => {
            expect(matching('BOAT', 'boat')).toBe(true);
            expect(matching('BOAK', 'boat')).toBe(false);
        });

        it('ignores white space errors', () => {
            expect(matching(' bo at', 'boaT')).toBe(true);
            expect(matching(' bo at', 'boaK')).toBe(false);
        });
    });

    describe('#getRandomWord()', () => {
       it('eventually returns a word', async () => {
            Math.random.mockReturnValue(0.3);
            const word = await getRandomWord();
            expect(word).toBe('bonfire');
        });

        it('is kind of random', async () => {
            Math.random.mockReturnValue(0.3);
            const word1 = await getRandomWord();
            Math.random.mockReturnValue(0.7);
            const word2 = await getRandomWord();
            expect(word1).toBe('bonfire');
            expect(word2).toBe('sunset');
        });
    });
});
