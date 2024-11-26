from backend.game_pieces.Factory import Factory
from backend.game_pieces.PlayerBoard import PlayerBoard
from backend.game_pieces.TileManager import TileManager
from backend.game_pieces.TilePlace import TilePlace


class Game:

    def __init__(self, players_number, players_names=None):
        assert 2 <= players_number <= 4

        if players_names is None:
            players_names = ["Player1", "Player2", "Player3", "Player4"][:players_number]
        self.players_number = players_number
        self.players_names = players_names

        self.tileManager = TileManager()
        self.players_boards = [PlayerBoard(player_name) for player_name in players_names]
        self.factories = [Factory(i) for i in range(self.players_number * 2 + 1)]
        self.center = []

    def print(self):
        print("=" * 80)
        print("Boards:")
        print("=" * 80)
        for player_board in self.players_boards:
            player_board.print()
            print()
        print("=" * 80)
        print("Factories:")
        print("=" * 80)
        for factory in self.factories:
            factory.print()
        print("=" * 80)
        print("Center:")
        print("=" * 80)

        def print_center():
            if len(self.center) == 0:
                print("*Empty*")
            else:
                print("+---" * len(self.center) + "+")
                floor_line_row_string = f"| " + " | ".join(
                    f"{str(item)}" for item in self.center) + " |"
                print(floor_line_row_string)
                print("+---" * len(self.center) + "+")

        print_center()

    def initial_setup(self):
        for factory in self.factories:
            factory.refill(self.tileManager.draw())

    def run(self, starting_player_id):
        active_player = starting_player_id
        while True:
            print(f"Player \"{self.players_names[active_player]}\" moves")
            active_player = (active_player + 1) % self.players_number
            # sleep(1)
            self.print()
            break
