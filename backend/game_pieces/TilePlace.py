class TilePlace:
    def __init__(self, expected_color=None, current_color=None, blocked=False):
        if blocked and (expected_color is not None or current_color is not None):
            raise Exception
        self.expected_color = expected_color
        self.current_color = current_color
        self.blocked = blocked

    def __str__(self):
        if self.blocked:
            return "X"
        if self.current_color is not None:
            return str(self.current_color)
        return "."
