import React from 'react';
import styled from "styled-components";
import {HorizontalWrapper} from "../components/Configuration";
import {PlayerBoardState, TILES_COLORS} from "../auxiliary/types";
import {FactoryID, PatternLaneID, PatternLaneTile, Tile, TilePlaceholder, WallTile} from "../atoms/Factory";
import {FLOOR_PENALTIES, WALL_COLORS} from "../auxiliary/constants";


export const PlayerBoard = (props: PlayerBoardState) => {
    return <PlayerBoardContainer>
        <HorizontalWrapper display_gap={5} specified_width={100}>
            <h3>{props.playerName}</h3>
            <p>Points: {props.currentPoints}</p>
        </HorizontalWrapper>
        <HorizontalWrapper>
            <PatternLanes>
                {props.patternLanes.map((lane) => {
                    const elems = new Array(lane.laneId + 1).fill(0);
                    return (
                        <>
                            <PatternLaneID key={`PatternLane${props.playerName}${lane.laneId}`} grid_row={lane.laneId+1} grid_col={1}>ID:{lane.laneId}</PatternLaneID>
                            {elems.map((elem, idx) => {
                                if (lane.tilesOnLane.amount > idx) {
                                    return <PatternLaneTile key={`patternLaneTile${props.playerName}${idx}`} color={lane.tilesOnLane.color} container_border="none"
                                                            grid_row={lane.laneId + 1} grid_col={6 - idx}/>
                                }

                                return <PatternLaneTile key={`patternLaneTile${props.playerName}${idx}`} color={TILES_COLORS.EMPTY} grid_row={lane.laneId + 1} grid_col={6 - idx} container_border="none"/>;
                            })}
                        </>
                    );
                })}
            </PatternLanes>
            <Separator></Separator>
            <WallContainer>
                {WALL_COLORS.map((row, rowIdx) => {
                    return row.map((elem, colIdx) => (
                        <WallTile key={`wallTile${props.playerName}${rowIdx}${colIdx}`} grid_col={colIdx + 1} grid_row={rowIdx + 1} color={elem}
                                  placed={props.wall[rowIdx][colIdx]} container_border="none"/>
                    ));
                })}
            </WallContainer>
        </HorizontalWrapper>
        <FloorContainer>
            <FactoryID>ID:5</FactoryID>
            {FLOOR_PENALTIES.map((penalty, idx) => {
                if (props.floor.length > idx) {
                    return (
                        <ColorfulTileBorder key={`FloorTile${idx}`} color="navy">
                            <p>{penalty}</p>
                            <Tile key={`FloorTile${props.playerName}${idx}`} container_border="1px solid navy" color={props.floor[idx].color}/>
                        </ColorfulTileBorder>
                    );
                }

                return (
                    <ColorfulTileBorder key={`FloorPlaceholder${idx}`} color="navy">
                        <p>{penalty}</p>
                        <TilePlaceholder container_border="1px solid navy"/>
                    </ColorfulTileBorder>
                )
            })}
        </FloorContainer>
    </PlayerBoardContainer>
};


const PlayerBoardContainer = styled.div`
    border: 1px solid black;
    width: 30vw;
    height: fit-content;
    padding-bottom: 10px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    
    background-color: white;
`;

const FloorContainer = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    gap: 5px;
`;

const ColorfulTileBorder = styled.div<{ color: string }>`
    border: 1px solid ${(props) => props.color};
`;

export const WallContainer = styled.div`
    width: fit-content;
    height: fit-content;

    display: grid;
    grid-template-rows: 22px 22px 22px 22px 22px;
    grid-template-columns: 22px 22px 22px 22px 22px;
`;

const PatternLanes = styled.div`
    width: fit-content;
    height: fit-content;

    display: grid;
    grid-template-rows: 22px 22px 22px 22px 22px;
    grid-template-columns: 27px 22px 22px 22px 22px 22px;
`;

const Separator = styled.span`
    background-color: black;
    width: 3px;
    height: 110px;
    
    //margin-left: 1px;
    margin-right: 3px;
`;

