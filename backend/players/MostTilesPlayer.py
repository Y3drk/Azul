import random

from backend.players.Player import Player


class MostTilesPlayer(Player):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)

    def do_move(self, move):
        possible_moves = self.possible_moves()

        sorted_possible_moves = sorted(possible_moves, key=lambda x: -x["number"])
        filtered_possible_moves = [dict(move) for move in sorted_possible_moves if
                                   move["number"] >= sorted_possible_moves[0]["number"]]
        random_move = random.choice(filtered_possible_moves)
        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])
