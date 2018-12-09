from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import json

# Remote
from .stats_pull_store import *
#from .NHL_Twitter_Sentiments import *
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://nhldashboard:password1@ds215370.mlab.com:15370/heroku_5gkg84qp"
#app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

# # Local
# from stats_pull_store import *
# from NHL_Twitter_Sentiments import *
# app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
# mongo = PyMongo(app)

@app.route("/")
def landing_page():
    return render_template("index.html")

@app.route("/test")
def test():
    
    rank_df['stat.pts'] = pd.to_numeric(rank_df['stat.pts'])
    rank_df['stat.faceOffWinPercentage'] = pd.to_numeric(rank_df['stat.faceOffWinPercentage'])
    rank_df['stat.goalsPerGame'] = pd.to_numeric(rank_df['stat.goalsPerGame'])
    rank_df['stat.shootingPctRank'] = pd.to_numeric(rank_df['stat.shootingPctRank'])
    rank_df['stat.wins'] = pd.to_numeric(rank_df['stat.wins'])

    df_to_json = {
            "teamName": rank_df['team.name'].values.tolist(),
            "pts": rank_df['stat.pts'].values.tolist(),
            "faceOffWinPercentage": rank_df['stat.faceOffWinPercentage'].values.tolist(),
            "goalsPerGame": rank_df['stat.goalsPerGame'].values.tolist(),
            "shootingPctRank": rank_df['stat.shootingPctRank'].values.tolist(),
            "wins": rank_df['stat.wins'].values.tolist()
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

# @app.route('/twitter')
# def twitter():
#     TWITTER = mongo.db.TWITTER.find_one()
#     return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
