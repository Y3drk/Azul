import React from 'react';
import {Factory, FactoryID, FactoryInfo, Tile, TILES_COLORS, TilesInfo} from "../atoms/Factory";
import styled from "styled-components";

export type WorkshopInfo = {
  marketTiles: TilesInfo[];
  factories: FactoryInfo[];
};

export const mockTiles: WorkshopInfo = {
    factories: [
        {factoryId: 0, tiles: [], isEmpty: true},
        {factoryId: 1, tiles: [
                {amount: 2, color: TILES_COLORS.ORANGE},
                {amount: 1, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 2, tiles: [
                {amount: 2, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.TURQUOISE},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 3, tiles: [
                {amount: 1, color: TILES_COLORS.ORANGE},
                {amount: 1, color: TILES_COLORS.BLUE},
                {amount: 2, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 4, tiles: [
                {amount: 3, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: true},
        {factoryId: 5, tiles: [], isEmpty: true},
        {factoryId: 6, tiles: [
                {amount: 2, color: TILES_COLORS.ORANGE},
                {amount: 2, color: TILES_COLORS.TURQUOISE}
            ], isEmpty: false},
        {factoryId: 7, tiles: [
                {amount: 1, color: TILES_COLORS.TURQUOISE},
                {amount: 1, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.RED},
                {amount: 1, color: TILES_COLORS.ORANGE}
            ], isEmpty: false},
        {factoryId: 8, tiles: [
                {amount: 2, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
    ],
    marketTiles: [
        {amount: 1, color: TILES_COLORS.WHITE},
        {amount: 2, color: TILES_COLORS.ORANGE},
        {amount: 3, color: TILES_COLORS.TURQUOISE},
        {amount: 1, color: TILES_COLORS.BLACK},
    ]
}

export const Workshops = () => {
    return <Workshop>
        {mockTiles.factories.map((factory) => <Factory factoryId={factory.factoryId} isEmpty={factory.isEmpty} tiles={factory.tiles}/>)}
        <Market>
            <FactoryID>ID:9</FactoryID>
            {mockTiles.marketTiles.map((tile) => (
            <Tile container_border="none" color={tile.color}><p>{tile.amount}</p></Tile>
        ))}
        </Market>
    </Workshop>
};


const Market = styled.div`
    width: 20vw;
    height: 20vw;
    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;


const Workshop = styled.div`
    border: 1px solid black;
    width: 30vw;
    height: 80vh;
    
    background-color: rosybrown;
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    gap: 10px;
    
    padding: 10px;
`;