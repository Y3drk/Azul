import random

from backend.players.Player import Player


class DynamicRewardPlayer(Player):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)

    def do_move(self, move):
        possible_moves = self.possible_moves()

        for possible_move in possible_moves:
            possible_move["reward"] = self.player_board.calc_reward(possible_move["to"], possible_move["color"],
                                                                           possible_move["number"])

        sorted_possible_moves = sorted(possible_moves, key=lambda x: -x['reward'])
        filtered_possible_moves = [dict(move) for move in sorted_possible_moves if
                                   move["reward"] == sorted_possible_moves[0]["reward"]]
        random_move = random.choice(filtered_possible_moves)

        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])
