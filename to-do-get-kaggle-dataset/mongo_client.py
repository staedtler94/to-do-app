import os
from dotenv import load_dotenv

load_dotenv()  # Load the .env file

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_Mongo_Client():
    # Get the environment variables
    db_username = os.getenv("MongoDB_USER_NAME")
    db_password = os.getenv("MongoDB_USER_PASSWORD")
    db_name = os.getenv("DB_NAME")

    # Print the values to verify they are loaded correctly
    print(f"DB Username: {db_username}")
    print(f"DB Password: {db_password}")
    print(f"DB Name: {db_name}")

    # You can now use these variables to connect to your database or perform other operations 
    uri = "mongodb+srv://<db_username>:<db_password>@inflationreporting.vaeyh.mongodb.net/?retryWrites=true&w=majority&appName=InflationReporting"
    uri = uri.replace("<db_username>", db_username)
    uri = uri.replace("<db_password>", db_password)
    print(f"MongoDB URI: {uri}")

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(e)


if __name__ == "__main__":
    get_Mongo_Client()