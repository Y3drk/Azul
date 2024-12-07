import {TilesInfo} from "../atoms/Factory";
import {WorkshopInfo} from "../molecules/Workshops";

export type PlayerBoardState = {
    playerName: string;
    currentPoints: number;
    patternLanes: {
        laneId: number;
        tilesOnLane: TilesInfo;
    }[];
    wall: boolean[][];
    floor: TilesInfo[];
}


export type GameState = {
    workshopState: WorkshopInfo;
    playerBoardsState: PlayerBoardState[];
};

export type ConfigurationInfo = {
    numberOfHumans: number;
    numberOfBots: number;
    playerNames: string[];
};


export enum TILES_COLORS {
    RED = "red",
    ORANGE = "orange",
    BLUE = "blue",
    BLACK = "black",
    TURQUOISE = "turquoise",
    WHITE="white",
    EMPTY="beige"
}