import React, {useState} from 'react';
import {Name} from "../molecules/Name";
import {Workshops} from "../molecules/Workshops";
import styled from "styled-components";
import {Move} from "../molecules/Move";
import {PlayerBoard} from "../molecules/PlayerBoard";
import {HorizontalWrapper} from "./Configuration";
import {mockPlayState} from "../auxiliary/constants";
import {ActionButton} from "../atoms/ActionButton";
import {useLocation, useNavigate} from "react-router-dom";
import {GameState} from "../auxiliary/types";


//TODO: move needs onClick function that will fetch "make_move" API
export const Play = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentGameState, setCurrentGameState] = useState<GameState>(location.state.initial_game_state);

    const quitGame = () => {
            async function endGameRequest() {
                const response = await fetch("http://127.0.0.1:5000/end_game", {
                    method: "GET",
                });
                const data = await response.json();
                return [response.status, data];
            }

        endGameRequest().then((response) => {
            if (response[0] >= 300) {
                alert(response[1].error);
            }
            navigate("..");
        })
    };

    return <Board>
        <Name padding_top={0} left_position={42}/>
        <InnerBoard>
            <PlayerSide>
                {currentGameState.playerBoardsState.map((player, idx) => {
                    if (idx < 2) {
                        return <PlayerBoard {...player}/>
                    }
                })}
            </PlayerSide>
            <div>
                <HorizontalWrapper>
                    <h3>Player 1 turn</h3>
                    <ActionButton text="Quit Game" color="red" onClick={quitGame} isDisabled={false} type="button" />
                </HorizontalWrapper>
                <Workshops {...currentGameState.workshopState} />
            </div>
            <PlayerSide>
                <Move />
                {currentGameState.playerBoardsState.map((player, idx) => {
                    if (idx >= 2) {
                        return <PlayerBoard {...player}/>
                    }
                })}
            </PlayerSide>
        </InnerBoard>
    </Board>
};

const Board = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    
    justify-content: center;
    align-items: center;
`;

const InnerBoard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    
    gap: 10px;
    justify-content: center;
    align-items: center;
`;

const PlayerSide = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    
    justify-content: center;
    align-items: center;
    
    width: 29vw;
    height: 90vh;
    
    gap: 10px;
    padding: 0px 20px;
`;