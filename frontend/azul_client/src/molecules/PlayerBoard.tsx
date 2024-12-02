import React from 'react';
import styled from "styled-components";
import {HorizontalWrapper} from "../components/Configuration";
import {PlayerBoardState} from "../components/Play";
import {FactoryID, Tile, TilePlaceholder, TILES_COLORS, WallTile} from "../atoms/Factory";

export const FLOOR_PENALTIES = [-1, -1, -2, -2, -2, -3, -3];

export const WALL_COLORS: TILES_COLORS[][] = [
    [TILES_COLORS.BLUE, TILES_COLORS.ORANGE, TILES_COLORS.RED, TILES_COLORS.BLUE, TILES_COLORS.TURQUOISE],
    [TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE,TILES_COLORS.RED,TILES_COLORS.BLACK],
    [TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE,TILES_COLORS.RED],
    [TILES_COLORS.RED,TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE],
    [TILES_COLORS.ORANGE,TILES_COLORS.RED,TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE]
]

//TODO: grid for WALL and LANES?
export const PlayerBoard = (props: PlayerBoardState) => {
    return <PlayerBoardContainer>
        <HorizontalWrapper>
            <h3>Player name</h3>
            <p>Points: X</p>
        </HorizontalWrapper>
        <HorizontalWrapper>
            <div>LANES</div>
            <WallContainer>
                {WALL_COLORS.map((row, rowIdx) => {
                    return row.map((elem, colIdx) => (
                        <WallTile color={elem} placed={props.wall[rowIdx][colIdx]} container_border="none" />
                    ));
                })}
            </WallContainer>
        </HorizontalWrapper>
        <FloorContainer>
            <FactoryID>ID:5</FactoryID>
            {FLOOR_PENALTIES.map((penalty, idx) => {
                if (props.floor.length > idx) {
                    return (
                        <FloorTileContainer>
                            <p>{penalty}</p>
                            <Tile container_border="1px solid navy" color={props.floor[idx].color} />
                        </FloorTileContainer>
                    );
                }

                return (
                    <FloorTileContainer>
                        <p>{penalty}</p>
                        <TilePlaceholder container_border="1px solid navy"/>
                    </FloorTileContainer>
                )
            })}
        </FloorContainer>
    </PlayerBoardContainer>
};


const PlayerBoardContainer = styled.div`
    border: 1px solid black;
    width: 30vw;
    height: 50%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
`;

const FloorContainer = styled.div`
    width: 100%;
    height: 15%;
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    
    gap: 5px;
`;

const FloorTileContainer = styled.div`
    border: 1px solid navy;
`;

const WallContainer = styled.div`
    width: 50%;
    height: fit-content;
    
    display: grid;
`;

