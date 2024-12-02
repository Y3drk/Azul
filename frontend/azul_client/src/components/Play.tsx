import React from 'react';
import {Name} from "../molecules/Name";
import {mockTiles, WorkshopInfo, Workshops} from "../molecules/Workshops";
import styled from "styled-components";
import {Move} from "../molecules/Move";
import {TILES_COLORS, TilesInfo} from "../atoms/Factory";
import {PlayerBoard} from "../molecules/PlayerBoard";
import {ActionButton} from "../atoms/ActionButton";
import {HorizontalWrapper} from "./Configuration";


export type PlayerBoardState = {
    playerName: string;
    currentPoints: number;
    lanes: {
        laneId: number;
        tilesOnLane?: TilesInfo;
    }[];
    wall: boolean[][];
    floor: TilesInfo[];
}


export type GameState = {
    workshopState: WorkshopInfo;
    playerBoardsState: PlayerBoardState[];
};

export const mockPlayState: GameState = {
    workshopState: mockTiles,
    playerBoardsState: [
        {
            playerName: "Player 1",
            currentPoints: 0,
            lanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true, false],
                [false, false, false, false, false]
            ],
            floor: [
                {amount: 1, color: TILES_COLORS.WHITE},
                {amount: 1, color: TILES_COLORS.ORANGE}
            ]
        },
        {
            playerName: "Player 2",
            currentPoints: 0,
            lanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
        {
            playerName: "Bot 1",
            currentPoints: 0,
            lanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
        {
            playerName: "Bot 2",
            currentPoints: 0,
            lanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
    ]
};

export const Play = () => {
//TODO: find way to pass props as a whole object
    return <Board>
        <Name padding_top={0} left_position={42}/>
        <InnerBoard>
            <PlayerSide>
                {mockPlayState.playerBoardsState.map((player, idx) => {
                    if (idx < 2) {
                        return <PlayerBoard playerName={player.playerName} wall={player.wall} currentPoints={player.currentPoints} floor={player.floor} lanes={player.lanes}/>
                    }
                })}
            </PlayerSide>
            <div>
                <HorizontalWrapper>
                    <h3>Player 1 turn</h3>
                    <ActionButton text="Next turn" color="blue" onClick={() => console.log("Next Move")} isDisabled={false} type="button" />
                </HorizontalWrapper>
                <Workshops />
            </div>
            <PlayerSide>
                <Move />
                {mockPlayState.playerBoardsState.map((player, idx) => {
                    if (idx >= 2) {
                        return <PlayerBoard playerName={player.playerName} wall={player.wall} currentPoints={player.currentPoints} floor={player.floor} lanes={player.lanes}/>
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