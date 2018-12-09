# Dependencies
import requests
import pandas as pd

from pandas.io.json import json_normalize
from pymongo import MongoClient

# # Remote MongoDB
# client = MongoClient('mongodb://nhldashboard:password1@ds215370.mlab.com:15370/heroku_5gkg84qp')
# db = client['heroku_5gkg84qp']
# collection = db['RANK']
# collection.drop()

# Local MongoDB
client = MongoClient('localhost', 27017)
db = client['nhl-database']
collection = db['RANK']
collection.drop()

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
    collection.insert(team_stats)

# Unparsed DataFrame of nested team stats
nested_stats = pd.DataFrame(list(collection.find({})))

pre_df_list = []

for i in range(len(team_ids)):
    # Reaches into nested team stats to pull relevant info & append to 
    pre_df_list.append((nested_stats.stats[i][1]['splits'][0]))

# clean & workable parent dataframe 
stats_df = json_normalize(pre_df_list)
stats_df.iloc[:,:28] = stats_df.iloc[:,:28].replace('\w\w$', '', regex=True)
rank_df = stats_df
