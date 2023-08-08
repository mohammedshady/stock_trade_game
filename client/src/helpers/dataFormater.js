function formatPricesData(prices) {
  let pricesData = {};
  for (const key in prices) {
    pricesData[key] = parseFloat(prices[key].price);
  }
  return pricesData;
}
function formatStocksData(stocks) {
  const stocksData = {};

  stocks.forEach((stock) => {
    const numShares = stock.num_shares;
    stocksData[stock.key] = numShares;
  });
  return stocksData;
}
module.exports = { formatPricesData, formatStocksData };
