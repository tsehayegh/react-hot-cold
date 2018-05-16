import {createStore} from 'redux';

import {playGame} from './reducers';

export default createStore(playGame);