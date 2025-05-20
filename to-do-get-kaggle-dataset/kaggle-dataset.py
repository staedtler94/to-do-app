# Install dependencies as needed:
# pip install kagglehub[pandas-datasets]
import kagglehub
from kagglehub import KaggleDatasetAdapter
import json
from mongo_client import get_Mongo_Client

# Load the Kaggle dataset
def get_Kaggle_Dataset(dataset, file_path):

    # Load the latest version
    df = kagglehub.dataset_load(
        KaggleDatasetAdapter.PANDAS,
        dataset,
        file_path,
    )

    print("First 5 records:", df.head())

    # Convert the DataFrame to JSON
    json_data = df.to_json(orient="records", lines=True)

    # Print the JSON data
    print("JSON Data:", json_data)

    return json_data


if __name__ == "__main__":
    dataset = "valakhorasani/gym-members-exercise-dataset"
    file_path = "gym_members_exercise_tracking.csv"
    dataset = get_Kaggle_Dataset(dataset, file_path)

    client = get_Mongo_Client()

    # Specify the database and collection
    db_name = "gym_data"  # Replace with your database name
    collection_name = "k_gym_data"  # Replace with your collection name
    db = client[db_name]
    collection = db[collection_name]
    # Insert the JSON data into the collection
    # Parse the JSON data and insert into MongoDB
    try:
        json_documents = [json.loads(line) for line in dataset.splitlines()]
        collection.insert_many(json_documents)
        print(f"Inserted {len(json_documents)} documents into the collection '{collection_name}'.")
    except Exception as e:
        print(f"An error occurred while inserting documents: {e}")

