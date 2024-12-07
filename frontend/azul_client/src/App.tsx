import React from 'react';
import {Configuration} from "./components/Configuration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {Play} from "./components/Play";
import {Summary} from "./components/Summary";

function App() {
    return (
        <BrowserRouter>
            <BaseBody>
                <Routes>
                    <Route path="/" element={<Configuration />} />
                    <Route path="game" element={<Play />} />
                    <Route path="summary" element={<Summary />} />
                    <Route path="*" element={<Summary />} />
                </Routes>
            </BaseBody>
        </BrowserRouter>
    );
}

export default App;

const BaseBody = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: fit-content;
    min-height: 100%;
    margin: 0;
    padding: 0;
    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    justify-content: center;
    align-items: center;
`;
