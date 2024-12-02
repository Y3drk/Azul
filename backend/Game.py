from backend.Player import Player
from backend.game_pieces.Factory import Factory
from backend.game_pieces.PlayerBoard import PlayerBoard
from backend.game_pieces.TileManager import TileManager


class Game:

    def __init__(self, players):
        self.players_number = len(players.items())
        self.tile_manager = TileManager()
        self.players = {
            player_name: Player(i, player_name, player_type, PlayerBoard(self.tile_manager), self.tile_manager, self)
            for
            i, (player_name, player_type) in enumerate(players.items())}
        self.center = []
        self.factories = [Factory(i, self.tile_manager, self) for i in range(self.players_number * 2 + 1)]

        self.turn_counter = 0
        self.round_counter = 0

    def pick_from_center(self, tile_color):
        picked_tiles_number = len([tile for tile in self.center if tile == tile_color])
        # colors_discarded = [tile for tile in self.center if tile != tile_color]
        # self.tile_manager.discard(colors_discarded)
        self.center = [tile for tile in self.center if tile != tile_color]
        return picked_tiles_number

    def is_valid_pick(self, factory_id, tile_color):
        assert -1 <= factory_id < len(self.factories)
        if factory_id == -1:
            return tile_color in self.center
        return self.factories[factory_id].is_valid_pick(tile_color)

    def pick(self, factory_id, tile_color):
        assert -1 <= factory_id < len(self.factories)
        if factory_id == -1:
            return self.pick_from_center(tile_color)
        return self.factories[factory_id].pick(tile_color)

    def get_game_state(self):
        current_state = {"center": self.center}
        factories = {}
        for f in self.factories:
            factories[f.factory_id] = f.content
        current_state["factories"] = factories
        players = []
        for p in self.players.values():
            player_info = {"player_name": p.player_name, "player_type": p.player_type,
                           "player_board": p.player_board.serialize(),
                           "score": p.score}
            players.append(player_info)
        current_state["players"] = players

        return current_state

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
                print("+" + "-" * (len(self.center) * 4 - 1) + "+")
                floor_line_row_string = f"| " + " | ".join(
                    f"{str(item)}" for item in self.center) + " |"
                print(floor_line_row_string)
                print("+" + "-" * (len(self.center) * 4 - 1) + "+")
            print("=" * 80)

        def print_players():
            print("=" * 80)
            print("Players:")
            print("=" * 80)
            for player in self.players.values():
                player.print()
                print()

        print("#" * 80)
        print("#" * 80)
        print_factories()
        print_center()
        print_players()

    def initial_setup(self):
        for factory in self.factories:
            factory.refill()
        # self.tile_manager.show_status()

    def final_scores(self):
        scores = {}
        for player in self.players.values():
            scores[player.player_name] = player.calculate_final_score()
        return scores

    def end_of_game(self):
        for player in self.players.values():
            if player.has_finished():
                return self.final_scores()
        return None

    def wall_tiling(self):
        for player in self.players.values():
            player.wall_tile()

    def end_of_phase(self):
        self.wall_tiling()
        for factory in self.factories:
            factory.refill()
        return self.end_of_game()

    def needs_refill(self):
        return len(self.center) + len([1 for factory in self.factories if len(factory.content) > 0]) == 0

    def player_move(self, player_name, move):
        if self.players[player_name].player_type == "bot":
            self.players[player_name].do_move_random()
        elif self.players[player_name].player_type == "human":
            self.players[player_name].do_move(move)
        else:
            raise Exception(f"Unknown player {player_name} type: {self.players[player_name].player_type}")

        if self.needs_refill():
            return self.end_of_phase()
        return None
