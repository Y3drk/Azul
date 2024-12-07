import React from 'react';
import {Factory, FactoryID, FactoryInfo, Tile, TilesInfo} from "../atoms/Factory";
import styled from "styled-components";
import {mockTiles} from "../auxiliary/constants";

export type WorkshopInfo = {
  marketTiles: TilesInfo[];
  factories: FactoryInfo[];
};

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