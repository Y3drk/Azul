from backend.game_pieces.TilePlace import TilePlace


class PlayerBoard:
    def __init__(self, player_name):
        self.player_name = player_name
        self.wall = [[TilePlace(expected_color=(j - i) % 5) for j in range(5)] for i in range(5)]
        self.patter_lines = [[TilePlace() if i + j >= 4 else TilePlace(blocked=True) for j in range(5)] for i in range(5)]
        self.floor_line = [TilePlace() for _ in range(7)]

    def print(self):
        print(f"{self.player_name}'s board:")
        for i in range(5):
            print("+---+---+---+---+---+    +---+---+---+---+---+")
            patter_line_row_string = "| " + " | ".join(
                f"{str(item)}" for item in self.patter_lines[i]) + " |"
            print(patter_line_row_string, end="    ")

            wall_row_string = "| " + " | ".join(
                f"{str(item)}" for item in self.wall[i]) + " |"
            print(wall_row_string)
            
        print("+---+---+---+---+---+    +---+---+---+---+---+")

        print("+---+---+---+---+---+---+---+")
        floor_line_row_string = "| " + " | ".join(
            f"{str(item)}" for item in self.floor_line) + " |"
        print(floor_line_row_string)
        print("+---+---+---+---+---+---+---+")
