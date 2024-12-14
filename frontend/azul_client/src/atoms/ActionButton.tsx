import React from 'react';
import styled from "styled-components";


export type ActionButtonProps = {
    text: string;
    color: string;
    onClick: () => void;
    isDisabled: boolean;
    type: "submit" | "reset" | "button";
}

export const ActionButton = (props: ActionButtonProps) => {
    return <BaseButton color={props.color} type={props.type} disabled={props.isDisabled} onClick={props.onClick}>{props.text}</BaseButton>
}


const BaseButton = styled.button<{color: string}>`
    z-index: 1;
    
    border: none;
    color: white;
    background-color: ${(props) => props.color};
    
    padding: 5px;
    margin: 5px;
    
    font-weight: bold;

    transition: all 0.2s ease-in-out;
    
    &:hover:enabled {
        cursor: pointer;
        scale: 1.05;
    }

    &:disabled {
        background-color: gray;
        opacity: 0.8;
        cursor: not-allowed;
    }
`;