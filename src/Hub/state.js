import {Record, OrderedMap} from 'immutable';
import {getRandomWord, matching} from './word.js';

export class Players extends Record({
    index: -1,
    pool: new OrderedMap(),
}) {
  broadcast(message) {
    this.broadcastExcept(null, message);
  }

  broadcastExcept(exceptedPlayer, message) {
    this.pool.forEach(player => {
      if (player !== exceptedPlayer) {
        player.sendMessage(message);
      }
    });
  }

  get current() {
    if (this.index < 0) {
        return undefined;
    }

    return this.pool.toList().get(this.index % this.pool.size);
  }

  get ready() {
    if (this.pool.size === 0) {
        return false;
    }

    return this.pool.filter(player => !player.ready).size === 0;
  }

  next() {
     return this.set('index', this.index + 1);
  }

  update(player) {
    return this.set('pool', this.pool.set(player.remote, player));
  }
}

export class GameState extends Record({
  players: new Players(),
  session: null,
  scoreRate: null,
  word: null,
}) {
    get ready() {
        return this.players.ready;
    }

    addConnection(conn) {
        const player = new Player({remote: conn});
        return this.setPlayer(player);
    }

    async join(player, name) {
        player.sendMessage({
            type: 'ready',
        });

        const next = this.setPlayer(player.setName(name));

        if (!next.ready) {
            return next;
        }

        return next.nextPlayer();
    }

    async guess(guesser, word) {
        if (!matching(word, this.word)) {
            return this;
        }

        const drawer = this.players.current;

        drawer.sendMessage({
            type: 'correct-guess',
        });

        guesser.sendMessage({
            type: 'win',
            guess: word,
        });

        return this
            .setPlayer(guesser.bumpScore(this.scoreRate))
            .setPlayer(drawer.bumpScore(this.scoreRate))
            .nextPlayer();
    }

    get playerList() {
        return this.players.pool.toList();
    }

    async handleMessage(conn, message) {
        const player = this.players.pool.get(conn);

        console.log('Handling message', player, message);

        switch (message.type) {
            case 'join':
                return this.join(player, message.name);

            case 'guess':
                return this.guess(player, message.guess);

            default:
                return this;
        }
    }

    setPlayer(player) {
        return this.set('players', this.players.update(player));
    }

    async nextPlayer() {
        const word = await getRandomWord();

        const players = this.players.next();
        const drawer = players.current;

        drawer.sendMessage({
            type: 'drawing',
            word,
        });

        players.broadcastExcept(drawer, {
            type: 'guessing',
        });

        return this
            .set('word', word)
            .set('scoreRate', 100)
            .set('players', players);
    }
}

export class Player extends Record({
  score: 0,
  ready: false,
  name: null,
  remote: null,
}) {
    bumpScore(amount) {
        return this.set('score', this.score + amount);
    }

    sendMessage(message) {
        this.remote.send(message);
    }

    setName(name) {
        return this
            .set('name', name)
            .set('ready', true);
    }
}
