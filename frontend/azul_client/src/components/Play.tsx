import React from 'react';
import {Name} from "../molecules/Name";
import {Workshops} from "../molecules/Workshops";
import styled from "styled-components";
import {Move} from "../molecules/Move";
import {PlayerBoard} from "../molecules/PlayerBoard";
import {HorizontalWrapper} from "./Configuration";
import {mockPlayState} from "../auxiliary/constants";


export const Play = () => {
    return <Board>
        <Name padding_top={0} left_position={42}/>
        <InnerBoard>
            <PlayerSide>
                {mockPlayState.playerBoardsState.map((player, idx) => {
                    if (idx < 2) {
                        return <PlayerBoard {...player}/>
                    }
                })}
            </PlayerSide>
            <div>
                <HorizontalWrapper>
                    <h3>Player 1 turn</h3>
                </HorizontalWrapper>
                <Workshops />
            </div>
            <PlayerSide>
                <Move />
                {mockPlayState.playerBoardsState.map((player, idx) => {
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