const data = require('./car_inventory.json');

function getTop3SoldCars(data) {
  const carMap = new Map();

  // Step 1: find last appearance of each car
  for (const obj of data) {
    const key = `${obj.Brand}-${obj.Model}-${obj.Year}-${obj.Mileage}`;

    if (!carMap.has(key)) {
      carMap.set(key, { ...obj, lastSeen: obj.Month });
    } else {
      const entry = carMap.get(key);
      entry.lastSeen = Math.max(entry.lastSeen, obj.Month);
      carMap.set(key, entry);
    }
  }

  // Step 2: sold = cars missing after their lastSeen month
  const soldCars = [...carMap.values()].filter(car => car.lastSeen < 12);

  // Step 3: count sales per model
  const modelCount = {};

  for (const car of soldCars) {
    const modelKey = `${car.Brand}-${car.Model}`;
    modelCount[modelKey] = (modelCount[modelKey] || 0) + 1;
  }

  // Step 4: top 3 sold models
  return Object.entries(modelCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([model, count]) => ({ model, count }));
}

console.log(getTop3SoldCars(data));
