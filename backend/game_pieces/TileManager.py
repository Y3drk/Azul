import random


class TileManager:
    def __init__(self):
        self.inside_bag = [j for j in range(5) for i in range(20)]
        self.in_play = []
        self.discarded = []

    def discard(self, discarded_tiles):
        for tile in discarded_tiles:
            if tile in self.in_play:
                self.in_play.remove(tile)
                self.discarded.append(tile)

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

    def show_status(self):
        counter = {i: self.inside_bag.count(i) for i in range(5)}
        print(f"Inside bag: {counter}, sum: {len(self.inside_bag)}")
        counter = {i: self.in_play.count(i) for i in range(5)}
        print(f"In play:    {counter}, sum: {len(self.in_play)}")
        counter = {i: self.discarded.count(i) for i in range(5)}
        print(f"Discarded:  {counter}, sum: {len(self.discarded)}")
