from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
# from stats_pull_store import *

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

# @app.route("/")
# def home_page():
#     stats = []
#     team_stats = mongo.db.STATS.find_one() #{'_id': False}
#     for stat in team_stats:
#       stats.append({
#       "Something You Choose" : stat["column_"]     
#            })
#     return jsonify(stats)

@app.route("/")
def landing_page():
    away_data = []

    data = mongo.db.BOXSCORES.find({'away_team':'Anaheim Ducks'}, {'_id': False})

    for stat in data:
        away_data.append({
            "Away Goals": stat["away_goals"],
            "Away Shots": stat["away_shots"],
            "Away Penalty Minutes": stat["away_pim"],
            "Away Takeaways": stat["away_takeaway"],
            "Away Giveaways": stat["away_giveaway"]
        })
    return jsonify(away_data)

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

if __name__ == "__main__":
    app.run(debug=True)
