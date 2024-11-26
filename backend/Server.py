from backend.Game import Game


class Server:

    def __init__(self):
        self.game = None

    def start_server(self):
        pass

    def start_game(self, players_names):
        self.game = Game(players_names)
        self.game.initial_setup()
        final_scores, number_of_rounds = self.game.run(starting_player_id=0)
        print(f"{final_scores}, played for {number_of_rounds} rounds")
        self.game.print()


if __name__ == "__main__":
    server = Server()
    server.start_server()

    players_number = 4
    players_names = ["Player1", "Player2", "Player3", "Player4"][:players_number]

    server.start_game(players_names)
