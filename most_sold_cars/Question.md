Car Inventory Analysis – Find Top 3 Sold Cars

This script analyzes an inventory dataset containing monthly snapshots of cars.
Each car appears every month until it gets sold — meaning:

A car is SOLD when it stops appearing after its last recorded month.

The goal is to identify the Top 3 most sold car models.

📘 Understanding the Problem

Each record in the JSON file looks like:

{
  "Month": 1,
  "Dealership": "Armstrong-Pope",
  "Brand": "Ford",
  "Model": "Fusion",
  "Year": 2007,
  "Mileage": 140663
}

✔ Car's Unique Identity is based on:

Brand

Model

Year

Mileage

(Dealership does not determine uniqueness)

✔ What determines a sale?

If a car does NOT appear after its current month, it is considered sold.

Example:

Month	Car
1	Ford Fusion
2	Ford Fusion
3	Ford Fusion
—	never appears again → SOLD


#Ans Explanation:
Why We Can't Count Sales Directly From Raw Data

The dataset contains monthly inventory snapshots, not sales logs.
A car appearing in months 1, 2, 3 means:

It is still in inventory

NOT sold

We should not count it multiple times

So we must:

Group records by unique car

Find the last month the car appears

If lastSeen < 12 → car was sold

Count sold cars by model

Return top 3 sold models

Algorithm
1️⃣ Group car entries by unique signature

Brand-Model-Year-Mileage

2️⃣ Track the lastSeen month for each car
3️⃣ Filter cars whose lastSeen < 12 → sold cars
4️⃣ Count sold cars grouped by model
5️⃣ Sort and return the top 3 models
