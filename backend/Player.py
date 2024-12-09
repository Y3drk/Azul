from abc import ABC, abstractmethod


class Player(ABC):
    def __init__(self, player_id, player_name, player_type, player_board, tile_manager, game):
        self.player_id = player_id
        self.player_name = player_name
        self.player_type = player_type
        self.player_board = player_board
        self.tile_manager = tile_manager
        self.game = game
        self.score = {"base": 0, "horizontals": 0, "verticals": 0, "colors": 0}

    @abstractmethod
    def do_move(self, move):
        pass

    def wall_tile(self):
        score = self.player_board.wall_tile()
        self.score["base"] += score

    def calculate_final_score(self):
        self.score["horizontals"], self.score["verticals"], self.score[
            "colors"] = self.player_board.calculate_final_score()
        return self.score

    def calculate_final_score_summed(self):
        return self.score["base"] + self.score["horizontals"] + self.score["verticals"] + self.score["colors"]

    def has_finished(self):
        for row in self.player_board.wall:
            if len([1 for tile in row if tile.current_color is not None]) == 5:
                return True
        return False

    def print(self):
        print(f"Player {self.player_name} board:")
        self.player_board.print()
        print(f"Score: {self.score}")
