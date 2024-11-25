from backend.Game import Game


class Server:

    def __init__(self):
        self.game = None

    def start_server(self):
        pass

    def start_game(self, players_number):
        self.game = Game(players_number)
        self.game.run()


if __name__ == "__main__":
    server = Server()
    server.start_server()
    server.start_game(3)
