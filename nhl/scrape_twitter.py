# Project 2 - NHL Data Analysis
# create a Python script to perform a sentiment analysis of the Twitter activity of NHL hockeyteam for season 2017-18
# scrape twitter handles for nhl teams

# tweepy, pandas, matplotlib, and VADER Dependencies
# Dependencies
import tweepy
import pandas as pd
from datetime import datetime
import numpy as np

from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

from .config import consumer_key, consumer_secret, access_token, access_token_secret

# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

# Setup Mongo Database
client = MongoClient('localhost', 27017)
db = client['nhl-database']
collection = db['TWITTER']
collection.drop()

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
            hockey_sentiments ={"hockey_team": hockey_team,
                               "created_at": tweet["created_at"], 
                               "compound": compound,
                               "positive": pos,
                               "negative": neu,
                               "neutral": neg,
                               "text": tweet["text"],
                               "team_counter": team_counter}
            collection.insert_one(hockey_sentiments)
            # hockey team counter,
            team_counter += 1

# Unparsed DataFrame of hockey sentiments
hockey_sentiments_df = pd.DataFrame(list(collection.find({})))
#hockey_sentiments_df = pd.DataFrame(list(collection.find({}, {'_id':False})))
#hockey_sentiments_df.head()

# Setup Mongo Database to collect vader sentiments
client = MongoClient('localhost', 27017)
db = client['nhl-database']
collection2 = db['TWITTER_SENTIMENT']
collection2.drop()

nhl_teams=['AnaheimDucks','ArizonaCoyotes','NHLBruins','BuffaloSabres','NHLFlames','NHLCanes',
             'NHLBlackhawks','Avalanche','BlueJacketsNHL', 'DallasStars', 'DetroitRedWings',
             'EdmontonOilers','FlaPanthers','LAKings','mnwild','CanadiensMTL','PredsNHL','NJDevils',
              'NY_IslandersNHL','NYRangers','Senators','NHLFlyers','penguins','SanJoseSharks', 'StLouisBlues',
              'TBLightning','MapleLeafs','Canucks', 'GoldenKnights','Capitals','NHLJets'
             ]

# Create list
twitter_stats = []

average_compound_score = round(hockey_sentiments_df.groupby('hockey_team')['compound'].mean(),3)
average_positive_score = round(hockey_sentiments_df.groupby('hockey_team')['positive'].mean(),3)
average_negative_score = round(hockey_sentiments_df.groupby('hockey_team')['negative'].mean(),3)
average_neutral_score = round(hockey_sentiments_df.groupby('hockey_team')['neutral'].mean(),3)

twitter_stats = {"Hockey Team": nhl_teams,
                "Average Compound Score": average_compound_score,
                "Average Positive Score": average_positive_score ,
                "Average Neutral Score": average_neutral_score,
                "Average Negative Score": average_negative_score
                }

team_sentiment_df= pd.DataFrame(twitter_stats)
#team_sentiment_df.head()

# store in mongo database
data = team_sentiment_df.to_dict(orient='records')
collection2.insert_many(data)
