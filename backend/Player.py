from random import randint


class Player:
    def __init__(self, player_id, player_name, player_board, tile_manager, game):
        self.player_id = player_id
        self.player_name = player_name
        self.player_board = player_board
        self.tile_manager = tile_manager
        self.game = game
        self.score = 0

    def __pick_items(self):
        def get_random():
            for _ in range(1000):
                factory_id = randint(-1, len(self.game.factories)-1)
                color = randint(0, 4)
                if self.game.is_valid_pick(factory_id, color):
                    return factory_id, color
            raise Exception("Something is wrong, cant pick random items")

            # for factory_id in range(-1, len(self.game.factories)):
            #     for color in range(5):
            #         if self.game.is_valid_pick(factory_id, color):
            #             return factory_id, color

        valid_factory_id, valid_color = get_random()
        picked_tiles_number = self.game.pick(valid_factory_id, valid_color)
        # print(
        #     f"{self.player_name} picks {picked_tiles_number} tile of color {valid_color} from factory {valid_factory_id}",
        #     end=" and ")
        return picked_tiles_number, valid_color

    def __put_items(self, picked_tiles_number, color):

        def get_random():
            tries = 0
            for _ in range(1000):
                row_id = randint(0, 4)
                if self.player_board.is_valid_place(row_id, color):
                    return row_id, color
                tries += 1
            return -1, color

            # for row_id in range(5):
            #     if self.player_board.is_valid_place(row_id, color):
            #         return row_id, color
            # return -1, color

        valid_row_id, valid_color = get_random()
        self.player_board.place(valid_row_id, valid_color, picked_tiles_number)
        # print(f"places to row {valid_row_id}")
        return picked_tiles_number

    def do_move(self):
        picked_tiles_number, color = self.__pick_items()
        self.__put_items(picked_tiles_number, color)

    def wall_tile(self):
        score = self.player_board.wall_tile()
        self.score += score

    def calculate_final_score(self):
        score = self.player_board.calculate_final_score()
        self.score += score
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
