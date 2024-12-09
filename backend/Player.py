import random


class Player:
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        self.player_id = player_id
        self.player_name = player_name
        self.player_type = player_type
        self.player_board = player_board
        self.tile_manager = tile_manager
        self.game = game
        self.score = {"base": 0, "horizontals": 0, "verticals": 0, "colors": 0}

    # def __pick_items(self):
    #     def get_random():
    #         for _ in range(1000):
    #             factory_id = random.randint(-1, len(self.game.factories) - 1)
    #             color = random.randint(0, 4)
    #             if self.game.is_valid_pick(factory_id, color):
    #                 return factory_id, color
    #         raise Exception("Something is wrong, cant pick random items")
    #
    #     valid_factory_id, valid_color = get_random()
    #     picked_tiles_number = self.game.pick(valid_factory_id, valid_color)
    #
    #     return picked_tiles_number, valid_color
    #
    # def __put_items(self, picked_tiles_number, color):
    #
    #     def get_random():
    #         tries = 0
    #         for _ in range(1000):
    #             row_id = random.randint(0, 4)
    #             if self.player_board.is_valid_place(row_id, color):
    #                 return row_id, color
    #             tries += 1
    #         return -1, color
    #
    #     valid_row_id, valid_color = get_random()
    #     self.player_board.place(valid_row_id, valid_color, picked_tiles_number)
    #     return picked_tiles_number

    def do_move_random(self):
        possible_moves = []
        possible_picks = self.game.possible_picks()
        for possible_pick in possible_picks:
            move = dict(possible_pick)
            possible_puts = self.player_board.possible_puts(move["color"])
            for possible_put in possible_puts:
                move["to"] = possible_put
            possible_moves.append(move)

        sorted_possible_moves = sorted(possible_moves, key=lambda x: (x['color'], -x['number']))
        for move in sorted_possible_moves:
            print(move)
        random_move = random.choice(sorted_possible_moves)
        print("=====\n", random_move)
        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])

    def do_move(self, move):
        factory_id = move["factory_id"]
        color_id = move["color_id"]
        pattern_line_row_id = move["pattern_line_row_id"]
        picked_tiles_number = self.game.pick(factory_id, color_id)
        self.player_board.place(pattern_line_row_id, color_id, picked_tiles_number)

    def wall_tile(self):
        score = self.player_board.wall_tile()
        self.score["base"] += score

    def calculate_final_score(self):
        self.score["horizontals"], self.score["verticals"], self.score[
            "colors"] = self.player_board.calculate_final_score()
        return self.score

    def has_finished(self):
        for row in self.player_board.wall:
            if len([1 for tile in row if tile.current_color is not None]) == 5:
                return True
        return False

    def print(self):
        print(f"Player {self.player_name} board:")
        self.player_board.print()
        print(f"Score: {self.score}")
