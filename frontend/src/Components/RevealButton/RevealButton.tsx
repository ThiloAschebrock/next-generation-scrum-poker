import { Votes } from '../../types/WebSocket';
import classes from './RevealButton.module.css';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import { BUTTON_REVEAL_NOW, BUTTON_REVEAL_VOTES, VOTE_NOTE_VOTED } from '../../constants';

const getNumberOfMissingVotes = (votes: Votes): number =>
  Object.values(votes).reduce((count, vote) => (vote === VOTE_NOTE_VOTED ? count + 1 : count), 0);

export const RevealButton = connectToWebSocket(
  ({
    socket: {
      revealVotes,
      state: { votes },
    },
  }) => {
    const missingVotes = getNumberOfMissingVotes(votes);
    if (missingVotes > 0) {
      return (
        <button class={classes.revealButton} onClick={revealVotes}>
          <div class={classes.revealNowButtonInfo}>{missingVotes} missing votes</div>
          {BUTTON_REVEAL_NOW}
        </button>
      );
    }
    return (
      <button class={classes.revealButton} onClick={revealVotes}>
        {BUTTON_REVEAL_VOTES}
      </button>
    );
  }
);
