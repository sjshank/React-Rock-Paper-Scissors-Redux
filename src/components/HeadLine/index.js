import React from 'react';
import "./style.css";
import { useSelector } from 'react-redux';

/**
    Functional component Headline, displays application header
*/
const Headline = (props) => {

    //Populate current game state object
    const gameState = useSelector(state => state);

    return (
        <>
            <div className="fluid header-section">
                <div className="row-flex">
                    <div className="flex-col">
                        <div className="">
                            <h1 className="header-label">
                                {gameState.gameMode.mode.label}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="headline-hr" />
        </>
    )
}

export default React.memo(Headline);