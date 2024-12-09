class Factory:
    def __init__(self, factory_id, tile_manager, game):
        self.factory_id = factory_id
        self.content: list[int] = []
        self.tile_manager = tile_manager
        self.game = game

    def is_valid_pick(self, tile_color):
        return tile_color in [tile for tile in self.content]

    def pick(self, tile_color):
        picked_tiles_number = len([tile for tile in self.content if tile == tile_color])
        colors_moved_to_center = [tile for tile in self.content if tile != tile_color]
        self.game.center.extend(colors_moved_to_center)
        self.content = []

        # self.refill()

        return picked_tiles_number

    def refill(self):
        assert len(self.content) == 0

        self.content = self.tile_manager.draw()

    def print(self):
        print("               +---------------+")
        if len(self.content)==0:
            print(f"Factory id {self.factory_id}:  |   -   -   -   |")
        else:
            floor_line_row_string = f"Factory id {self.factory_id}:  " + "| " + " | ".join(
                str(item) for item in self.content) + " |"
            print(floor_line_row_string)
        print("               +---------------+")
