from backend.game_pieces.TilePlace import TilePlace


class PlayerBoard:
    def __init__(self, tile_manager):
        self.tile_manager = tile_manager
        self.wall = [[TilePlace(expected_color=(j - i) % 5) for j in range(5)] for i in range(5)]
        self.patter_lines = [[TilePlace() if i + j >= 4 else TilePlace(blocked=True) for j in range(5)] for i in
                             range(5)]
        self.current_pattern_lines_colors = [-1 for _ in range(5)]
        self.floor_line = [TilePlace() for _ in range(7)]

    def is_valid_place(self, row_id, color):
        if self.current_pattern_lines_colors[row_id]!=color and\
                self.current_pattern_lines_colors[row_id] != -1:
            return False

        for tile in self.wall[row_id]:
            if tile.expected_color == color:
                return tile.current_color is None

    def add_to_floor(self, color, left_tiles_number):
        for tile in self.floor_line:
            if tile.current_color is None:
                tile.current_color = color
                left_tiles_number -= 1
            if left_tiles_number == 0:
                break

        self.tile_manager.discard([color for _ in range(left_tiles_number)])

    def place(self, row_id, color, picked_tiles_number):
        if row_id != -1:
            for tile in self.patter_lines[row_id]:
                if not tile.blocked and tile.current_color is None:
                    tile.current_color = color
                    picked_tiles_number -= 1
                if picked_tiles_number == 0:
                    break

        if picked_tiles_number>0:
            self.add_to_floor(color, picked_tiles_number)

        self.current_pattern_lines_colors[row_id] = color

    def wall_tile(self):
        score = 0
        for row in range(5):
            finished_row = True
            color = None
            for tile in self.patter_lines[row]:
                if not tile.blocked and tile.current_color is None:
                    finished_row = False
                else:
                    color = tile.current_color


            if finished_row:
                for tile in self.wall[row]:
                    if tile.expected_color == color:
                        tile.current_color = color
                        score += 5
                self.tile_manager.discard([tile.current_color for tile in self.patter_lines[row]])
                self.patter_lines[row] = [TilePlace() if row + j >= 4 else TilePlace(blocked=True) for j in range(5)]
        return score


    def print(self):
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
            str(item) for item in self.floor_line) + " |"
        print(floor_line_row_string)
        print("+---+---+---+---+---+---+---+")
