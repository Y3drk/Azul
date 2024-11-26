from backend.game_pieces.TilePlace import TilePlace


class Factory:
    def __init__(self, factory_number):
        self.factory_number = factory_number
        self.content = [TilePlace() for _ in range(4)]

    def refill(self, new_tiles):
        self.content = new_tiles

    def print(self):
        print("                   +---+---+---+---+")
        floor_line_row_string = f"Factory number {self.factory_number}:  " + "| " + " | ".join(
            f"{str(item)}" for item in self.content) + " |"
        print(floor_line_row_string)
        print("                   +---+---+---+---+")
