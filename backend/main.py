from collections import Counter
from statistics import median, mode, mean, stdev

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from tqdm import tqdm

from backend.Server import Server

pd.set_option('display.max_rows', None)  # Show all rows
pd.set_option('display.max_columns', None)  # Show all columns
pd.set_option('display.width', None)  # Adjust to match your terminal's width
pd.set_option('display.colheader_justify', 'left')  # Align headers to the left


def draw_plots(bots_scores_winning, bots_scores_losing):
    # print(bots)
    # print(bots_wins)
    # print(bots_scores_winning)
    # print(bots_scores_losing)
    # parsed_data_winning = [0 for _ in range(max(bots_scores_winning.values()))]
    # for key, values in bots_scores_winning.items():

    parsed_data_winning = {key: dict(Counter(values)) for key, values in bots_scores_winning.items()}
    parsed_data_losing = {key: dict(Counter(values)) for key, values in bots_scores_losing.items()}

    for bot_name in bot_names:
        if -1 in parsed_data_winning[bot_name].keys():
            del parsed_data_winning[bot_name][-1]
        if -1 in parsed_data_losing[bot_name].keys():
            del parsed_data_losing[bot_name][-1]

    # max_count = ceil(max(max(counts.values()) for counts in parsed_data_winning.values()) / 50) * 50
    # max_count = max(ceil(max(max(counts.values()) for counts in parsed_data_losing.values()) / 50) * 50, max_count)

    # print(parsed_data_winning)
    # print(parsed_data_losing)

    fig, axes = plt.subplots(len(bot_names), 2, figsize=(8, 10), sharex=True)

    for i, (name, value_counts) in enumerate(parsed_data_winning.items()):
        sorted_keys = sorted(value_counts.keys())
        sorted_values = [value_counts[key] for key in sorted_keys]

        axes[i][0].bar(sorted_keys, sorted_values, color='blue')
        # axes[i].plot(values, label=bots[name])
        axes[i][0].set_title(f'{bots[name]} when winning')
        axes[i][0].set_ylabel('Times')
        axes[i][0].set_xlabel('Scores')
        # axes[i].legend()
        axes[i][0].grid()
        # axes[i][0].set_ylim(0, max_count)
    for i, (name, value_counts) in enumerate(parsed_data_losing.items()):
        sorted_keys = sorted(value_counts.keys())
        sorted_values = [value_counts[key] for key in sorted_keys]

        axes[i][1].bar(sorted_keys, sorted_values, color='blue')
        # axes[i].plot(values, label=bots[name])
        axes[i][1].set_title(f'{bots[name]} when losing')
        axes[i][1].set_ylabel('Times')
        axes[i][1].set_xlabel('Scores')
        # axes[i].legend()
        axes[i][1].grid()
        # axes[i][1].set_ylim(0, max_count)

    # Add a shared X label

    # Adjust layout to prevent overlap
    plt.tight_layout()

    # Show the plot
    plt.show()


def show_table(bots_scores_winning, bots_scores_losing):
    rows = []

    for bot_name in bot_names:
        # Process winning stats
        filtered_values_winning = [v for v in bots_scores_winning[bot_name] if v != -1]
        winning_stats = {
            'Bot': bots[bot_name],
            'Category': 'Wins',
            'Median': median(filtered_values_winning),
            'Mode': mode(filtered_values_winning),
            'Mean': mean(filtered_values_winning),
            'Standard Deviation': stdev(filtered_values_winning),
            'Variance': np.var(filtered_values_winning),
            'Minimum': min(filtered_values_winning),
            'Maximum': max(filtered_values_winning),
        }
        rows.append(winning_stats)

        # Process losing stats
        filtered_values_losing = [v for v in bots_scores_losing[bot_name] if v != -1]
        losing_stats = {
            'Bot': bots[bot_name],
            'Category': 'Loses',
            'Median': median(filtered_values_losing),
            'Mode': mode(filtered_values_losing),
            'Mean': mean(filtered_values_losing),
            'Standard Deviation': stdev(filtered_values_losing),
            'Variance': np.var(filtered_values_losing),
            'Minimum': min(filtered_values_losing),
            'Maximum': max(filtered_values_losing),
        }
        rows.append(losing_stats)

    # Create a DataFrame
    df = pd.DataFrame(rows)

    # Print the table
    pd.set_option('display.max_rows', None)  # Show all rows
    pd.set_option('display.max_columns', None)  # Show all columns
    pd.set_option('display.width', None)  # Adjust to match your terminal's width
    pd.set_option('display.colheader_justify', 'left')  # Align headers to the left
    print(df)


def contest(N, bot_names, bot_types):
    # print(N, bot_names, bot_types)
    server = Server()

    bots = {}
    bots_wins = {}
    bots_scores_winning = {}
    bots_scores_losing = {}

    for bot_name, bot_type in zip(bot_names, bot_types):
        bots[bot_name] = bot_type
        bots_wins[bot_name] = 0
        bots_scores_winning[bot_name] = []
        bots_scores_losing[bot_name] = []

    avg_iterations = 0
    for i in tqdm(range(N)):
        response, code = server.start_game(bots, True)
        message, winner, current_state, iterations = (response["message"], response["winner"],
                                                      response["current_state"], response["iterations"])
        bots_wins[winner] += 1
        avg_iterations += iterations
        assert code == 211
        # print(code)
        # print(message)
        # print(winner)
        # print(current_state["players"])
        for player_info in current_state["players"]:
            player_score = player_info["score"]
            player_score_summed = player_score["base"] + player_score["horizontals"] + player_score["verticals"] + \
                                  player_score["colors"]
            if player_info["player_name"] == winner:
                bots_scores_winning[player_info["player_name"]] = (
                        bots_scores_winning[player_info["player_name"]] + [player_score_summed])
                bots_scores_losing[player_info["player_name"]] = bots_scores_losing[player_info["player_name"]] + [-1]
            else:
                bots_scores_winning[player_info["player_name"]] = bots_scores_winning[player_info["player_name"]] + [-1]
                bots_scores_losing[player_info["player_name"]] = bots_scores_losing[player_info["player_name"]] + [
                    player_score_summed]
            # print(player_info["player_name"])
            # print(player_info["score"])

    # print(bots)
    # print(bots_wins)
    # print(bots_scores_winning)
    # print(bots_scores_losing)
    print(f"Average iteration number: {round(avg_iterations/N,4)}")
    return bots, bots_wins, bots_scores_winning, bots_scores_losing


# N = 1000
#
# bot_names = ["Alice", "Bob", "Carol", "Diana"]
# bot_types = ["bot_random", "bot_most_tiles", "bot_lowest_penalty", "bot_dynamic_reward"]
# # bot_names = ["Alice", "Bob"]
# # bot_types = ["bot_lowest_penalty", "bot_dynamic_reward"]
#
# bots, bots_wins, bots_scores_winning, bots_scores_losing = contest(N, bot_names, bot_types)
# # show_table(bots_scores_winning, bots_scores_losing)
# draw_plots(bots_scores_winning, bots_scores_losing)


bot_names_all = ['Bot1', 'Bot2', 'Bot3', 'Bot4', 'Bot5']
bot_types_all = ["bot_random", "bot_most_tiles", "bot_lowest_penalty", "bot_stupid_heura", "bot_dynamic_reward"]
game_results = pd.DataFrame(index=bot_types_all, columns=bot_types_all)

N = 1000
for i, row_bot in enumerate(bot_types_all):
    for j, col_bot in enumerate(bot_types_all):
        if i > j:
            bot_names = [bot_names_all[i] + "0", bot_names_all[j] + "1"]
            bot_types = [bot_types_all[i], bot_types_all[j]]

            bots, bots_wins, bots_scores_winning, bots_scores_losing = contest(N, bot_names, bot_types)
            game_results.loc[row_bot, col_bot] = str(round(bots_wins[bot_names[1]] / N * 100, 2)) + "%"
            game_results.loc[col_bot, row_bot] = str(round(bots_wins[bot_names[0]] / N * 100, 2)) + "%"

# Print the resulting table
print(f"Numbers in table represents how many games were won by bot named in rows headers, tested on {N} games.")
print(game_results)
