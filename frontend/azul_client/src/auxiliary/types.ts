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

export type BackendPlayerState = {
    player_name: string;
    player_type: "human" | "bot";
    score: {
        base: number;
        colors: number;
        horizontals: number;
        verticals: number;
    };
    player_board: {
        floor_line: (null|number)[];
        pattern_lines: (null|number)[][];
        wall: (null|number)[][];
    };
};

export type BackendGameState = {
    center: number[];
    factories: {[id: number]:number[]};
    players: BackendPlayerState[];
};


export type BackendMove = {
    "player_name": string,
    "move": {
        "factory_id": number,
        "color_id": number,
        "pattern_line_row_id": number
    }
}
