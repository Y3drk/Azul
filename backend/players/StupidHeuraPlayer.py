import random

from backend.players.Player import Player


class StupidHeuraPlayer(Player):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)

    def do_move(self, move):
        possible_moves = []
        possible_picks = self.game.possible_picks()
        for possible_pick in possible_picks:
            move = dict(possible_pick)
            possible_puts = self.player_board.possible_puts(move["color"])
            for possible_put in possible_puts:
                move["to"] = possible_put
            possible_moves.append(move)

        for possible_move in possible_moves:
            possible_move["penalty"] = self.player_board.calc_move_penalty(possible_move["to"], possible_move["color"],
                                                                           possible_move["number"])
            possible_move["will_finish_row"] = self.player_board.will_move_finish_row(possible_move["to"],
                                                                                      possible_move["color"],
                                                                                      possible_move["number"])

        sorted_possible_moves = sorted(possible_moves, key=lambda x: (x['penalty'], -x['will_finish_row']))
        filtered_possible_moves = [dict(move) for move in sorted_possible_moves if
                                   move["penalty"] == sorted_possible_moves[0]["penalty"] and
                                   move["will_finish_row"] == sorted_possible_moves[0]["will_finish_row"]]
        random_move = random.choice(filtered_possible_moves)

        picked_tiles_number = self.game.pick(random_move["from"], random_move["color"])
        assert picked_tiles_number == random_move["number"]
        self.player_board.place(random_move["to"], random_move["color"], random_move["number"])
