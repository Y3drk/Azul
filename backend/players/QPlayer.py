import json
import random

from numpy import sort

from backend.players.Player import Player


class QPlayer(Player):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)
        self.q_table = {}
        self.load_q_table()
        self.q_size = 0
        for move in self.q_table.values():
            for state in move:
                self.q_size += 1

    def load_q_table(self):
        # Load Q-table
        with open('players/q_table.json', 'r') as f:
            self.q_table = json.load(f)

    def save_q_table(self):
        # Save Q-table
        with open('players/q_table.json', 'w') as f:
            json.dump(self.q_table, f)

    def extend_q_table(self):
        # Save Q-table
        with open('players/q_table.json', 'w') as f:
            json.dump(self.q_table, f)

    def convert_possible_move_to_dict_state(self, possible_move: dict):
        # return str((possible_move["color"], possible_move["number"], possible_move["from"], possible_move["to"]))
        return str((possible_move["color"], possible_move["number"], possible_move["to"]))

    def convert_player_board_to_dict_state(self, player_board: dict,row_id: int, color: int):
        cleaned_player_board = dict(player_board)
        column = []
        row = []
        colors = []
        if row_id!=-1:
            for wall_row_id, wall_row in enumerate(player_board["wall"]):
                for wall_column_id, tile in enumerate(wall_row):
                    if wall_column_id == (row_id + color) % 5:
                        column.append(tile)
                    if wall_row_id == row_id:
                        row.append(tile)
                    if (wall_column_id+5-wall_row_id)%5 == color:
                        colors.append(tile)
        cleaned_player_board["wall"] = {"column": column, "row": row, "colors": colors}

        used_color = None
        for tile in player_board["pattern_lines"][row_id]:
            if tile is not None:
                used_color = tile
        cleaned_player_board["pattern_lines"] = (
            used_color, sum([1 if tile is not None else 0 for tile in player_board["pattern_lines"][row_id]]))

        cleaned_player_board["floor_line"] = sum([1 if tile is not None else 0 for tile in player_board["floor_line"]])
        # print(player_board)
        # print(cleaned_player_board)
        return str(cleaned_player_board)

    # def convert_player_board_to_dict_state(self, player_board: dict):
    #     cleaned_player_board = dict(player_board)
    #     filled_colors = []
    #     for wall_row in player_board["wall"]:
    #         filled_colors_row = []
    #         for tile in wall_row:
    #             if tile is not None:
    #                 filled_colors_row.append(tile)
    #         sort(filled_colors_row)
    #         filled_colors.append(filled_colors_row)
    #     cleaned_player_board["wall"] = filled_colors
    #
    #     used_colors = []
    #     for patter_line in player_board["pattern_lines"]:
    #         used_color = None
    #         for tile in patter_line:
    #             if tile is not None:
    #                 used_color = tile
    #         used_colors.append((used_color,sum([1 if tile is not None else 0 for tile in patter_line])))
    #     cleaned_player_board["pattern_lines"] = used_colors
    #
    #     cleaned_player_board["floor_line"] = sum([1 if tile is not None else 0 for tile in player_board["floor_line"]])
    #     # print(player_board)
    #     # print(cleaned_player_board)
    #     return str(cleaned_player_board)

    # def convert_game_state_to_dict_state(self, game_state: dict):
    #     cleaned_game_state = dict(game_state)
    #     for player in cleaned_game_state["players"]:
    #         if player["player_name"] != self.player_name:
    #             del player["player_name"]
    #         else:
    #             player["player_name"] = "self"
    #         del player["player_type"]
    #     # cleaned_game_state["players"]["player_name"] = "_"
    #     # cleaned_game_state["players"]["player_type"] = "_"
    #     print(cleaned_game_state["players"])
    #     return str(cleaned_game_state)

    def update_q_table(self, possible_moves):
        """
        structure is following:
        player_board -> from -> to -> (color, number)
        """
        # game_state_str = self.convert_game_state_to_dict_state(self.game.get_game_state())

        for possible_move in possible_moves:
            possible_move_str = self.convert_possible_move_to_dict_state(possible_move)
            if possible_move_str in self.q_table.keys():  # known move
                player_state_str = self.convert_player_board_to_dict_state(self.player_board.serialize(),
                                                                           possible_move["to"], possible_move["color"])
                if player_state_str in self.q_table[possible_move_str].keys():
                    pass
                else:
                    self.q_table[possible_move_str][player_state_str] = 0
                    self.q_size += 1
            else:  # new move
                player_state_str = self.convert_player_board_to_dict_state(self.player_board.serialize(),
                                                                           possible_move["to"], possible_move["color"])
                self.q_table[possible_move_str] = {player_state_str: 0}
                self.q_size += 1

        # player_board_state_str = self.convert_player_board_to_dict_state(self.player_board.serialize())
        # if player_board_state_str in self.q_table.keys():  # known game state
        #     for possible_move in possible_moves:
        #         possible_move_str = self.convert_possible_move_to_dict_state(possible_move)
        #         if possible_move_str in self.q_table[player_board_state_str].keys():  # known possible move
        #             pass
        #         else:  # new possible move
        #             self.q_table[player_board_state_str][possible_move_str] = 0
        # else:  # new game state
        #     self.q_table[player_board_state_str] = {self.convert_possible_move_to_dict_state(possible_move): 0 for
        #                                             possible_move in possible_moves}

        # possible_moves_from_dict = {}
        # for possible_move in possible_moves:
        #     possible_moves_to_dict = {}
        #     for possible_move2 in possible_moves:
        #         if possible_move2["from"] == possible_move["from"]:
        #             possible_moves_to_dict[possible_move2["to"]] = (possible_move2["color"], possible_move2["number"])
        #     possible_moves_from_dict[possible_move["from"]] = possible_moves_to_dict
        #
        # self.q_table[player_board_state_str] = possible_moves_from_dict

        # self.q_table[player_board_state_str] = {
        #     possible_move["from"]: {
        #         possible_move2["to"]: (possible_move2["color"], possible_move2["number"]) for possible_move2 in
        #         possible_moves if possible_move2["from"] == possible_move["from"]}
        #     for possible_move in possible_moves}



    def do_move(self, move):
        possible_moves = self.possible_moves()
        # for m in possible_moves:
        #     print(m)

        self.update_q_table(possible_moves)

        sorted_possible_moves = sorted(possible_moves, key=lambda x: (x['color'], -x['number']))
        random_move = random.choice(sorted_possible_moves)
        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])
