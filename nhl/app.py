from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import json
from stats_pull_store import *
from NHL_Twitter_Sentiments import *

app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb://nhldashboard:password1@ds215370.mlab.com:15370/heroku_5gkg84qp"
app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

@app.route("/")
def landing_page():
    return render_template("index.html")

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
    
@app.route("/away/<team>")
def away_page(team):
    away_data = []

    #data = mongo.db.BOXSCORES.find({'away_team':'Anaheim Ducks'}, {'_id': False})
    data = mongo.db.BOXSCORES.find({'away_team': team}, {'_id': False})

    for stat in data:
        away_data.append({
            "Away Goals": stat["away_goals"],
            "Away Shots": stat["away_shots"],
            "Away Penalty Minutes": stat["away_pim"],
            "Away Takeaways": stat["away_takeaway"],
            "Away Giveaways": stat["away_giveaway"]
        })
    return jsonify(away_data)

@app.route("/home/<team>")
def home_page(team):
    home_data = []

    #data = mongo.db.BOXSCORES.find({'home_team':'Anaheim Ducks'}, {'_id': False})
    data = mongo.db.BOXSCORES.find({'home_team': team}, {'_id': False})

    for stat in data:
        home_data.append({
            "Home Goals": stat["home_goals"],
            "Home Shots": stat["home_shots"],
            "Home Penalty Minutes": stat["home_pim"],
            "Home Takeaways": stat["home_takeaway"],
            "Home Giveaways": stat["home_giveaway"]
        })
    return jsonify(home_data)

@app.route('/twitter')
def index():
    TWITTER = mongo.db.TWITTER.find_one()
    return render_template('index.html', TWITTER=TWITTER)

# @app.route('/twitter/scrape')
# def scrape():
#     TWITTER = mongo.db.TWITTER
#     TWITTER_data_scrape = NHL_Twitter_Sentiments.scrape()
#     TWITTER.update(
#         {},
#         TWITTER_data_scrape,
#         upsert=True
#     )
#     return redirect("Twitter Scraping Successful!!")

if __name__ == "__main__":
    app.run(debug=True)
