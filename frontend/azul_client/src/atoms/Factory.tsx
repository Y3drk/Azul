import React from 'react';
import styled from "styled-components";
import {TILES_COLORS} from "../auxiliary/types";
import {COLOR2IMAGE} from "../auxiliary/constants";
import factory_bg from "../assets/azul_factory.jpg";


export type TilesInfo = {
    amount: number;
    color: TILES_COLORS
};

export type FactoryInfo = {
    factoryId: number;
    isEmpty: boolean;
    tiles: TilesInfo[];
};

export const Factory = (props: FactoryInfo) => {
    return <FactoryContainer>
        <FactoryID>ID:{props.factoryId}</FactoryID>
        <FactoryTile id={`Factory${props.factoryId.toString()}`}>
            {props.isEmpty ? <EmptyInfo>Empty</EmptyInfo> : props.tiles.map((tile, idx) => (
                <Tile container_border="none" color={tile.color} key={`Factory${props.factoryId}Tile${idx}`}>
                    <TileInfo>{tile.amount}</TileInfo></Tile>
            ))}
        </FactoryTile></FactoryContainer>
};

export const TileInfo = styled.p`
    font-weight: bold;
`;

const EmptyInfo = styled(TileInfo)`
    font-size: 21px;
    color: gold;
    text-shadow: -1px 1px 0 #000,
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const FactoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

const FactoryTile = styled.div`
    width: 12vh;
    height: 12vh;
    min-width: 80px;
    min-height: 80px;
    border-radius: 50%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    
    background-image: url('${factory_bg}');
    background-repeat: no-repeat;
    background-size: cover;
`;

export const TilePlaceholder = styled.div<{ container_border: string }>`
    width: 25%;
    height: 25%;
    min-width: 20px;
    min-height: 20px;
    border: ${(props) => props.container_border};
    border-radius: 5%;

    background-color: beige;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Tile = styled(TilePlaceholder)<{ color: TILES_COLORS }>`
    background-color: ${(props) => props.color};
    color: ${(props) => props.color === TILES_COLORS.BLACK || props.color === TILES_COLORS.BLUE ? "white" : "black"};
    background-image: url("${(props) => COLOR2IMAGE[props.color]}");
    background-size: contain;
    background-repeat: no-repeat;
    border: 1px solid black;
`;

export const WallTile = styled(TilePlaceholder)<{
    color: TILES_COLORS,
    placed: boolean,
    grid_row: number,
    grid_col: number
}>`
    background-image: url("${(props) => COLOR2IMAGE[props.color]}");
    background-size: contain;
    background-repeat: no-repeat;
    opacity: ${(props) => props.placed ? 1.0 : 0.1};
    grid-column: ${(props) => props.grid_col};
    grid-row: ${(props) => props.grid_row};
`;

export const PatternLaneTile = styled(TilePlaceholder)<{ color: TILES_COLORS, grid_row: number, grid_col: number }>`
    background-image: url("${(props) => COLOR2IMAGE[props.color]}");
    background-size: contain;
    background-repeat: no-repeat;
    grid-column: ${(props) => props.grid_col};
    grid-row: ${(props) => props.grid_row};
`;

export const FactoryID = styled.p`
    font-weight: bold;
    font-size: small;
`;

export const PatternLaneID = styled(FactoryID)<{ grid_row: number, grid_col: number }>`
    grid-column: ${(props) => props.grid_col};
    grid-row: ${(props) => props.grid_row};

    position: relative;
    top: -12px;
`;