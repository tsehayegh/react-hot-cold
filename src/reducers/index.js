
import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from '../actions';

const initialState = {
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.round(Math.random() * 100) + 1
}

export const playGame = (state=initialState, action) {
	if(action.type === 'RESTART_GAME') {
		return Object.assign({}, state, {
	      guesses: [],
	      feedback: 'Make your guess!',
	      auralStatus: '',
	      correctAnswer: action.correctAnswer		
		})
	} else if(action.type === MAKE_GUESS) {
        let feedback, guess;

        guess = parseInt(action.guess, 10);
        if (isNaN(guess)) {
            feedback = 'Please enter a valid number.';

            return Object.assign({}, state, {
                feedback,
                guesses: [...state.guesses, guess]
            });
        }

	    const difference = Math.abs(guess - state.correctAnswer);

	    if (difference >= 50) {
	      feedback = 'You\'re Ice Cold...';
	    } else if (difference >= 30) {
	      feedback = 'You\'re Cold...';
	    } else if (difference >= 10) {
	      feedback = 'You\'re Warm.';
	    } else if (difference >= 1) {
	      feedback = 'You\'re Hot!';
	    } else {
	      feedback = 'You got it!';
	    }
		return Object.assign({}, state, {
			guesses: [...state.guesses, guess],
			feedback
		})
	} else if(action.type === GENERATE_AURAL_UPDATE) {
		
	    const pluralize = state.guesses.length !== 1;
	    let  auralStatus = `Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;
	    if (state.guesses.length > 0) {
	      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${state.guesses.reverse().join(', ')}`;
	    }

	    return Object.assign({}, state, {
	    	auralStatus
	    });
	}

	return state;
}

