import React from 'react';
import styled from "styled-components";


export type HeaderProps = {
  left_position: number;
  padding_top: number;
};

export const Name = (props:HeaderProps) => {
    return <NameHeader padding_top={props.padding_top} left_position={props.left_position}>AZUL</NameHeader>
};

const NameHeader = styled.h1<HeaderProps>`
    position: absolute;
    top:0;
    left:${(props) => props.left_position}%;
    
    padding: 5%;
    padding-top: ${(props) => props.padding_top}%;
`;