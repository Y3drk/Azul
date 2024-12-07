import React, {useState} from 'react';
import {ActionButton} from "../atoms/ActionButton";
import styled from "styled-components";
import {InputForm} from "../components/Configuration";
import {mockTiles} from "../auxiliary/constants";


export const Move = () => {
    const [chosenWorkshop, setChosenWorkshop] = useState(-1);

    const adaptColors = (e: React.FormEvent<HTMLInputElement>) => {
        const workshopID = parseInt(e.currentTarget.value);

        setChosenWorkshop(workshopID);
    };
    //TODO: limit lane choice to only legal moves
    //TODO: radio group necessary for color choice
    return (
        <MoveContainer>
            <h3>Make your move</h3>
            <InputForm>
                <div>
                    <label htmlFor="workshopChoice">Choose Workshop:</label>
                    <input id="workshopChoice" name="workshopChoice" type="number" min={0} max={9} onChange={adaptColors}/>
                </div>
                <div>
                    <label htmlFor="colorChoice">Choose Color:</label>
                    {chosenWorkshop === 9 ? mockTiles.marketTiles.map((tile) => (<div key={`ChoiceTile${tile.color}`}>
                        <label htmlFor={`${tile.color}Tile`}>{tile.color}</label>
                        <input id={`${tile.color}Tile`} name={`${tile.color}Tile`} type="radio"/>
                    </div>)) : mockTiles.factories.map((factory) => {
                        if (factory.factoryId === chosenWorkshop){
                            return factory.tiles.map((tile) => (
                                <div key={`ChoiceTile${tile.color}`}>
                                    <label htmlFor={`${tile.color}Tile`}>{tile.color}</label>
                                    <input id={`${tile.color}Tile`} name={`${tile.color}Tile`} type="radio"/>
                                </div>
                            ))
                        }
                    })}
                </div>
                <div>
                    <label htmlFor="laneChoice">Choose Lane:</label>
                    <input id="laneChoice" name="laneChoice" type="number" min={0} max={5}/>
                </div>
                <ActionButton type="submit" text="Make a move" color={"blue"} onClick={() => {
                    alert("Move submitted")
                }} isDisabled={false}/>
            </InputForm>
        </MoveContainer>
    );
};


const MoveContainer = styled.div`
    border: 1px solid black;
    padding: 10px;
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    
    height: 20%;
    width: 30vw;
`;