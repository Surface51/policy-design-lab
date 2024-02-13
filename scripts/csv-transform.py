import pandas as pd
import glob

# Get a list of all csv files starting with df_
csv_files = glob.glob('../public/csv/df_*.csv')

# Define the columns to keep
columns_to_keep = ['fips', 'state', 'cty', 'crop', 'arc_pay', 'new_arc_pay', 'adj_arc_pay']

for file in csv_files:
    # Read the csv file
    df = pd.read_csv(file)

    # Keep only the columns in columns_to_keep
    df = df[columns_to_keep]

    # Write the dataframe back to csv
    df.to_csv(file, index=False)