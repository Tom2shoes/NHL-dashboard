#!/usr/bin/env python
# coding: utf-8


from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import NHL_Twitter_Sentiments


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/nhl-database"
mongo = PyMongo(app)

@app.route('/')
def index():
    TWITTER = mongo.db.TWITTER.find_one()
    return render_template('index.html', TWITTER=TWITTER)

@app.route('/scrape')
def scrape():
    TWITTER = mongo.db.TWITTER
    TWITTER_data_scrape = NHL_Twitter_Sentiments.scrape()
    TWITTER.update(
        {},
        TWITTER_data_scrape,
        upsert=True
    )
    return redirect("Twitter Scraping Successful!!")


if __name__ == "__main__":
    app.run(debug=True)

