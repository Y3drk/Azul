import styled from "styled-components";
import {BrandColor, RadioButton} from "../atoms/RadioButton";
import React from "react";

export interface IOption {
    label: string;
    name?: string;
    disabled?: boolean;
}

export interface IOptionGroup {
    label: string;
    options: IOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface RadioButtonGroupProps extends IOptionGroup {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtonGroup = (
    {
        label,
        options,
        onChange,
    }: RadioButtonGroupProps
) => {
    function renderOptions() {
        return options.map(({ label, name, disabled }: IOption, index) => {
            const shortenedOptionLabel = label.replace(/\s+/g, "");
            const optionId = `radio-option-${shortenedOptionLabel}`;

            return (
                <RadioButton
                    value={label}
                    label={label}
                    key={optionId}
                    id={optionId}
                    name={name}
                    disabled={disabled}
                    defaultChecked={index === 0}
                    onChange={onChange}
                />
            );
        });
    }
    return (
        <StyledFieldset>
            <StyledLegend>{label}</StyledLegend>
            <Wrapper>
                {renderOptions()}
            </Wrapper>
        </StyledFieldset>
    );
};

const StyledLegend = styled.legend`
  color: black;
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`;

const Wrapper = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 10px;
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;