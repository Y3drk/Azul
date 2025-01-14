from backend.game_pieces.TilePlace import TilePlace


class PlayerBoard:
    def __init__(self, tile_manager):
        self.tile_manager = tile_manager
        self.wall = [[TilePlace(expected_color=(j - i) % 5) for j in range(5)] for i in range(5)]
        self.pattern_lines = [[TilePlace() if i + j >= 4 else TilePlace(blocked=True) for j in range(5)] for i in
                              range(5)]
        self.current_pattern_lines_colors = [-1 for _ in range(5)]
        self.floor_line = [TilePlace() for _ in range(7)]

    def serialize(self):
        wall = [[self.wall[i][j].current_color for j in range(5)] for i in range(5)]
        pattern_lines = [[self.pattern_lines[i][j].current_color for j in range(5)] for i in range(5)]
        floor_line = [self.floor_line[i].current_color for i in range(7)]
        return {"wall": wall, "pattern_lines": pattern_lines, "floor_line": floor_line}

    def is_valid_place(self, row_id, color):
        if self.current_pattern_lines_colors[row_id] != color and \
                self.current_pattern_lines_colors[row_id] != -1:
            return False

        for tile in self.wall[row_id]:
            if tile.expected_color == color:
                return tile.current_color is None

    def possible_puts(self, color: int) -> list[int]:
        result = [-1]
        for row_id in range(5):
            if self.is_valid_place(row_id, color):
                result.append(row_id)

        return result

    def calc_reward(self, row_id, color, number_of_tiles):
        if row_id == -1:
            return 0
        filled_row_part = (number_of_tiles + sum(
            [1 if tile.current_color is not None else 0 for tile in self.pattern_lines[row_id]]
        )) / (row_id + 1)
        column_id = (row_id + color) % 5

        expected_points_row = 0
        for n in range(column_id - 1, -1, -1):
            if self.wall[row_id][n].current_color is not None:
                expected_points_row += 1
            else:
                break
        for n in range(column_id + 1, 5):
            if self.wall[row_id][n].current_color is not None:
                expected_points_row += 1
            else:
                break

        expected_points_column = 0
        for n in range(row_id - 1, -1, -1):
            if self.wall[n][column_id].current_color is not None:
                expected_points_column += 1
            else:
                break
        for n in range(row_id + 1, 5):
            if self.wall[n][column_id].current_color is not None:
                expected_points_column += 1
            else:
                break
        short_term_score = expected_points_row + expected_points_column + 1
        if expected_points_row > 0 and expected_points_column > 0:
            short_term_score += 1
        return short_term_score * filled_row_part

    def calc_move_penalty(self, row_id, color, number_of_tiles):
        penalty = 0
        if self.current_pattern_lines_colors[row_id] == -1 or self.current_pattern_lines_colors[row_id] == color:
            for place in self.pattern_lines[row_id]:
                if not place.blocked and place.current_color is None:
                    number_of_tiles -= 1
                if number_of_tiles == 0:
                    return 0
        for i, tile in enumerate(self.floor_line):
            if tile.current_color is None and number_of_tiles > 0:
                if i < 2:
                    penalty += 1
                elif i < 5:
                    penalty += 2
                else:
                    penalty += 3
            number_of_tiles -= 1
        return penalty

    def will_move_finish_row(self, row_id, color, number_of_tiles):
        if self.current_pattern_lines_colors[row_id] == -1 or self.current_pattern_lines_colors[row_id] == color:
            for place in self.pattern_lines[row_id]:
                if not place.blocked and place.current_color is None:
                    number_of_tiles -= 1
        return 1 if number_of_tiles >= 0 else 0

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
            for tile in self.pattern_lines[row_id]:
                if not tile.blocked and tile.current_color is None:
                    tile.current_color = color
                    picked_tiles_number -= 1
                if picked_tiles_number == 0:
                    break

        if picked_tiles_number > 0:
            self.add_to_floor(color, picked_tiles_number)

        self.current_pattern_lines_colors[row_id] = color

    def wall_tile(self):
        score = 0
        for row in range(5):
            finished_row = True
            color = None
            for tile in self.pattern_lines[row]:
                if not tile.blocked and tile.current_color is None:
                    finished_row = False
                else:
                    color = tile.current_color

            if finished_row:
                for i, tile in enumerate(self.wall[row]):
                    if tile.expected_color == color:
                        points_row = 0
                        for n in range(i - 1, -1, -1):
                            if self.wall[row][n].current_color is not None:
                                points_row += 1
                            else:
                                break
                        for n in range(i + 1, 5):
                            if self.wall[row][n].current_color is not None:
                                points_row += 1
                            else:
                                break
                        points_column = 0
                        for n in range(row - 1, -1, -1):
                            if self.wall[n][i].current_color is not None:
                                points_column += 1
                            else:
                                break
                        for n in range(row + 1, 5):
                            if self.wall[n][i].current_color is not None:
                                points_column += 1
                            else:
                                break
                        tile.current_color = color
                        score += points_row + points_column + 1
                        if points_row > 0 and points_column > 0:
                            score += 1
                self.tile_manager.discard([tile.current_color for tile in self.pattern_lines[row]])
                self.pattern_lines[row] = [TilePlace() if row + j >= 4 else TilePlace(blocked=True) for j in range(5)]

        for i, tile in enumerate(self.floor_line):
            if tile.current_color is not None:
                if i < 2:
                    score -= 1
                elif i < 5:
                    score -= 2
                else:
                    score -= 3
        score = max(0, score)

        self.tile_manager.discard([tile.current_color for tile in self.floor_line])
        self.floor_line = [TilePlace() for _ in range(7)]

        return score

    def calculate_final_score(self):
        points_for_rows = 0
        points_for_columns = 0
        points_for_colors = 0
        full_color_dict = {i: True for i in range(5)}
        for i, row in enumerate(self.wall):
            full_row = True
            full_column = True
            for j, tile in enumerate(row):
                if self.wall[i][j].current_color is None:
                    full_row = False
                if self.wall[j][i].current_color is None:
                    full_column = False
                if self.wall[i][j].current_color is None:
                    full_color_dict[self.wall[i][j].expected_color] = False
            if full_row:
                points_for_rows += 5
            if full_column:
                points_for_columns += 7
        for color, full_color in full_color_dict.items():
            if full_color:
                points_for_colors += 10
        return points_for_rows, points_for_columns, points_for_colors

    def print(self):
        for i in range(5):
            print("+---+---+---+---+---+    +---+---+---+---+---+")
            patter_line_row_string = "| " + " | ".join(
                f"{str(item)}" for item in self.pattern_lines[i]) + " |"
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
