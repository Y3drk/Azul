import React from 'react';


export type ActionButtonProps = {
    text: string;
    color: string;
    onClick: () => void;
    isDisabled: boolean;
    type: "submit" | "reset" | "button";
}

export const ActionButton = (props: ActionButtonProps) => {
    return <button type={props.type} disabled={props.isDisabled} onClick={props.onClick}>{props.text}</button>
}