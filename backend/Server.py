from flask import Flask, request, jsonify

from backend.Game import Game


class Server:

    def __init__(self):
        self.game = None

    def start_game(self, players):
        if self.game is not None:
            return {"message": "Game has started already!"}, 400
        self.game = Game(players)
        self.game.initial_setup()
        return {"message": "Game started successfully", "current_state": self.game.get_game_state()}, 200

    def end_game(self):
        if self.game is None:
            return {"message": "Game not started yet!"}, 400
        result = self.game.get_game_state()
        self.game = None
        return {"message": "Game ended successfully", "current_state": result}, 200

    def player_move(self, player_id, move):
        if self.game is None:
            return {"error": "Game not started yet!"}, 400

        result = self.game.player_move(player_id, move)
        if result is None:
            return {"message": f"Player {player_id} moved successfully. Game is still on.",
                    "current_state": self.game.get_game_state()}, 200
        else:
            return {"message": f"Player {player_id} moved successfully. Game has finished.",
                    "current_state": self.game.get_game_state()}, 211


app = Flask(__name__)
server = Server()


@app.route('/start_game', methods=['POST'])
def start_game():
    data = request.json

    if "players_names" not in data or not isinstance(data["players_names"], dict):
        return jsonify({"error": "Invalid input. 'players_names' must be a list of player names."}), 400

    players = data["players_names"]
    if len(players.items()) < 2 or len(players.items()) > 4:
        return jsonify({"error": "Number of players must be between 2 and 4."}), 400

    response = server.start_game(players)
    return jsonify(response)


@app.route('/end_game', methods=['GET'])
def end_game():
    response = server.end_game()
    return jsonify(response)


@app.route('/make_move', methods=['POST'])
def make_move():
    data = request.json

    if "player_id" not in data or "move" not in data:
        return jsonify({"error": "Invalid input. 'player_id' and 'move' are required."}), 400

    player_id = data["player_id"]
    move = data["move"]

    response = server.player_move(player_id, move)
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
