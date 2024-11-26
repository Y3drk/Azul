from backend.Player import Player
from backend.game_pieces.Factory import Factory
from backend.game_pieces.PlayerBoard import PlayerBoard
from backend.game_pieces.TileManager import TileManager
from backend.game_pieces.TilePlace import TilePlace


class Game:

    def __init__(self, players_names):
        self.players_number = len(players_names)
        assert 2 <= self.players_number <= 4

        self.tile_manager = TileManager()
        self.players = [Player(i, players_names[i], PlayerBoard(), self.tile_manager, self) for i in range(self.players_number)]
        self.center = []
        self.factories = [Factory(i, self.tile_manager, self) for i in range(self.players_number * 2 + 1)]


    def pick_from_center(self, tile_color):
        picked_tiles_number = len([tile for tile in self.center if tile == tile_color])
        colors_discarded = [tile for tile in self.center if tile != tile_color]
        self.tile_manager.discard(colors_discarded)
        self.center = []
        return picked_tiles_number

    def is_valid_pick(self, factory_id, tile_color):
        assert -1<=factory_id<len(self.factories)
        if factory_id==-1:
            return tile_color in self.center
        return self.factories[factory_id].is_valid_pick(tile_color)

    def pick(self, factory_id, tile_color):
        assert -1<=factory_id<len(self.factories)
        if factory_id==-1:
            return self.pick_from_center(tile_color)
        return self.factories[factory_id].pick(tile_color)

    def print(self):
        def print_factories():
            print("=" * 80)
            print("Factories:")
            print("=" * 80)
            for factory in self.factories:
                factory.print()
        def print_center():
            if len(self.center) == 0:
                print("*Empty*")
            else:
                print("+" + "-" * (len(self.center)*4-1) + "+")
                floor_line_row_string = f"| " + " | ".join(
                    f"{str(item)}" for item in self.center) + " |"
                print(floor_line_row_string)
                print("+" + "-" * (len(self.center)*4-1) + "+")
            print("=" * 80)
        def print_players():
            print("=" * 80)
            print("Players:")
            print("=" * 80)
            for player in self.players:
                player.print()
                print()

        print("#" * 80)
        print("#" * 80)
        print_factories()
        print_center()
        # print_players()

    def initial_setup(self):
        for factory in self.factories:
            factory.refill()
        # self.tile_manager.show_status()

    def run(self, starting_player_id):
        active_player = starting_player_id
        self.print()
        for _ in range(3):
            print(f"-  -  -  -  -  It is \"{self.players[active_player].player_name}\" move:")
            self.players[active_player].do_move()
            self.print()
            active_player = (active_player + 1) % self.players_number
