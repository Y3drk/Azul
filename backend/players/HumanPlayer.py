from backend.players.Player import Player


class HumanPlayer(Player):

    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        super().__init__(player_id, player_name, player_type, player_board, tile_manager, game)

    def do_move(self, move):
        factory_id = move["factory_id"]
        color_id = move["color_id"]
        pattern_line_row_id = move["pattern_line_row_id"]
        picked_tiles_number = self.game.pick(factory_id, color_id)
        self.player_board.place(pattern_line_row_id, color_id, picked_tiles_number)
