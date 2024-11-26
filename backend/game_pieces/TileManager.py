import random


class TileManager:
    def __init__(self):
        self.inside_bag = [j for j in range(5) for i in range(20)]
        self.in_play = []
        self.discarded = []

    def draw(self):
        drawn_tiles = []

        while len(drawn_tiles) < 4:
            if not self.inside_bag:
                if not self.discarded:
                    break
                self.inside_bag = self.discarded[:]
                self.discarded = []

            tile = random.choice(self.inside_bag)
            self.inside_bag.remove(tile)
            drawn_tiles.append(tile)

        self.in_play.extend(drawn_tiles)
        return drawn_tiles
