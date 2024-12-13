import React, {useEffect, useState} from 'react';
import {ActionButton} from "../atoms/ActionButton";
import styled from "styled-components";
import {WALL_COLORS} from "../auxiliary/constants";
import {RadioButtonGroup} from "../components/RadioGroup";
import {FactoryInfo} from "../atoms/Factory";
import {GameState, TILES_COLORS} from "../auxiliary/types";


export type MoveProps = {
    currentGameState: GameState;
    currentPlayer: string;
    onMove: (workshop: number, color: string, patternLane: number) => void;
}

// TODO: Something is no yes, the refresh is somewhat wrong
export const Move = (props: MoveProps) => {
    const [chosenWorkshop, setChosenWorkshop] = useState(0);
    const [chosenPatternLane, setChosenPatternLane] = useState(0);

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

    let colorChoiceOptions: { label: string, name: string }[][] = [
        ...props.currentGameState.workshopState.factories.map((factory) => getFactoryColors(factory)),
        props.currentGameState.workshopState.marketTiles.filter((tile) => tile.color !== TILES_COLORS.WHITE).map((tile) => ({
            label: tile.color.toString(),
            name: "button-types"
        })),
    ];

    const [colorOptions, setColorOptions] = useState<{ label: string, name: string }[]>(colorChoiceOptions[0]);
    const [selectedValue, setSelectedValue] = useState<string>(colorOptions[0].label);

    const adaptColors = (e: React.FormEvent<HTMLInputElement>) => {
        const workshopID = parseInt(e.currentTarget.value);

        setChosenWorkshop(workshopID);
        setColorOptions(colorChoiceOptions[workshopID]);
        setSelectedValue(colorChoiceOptions[workshopID][0].label);
        setCurrentMoveLegal(false);

        // console.log("-----------");
        // console.log("New settings:");
        // console.log(colorChoiceOptions);
        // console.log(workshopID);
        // console.log(colorChoiceOptions[workshopID]);
        // console.log(colorChoiceOptions[workshopID][0].label, selectedValue);
    };

    const radioGroupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        setCurrentMoveLegal(false);
    }

    const [currentMoveLegal, setCurrentMoveLegal] = useState(false);

    // NOTES: Selected value gets messed up badly, this is probably the cause for problems,
    // the radio doesn't adapt as it should, which results in problems later on
    const checkMoveValidity = () => {
        const chosenColor = selectedValue as TILES_COLORS;
        console.log("------------------");
        console.log(chosenColor);

        for (let board of props.currentGameState.playerBoardsState) {
            console.log("in first for loop");
            if (board.playerName === props.currentPlayer) {
                console.log("Player", props.currentPlayer, "found, 1st if");
                if (chosenPatternLane === 5) {
                    console.log("Placing tiles on the floor");
                    setCurrentMoveLegal(true);
                } else {
                    for (let colIdx = 0; colIdx < 5; colIdx++) {
                        // console.log("In second for loop, columns");
                        if (WALL_COLORS[chosenPatternLane][colIdx] === chosenColor) {
                            console.log("Found the right spot on the wall", chosenPatternLane, colIdx, WALL_COLORS[chosenPatternLane][colIdx]);
                            // if this color in this row is already placed
                            if (board.wall[chosenPatternLane][colIdx]) {
                                console.log("this color in this row is already placed");
                                setCurrentMoveLegal(false);
                            } else if ((board.patternLanes[chosenPatternLane].tilesOnLane.color !== chosenColor &&
                                    board.patternLanes[chosenPatternLane].tilesOnLane.color !== TILES_COLORS.EMPTY) ||
                                board.patternLanes[chosenPatternLane].tilesOnLane.amount === chosenPatternLane + 1) {
                                //if this pattern lane is full or occupied with other color
                                console.log("this pattern lane is full or occupied with other color");
                                console.log(board.patternLanes[chosenPatternLane].tilesOnLane.color, chosenColor);
                                console.log(board.patternLanes[chosenPatternLane].tilesOnLane.amount, chosenPatternLane + 1);
                                setCurrentMoveLegal(false);
                            } else {
                                console.log("this move is legal");
                                setCurrentMoveLegal(true);
                            }
                            return;
                        }
                    }
                    setCurrentMoveLegal(false);
                }
                break;
            }
        }
    };

    const adaptPatternLane = (e: React.FormEvent<HTMLInputElement>) => {
        setChosenPatternLane(parseInt(e.currentTarget.value));
        setCurrentMoveLegal(false);
    }


    // useEffect(() => {
    //     console.log("------------------");
    //     console.log("UF");
    //     checkMoveValidity();
    // }, [props.currentPlayer, props.currentGameState, checkMoveValidity]);

    return (
        <MoveContainer>
            <h3>Make<br/>your<br/>move</h3>
            <div>
                <label htmlFor="workshopChoice">Choose Workshop:</label>
                <input id="workshopChoice" name="workshopChoice" type="number" min={0} max={props.currentGameState.workshopState.factories.length} defaultValue={0}
                       onChange={adaptColors}/>
            </div>
            <RadioButtonGroup
                label="Select color:"
                options={colorOptions}
                onChange={radioGroupHandler}
            />
            <div>
                <label htmlFor="laneChoice">Choose Lane:</label>
                <input id="laneChoice" name="laneChoice" type="number" min={0} max={5} onChange={adaptPatternLane}
                       defaultValue={0}/>
            </div>
            <div>
                <ActionButton text="Validate" color="orange" onClick={checkMoveValidity} isDisabled={false}
                              type="button"/>
                <ActionButton type="button" text="Make a move" color={"blue"} onClick={() => {
                    let workshopNum = -1;
                    let patternLaneNum = -1;
                    if (chosenWorkshop < props.currentGameState.workshopState.factories.length) {
                        workshopNum = chosenWorkshop;
                    }
                    if (chosenPatternLane < 5) {
                        patternLaneNum = chosenPatternLane;
                    }

                    props.onMove(workshopNum, selectedValue, patternLaneNum);

                    if (chosenWorkshop < props.currentGameState.workshopState.factories.length) {
                        colorChoiceOptions[chosenWorkshop] = [{label: "None", name: "button-types"}];
                        setColorOptions([{label: "None", name: "button-types"}]);
                        setSelectedValue("None");
                    }
                    else {
                        colorChoiceOptions[chosenWorkshop] = colorChoiceOptions[chosenWorkshop].filter((elem) => elem.label !== selectedValue);

                        if (colorChoiceOptions[chosenWorkshop].length === 0) {
                            colorChoiceOptions[chosenWorkshop] = [{label: "None", name: "button-types"}];
                        }

                        setColorOptions(colorChoiceOptions[chosenWorkshop]);
                        setSelectedValue(colorChoiceOptions[chosenWorkshop][0].label);
                    }
                    setCurrentMoveLegal(false);
                }} isDisabled={!currentMoveLegal}/>
            </div>
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