import * as actionTypes from './actionTypes';

/**
*  Load game state
*/
export const initializeState = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.INITIALIZE_STATE
        });
    }
}

/**
 *  Switch Gaming mode from RPS to RPSLS or vice-versa
 */
export const switchGameMode = (currentGameMode) => {
    return dispatch => {
        //Reset score before switching game mode
        dispatch({ type: actionTypes.RESET_GAME });
        //Dispatch Game switch action
        dispatch({
            type: actionTypes.SWITCH_GAME_MODE,
            currentMode: currentGameMode
        });
    }
}

/**
 *  Switch Player mode from verses to stimulate or vice-verse
 */
export const switchPlayerMode = (currentPlayerMode) => {
    return dispatch => {
        //Reset score before switching game mode
        dispatch({ type: actionTypes.RESET_GAME });
        //Dispatch Player switch action
        dispatch({
            type: actionTypes.SWITCH_PLAYER_MODE,
            currentMode: currentPlayerMode
        });
    }
}

/**
*  Execute stimulate mode
*/
export const simulateGame = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.SIMULATE_GAME
        });
    }
}

/**
 *  Execute logic and get the winner
 */
export const selectWeapon = (weapon) => {
    return dispatch => {
        dispatch({
            type: actionTypes.PLAY_GAME,
            selectedWeapon: weapon
        });
    }
}


/**
 *  Reset game and score
 */
export const resetGame = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.RESET_GAME
        });
    }
}