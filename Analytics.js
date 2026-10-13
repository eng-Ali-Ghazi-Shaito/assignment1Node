"use strict";
 
// Starter data - not modified
const orders = [
  { id: 1, customer: "Rami", items: ["latte", "croissant"], total: 7.5 },
  { id: 2, customer: "Lea", items: ["espresso"], total: 3.0 },
  { id: 3, customer: "Rami", items: ["latte", "muffin"], total: 8.0 },
  { id: 4, customer: "Karim", items: ["mocha", "croissant"], total: 9.0 },
  { id: 5, customer: "Lea", items: ["latte"], total: 4.5 },
  { id: 6, customer: "Nour", items: ["espresso", "latte", "muffin"], total: 10.5 },
];
 
const mondayCustomers = ["Rami", "Lea", "Karim", "Nour"];
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];
 
// ---------------- Part A: Arrays and array methods ----------------
 
// Returns the sum of all order totals, using reduce.
function getTotalRevenue(orders) {
  return orders.reduce((sum, order) => sum + order.total, 0);
}
 
// Returns the orders whose total is >= min, using filter.
function getBigOrders(orders, min) {
  return orders.filter((order) => order.total >= min);
}
 
// Returns an array of readable order summaries, using map.
function getOrderSummaries(orders) {
  return orders.map(
    (order) =>
      `#${order.id} ${order.customer} - ${order.items.length} item(s) - $${order.total.toFixed(2)}`
  );
}
 
// Returns a NEW array sorted from highest to lowest total.
// Spreads into a copy first so the original `orders` array is not mutated.
function getSortedByTotal(orders) {
  return [...orders].sort((a, b) => b.total - a.total);
}
 
// Returns the ids of every order that contains the given item.
function findOrdersByItem(orders, item) {
  return orders.filter((order) => order.items.includes(item)).map((order) => order.id);
}
 
// ---------------- Part B: Objects as counters ----------------
 
// Returns an object counting how many times each item was ordered.
function countItems(orders) {
  const counts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });
  return counts;
}
 
// Returns the item with the highest count, based on countItems().
function getMostPopularItem(orders) {
  const counts = countItems(orders);
  let bestItem = null;
  let bestCount = -1;
 
  for (const item in counts) {
    if (counts[item] > bestCount) {
      bestCount = counts[item];
      bestItem = item;
    }
  }
  return bestItem;
}
 
// Returns an object with the total amount spent by each customer.
function getSpendingPerCustomer(orders) {
  const spending = {};
  orders.forEach((order) => {
    spending[order.customer] = (spending[order.customer] || 0) + order.total;
  });
  return spending;
}
 
// ---------------- Part C: Working with Set ----------------
 
// Returns the unique customer names, using a Set.
function getUniqueCustomers(orders) {
  return [...new Set(orders.map((order) => order.customer))];
}
 
// Returns every distinct item ordered, using flatMap + a Set.
function getAllItems(orders) {
  return [...new Set(orders.flatMap((order) => order.items))];
}
 
// Intersection: customers present in both sets.
function bothDays(setA, setB) {
  return [...setA].filter((customer) => setB.has(customer));
}
 
// Difference: customers present in setA but not in setB.
function onlyFirstDay(setA, setB) {
  return [...setA].filter((customer) => !setB.has(customer));
}
 
// Union: every customer present in either set.
function allCustomers(setA, setB) {
  return [...new Set([...setA, ...setB])];
}
 
const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);
 
// ---------------- Print everything with labels ----------------
 
console.log("Total revenue:", getTotalRevenue(orders));
console.log("Big orders (total >= 8):", getBigOrders(orders, 8));
console.log("Order summaries:", getOrderSummaries(orders));
console.log("Sorted by total (new array):", getSortedByTotal(orders));
console.log("Original orders (unchanged order):", orders.map((o) => o.id));
console.log("Orders containing 'muffin':", findOrdersByItem(orders, "muffin"));
 
console.log("Item counts:", countItems(orders));
console.log("Most popular item:", getMostPopularItem(orders));
console.log("Spending per customer:", getSpendingPerCustomer(orders));
 
console.log("Unique customers:", getUniqueCustomers(orders));
console.log("All distinct items:", getAllItems(orders));
 
console.log("Customers who came both days:", bothDays(mondaySet, tuesdaySet));
console.log("Customers who came only Monday:", onlyFirstDay(mondaySet, tuesdaySet));
console.log("All customers (either day):", allCustomers(mondaySet, tuesdaySet));
 
// tuesdayCustomers has 5 entries, but "Lea" appears twice in the array.
// A Set only stores unique values, so duplicate "Lea" collapses into one,
// leaving 4 distinct customers (Lea, Nour, Tony, Rami) instead of 5.
console.log("Distinct Tuesday customers (Set size):", tuesdaySet.size);
 
// ---------------- Two extra tests of our own ----------------
console.log("Orders containing 'espresso':", findOrdersByItem(orders, "espresso")); // [2, 6]
console.log("Big orders (total >= 10):", getBigOrders(orders, 10)); // only order 6