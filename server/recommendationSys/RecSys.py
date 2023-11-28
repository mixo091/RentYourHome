import mysql.connector
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
import math


# def recommend_listings(user_id):
import sys

# Check if at least two command-line arguments are provided (including script name)
if len(sys.argv) < 2:
    print("Usage: python RecSys.py <userId>")
    sys.exit(1)

# The first argument (index 0) is the script name, so the userId is the second argument (index 1)
user_id = sys.argv[1]

# Now, you can use the 'user_id' variable in your Python code
# print("User ID:", user_id)

# Connect to the MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='root12345',
    database='airbnb'
)

# Create a cursor object to interact with the database
cursor = conn.cursor()

# IMPORTING DB DATA-------------------------------------------------------------------------------------------------------------

# USERS
# Execute an SQL query to fetch data (replace 'your_query' with your SQL query)
cursor.execute('SELECT * FROM users')

# Fetch data using fetchall(), fetchone(), or fetchmany()
users = cursor.fetchall()

# Get the column names
user_column_names = [desc[0] for desc in cursor.description]

# Print the column names
# print("Column names for 'users' table:", user_column_names)


# LISTINGS
# Execute an SQL query to fetch data (replace 'your_query' with your SQL query)
cursor.execute('SELECT * FROM listings')

# Fetch data using fetchall(), fetchone(), or fetchmany()
listings = cursor.fetchall()

# Get the column names
listings_column_names = [desc[0] for desc in cursor.description]

# Print the column names
# print("Column names for 'listings' table:", listings_column_names)


# RESERVATIONS
# Execute an SQL query to fetch data (replace 'your_query' with your SQL query)
cursor.execute('SELECT * FROM reservations')  # RESERVATIONS

# Fetch data using fetchall(), fetchone(), or fetchmany()
reservations = cursor.fetchall()

# Get the column names
reseravtions_column_names = [desc[0] for desc in cursor.description]

# Print the column names
# print("Column names for 'reservations' table:", reseravtions_column_names)


# REVIEWS
# Execute an SQL query to fetch data (replace 'your_query' with your SQL query)
cursor.execute('SELECT * FROM reviews')  # RATINGS

# Fetch data using fetchall(), fetchone(), or fetchmany()
reviews = cursor.fetchall()

# Get the column names
reviews_column_names = [desc[0] for desc in cursor.description]

# Print the column names
# print("Column names for 'reviews' table:", reviews_column_names)

# Iterate through the data and process it as needed
# for row in users:
#     # Process each row of data here
#     print(row)

# print("-----------------------------------------------------------")
# print("USERS : ")
# print(users[0])

# print("-----------------------------------------------------------")
# print("LISTINGS : ")
# print(listings[0])

# print("-----------------------------------------------------------")
# print("RESERVATIONS : ")
# print(reservations[0])

# print("-----------------------------------------------------------")
# print("REVIEWS : ")
# print(reviews[0])

# Close the database connection
conn.close()

# MATRICES INITIALIZATION-------------------------------------------------------------------------------------------------------------

# USERS MATRIX
# Define the number of rows and columns for the matrix
num_rows = len(users)
num_cols = 8

# Create an empty matrix (nested list)
users_matrix = []

# Populate the matrix with data from the list
for i in range(num_rows):
    row = users[i]
    users_matrix.append(row)

# Print the matrix
# print("USERS MATRIX---------------------------------")
# for row in users_matrix:
#     print(row)
users_matrix = np.array(users_matrix)

# LISTINGS MATRIX
# Define the number of rows and columns for the matrix
num_rows = len(listings)
num_cols = 9

# Create an empty matrix (nested list)
listings_matrix = []

# Populate the matrix with data from the list
for i in range(num_rows):
    row = listings[i]
    listings_matrix.append(row)

# Print the matrix
# print("LISTINGS MATRIX---------------------------------")
# for row in listings_matrix:
#     print(row)
listings_matrix = np.array(listings_matrix)

# RESERVATIONS MATRIX
# Define the number of rows and columns for the matrix
num_rows = len(reservations)
num_cols = 5

# Create an empty matrix (nested list)
reservations_matrix = []

# Populate the matrix with data from the list
for i in range(num_rows):
    row = reservations[i]
    reservations_matrix.append(row)

# Print the matrix
# print("RESERVATIONS MATRIX---------------------------------")
# for row in reservations_matrix:
#     print(row)
reservations_matrix = np.array(reservations_matrix)

# REVIEWS MATRIX
# Define the number of rows and columns for the matrix
num_rows = len(reviews)
num_cols = 5

# Create an empty matrix (nested list)
reviews_matrix = []

# Populate the matrix with data from the list
for i in range(num_rows):
    row = reviews[i]
    reviews_matrix.append(row)

# Print the matrix
# print("REVIEWS MATRIX---------------------------------")
# for row in reviews_matrix:
#     print(row)
reviews_matrix = np.array(reviews_matrix)


# RATINGS MATRIX CREATION-------------------------------------------------------------------------------------------------------------

reviewer_ids = []
for row in users_matrix:
    reviewer_ids.append(row[0])

# print(reviewer_ids)

listing_ids = []
for row in listings_matrix:
    listing_ids.append(row[0])

# print(listing_ids)

ratings = []
for row in reviews_matrix:
    ratings.append(
        (row[1].astype(int), row[2].astype(int), row[3].astype(int)))

# print(ratings)

df = pd.DataFrame(index=reviewer_ids, columns=listing_ids).fillna(0)
df.index = df.index.astype(int)
df.columns = df.columns.astype(int)

for user, listing, rating in ratings:
    df.at[user.astype(int), listing.astype(int)] = rating


# PRINT DF
df.sort_index(ascending=True, inplace=True)
# print(df)


# MATRIX FACTORIZATION

# GRADIENT DESCEND

# Assuming 'df' is your ratings matrix DataFrame
# Convert it to a NumPy array
ratings_matrix = df.values
# print(ratings_matrix)

# Define the number of latent factors (you can adjust this)
num_users, num_items = ratings_matrix.shape
num_factors = 3  # Adjust this based on your preference

# Initialize user and item matrices with random values
user_matrix = np.random.rand(num_users, num_factors)
item_matrix = np.random.rand(num_factors, num_items)

# Define the learning rate and regularization parameters
learning_rate = 0.01
lambda_user = 0.1
lambda_item = 0.1
num_iterations = 1000  # Adjust this as needed

# Perform matrix factorization using gradient descent
for iteration in range(num_iterations):
    total_error = 0
    for i in range(num_users):
        for j in range(num_items):
            # if not np.isnan(ratings_matrix[i, j]):
            error_ij = ratings_matrix[i, j] - \
                np.dot(user_matrix[i, :], item_matrix[:, j])
            total_error += error_ij ** 2
            for k in range(num_factors):
                user_matrix[i, k] += learning_rate * \
                    (2 * error_ij * item_matrix[k, j] -
                     2 * lambda_user * user_matrix[i, k])
                item_matrix[k, j] += learning_rate * \
                    (2 * error_ij * user_matrix[i, k] -
                     2 * lambda_item * item_matrix[k, j])

    rmse = np.sqrt(total_error / (num_users * num_items))

    # print(f"Iteration {iteration + 1}, RMSE = {rmse}")

    if rmse < pow(10, -3):
        # print("Stopping gradient descent early as RMSE is below the threshold.")
        break

# Calculate the predicted ratings
predicted_ratings = np.dot(user_matrix, item_matrix)
# print(predicted_ratings)

# Accuracy
rmse = math.sqrt(mean_squared_error(ratings_matrix, predicted_ratings))
# print("RMSE:", rmse)

# print(type(predicted_ratings))

# Predicted ratings DF
predicted_ratings_df = pd.DataFrame(
    predicted_ratings, index=reviewer_ids, columns=listing_ids)
# print(predicted_ratings_df)

# Recommendations
user_id = 68
# print("Predicted ratings for user with id = " + str(user_id) + ":" )
predicted_ratings_for_user = predicted_ratings_df.loc[user_id]
# print(type(predicted_ratings_for_user))
# print(predicted_ratings_for_user)

# Assuming 'predicted_ratings_for_user_68' is your Series
top_2_ratings = predicted_ratings_for_user.sort_values(ascending=False).head(8)

# Print the top 2 ratings
# print("Top 2 predicted ratings for user 68:")
# print(type(top_2_ratings.index))
result = top_2_ratings.index.to_list()
print(result)
# return(result)
