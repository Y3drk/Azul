import {BackendGameState, GameState, PlayerBoardState, TILES_COLORS} from "./types";
import {FactoryInfo, TilesInfo} from "../atoms/Factory";
import {NUMBER2COLOR} from "./constants";

export const allElementsAreUnique = (arrToTest: any[]) =>
    arrToTest.length === new Set(arrToTest).size

export const parseBackendGameState = (beGameState: BackendGameState): GameState => {
    const factories: FactoryInfo[] = [];
    for (let factoryIdx = 0; factoryIdx < 9; factoryIdx++) {
        if (beGameState.factories[factoryIdx] !== undefined) {
            const newFactory: FactoryInfo = {
                factoryId: factoryIdx,
                isEmpty: true,
                tiles: []
            };

            const foundTiles: number[] = new Array(5).fill(0);
            beGameState.factories[factoryIdx].forEach((elem) => {
                if (elem !== null) {
                    foundTiles[elem] += 1;
                    newFactory.isEmpty = false;
                }
            })

            foundTiles.forEach((counter, idx) => {
                if (counter > 0) {
                    newFactory.tiles.push({amount: counter, color: NUMBER2COLOR[idx]})
                }
            })

            factories.push(newFactory);
        }
    }

    const market: TilesInfo[] = [];
    const tilesInMarket = new Array(5).fill(0);

    beGameState.center.forEach((elem) => tilesInMarket[elem] += 1);
    tilesInMarket.forEach((tileCount, idx) => {
        if (tileCount > 0) {
            market.push({
                color: NUMBER2COLOR[idx],
                amount: tileCount,
            });
        }
    });

    return {
        workshopState: {
            marketTiles: market,
            factories: factories
        },
        playerBoardsState:
            beGameState.players.map((player): PlayerBoardState => <PlayerBoardState>({
                playerName: player.player_name,
                currentPoints: player.score.base,
                wall: player.player_board.wall.map((row) => row.map((elem) => elem !== null)),
                floor: player.player_board.floor_line.map((elem): TilesInfo => ({
                    color: elem === null ? TILES_COLORS.EMPTY : NUMBER2COLOR[elem],
                    amount: 1,
                })),
                patternLanes: player.player_board.pattern_lines.map((lane, idx) => {
                    const laneTiles: TilesInfo = {color: TILES_COLORS.EMPTY, amount: 0};
                    lane.forEach((elem) => {
                        if (elem !== null) {
                            laneTiles.amount += 1;
                            laneTiles.color = NUMBER2COLOR[elem];
                        }
                    })
                    return {
                        laneId: idx,
                        tilesOnLane: laneTiles
                    }
                }),
            }))
    };
}