import {WorkshopInfo} from "../molecules/Workshops";
import {ConfigurationInfo, GameState, TILES_COLORS} from "./types";


export const mockTiles: WorkshopInfo = {
    factories: [
        {factoryId: 0, tiles: [], isEmpty: true},
        {factoryId: 1, tiles: [
                {amount: 2, color: TILES_COLORS.ORANGE},
                {amount: 1, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 2, tiles: [
                {amount: 2, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.TURQUOISE},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 3, tiles: [
                {amount: 1, color: TILES_COLORS.ORANGE},
                {amount: 1, color: TILES_COLORS.BLUE},
                {amount: 2, color: TILES_COLORS.RED}
            ], isEmpty: false},
        {factoryId: 4, tiles: [
                {amount: 3, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: true},
        {factoryId: 5, tiles: [], isEmpty: true},
        {factoryId: 6, tiles: [
                {amount: 2, color: TILES_COLORS.ORANGE},
                {amount: 2, color: TILES_COLORS.TURQUOISE}
            ], isEmpty: false},
        {factoryId: 7, tiles: [
                {amount: 1, color: TILES_COLORS.TURQUOISE},
                {amount: 1, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.RED},
                {amount: 1, color: TILES_COLORS.ORANGE}
            ], isEmpty: false},
        {factoryId: 8, tiles: [
                {amount: 2, color: TILES_COLORS.BLUE},
                {amount: 1, color: TILES_COLORS.BLACK},
                {amount: 1, color: TILES_COLORS.RED}
            ], isEmpty: false},
    ],
    marketTiles: [
        {amount: 1, color: TILES_COLORS.WHITE},
        {amount: 2, color: TILES_COLORS.ORANGE},
        {amount: 3, color: TILES_COLORS.TURQUOISE},
        {amount: 1, color: TILES_COLORS.BLACK},
    ]
};

export const mockPlayState: GameState = {
    workshopState: mockTiles,
    playerBoardsState: [
        {
            playerName: "Player 1",
            currentPoints: 0,
            patternLanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 2, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 1, color: TILES_COLORS.TURQUOISE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 5, color: TILES_COLORS.RED}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true, false],
                [false, false, false, false, false]
            ],
            floor: [
                {amount: 1, color: TILES_COLORS.WHITE},
                {amount: 1, color: TILES_COLORS.ORANGE}
            ]
        },
        {
            playerName: "Player 2",
            currentPoints: 0,
            patternLanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
        {
            playerName: "Bot 1",
            currentPoints: 0,
            patternLanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
        {
            playerName: "Bot 2",
            currentPoints: 0,
            patternLanes: [
                {
                    laneId: 0,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 1,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 2,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 3,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
                {
                    laneId: 4,
                    tilesOnLane: {amount: 0, color: TILES_COLORS.ORANGE}
                },
            ],
            wall: [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ],
            floor: []
        },
    ]
};


export const BASE_GAME_CONFIG: ConfigurationInfo = {
    numberOfHumans: 1,
    numberOfBots: 1,
    playerNames: []
}

export const SCORING_CATEGORIES = ["points", "horizontal bonuses", "vertical bonuses", "color bonuses"];


export const FLOOR_PENALTIES = [-1, -1, -2, -2, -2, -3, -3];

export const WALL_COLORS: TILES_COLORS[][] = [
    [TILES_COLORS.BLUE, TILES_COLORS.ORANGE, TILES_COLORS.RED, TILES_COLORS.BLACK, TILES_COLORS.TURQUOISE],
    [TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE,TILES_COLORS.RED,TILES_COLORS.BLACK],
    [TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE,TILES_COLORS.RED],
    [TILES_COLORS.RED,TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE,TILES_COLORS.ORANGE],
    [TILES_COLORS.ORANGE,TILES_COLORS.RED,TILES_COLORS.BLACK,TILES_COLORS.TURQUOISE,TILES_COLORS.BLUE]
];

export const NUMBER2COLOR: {[id:number]: TILES_COLORS} = {
    0: TILES_COLORS.BLUE,
    1: TILES_COLORS.ORANGE,
    2: TILES_COLORS.RED,
    3: TILES_COLORS.BLACK,
    4: TILES_COLORS.TURQUOISE,
    5: TILES_COLORS.WHITE,
}