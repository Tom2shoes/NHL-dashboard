import tweepy
import pandas as pd
import numpy as np

from datetime import datetime
from pymongo import MongoClient
from .config import consumer_key, consumer_secret, access_token, access_token_secret
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

# Setup Mongo Database
client = MongoClient('localhost', 27017)
db = client['nhl-database']
collection = db['TWITTER']

# Pull 100 Tweets sent out by the following NHL Teams
hockey_teams=['@AnaheimDucks','@ArizonaCoyotes','@NHLBruins','@BuffaloSabres','@NHLFlames','@NHLCanes',
             '@NHLBlackhawks','@Avalanche','@BlueJacketsNHL', '@DallasStars', '@DetroitRedWings',
             '@EdmontonOilers','@FlaPanthers','@LAKings','@mnwild','@CanadiensMTL','@PredsNHL','@NJDevils',
              '@NY_IslandersNHL','@NYRangers','@Senators','@NHLFlyers','@penguins','@SanJoseSharks', '@StLouisBlues',
              '@TBLightning','@MapleLeafs','@Canucks', '@GoldenKnights','@Capitals','@NHLJets'
             ]

# Variables for holding sentiments
hockey_sentiments = []

# Loop through each network
for hockey_team in hockey_teams:
   
    # Counter
    team_counter = 1
    
    # Loop through 5 pages of tweets (total 100 tweets)
    for x in range(5):
        # Get all tweets from home feed
        hockey_tweets = api.user_timeline(hockey_team,page=x)
        # Loop through all tweets
        for tweet in hockey_tweets:
            results = analyzer.polarity_scores(tweet["text"])
            compound = results["compound"]
            pos = results["pos"]
            neu = results["neu"]
            neg = results["neg"]
       
            # Add sentiments for each tweet into a list
            hockey_sentiments ={"Hockey Team": hockey_team,
                               "Date": tweet["created_at"], 
                               "Compound": compound,
                               "Positive": pos,
                               "Negative": neu,
                               "Neutral": neg,
                               "Text": tweet["text"],
                               "Tweets Ago": team_counter}
            collection.insert(hockey_sentiments)
            # hockey team counter,
            team_counter += 1


# Unparsed DataFrame of hockey sentiments
hockey_sentiments_df = pd.DataFrame(list(collection.find({})))
hockey_sentiments_df.head()