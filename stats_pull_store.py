# Dependencies
import requests
import json
import pprint
import pandas as pd

from pandas.io.json import json_normalize
from pymongo import MongoClient

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client['nhl-database']
collection = db['STATS']

# Endpoint with team ID's
teams_response = requests.get('https://statsapi.web.nhl.com/api/v1/teams').json()

# Collects the team ID's into a list
team_ids = []

for x in range(len(teams_response['teams'])):
    team_ids.append(teams_response['teams'][x]['id'])

# Uses the collected ids to loop through endpoints of team statistics & copy to MongoDB
for team in team_ids:
    
    query_url = f"https://statsapi.web.nhl.com/api/v1/teams/{team}/stats"
    team_stats = requests.get(query_url).json()
    collection.insert_one(team_stats)

# Unparsed DataFrame of nested team stats
nested_stats = pd.DataFrame(list(collection.find({})))

pre_df_list = []

for i in range(len(team_ids)):
    # Reaches into nested team stats to pull relevant info & append to 
    pre_df_list.append((nested_stats.stats[i][0]['splits'][0]))

# clean & workable parent dataframe 
stats_df = json_normalize(pre_df_list)
stats_json = stats_df.to_json(orient='records')

# Formatting into arrays for Plotly.js
teams_array = stats_df['team.name'].values
# games_played_array = stats_df['stat.gamesPlayed'].values
# wins_array = stats_df['stat.wins'].values
# losses_array = stats_df['stat.losses'].values
# fo_win_array = stats_df['stat.faceOffWinPercentage'].values
# gpg_array = stats_df['stat.goalsPerGame'].values
# gapg_array = stats_df['stat.goalsAgainstPerGame'].values
# win_outshootpct_array = stats_df['stat.winOutshootOpp'].values
# win_scorefirstpct_array = stats_df['stat.winScoreFirst'].values
