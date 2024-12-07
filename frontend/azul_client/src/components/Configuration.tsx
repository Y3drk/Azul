import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Name} from "../molecules/Name";
import {ActionButton} from "../atoms/ActionButton";
import styled from "styled-components";
import {BASE_GAME_CONFIG} from "../auxiliary/constants";

export const Configuration = () => {
    const navigate = useNavigate();
    const [numPlayers, setNumPlayers] = useState(0);
    const [config, setConfig] = useState(BASE_GAME_CONFIG);

    const startGame = () => {
        navigate("../game");
    };

    const onHumansNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
        const numHumans = parseInt(e.currentTarget.value);
        setNumPlayers(numHumans);
        const playerNames = new Array(numHumans).fill("Player");
        setConfig({...config, numberOfHumans: numHumans, playerNames: playerNames});
    }
    const [formsSubmitted, setFormsSubmitted] = useState([false, false]);

    const submitAmounts = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            humans: { value: string };
            bots: { value: string };
        };

        const numHumans = parseInt(target.humans.value);
        const numBots = parseInt(target.bots.value);

        setNumPlayers(numHumans);

        setConfig({
            numberOfBots: numBots,
            numberOfHumans: numHumans,
            playerNames: new Array(numHumans).fill("Player")
        });

        setFormsSubmitted((prev) => ([true, prev[1]]));

        console.log(config);
    };

    const submitNames = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            player1: { value: string };
            player2: { value: string };
            player3: { value: string };
            player4: { value: string };
        };

        const playerNames: string[] = [];

        // TODO: find a more elegant way
        if (target.player1 !== undefined) {
            playerNames.push(target.player1.value);
        }
        if (target.player2 !== undefined) {
            playerNames.push(target.player1.value);
        }
        if (target.player3 !== undefined) {
            playerNames.push(target.player1.value);
        }
        if (target.player4 !== undefined) {
            playerNames.push(target.player1.value);
        }

        setConfig({...config, playerNames: playerNames});

        setFormsSubmitted((prev) => ([prev[0], true]));
    };

    return <>
        <Name padding_top={5} left_position={0}/>
        <Wrapper>
            <h2>Configure the game</h2>
            <HorizontalWrapper>
                <FormWrapper>
                    <h3>Number of players</h3>
                    <InputForm onSubmit={submitAmounts}>
                        <div>
                            <label htmlFor="humans">Number of humans:</label>
                            <input id="humans" name="humans" type="number" min={0} max={4}
                                   onChange={onHumansNumberChange}/>
                        </div>
                        <div>
                            <label htmlFor="bots">Number of bots:</label>
                            <input id="bots" name="bots" type="number" min={numPlayers === 0 ? 1 : 0} max={4 - numPlayers}/>
                        </div>
                        <ActionButton type="submit" text="Submit" color={"blue"} onClick={() => {
                            alert("player amounts submitted")
                        }} isDisabled={false}/>
                    </InputForm>
                </FormWrapper>
                <FormWrapper>
                    <h3>Player names</h3>
                    <div>
                        <InputForm onSubmit={submitNames}>
                            <>
                                {config.playerNames.map((elem, idx) => {
                                    return (
                                        <div key={`Player${idx + 1}Name`}>
                                            <label htmlFor={`player${idx + 1}`}>Player {idx + 1}</label>
                                            <input id={`player${idx + 1}`} name={`player${idx + 1}`} type="text"
                                                   placeholder={`Player${idx + 1}`}/>
                                        </div>)
                                })}
                            </>
                            <ActionButton type="submit" text="Submit" color={"blue"} onClick={() => {
                                alert("Player names were submitted")
                            }} isDisabled={false}/>
                        </InputForm>
                    </div>
                </FormWrapper>
            </HorizontalWrapper>
            <ActionButton type="button" text="Play" color={"green"} onClick={startGame} isDisabled={!formsSubmitted[0] || !formsSubmitted[1]}/>
        </Wrapper>
    </>
};


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    justify-content: center;
    align-items: center;
    
    width: fit-content;
    height: 50%;
`;

export const HorizontalWrapper = styled.div<{display_gap?: number, specified_width?:number}>`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: center;
    align-items: center;
    
    gap: ${(props) => props.display_gap}%;
    width: ${(props) => props.specified_width}%;
`;

const FormWrapper = styled.div`
    min-height: 400px;
    min-width: 200px;

    height: fit-content;

    padding: 5%;
`;


export const InputForm = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    justify-content: flex-start;
    align-items: flex-start;

    gap: 20px;
`;