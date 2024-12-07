import styled from "styled-components";
import { InputHTMLAttributes } from "react";

export interface InputElementProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    disabled?: boolean;
}

export const RadioButton = (
    {
        label,
        id,
        disabled = false,
        ...rest
    }: InputElementProps
) => {
    return (
        <Wrapper>
            <StyledInput type="radio" id={id} disabled={disabled} {...rest}/>
            <StyledLabel htmlFor="radio-button">{label}</StyledLabel>
        </Wrapper>
    );
};

export enum BrandColor {
    BLUE_FADED = "#658aea",
    DARK_BLUE = "#2359ea",
    YELLOW = "#FFBF44",
}

const StyledLabel = styled.label`
  color: black;
  cursor: default;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledInput = styled.input`
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  border: 2px solid ${BrandColor.DARK_BLUE};
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 2px;
  }
  &:checked::after {
    background-color: ${BrandColor.DARK_BLUE};
  }
  &:hover::after {
    background-color: ${BrandColor.BLUE_FADED};
  }
  &:focus {
    outline: 2px solid ${BrandColor.YELLOW};
  }
`;