import string
from time import sleep

from backend.game_pieces.Board import Board


class Game:

    def __init__(self, players_number, players_names = None):
        assert 2 <= players_number <= 4

        if players_names is None:
            players_names = ["Player1", "Player2", "Player3", "Player4"][:players_number]
        self.players_number = players_number
        self.players_names = players_names
        
        self.board = Board(players_names)

    def run(self):
        active_player = 0
        while True:
            print(f"Player \"{self.players_names[active_player]}\" moves")
            active_player = (active_player + 1) % self.players_number
            sleep(1)
            self.board.print_current_game_state()
            break
