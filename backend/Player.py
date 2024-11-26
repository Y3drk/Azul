class Player:
    def __init__(self, player_id, player_name, player_board, tile_manager, game):
        self.player_id = player_id
        self.player_name = player_name
        self.player_board = player_board
        self.tile_manager = tile_manager
        self.game = game
        self.score = 0

    def __pick_items(self):
        for factory_id in range(-1, len(self.game.factories)):
            for color in range(5):
                if self.game.is_valid_pick(factory_id, color):
                    picked_tiles_number = self.game.pick(factory_id, color)
                    print(f"-  -  -  -  -  {self.player_name} picks {picked_tiles_number} tile of color {color} from factory {factory_id}" )
                    return picked_tiles_number

    def do_move(self):
        picked_items = self.__pick_items()




    def print(self):
        print(f"Player {self.player_name} board:")
        self.player_board.print()
        print(f"Score: {self.score}")