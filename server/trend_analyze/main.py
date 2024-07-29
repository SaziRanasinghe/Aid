import requests
import sys
import mysql.connector
import pandas as pd

# Set the encoding for stdout and stderr
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)
sys.stderr = open(sys.stderr.fileno(), mode='w', encoding='utf-8', buffering=1)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="aid_nexus"
)
cursor = db.cursor()

def fetch_aid_data(url, params):
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        print("Response status code:", response.status_code)
        print("Response headers:", response.headers)
        print("Response content:", response.text[:500])  # Print first 500 characters
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
    except ValueError as e:
        print("Error decoding JSON:", e)
        print("Response content:", response.text[:500])
    return None

def insert_aid_project(donor, recipient, year, amount):
    query = """INSERT INTO aid_projects
               (donor, recipient, year, amount)
               VALUES (%s, %s, %s, %s)"""
    values = (donor, recipient, year, amount)
    cursor.execute(query, values)
    db.commit()

# OECD API endpoint for ODA data
api_url = "https://stats.oecd.org/SDMX-JSON/data/TABLE1/./././"

# Parameters for the API request
params = {
    "startTime": "2010",
    "endTime": "2022",
    "dimensionAtObservation": "allDimensions"
}

data = fetch_aid_data(api_url, params)

if data and 'data' in data and 'dataSets' in data['data']:
    dataset = data['data']['dataSets'][0]
    series = dataset.get('series', {})
    
    if series:
        for series_key, series_data in series.items():
            indices = series_key.split(':')
            donor = f"Donor_{indices[0]}"
            recipient = f"Recipient_{indices[1]}"
            
            for time_period, values in series_data.get('observations', {}).items():
                year = 2010 + int(time_period)  # Assuming 'year' as index starting from 2010
                amount = values[0]
                
                if amount is not None:
                    insert_aid_project(donor, recipient, year, amount)
        
        print("Data insertion complete.")
    else:
        print("No series data available.")
else:
    print("No data or unexpected data structure received from API")

def get_aid_trends_by_recipient():
    query = """SELECT recipient, SUM(amount) as total_aid, COUNT(DISTINCT year) as year_count
               FROM aid_projects
               GROUP BY recipient
               ORDER BY total_aid DESC"""
    cursor.execute(query)
    return cursor.fetchall()

def get_aid_trends_over_time():
    query = """SELECT year, SUM(amount) as total_aid
               FROM aid_projects
               GROUP BY year
               ORDER BY year"""
    cursor.execute(query)
    return cursor.fetchall()

def analyze_trends():
    recipient_trends = get_aid_trends_by_recipient()
    time_trends = get_aid_trends_over_time()

    if not recipient_trends or not time_trends:
        print("No data retrieved from the database.")
        return

    df_recipient = pd.DataFrame(recipient_trends, columns=['recipient', 'total_aid', 'year_count'])
    df_time = pd.DataFrame(time_trends, columns=['year', 'total_aid'])

    df_recipient['total_aid'] = pd.to_numeric(df_recipient['total_aid'], errors='coerce')
    df_time['total_aid'] = pd.to_numeric(df_time['total_aid'], errors='coerce')

    if df_recipient.empty or df_time.empty:
        print("No data available for analysis.")
        return

    top_recipients = df_recipient.nlargest(5, 'total_aid')
    aid_growth = df_time.set_index('year')['total_aid'].pct_change()

    print("Top 5 recipients by total aid received:")
    print(top_recipients)
    print("\nYear-over-year aid growth:")
    print(aid_growth)

analyze_trends()
