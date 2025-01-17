import React, {useState} from 'react';
import {Name} from "../molecules/Name";
import {Workshops} from "../molecules/Workshops";
import styled from "styled-components";
import {Move} from "../molecules/Move";
import {PlayerBoard} from "../molecules/PlayerBoard";
import {HorizontalWrapper} from "./Configuration";
import {ActionButton} from "../atoms/ActionButton";
import {useLocation, useNavigate} from "react-router-dom";
import {BackendGameState, BackendMove, GameState, PlayerBoardState, TILES_COLORS} from "../auxiliary/types";
import {Color2Number, parseBackendGameState} from "../auxiliary/functions";


export const Play = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentGameState, setCurrentGameState] = useState<GameState>(location.state.initial_game_state);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    const players:string[] = location.state.initial_game_state.playerBoardsState.map((boardState: PlayerBoardState) => boardState.playerName);

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

    const makeMove = (workshop: number, color: string, patternLane: number) => {
        async function makeMoveRequest() {
            const move: BackendMove = {
              player_name: players[currentPlayer],
              move: {
                  factory_id: workshop,
                  color_id: Color2Number(color as TILES_COLORS),
                  pattern_line_row_id: patternLane
              }
            };

            const response = await fetch("http://127.0.0.1:5000/make_move", {
                method: "POST",
                body: JSON.stringify(move),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            return [response.status, data];
        }

        makeMoveRequest().then((response) => {
            const newGameState: BackendGameState = response[1][0].current_state;

            if (response[0] >= 300) {
                alert(response[1].error);
            }
            else if (response[0] === 211){
                navigate("../summary", {
                    state: {
                        finalGameState: newGameState
                }});
            }

            setCurrentGameState(parseBackendGameState(newGameState));
            setCurrentPlayer((prev) => (prev+1)%players.length);
        });
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
                    <h3>{players[currentPlayer]}'s turn</h3>
                    <ActionButton text="Quit Game" color="red" onClick={quitGame} isDisabled={false} type="button" />
                </HorizontalWrapper>
                <Workshops {...currentGameState.workshopState} />
            </div>
            <PlayerSide>
                <Move currentGameState={currentGameState} currentPlayer={players[currentPlayer]} onMove={makeMove} botsOnly={players.every((player) => player.slice(0,3) === "Bot")}/>
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