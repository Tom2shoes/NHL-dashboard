# import necessary libraries
import pandas as pd
from flask_pymongo import PyMongo

from flask import Flask,render_template, jsonify,redirect
from pymongo import MongoClient

#import scrape_twitter

# create instance of Flask app
app = Flask(__name__)

# Create connection 
app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

# Set route
@app.route('/')
def landing_page():
    return render_template("index.html")

#@app.route("/scrape_twitter")
#def scrape_twitter():
#    twitter_sentiment = mongo.db.TWITTER_SENTIMENT
#    twitter_data_scrape = scrape_twitter.scrape()
#    twitter_sentiment.update(
#        {}, 
#        twitter_data_scrape, 
#        upsert=True
#        )
#   return redirect("Scraping Successful!!")

@app.route("/twitter/all")
def twitter():
    twitter_data = []

#    for sentiment in data:
#       twitter_data.append({
#            "Compound": sentiment["average_compound_score"],
#            "Positive": sentiment["average_positive_score"],
#            "Neutral": sentiment["average_neutral_score"],
#            "Negative": sentiment["average_negative_score"]
#        })

    data = mongo.db.TWITTER.find({}, {'_id': False})
    for sentiment in data:
        twitter_data.append({
            "hockey_team": sentiment["hockey_team"],
            "team_counter": sentiment["team_counter"],
            "neutral": sentiment["neutral"],
            "positive": sentiment["positive"],
            "created_at": sentiment["created_at"],
            "negative": sentiment["negative"],
            "text": sentiment["text"],
            "compound": sentiment["compound"]
        })
    return jsonify(twitter_data)

if __name__ == "__main__":
    app.run(debug=True)
