import json
import random

from players.Player import Player


class DynamicRewardPlayer(Player):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game, conf_file):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)
        self.conf_file = conf_file

        self.short_term_multiplayer = None
        self.long_term_multiplayer = None
        self.load_configurations()

    def load_configurations(self):
        if self.conf_file == "":
            self.conf_file = "configurations/dynamic_7-3.json"
            self.conf_file = "configurations/dynamic_0-10.json"

        with open(self.conf_file, "r") as f:
            config = json.load(f)
        self.short_term_multiplayer = config["short_term_multiplayer"]
        self.long_term_multiplayer = config["long_term_multiplayer"]

        assert self.short_term_multiplayer is not None
        assert self.long_term_multiplayer is not None

    def calc_reward(self, row_id, color, number_of_tiles):
        if row_id == -1:
            # print(0, 0, -self.calc_move_penalty(row_id, color, number_of_tiles))
            return -self.player_board.calc_move_penalty(row_id, color, number_of_tiles)
        filled_row_part = min(1, (number_of_tiles + sum(
            [1 if tile.current_color is not None else 0 for tile in self.player_board.pattern_lines[row_id]]
        )) / (row_id + 1))
        column_id = (row_id + color) % 5

        expected_points_row = 0
        for n in range(column_id - 1, -1, -1):
            if self.player_board.wall[row_id][n].current_color is not None:
                expected_points_row += 1
            else:
                break
        for n in range(column_id + 1, 5):
            if self.player_board.wall[row_id][n].current_color is not None:
                expected_points_row += 1
            else:
                break

        expected_points_column = 0
        for n in range(row_id - 1, -1, -1):
            if self.player_board.wall[n][column_id].current_color is not None:
                expected_points_column += 1
            else:
                break
        for n in range(row_id + 1, 5):
            if self.player_board.wall[n][column_id].current_color is not None:
                expected_points_column += 1
            else:
                break
        short_term_score = expected_points_row + expected_points_column + 1
        if expected_points_row > 0 and expected_points_column > 0:
            short_term_score += 1

        long_term_score = self.player_board.predict_final_reward(row_id, color)

        # print(short_term_score * filled_row_part * short_term_multiplayer, long_term_score * filled_row_part * long_term_multiplayer, -self.player_board.calc_move_penalty(row_id, color, number_of_tiles))

        return short_term_score * filled_row_part * self.short_term_multiplayer \
            + long_term_score * filled_row_part * self.long_term_multiplayer \
            - self.player_board.calc_move_penalty(row_id, color, number_of_tiles)

    def do_move(self, move):
        possible_moves = self.possible_moves()

        for possible_move in possible_moves:
            possible_move["reward"] = self.calc_reward(possible_move["to"], possible_move["color"],
                                                                           possible_move["number"])
            # possible_move["reward"] = self.player_board.calc_reward(possible_move["to"], possible_move["color"],
            #                                                                possible_move["number"])

        sorted_possible_moves = sorted(possible_moves, key=lambda x: -x['reward'])
        filtered_possible_moves = [dict(move) for move in sorted_possible_moves if
                                   move["reward"] == sorted_possible_moves[0]["reward"]]
        random_move = random.choice(filtered_possible_moves)

        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])
        # print("moved")
