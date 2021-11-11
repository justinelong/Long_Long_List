import "./index.css";

export default () => {
  return (
    <div className="product">
      <div>
        <img
          className="product__image"
          src="https://img01.yzcdn.cn/vant/ipad.jpeg"
          alt="商品卡片"
        />
      </div>
      <div className="product__info">
        <div className="product__info__top">
          <div className="product__info__top__title">商品信息</div>
          <div className="product__info__top__tag">规格：一件/500g</div>
        </div>
        <div className="product__info__bottom">
          <div className="card__price">
            <div>
              <span className="card__price-currency">¥</span>
              <span className="card__price-integer">2</span>.
              <span className="card__price-decimal">00</span>
            </div>
          </div>
          <div className="product__info__bottom__count">x2</div>
        </div>
      </div>
    </div>
  );
};
