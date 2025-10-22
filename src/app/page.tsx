"use client";

import {
  ChangeEvent,
  CompositionEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./page.module.css";

type StockItem = {
  code: string;
  name: string;
};

async function fetchStocks() {
  const url = `/api/stocks`;
  const resp = await fetch(url);
  if (resp.ok) {
    return resp.json();
  }
  return [];
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [allStocks, setAllStocks] = useState<StockItem[]>([]);

  useEffect(() => {
    fetchStocks().then((res) => setAllStocks(res.data));
  }, []);

  const filteredResults = useMemo(() => {
    if (!keyword) {
      return allStocks;
    }

    const term = keyword.toLowerCase();
    return allStocks.filter((item) => {
      return (
        item.code.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term)
      );
    });
  }, [allStocks, keyword]);

  const hasNoResult = useMemo(
    () => keyword.length > 0 && filteredResults.length === 0,
    [keyword, filteredResults.length]
  );

  function applyKeyword(value: string) {
    const normalized = value.trim();
    setKeyword(normalized);
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (isComposing) {
      return;
    }

    applyKeyword(value);
  }

  function handleCompositionStart() {
    setIsComposing(true);
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    setIsComposing(false);
    const value = event.currentTarget.value;
    setInputValue(value);

    applyKeyword(value);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>股票搜索</h1>
        <p>输入名称或代码，快速定位股票信息。</p>
      </header>
      <section className={styles.searchSection}>
        <label htmlFor="keyword">搜索关键词</label>
        <input
          id="keyword"
          value={inputValue}
          placeholder="如 sz000001 或 平安银行"
          onChange={handleKeywordChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        {hasNoResult && <p className={styles.empty}>未找到结果</p>}
      </section>
      <section className={styles.results}>
        {filteredResults.map((item) => (
          <div key={item.code} className={styles.resultItem}>
            <span>
              <strong>{item.code}</strong> · {item.name}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
