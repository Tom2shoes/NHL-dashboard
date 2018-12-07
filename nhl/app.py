from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import json
from stats_pull_store import *

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

@app.route("/")
def home_page():
    return render_template("index.html",
        teams_array=teams_array)

@app.route("/team_stats")
def team_stats_data():
        #team_stats = list(mongo.db.STATS.find({}, {'_id': False}))
        return jsonify(list(stats_df.columns)[2:])

@app.route("/test")
def test():
        df_to_json = {
                "team_name": stats_df['team.name'].values.tolist(),
                "wins": stats_df['stat.wins'].values.tolist(),
                "losses": stats_df['stat.losses'].values.tolist(),
                "games_played": stats_df['stat.gamesPlayed'].values.tolist(),
                "fo_win_pct": stats_df['stat.faceOffWinPercentage'].values.tolist(),
                "win_outshoot_pct": (stats_df['stat.winOutshootOpp'].values * 100).tolist(),
                "win_scorefirst_pct": (stats_df['stat.winScoreFirst'].values * 100).tolist()     
                }

        return jsonify(df_to_json)

if __name__ == "__main__":
    app.run(debug=True)
