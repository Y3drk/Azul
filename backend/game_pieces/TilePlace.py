class TilePlace:
    def __init__(self, expected_color=None, current_color=None, empty=True, blocked=False):
        if (empty == True and current_color is not None) or \
                (empty == False and current_color is None) or \
                (blocked == True and (expected_color is not None or current_color is not None or empty is False)):
            raise Exception
        self.expected_color = expected_color
        self.current_color = current_color
        self.empty = empty
        self.blocked = blocked

    def __str__(self):
        if self.blocked:
            return "X"
        if self.empty:
            return "."
        if self.current_color is not None:
            return str(self.current_color)
        return "?"
