import React from 'react';
import {Factory, FactoryID, FactoryInfo, Tile, TilesInfo} from "../atoms/Factory";
import styled from "styled-components";

export type WorkshopInfo = {
  marketTiles: TilesInfo[];
  factories: FactoryInfo[];
};

export const Workshops = (props: WorkshopInfo) => {
    return <Workshop>
        {props.factories.map((factory) => <Factory key={`Factory${factory.factoryId}`} {...factory}/>)}
        <Market>
            <FactoryID>ID:{props.factories.length}</FactoryID>
            {props.marketTiles.map((tile) => (
            <Tile key={`marketTile${tile.color}`} container_border="none" color={tile.color}><p>{tile.amount}</p></Tile>
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