// Construct a simple Portfolio class that has a collection of Stocks and a "Profit" method that receives 2 dates
// and returns the profit of the Portfolio between those dates. 

// Assume each Stock has a "Price" method that receives 
// a date and returns its price.

// Bonus Track: make the Profit method return the "annualized return" of the portfolio between the given dates.

const stocksMock = [
  { date: new Date('2022-01-11'), buyingPrice: 690.00, sellPrice: 900.00 }, // start date
  { date: new Date('2022-01-14'), buyingPrice: 190.00, sellPrice: 480.00 },
  { date: new Date('2022-01-16'), buyingPrice: 390.00, sellPrice: 380.00 },
  { date: new Date('2022-01-18'), buyingPrice: 590.00, sellPrice: 890.00 }, // Final date
  { date: new Date('2022-01-19'), buyingPrice: 90.00, sellPrice: 180.00 },
  { date: new Date('2022-01-21'), buyingPrice: 100.00, sellPrice: 400.00 },
  { date: new Date('2022-02-01'), buyingPrice: 1290.00, sellPrice: 1360.00 },
]

// Annualized Return = ((Ending value of investment / Beginning value of investment) ^ (1 / Number years held)) - 1
class Stock {
  localDate: Date
  localBuyingPrice
  localSellPrice
  constructor(date: Date, buyingPrice: number, sellPrice: number) {
    this.localDate = date
    this.localBuyingPrice = buyingPrice
    this.localSellPrice = sellPrice
  }
  Price(date: Date): number {
    return stocksMock
      .find(stock => stock.date.toString() === date.toString())!.sellPrice
  }
}

class Portfolio {
  collectionOfStocks: Stock[] =
    stocksMock
      .map(({ date, buyingPrice, sellPrice }) => new Stock(new Date(date), buyingPrice, sellPrice))

  constructor() {
    const [firstElement] = this.collectionOfStocks
    console.log(`Stock Price: $${firstElement.Price(firstElement.localDate)}`)
  }

  Profit(firstDate: Date, secondDate: Date) {
    const firstDatePrice =
      this.collectionOfStocks
        .find(stock => stock.localDate.toString() === firstDate.toString())?.Price(firstDate)
    const secondDatePrice =
      this.collectionOfStocks
        .find(stock => stock.localDate.toString() === secondDate.toString())?.Price(secondDate)
    const annualizedReturn = Math.pow(secondDatePrice! / firstDatePrice!, 1 / 4) - 1
    const percentageFixed = (annualizedReturn * 100).toFixed(2)
    console.log(`Percentage: ${percentageFixed}%`);

    return this.collectionOfStocks
      .filter(stock => (stock.localDate >= firstDate && stock.localDate <= secondDate))
      .map(stock => ({ ...stock, profit: stock.localSellPrice - stock.localBuyingPrice }))
      .reduce((acc, curr) => acc + curr.profit, 0)
  }
}

const theProfit = new Portfolio().Profit(new Date('2022-01-11'), new Date('2022-02-01'))

console.log(`Profit: $${theProfit}`)

