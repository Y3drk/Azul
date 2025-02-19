import React, {useEffect, useRef, useState} from 'react';
import {ActionButton} from "../atoms/ActionButton";
import styled from "styled-components";
import {WALL_COLORS} from "../auxiliary/constants";
import {RadioButtonGroup} from "../components/RadioGroup";
import {FactoryInfo} from "../atoms/Factory";
import {GameState, TILES_COLORS} from "../auxiliary/types";
import {checkForGameEnd} from "../auxiliary/functions";


export type MoveProps = {
    currentGameState: GameState;
    currentPlayer: string;
    onMove: (workshop: number, color: string, patternLane: number) => void;
    botsOnly: boolean;
}

export const Move = ({currentGameState, onMove, currentPlayer, botsOnly}: MoveProps) => {
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

    const getMarketColors = (): { label: string, name: string }[] => {
        const colors = currentGameState.workshopState.marketTiles.filter((tile) => tile.color !== TILES_COLORS.WHITE).map((tile) => ({
                label: tile.color.toString(),
                name: "button-types"
            }));

        if (colors.length === 0){
            return [{label: "None", name: "button-types"}];
        }

        return colors;
    }

    const readNewColorChoiceOptions = () => [
        ...currentGameState.workshopState.factories.map((factory) => getFactoryColors(factory)),
        getMarketColors()
    ];

    const colorChoiceOptions = useRef<{ label: string, name: string }[][]>(readNewColorChoiceOptions());

    const [colorOptions, setColorOptions] = useState<{ label: string, name: string }[]>(colorChoiceOptions.current[0]);
    const [selectedValue, setSelectedValue] = useState<string>(colorOptions[0].label);

    // TODO: there are still errors regarding it
    // last example: after a few moves an empty factory suddenly has 4 colors available in radio
    // another: blue, red and black are available on market but menu only shows red and black. Then the round after it works just fine...
    // maybe the updates are just too slow
    const adaptColors = (e: React.FormEvent<HTMLInputElement>) => {
        const workshopID = parseInt(e.currentTarget.value);

        setChosenWorkshop(workshopID);
        setColorOptions(colorChoiceOptions.current[workshopID]);
        setSelectedValue(colorChoiceOptions.current[workshopID][0].label);
        setCurrentMoveLegal(false);
    };

    const radioGroupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        setCurrentMoveLegal(false);
    }

    const [currentMoveLegal, setCurrentMoveLegal] = useState(false);

    const checkMoveValidity = () => {
        const chosenColor = selectedValue as TILES_COLORS;
        // console.log("------------------");
        // console.log(chosenColor);

        for (let board of currentGameState.playerBoardsState) {
            // console.log("in first for loop");
            if (board.playerName === currentPlayer) {
                // console.log("Player", props.currentPlayer, "found, 1st if");
                if (chosenPatternLane === 5) {
                    // console.log("Placing tiles on the floor");
                    setCurrentMoveLegal(true);
                } else {
                    for (let colIdx = 0; colIdx < 5; colIdx++) {
                        // console.log("In second for loop, columns");
                        if (WALL_COLORS[chosenPatternLane][colIdx] === chosenColor) {
                            // console.log("Found the right spot on the wall", chosenPatternLane, colIdx, WALL_COLORS[chosenPatternLane][colIdx]);
                            // if this color in this row is already placed
                            if (board.wall[chosenPatternLane][colIdx]) {
                                // console.log("this color in this row is already placed");
                                setCurrentMoveLegal(false);
                            } else if ((board.patternLanes[chosenPatternLane].tilesOnLane.color !== chosenColor &&
                                    board.patternLanes[chosenPatternLane].tilesOnLane.color !== TILES_COLORS.EMPTY) ||
                                board.patternLanes[chosenPatternLane].tilesOnLane.amount === chosenPatternLane + 1) {
                                //if this pattern lane is full or occupied with other color
                                // console.log("this pattern lane is full or occupied with other color");
                                // console.log(board.patternLanes[chosenPatternLane].tilesOnLane.color, chosenColor);
                                // console.log(board.patternLanes[chosenPatternLane].tilesOnLane.amount, chosenPatternLane + 1);
                                setCurrentMoveLegal(false);
                            } else {
                                // console.log("this move is legal");
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


    useEffect(() => {
        if (currentPlayer.slice(0,3) === "Bot"){
            // setTimeout(() => {
            //     console.log("Bot move detected", currentPlayer, currentPlayer.slice(0,3) === "Bot", currentPlayer.slice(0,3));
            //     console.log(currentGameState);
            //     console.log("----------------");
                for (let boardState of currentGameState.playerBoardsState){
                    if (boardState.playerName === currentPlayer){
                        if (!checkForGameEnd(boardState.wall)){
                            onMove(chosenWorkshop, selectedValue, chosenPatternLane)
                        }
                        break;
                    }
                }
            // }, 3000);
        }
    }, [currentPlayer]);

    useEffect(() => {
        colorChoiceOptions.current = readNewColorChoiceOptions();
        setColorOptions(colorChoiceOptions.current[chosenWorkshop]);
        setSelectedValue(colorChoiceOptions.current[chosenWorkshop][0].label);
    }, [currentGameState]);

    const handleMove = () => {
        let workshopNum = -1;
        let patternLaneNum = -1;
        if (chosenWorkshop < currentGameState.workshopState.factories.length) {
            workshopNum = chosenWorkshop;
        }
        if (chosenPatternLane < 5) {
            patternLaneNum = chosenPatternLane;
        }

        onMove(workshopNum, selectedValue, patternLaneNum);

        if (chosenWorkshop < currentGameState.workshopState.factories.length) {
            colorChoiceOptions.current = readNewColorChoiceOptions();
            setColorOptions([{label: "None", name: "button-types"}]);
            setSelectedValue("None");
        }
        else {
            // colorChoiceOptions.current[chosenWorkshop] = colorChoiceOptions.current[chosenWorkshop].filter((elem) => elem.label !== selectedValue);
            colorChoiceOptions.current = readNewColorChoiceOptions();
            // if (colorChoiceOptions.current[chosenWorkshop].length === 0) {
            //     colorChoiceOptions.current[chosenWorkshop] = [{label: "None", name: "button-types"}];
            // }

            setColorOptions(colorChoiceOptions.current[chosenWorkshop]);
            setSelectedValue(colorChoiceOptions.current[chosenWorkshop][0].label);
        }
        setCurrentMoveLegal(false);
    }

    return (
        <MoveContainer>
            <h3>Make<br/>your<br/>move</h3>
            <div>
                <label htmlFor="workshopChoice">Choose Workshop:</label>
                <input id="workshopChoice" name="workshopChoice" type="number" min={0} max={currentGameState.workshopState.factories.length} defaultValue={0}
                       onChange={adaptColors} disabled={botsOnly}/>
            </div>
            <RadioButtonGroup
                label="Select color:"
                options={colorOptions}
                onChange={radioGroupHandler}
            />
            <div>
                <label htmlFor="laneChoice">Choose Lane:</label>
                <input id="laneChoice" name="laneChoice" type="number" min={0} max={5} onChange={adaptPatternLane}
                       defaultValue={0} disabled={botsOnly}/>
            </div>
            <div>
                <ActionButton text="Validate" color="orange" onClick={checkMoveValidity} isDisabled={botsOnly || currentPlayer.slice(0,3) === "Bot"}
                              type="button"/>
                <ActionButton type="button" text="Make a move" color={"blue"} onClick={handleMove} isDisabled={!currentMoveLegal}/>
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