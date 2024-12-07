import React from 'react';
import {Name} from "../molecules/Name";
import {ActionButton} from "../atoms/ActionButton";
import {useNavigate} from "react-router-dom";
import {HorizontalWrapper} from "./Configuration";
import styled from "styled-components";
import {SCORING_CATEGORIES} from "../auxiliary/constants";


export const Summary = () => {
    const navigate = useNavigate();
    const players = ["Player1", "Player2", "Bot1", "Bot 2"];
    const mockResults = [
        {
            playerName: "Player1",
            totalPoints:0,
            pointsSummary: {
                points: 0,
                horizontalBonuses: 0,
                verticalBonuses: 0,
                colorBonuses: 0
            }
        },
        {
            playerName: "Player2",
            totalPoints:0,
            pointsSummary: {
                points: 0,
                horizontalBonuses: 0,
                verticalBonuses: 0,
                colorBonuses: 0
            }
        },
        {
            playerName: "Player3",
            totalPoints:0,
            pointsSummary: {
                points: 0,
                horizontalBonuses: 0,
                verticalBonuses: 0,
                colorBonuses: 0
            }
        },
        {
            playerName: "Player4",
            totalPoints:0,
            pointsSummary: {
                points: 0,
                horizontalBonuses: 0,
                verticalBonuses: 0,
                colorBonuses: 0
            }
        },
    ];

    const startNewGame = () => {
        navigate("..");
    }

    return <>
        <Name padding_top={5} left_position={0}/>
        <h2>Game Summary</h2>
        <ScoreWrapper>
            <ScoresDiv>
                <h3>Players</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (<li key={`Nickname${idx}`}>{elem.playerName}</li>))}</ScoreUl>
            </ScoresDiv>
            <ScoresDiv>
                <h3>{SCORING_CATEGORIES[0]}</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (
                    <li key={`${SCORING_CATEGORIES[0]}${idx}`}>{elem.pointsSummary.points}</li>))}</ScoreUl>
            </ScoresDiv>
            <ScoresDiv>
                <h3>{SCORING_CATEGORIES[1]}</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (
                    <li key={`${SCORING_CATEGORIES[1]}${idx}`}>{elem.pointsSummary.horizontalBonuses}</li>))}</ScoreUl>
            </ScoresDiv>
            <ScoresDiv>
                <h3>{SCORING_CATEGORIES[2]}</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (
                    <li key={`${SCORING_CATEGORIES[2]}${idx}`}>{elem.pointsSummary.verticalBonuses}</li>))}</ScoreUl>
            </ScoresDiv>
            <ScoresDiv>
                <h3>{SCORING_CATEGORIES[3]}</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (
                    <li key={`${SCORING_CATEGORIES[3]}${idx}`}>{elem.pointsSummary.colorBonuses}</li>))}</ScoreUl>
            </ScoresDiv>
            <ScoresDiv>
                <h3>TOTAL</h3>
                <ScoreUl>{mockResults.map((elem, idx) => (<li key={`TOTAL${idx}`}>{elem.totalPoints}</li>))}</ScoreUl>
            </ScoresDiv>
        </ScoreWrapper>
        <ActionButton text="New Game" color="blue" onClick={startNewGame} isDisabled={false} type="button"/>
    </>
};

const ScoreWrapper = styled(HorizontalWrapper)`
    padding-bottom: 40px;
`;

const ScoresDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    padding: 0 20px;
`;

const ScoreUl = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    
    padding: 0;
`;