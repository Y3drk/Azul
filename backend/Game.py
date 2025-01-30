# from Player import Player
from game_pieces.Factory import Factory
from game_pieces.PlayerBoard import PlayerBoard
from game_pieces.TileManager import TileManager
from players.HumanPlayer import HumanPlayer
from players.RandomPlayer import RandomPlayer
from players.MostTilesPlayer import MostTilesPlayer
from players.LowestPenaltyPlayer import LowestPenaltyPlayer
from players.StupidHeuraPlayer import StupidHeuraPlayer
from players.QPlayer import QPlayer
from players.DynamicRewardPlayer import DynamicRewardPlayer


class Game:

    def __init__(self, players):
        self.players_number = len(players.items())
        self.tile_manager = TileManager()
        self.players = {}
        for i, (player_name, (player_type, conf_file)) in enumerate(players.items()):
            if player_type == "human":
                self.players[player_name] = HumanPlayer(i, player_name, player_type, PlayerBoard(self.tile_manager),
                                                        self.tile_manager, self)
            elif player_type == "bot_random":
                self.players[player_name] = RandomPlayer(i, player_name, player_type, PlayerBoard(self.tile_manager),
                                                         self.tile_manager, self)
            elif player_type == "bot_most_tiles":
                self.players[player_name] = MostTilesPlayer(i, player_name, player_type, PlayerBoard(self.tile_manager),
                                                            self.tile_manager, self)
            elif player_type == "bot_lowest_penalty":
                self.players[player_name] = LowestPenaltyPlayer(i, player_name, player_type,
                                                                PlayerBoard(self.tile_manager),
                                                                self.tile_manager, self)
            elif player_type == "bot_stupid_heura":
                self.players[player_name] = StupidHeuraPlayer(i, player_name, player_type,
                                                              PlayerBoard(self.tile_manager),
                                                              self.tile_manager, self)
            elif player_type == "bot_q":
                self.players[player_name] = QPlayer(i, player_name, player_type,
                                                              PlayerBoard(self.tile_manager),
                                                              self.tile_manager, self)
            elif player_type == "bot_dynamic_reward":
                self.players[player_name] = DynamicRewardPlayer(i, player_name, player_type,
                                                              PlayerBoard(self.tile_manager),
                                                              self.tile_manager, self, conf_file)
            elif player_type == "bot":
                self.players[player_name] = RandomPlayer(i, player_name, player_type, PlayerBoard(self.tile_manager),
                                                         self.tile_manager, self)
            else:
                raise Exception(f"Invalid player type {player_type}")
        self.center: list[int] = []
        self.factories = [Factory(i, self.tile_manager, self) for i in range(self.players_number * 2 + 1)]

        self.turn_counter = 0
        self.round_counter = 0

    def possible_picks(self) -> list[dict]:
        picks = []
        for f in self.factories:
            colors = [0 for _ in range(5)]
            for t in f.content:
                colors[t] += 1
            for color, n in enumerate(colors):
                if n > 0:
                    picks.append({"color": color, "number": n, "from": f.factory_id})

        colors = [0 for _ in range(5)]
        for t in self.center:
            colors[t] += 1
        for color, n in enumerate(colors):
            if n > 0:
                picks.append({"color": color, "number": n, "from": -1})

        return picks

    def pick_from_center(self, tile_color):
        picked_tiles_number = len([tile for tile in self.center if tile == tile_color])
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

    def get_game_state(self) -> dict:
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
                # print(self.final_scores())
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
        if player_name not in self.players.keys():
            raise Exception("Unknown player")
        self.players[player_name].do_move(move)

        if self.needs_refill():
            return self.end_of_phase()
        return None

    def get_winner(self):
        high_score = 0
        winner = None
        for player in self.players.values():
            if high_score < player.calculate_final_score_summed():
                winner = player
                high_score = player.calculate_final_score_summed()
        return winner

    def simulate(self):
        game_is_on = True
        iterations = 0
        players_names = [player_name for player_name in self.players.keys()]
        while game_is_on:
            active_player = self.players[players_names[iterations % len(players_names)]]
            result = self.player_move(active_player.player_name, None)
            iterations += 1
            if result is not None:
                return result, iterations//len(players_names)
        return None
