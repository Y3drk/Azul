import React, {useState} from 'react';
import {ActionButton} from "../atoms/ActionButton";
import styled from "styled-components";
import {mockTiles} from "../auxiliary/constants";
import {RadioButtonGroup} from "../components/RadioGroup";
import {FactoryInfo} from "../atoms/Factory";
import {TILES_COLORS} from "../auxiliary/types";


export const Move = () => {
    const [chosenWorkshop, setChosenWorkshop] = useState(0);

    const getFactoryColors = (factory: FactoryInfo): { label: string, name: string }[] => {
        if (factory.isEmpty) {
            return [{label: "None", name: "button-types"}];
        }
        return factory.tiles.map((tile) => ({
                label: tile.color.toString(),
                name: "button-types"
            }
        ));
    }

    const colorChoiceOptions: { label: string, name: string }[][] = [
        ...mockTiles.factories.map((factory) => getFactoryColors(factory)),
        mockTiles.marketTiles.filter((tile) => tile.color !== TILES_COLORS.WHITE).map((tile) => ({label: tile.color.toString(), name: "button-types"})),

    ]

    const adaptColors = (e: React.FormEvent<HTMLInputElement>) => {
        const workshopID = parseInt(e.currentTarget.value);

        setChosenWorkshop(workshopID);
        setColorOptions(colorChoiceOptions[workshopID]);
        setSelectedValue(colorOptions[0].label);
    };
    const [colorOptions, setColorOptions] = useState<{ label: string, name: string }[]>(colorChoiceOptions[0]);

    const [selectedValue, setSelectedValue] = useState<String>(colorOptions[0].label);

    const radioGroupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }
    //TODO: limit lane choice to only legal moves
    return (
        <MoveContainer>
            <h3>Make<br/>your<br/>move</h3>
            <div>
                <label htmlFor="workshopChoice">Choose Workshop:</label>
                <input id="workshopChoice" name="workshopChoice" type="number" min={0} max={9}
                       onChange={adaptColors}/>
            </div>
            <RadioButtonGroup
                label="Select color:"
                options={colorOptions}
                onChange={radioGroupHandler}
            />
            <div>
                <label htmlFor="laneChoice">Choose Lane:</label>
                <input id="laneChoice" name="laneChoice" type="number" min={0} max={5}/>
            </div>
            <ActionButton type="button" text="Make a move" color={"blue"} onClick={() => {
                alert("Move submitted")
            }} isDisabled={false}/>
        </MoveContainer>
    );
};


const MoveContainer = styled.div`
    border: 1px solid black;
    padding: 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 15px;

    height: 25%;
    width: 30vw;
`;