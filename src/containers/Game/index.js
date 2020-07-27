import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AppConstants from '../../config/appConstant';
import Player from '../../components/Player';
import Scoreboard from '../../components/Scoreboard';
import Weapons from '../../components/Weapons';
import Result from '../../components/Result';
import SwitchButton from '../../UI/Switch';
import Button from '../../UI/Button';
import * as gameActions from '../../store/actions';
import "./style.css";

/**
    Functional component Game, contains main execution logic
*/
const Game = (props) => {

    //Ref to store time interval object
    const timeInterval = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    //initializing dispatch so that it connects with store
    const dispatchGameActions = useDispatch();
    const onLoadInitializeState = useCallback(
        () => dispatchGameActions(gameActions.initializeState()
        ), [dispatchGameActions]);

    //Populate current game state object
    const gameState = useSelector(state => state);



    //Make call to store on comp initialize
    useEffect(() => {
        onLoadInitializeState();
    }, [onLoadInitializeState]);



    /**
     *  Method responsible to execute RPS and RPSLS rules and populate winner
     * @param  e, event object to prevent default action
     */
    const onWeaponSelected = (weapon) => {
        dispatchGameActions(gameActions.selectWeapon(weapon));
    }



    /**
     *  Start Game when stimulate mode is selected
     * @param  e, event object to prevent default action
     */
    const startGame = (e) => {
        e.preventDefault();
        dispatchGameActions(gameActions.simulateGame());
        setIsStarted(prevIsStarted => !prevIsStarted);
        timeInterval.current = setInterval(() => {
            dispatchGameActions(gameActions.simulateGame());
        }, 1500);
    }



    /**
     *  Reset Game, Score
     * @param e, event object to prevent default action
     */
    const resetGame = (e) => {
        e.preventDefault();
        clearTimeInterval();
    }



    /**
     *  Switch Player mode from verses to stimulate or vice-verse
     * @param e, event object to prevent default action
     */
    const switchPlayerMode = (e) => {
        clearTimeInterval();
        const currentMode = gameState.playerMode.mode['value'];
        dispatchGameActions(gameActions.switchPlayerMode(currentMode));
    }



    /**
     *  Switch Gaming mode from RPS to RPSLS or vice-versa
     * @param e, event object to prevent default action
     */
    const switchGameMode = (e) => {
        clearTimeInterval();
        const currentMode = gameState.gameMode.mode['value'];
        dispatchGameActions(gameActions.switchGameMode(currentMode));
    }



    /**
     *  Utility to cleartimeout
     */
    const clearTimeInterval = () => {
        setIsStarted(false);
        dispatchGameActions(gameActions.resetGame());
        if (timeInterval && timeInterval.current) {
            clearInterval(timeInterval.current);
        }
    }



    //Populate versesContent based on playermode     
    let versesContent = null;
    versesContent = gameState.playerMode.mode.value === 'verses' && <React.Fragment>
        <Result gameMode={gameState.playerMode.mode.value}
            resultText={gameState.resultText}></Result>

        <section className="margin-small">
            <div className="fluid">
                <Weapons gameState={gameState}
                    onWeaponSelected={onWeaponSelected}></Weapons>
            </div>
        </section>
        <article>
            <Button label={AppConstants.RESET_LABEL}
                onClickMode={resetGame}
                icon="fa fa-refresh"></Button>
        </article>
    </React.Fragment>

    //Populate stimulator based on playermode
    let stimulatorContent = null;
    stimulatorContent = gameState.playerMode.mode.value === 'simulate' && <React.Fragment>
        <Result gameMode={gameState.playerMode.mode.value}
            resultText={gameState.resultText}></Result>

        <section className="margin-small">
            <div className="fluid">
                <Button customClass="" label={gameState.resultText ? AppConstants.RESUME_LABEL : AppConstants.START_LABEL}
                    onClickMode={startGame}
                    disabled={isStarted}
                    icon={!gameState.resultText ? "fa fa-play-circle" : "fa fa-pause-circle"}></Button>
                    &nbsp;&nbsp;
                <Button label={AppConstants.RESET_LABEL}
                    onClickMode={resetGame}
                    icon="fa fa-refresh"></Button>
            </div>
        </section>
    </React.Fragment>



    return (
        <>
            <section >
                <div className="fluid">
                    <div className="row-flex content-at-center">
                        <div className="flex-col">
                            <div className="display-flex content-at-center">
                                <div>
                                    <SwitchButton label="Switch Game"
                                        onChangeMode={switchGameMode}
                                        selectedMode={gameState.gameMode.mode.value === 'rpsls'}></SwitchButton>
                                </div>
                                <div className="paddingLeft-medium">
                                    <SwitchButton label="Switch Mode"
                                        onChangeMode={switchPlayerMode}
                                        selectedMode={gameState.playerMode.mode.value === 'simulate'}></SwitchButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="margin-large">
                        <h5>{gameState.playerMode.mode.label}</h5>
                        <div className="container">
                            <div className="row-flex">
                                <div className="flex-col-short">
                                </div>
                                <div className="flex-col-full">
                                    <Player label={gameState.playerMode.mode.player1Label}
                                        player={gameState.player1}></Player>
                                </div>
                                <div className="flex-col-full">
                                    <Scoreboard gameState={gameState}></Scoreboard>
                                </div>
                                <div className="flex-col-full">
                                    <Player label={gameState.playerMode.mode.player2Label}
                                        player={gameState.player2}></Player>
                                </div>
                                <div className="flex-col-short">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {versesContent}
            {stimulatorContent}
        </>
    );
};

export default Game;