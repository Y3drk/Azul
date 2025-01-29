from time import sleep

from flask import Flask, request, jsonify
from flask_cors import CORS

from Game import Game


class Server:

    def __init__(self):
        self.game = None

    def start_game(self, players, simulate=False):
        if self.game is not None:
            return {"message": "Game has started already!"}, 400
        if simulate:
            if "human" in players.values():
                return {"message": "Can't simulate game with human players!"}, 400
            else:
                self.game = Game(players)
                self.game.initial_setup()
                result, iterations = self.game.simulate()
                winner = self.game.get_winner()
                game_state = self.game.get_game_state()
                self.game = None
                if result is None:
                    return {"message": "Some error during simulated game"}, 501
                else:
                    return {
                        "message": f"Game has ended. It took {iterations} iterations. {winner.player_name} won as {winner.player_type}!",
                        "winner": winner.player_name,
                        "current_state": game_state, "iterations": iterations}, 211
        else:
            self.game = Game(players)
            self.game.initial_setup()
            return {"message": "Game started successfully", "current_state": self.game.get_game_state()}, 200

    def end_game(self):
        if self.game is None:
            return {"message": "Game not started yet!"}, 400
        game_state = self.game.get_game_state()
        self.game = None
        return {"message": "Game ended successfully", "current_state": game_state}, 211

    def player_move(self, player_name, move):
        if self.game is None:
            return {"error": "Game not started yet!"}, 400

        result = self.game.player_move(player_name, move)
        # print(result)
        # if result is not None:
        #     print("Ha!")
        #     sleep(10)
        #     print(result)
        #     return {"message": f"Player {player_name} moved successfully. Game has finished.",
        #             "current_state": self.game.get_game_state()}, 211
        if result is None:
            # print("res", result)
            return {"message": f"Player {player_name} moved successfully. Game is still on.",
                    "current_state": self.game.get_game_state()}, 200
        else:
            # print("Ha!")
            # sleep(10)
            # print("res", result)
            game_state = self.game.get_game_state()
            self.game = None
            return {"message": f"Player {player_name} moved successfully. Game has finished.",
                    "current_state":game_state}, 211


app = Flask(__name__)
CORS(app)
server = Server()


@app.route('/simulate_game', methods=['POST'])
def simulate_game():
    data = request.json

    if "players_names" not in data or not isinstance(data["players_names"], dict):
        return jsonify({"error": "Invalid input. 'players_names' must be a list of player names."}), 400

    players = data["players_names"]
    if len(players.items()) < 2 or len(players.items()) > 4:
        return jsonify({"error": "Number of players must be between 2 and 4."}), 400

    for player_type in players.values():
        if player_type not in ["human", "bot", "bot_random", "bot_most_tiles", "bot_lowest_penalty",
                               "bot_stupid_heura", "bot_q", "bot_dynamic_reward"]:
            return jsonify({"error": f"Invalid type of player {player_type}"}), 400

    response = server.start_game(players, True)
    return jsonify(response), response[1]


@app.route('/start_game', methods=['POST'])
def start_game():
    data = request.json

    if "players_names" not in data or not isinstance(data["players_names"], dict):
        return jsonify({"error": "Invalid input. 'players_names' must be a list of player names."}), 400

    players = data["players_names"]
    if len(players.items()) < 2 or len(players.items()) > 4:
        return jsonify({"error": "Number of players must be between 2 and 4."}), 400

    for player_type in players.values():
        if player_type not in ["human", "bot", "bot_random", "bot_most_tiles", "bot_lowest_penalty",
                               "bot_stupid_heura", "bot_q", "bot_dynamic_reward"]:
            return jsonify({"error": f"Invalid type of player {player_type}"}), 400

    response = server.start_game(players)
    return jsonify(response), response[1]


@app.route('/end_game', methods=['GET'])
def end_game():
    response = server.end_game()
    return jsonify(response), response[1]


@app.route('/make_move', methods=['POST'])
def make_move():
    data = request.json

    if "player_name" not in data or "move" not in data:
        return jsonify({"error": "Invalid input. 'player_id' and 'move' are required."}), 400

    player_name = data["player_name"]
    move = data["move"]

    response = server.player_move(player_name, move)
    return jsonify(response), response[1]


if __name__ == "__main__":
    app.run(debug=True)
