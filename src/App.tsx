import { useMemo, useEffect, useState, useRef, UIEvent } from "react";
import Product from "./components/Product";
import "./styles.css";

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT: number = 500;
/** @name 列表项高度 */
const ITEM_HEIGHT: number = 100;
/** @name 预加载数量 */
const PRE_LOAD_COUNT: number = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT;

export default function App() {
  const [sourceData, setSourceData] = useState<number[]>([]);
  const [showRange, setShowRange] = useState({ start: 0, end: 10 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const createListData = () => {
    const initnalList: number[] = Array.from(Array(80).keys());
    setSourceData(initnalList);
  };

  const scrollViewHeight = useMemo(() => {
    return sourceData.length * ITEM_HEIGHT;
  }, [sourceData]);

  const scrollViewOffset = useMemo(() => {
    return showRange.start * ITEM_HEIGHT;
  }, [showRange]);

  useEffect(() => {
    createListData();
  }, []);

  const onContainerScroll = (event: UIEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (reachBottom()) {
      let endIndex = showRange.end;
      let pushData: number[] = [];
      for (let index = 0; index < 20; index++) {
        pushData.push(endIndex++);
      }
      setTimeout(() => {
        setSourceData((arr) => {
          return [...arr, ...pushData];
        });
      }, 2000);
    }
    calculateRange();
  };

  const calculateRange = () => {
    const element = containerRef.current;
    if (element) {
      const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT) + 1;
      const viewItemSize: number = Math.ceil(
        element.clientHeight / ITEM_HEIGHT
      );
      const startSize: number = offset - PRE_LOAD_COUNT;
      const endSize: number = viewItemSize + offset + PRE_LOAD_COUNT;
      setShowRange({
        start: startSize < 0 ? 0 : startSize,
        end: endSize > sourceData.length ? sourceData.length : endSize,
      });
    }
  };

  const currentViewList = useMemo(() => {
    return sourceData
      .slice(showRange.start, showRange.end)
      .map((item, index) => ({
        data: item,
        index,
      }));
  }, [showRange, sourceData]);

  const reachBottom = () => {
    const element = containerRef.current;
    if (element) {
      const contentScrollTop = Math.ceil(element?.scrollTop || 0);
      const clientHeight = element?.clientHeight || 0;
      const scrollHeight = element?.scrollHeight || 0;
      console.log('justin', contentScrollTop, clientHeight, scrollHeight)
      if (contentScrollTop + clientHeight >= scrollHeight) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      ref={containerRef}
      className="scrollView"
      style={{
        height: SCROLL_VIEW_HEIGHT,
        overflow: "auto",
      }}
      onScroll={onContainerScroll}
    >
      <div
        className="clientView"
        style={{
          width: "100%",
          height: scrollViewHeight - scrollViewOffset,
          marginTop: scrollViewOffset,
        }}
      >
        {currentViewList.map((item) => (
          <div
            style={{ height: ITEM_HEIGHT }}
            className="viewItem"
            key={item.index}
          >
            <Product />
          </div>
        ))}
      </div>
    </div>
  );
}
