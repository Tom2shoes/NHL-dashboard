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

@app.route("/stat.faceOffWinPercentage")
def faceOffWinPercentage():
        return jsonify(list(stats_df.loc[:, 'stat.faceOffWinPercentage']))

        
@app.route("/teamname")
def teamName():
        return jsonify(list(stats_df.loc[:, 'team.name']))

if __name__ == "__main__":
    app.run(debug=True)
