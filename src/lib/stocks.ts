import stocks from "@/data/stocks.json";

export type StockRecord = {
  code: string;
  name: string;
};

const stockList = stocks as StockRecord[];

export function searchStocks(keyword: string): StockRecord[] {
  const term = keyword.trim().toLowerCase();
  if (!term) return stockList;

  return stockList.filter((item) => {
    return (
      item.code.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term)
    );
  });
}
