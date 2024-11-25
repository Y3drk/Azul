from backend.game_pieces.Factory import Factory
from backend.game_pieces.PlayerBoard import PlayerBoard


class Board:
    def __init__(self, players_names):
        self.players_names = players_names
        self.players_number = len(players_names)
        self.players_boards = [PlayerBoard(player_name) for player_name in players_names]
        self.factories = [Factory(i) for i in range(self.players_number*2+1)]

    def print_current_game_state(self):
        print("="*80)
        print("Boards:")
        print("="*80)
        for player_board in self.players_boards:
            player_board.print()
            print()
        print("="*80)
        print("Factories:")
        print("="*80)
        for factory in self.factories:
            factory.print()
