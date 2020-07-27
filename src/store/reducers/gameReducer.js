import * as AppConstants from '../../config/appConstant';
import * as actionTypes from "../actions/actionTypes";
import * as helper from './gameUtility';

//Initial state of application
const Initial_Game_State = {
    'player1': {
        'score': 0,
        'weapon': null,
        'loading': false
    },
    'player2': {
        'score': 0,
        'weapon': null,
        'loading': false
    },
    'winner': null,
    'ties': 0,
    'gameMode': {
        'mode': AppConstants.GAME_MODES.rps,
        'weaponList': AppConstants.RPS_APP_CONSTANT
    },
    'playerMode': {
        'mode': AppConstants.PLAYER_MODES.verses
    },
    'resultText': null
};

/**
 * Reducer to handle all the dispatched action from GameContext
 * @param  state, current application state
 * @param  action, type of action and request params
 */
export const reducer = (state = Initial_Game_State, action) => {
    switch (action.type) {
        case actionTypes.INITIALIZE_STATE:
            return helper.loadCurrentState(state, action);
        case actionTypes.SWITCH_GAME_MODE:
            return helper.switchGamingMode(state, action);
        case actionTypes.SWITCH_PLAYER_MODE:
            return helper.switchPlayingMode(state, action);
        case actionTypes.PLAY_GAME:
            return helper.getWinner(state, action);
        case actionTypes.RESET_GAME:
            return helper.resetGame(state, action);
        case actionTypes.SIMULATE_GAME:
            return helper.getWinner(state, action);
        default:
            return state;
    }
};


export default reducer;