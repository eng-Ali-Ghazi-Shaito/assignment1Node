"use strict";

// Computes the final price of a coffee order after validation, bulk
// discount, member discount and happy-hour discount are all applied.
function calculatePrice(size, quantity, isMember, hour) {
  // 1. Validate inputs
  if (size !== "small" && size !== "medium" && size !== "large") {
    return "Invalid size";
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return "Invalid quantity";
  }
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return "Invalid hour";
  }

  // 2. Base price per cup
  let pricePerCup;
  switch (size) {
    case "small":
      pricePerCup = 2.5;
      break;
    case "medium":
      pricePerCup = 3.5;
      break;
    case "large":
      pricePerCup = 4.5;
      break;
  }

  let total = pricePerCup * quantity;

  // 3. Bulk discount: 10% off if 5 or more cups
  if (quantity >= 5) {
    total -= total * 0.1;
  }

  // 4. Member discount: further 5% off for loyalty card holders
  if (isMember) {
    total -= total * 0.05;
  }

  // 5. Happy hour: $1 off between 15:00 and 17:00 inclusive
  if (hour >= 15 && hour <= 17) {
    total -= 1;
  }

  // 6. Total can never go negative
  if (total < 0) {
    total = 0;
  }

  // 7. Round to 2 decimal places
  return Math.round(total * 100) / 100;
}

// Prints the price of ordering 1 to 10 cups, one line per quantity.
function printPriceTable(size, isMember, hour) {
  for (let quantity = 1; quantity <= 10; quantity++) {
    const price = calculatePrice(size, quantity, isMember, hour);
    console.log(`Qty ${quantity} -> $${price.toFixed(2)}`);
  }
}

// Loops over every hour of the day and returns/prints the first hour
// that gives the lowest price for the given order.
function cheapestHour(size, quantity, isMember) {
  let bestHour = 0;
  let bestPrice = Infinity;

  for (let hour = 0; hour <= 23; hour++) {
    const price = calculatePrice(size, quantity, isMember, hour);
    if (price < bestPrice) {
      bestPrice = price;
      bestHour = hour;
    }
  }

  const hourLabel = String(bestHour).padStart(2, "0");
  console.log(
    `The best time to order ${quantity} ${size} coffees is at ${hourLabel}:00 for $${bestPrice.toFixed(2)}.`
  );

  return { hour: bestHour, price: bestPrice };
}

// ---- Test cases given in the assignment ----
console.log(calculatePrice("large", 2, false, 10));  // 9
console.log(calculatePrice("medium", 5, true, 16));   // 13.96
console.log(calculatePrice("small", 4, true, 9));     // 9.5
console.log(calculatePrice("small", 1, false, 15));   // 1.5
console.log(calculatePrice("xl", 1, false, 9));       // "Invalid size"
console.log(calculatePrice("large", 0, false, 9));    // "Invalid quantity"
console.log(calculatePrice("large", 2.5, true, 9));   // "Invalid quantity"
console.log(calculatePrice("medium", 2, true, 25));   // "Invalid hour"

// ---- Two extra tests of our own ----
console.log(calculatePrice("large", 6, true, 16));   // bulk + member + happy hour together
console.log(calculatePrice("medium", 3, false, 20)); // no discounts at all

console.log("--- Price table for medium, non-member, 16:00 ---");
printPriceTable("medium", false, 16);

console.log("--- Cheapest hour ---");
cheapestHour("large", 3, false);
cheapestHour("small", 2, true);
