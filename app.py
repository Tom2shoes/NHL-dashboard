from flask import Flask, render_template
from flask_pymongo import PyMongo
from stats_pull_store import *

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

@app.route("/")
def home_page():
    team_stats = mongo.db.STATS.find_one()
    return render_template("index.html",
        team_stats=team_stats,
        teams_array=teams_array)

if __name__ == "__main__":
    app.run(debug=True)
