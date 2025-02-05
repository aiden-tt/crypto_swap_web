import React, { useState, useEffect } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import TokenSelection from "./components/TokenSelection";

import closureAsh from "@/assets/swap/closureAsh.svg";

// import "./swap.css";

const Swap = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  // 选中的框，false表示出售，true表示购买
  const [selected, setSelected] = useState(false);
  // 显示或隐藏更多信息
  const [showMore, setShowMore] = useState(false);

  // 币种种类列表
  const [currency, setCurrency] = useState([
    // {
    //   chain: "WORLD",
    //   icon: "http://0xtest2024apps001olunoshibdegenbitethusdtc0xogs891.wedegen.com/upimages/tweet/2024/10/31/63e6415b-576d-47fe-9101-9e3abbce5776.png",
    //   name: "BTC",
    //   orders: 1,
    //   slippage: 1.2,
    //   symbol: "WORLD Token",
    //   token: "0x54052333be30f3f671c1a3877b8a980d35e97dce",
    // },
    // {
    //   chain: "ABC",
    //   icon: "http://0xtest2024apps001olunoshibdegenbitethusdtc0xogs891.wedegen.com/upimages/tweet/2024/10/31/63e6415b-576d-47fe-9101-9e3abbce5776.png",
    //   name: "USDT",
    //   orders: 1,
    //   slippage: 1.2,
    //   symbol: "ABC Token",
    //   token: "0x54052333be30f3f671c1a3877b8a980d35e97dab",
    // },
    // {
    //   chain: "DEG",
    //   icon: "http://0xtest2024apps001olunoshibdegenbitethusdtc0xogs891.wedegen.com/upimages/tweet/2024/10/31/63e6415b-576d-47fe-9101-9e3abbce5776.png",
    //   name: "DEG",
    //   orders: 1,
    //   slippage: 1.2,
    //   symbol: "DEG Token",
    //   token: "0x54052333be30f3f671c1a3877b8a980d35e97dcd",
    // },
    // {
    //   id: 1,
    //   contract: "0x222",
    //   chains: "ARB",
    //   name: "Total",
    //   symbol: "T",
    //   image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    //   price: 1.23,
    //   currency:"EUR"
    // },
    // {
    //   id: 2,
    //   contract: "0x222",
    //   chains: "tttt",
    //   name: "ssss",
    //   symbol: "T",
    //   image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    //   price: 1.13,
    //   currency:"USD"
    // },
  ]);

  // 售卖选中的币种
  const [sellToken, setSellToken] = useState({});
  // 购买选中的币种
  const [buyToken, setBuyToken] = useState({});

  // 出售的信息
  const [sellAmount, setSellAmount] = useState("");
  // 出售的价格
  const [sellPrice, setSellPrice] = useState(0);

  // 购买的金额
  const [buyAmount, setBuyAmount] = useState("");
  // 购买的价格
  const [buyPrice, setBuyPrice] = useState(0);
  // address
  const [address, setAddress] = useState("");

  const [iframeSrc, setIframeSrc] = useState("");

  const buyChange = ({ target: { value } }) => {
    setBuyAmount(value);
    setBuyPrice(value * 5);
  };

  const sellChange = ({ target: { value } }) => {
    setSellAmount(value);
    if (buyToken?.price) {
      setBuyAmount(Math.floor((value / buyToken.price) * 100) / 100);
    }
  };

  useEffect(() => {
    console.log(buyToken?.price);
    if (buyToken?.price && sellAmount) {
      setBuyAmount(Math.floor((sellAmount / buyToken.price) * 100) / 100);
    }
  }, [buyToken]);

  // 按钮状态 0 链接钱包 , 1无法兑换，未输入数字，2可以兑换
  const [btnStatus, setBtnStatus] = useState(2);

  //更多信息
  const [moreInfo, setMoreInfo] = useState({
    sell: 5.6,
    sellName: "ETH",
    buy: 2.4,
    buyName: "BTC",
    value: 0.03,
    fee: 0.006,
    symbol: "1INCH",
    network: "0.03",
    routing: "Uniswap API",
    price: 0.58,
    increase: false, // 涨幅，上涨为true，下跌为false
    slippage: 1,
  });

  // 请求token列表
  const requestTokenList = async () => {
    const res = await (
      await fetch("http://0xtest2024apps001olunoshibdegenbitethusdtc0xogs891.wedegen.com/v2api/x20/swapTokenList")
    ).json();
    console.log("请求token列表", res);
    if (res.code === 200 && res.data) {
      setCurrency(res.data);
    }
  };
  // 确认按钮可以兑换
  const reviewClick = async () => {
    if (!sellAmount)
      return messageApi.open({
        type: "warning",
        content: "Please enter a valid value",
      });
    if (!address.length)
      return messageApi.open({
        type: "warning",
        content: "Please enter address",
      });
    setConfirmModal(true);
  };
  // 链接钱包
  const linkWallet = () => {
    console.log("链接钱包");
    setBtnStatus(1);
  };

  // 交换按钮
  const exchangeHandle = () => {
    const obj = JSON.parse(JSON.stringify(sellToken));
    setSellToken(buyToken);
    setBuyToken(obj);
    const num = sellAmount;
    setSellAmount(buyAmount);
    setSellPrice(buyAmount * 5);
    setBuyAmount(num);
    setBuyPrice(num * 10);
  };

  // Max slippage内容
  const [maxSlippage, setMaxSlippage] = useState("");
  const maxSlippageChange = ({ target: { value } }) => {
    setMaxSlippage(value);
  };

  // Transaction deadline内容
  const [time, setTime] = useState("");
  const timeChange = ({ target: { value } }) => {
    setTime(value);
  };

  // 确认弹窗
  const [confirmModal, setConfirmModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  const handleCancelModal = () => {
    setConfirmModal(false);
  };

  // 确定交换
  const confirmExchange = async () => {
    // console.log("确认交换");
    try {
      const queryString = new URLSearchParams({
        address: address,
        amount: buyAmount,
        contract: buyToken.contract,
      }).toString();
      const res = await fetch(`/api/open/new/order?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.code === 200) {
        setOrderModal(true);
        setIframeSrc(data?.data);
      } else {
        messageApi.open({
          type: "error",
          content: "Failed",
        });
      }
    } catch (error) {
      console.log();
    }
    handleCancelModal();
  };

  // 兑换提示
  const exchangeTip = () => {
    return (
      <div className="swap_tip">
        <p>
          This is the cost to process your transaction on the blockchain. Uniswap does not receive any share of these
          fees.
        </p>
        <a href="https://support.uniswap.org/hc/en-us/articles/8370337377805-What-is-a-network-cost" target="_blank">
          Learn more
        </a>
      </div>
    );
  };

  const getShopInfo = async (id, domain) => {
    try {
      const res = await fetch(`/api/open/shop/info?shop=${id}&type=${domain}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.code === 200 && data.data) {
        setCurrency(data.data);
        setBuyToken(data.data[0]);
      }
    } catch (error) {
      console.error("Fetching shop info failed:", error);
    }
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/config.json");
      const data = await response.json();
      if (data?.shopId) {
        getShopInfo(data?.shopId, data?.domain);
      }
    };
    fetchConfig();
  }, []);

  // 设置提示
  const [setUpTip, setSetUpTip] = useState(false);
  const setTip = () => {
    return (
      <div className="set_tip">
        <div className="set_tip_title">Swap settings</div>
        <div className="set_tip_item">
          <span className="item_name">Max slippage</span>
          <div className="item_value">
            <div className="auto">Auto</div>
            <input
              type="number"
              placeholder="1.00"
              min={1}
              max={10}
              value={maxSlippage}
              onChange={maxSlippageChange}
              className="set_tip_input slippage_input"
            />
            <div>%</div>
          </div>
        </div>
        <div className="set_tip_item">
          <label for="time" className="item_name">
            Transaction deadline
          </label>
          <div className="item_value">
            <input
              id="time"
              type="number"
              placeholder="30"
              value={time}
              onChange={timeChange}
              className="set_tip_input time_input"
            />
            <div>minutes</div>
          </div>
        </div>
        <div className="close_btn" onClick={() => setSetUpTip(false)}>
          Close
        </div>
      </div>
    );
  };
  return (
    <div className="swap">
      {contextHolder}
      <div className="w-full max-w-[600px] mx-auto px-4 py-8 text-center">
          <h2 className="font-bold text-[30px]">Swap $BONK anytime, anywhere! </h2>
          {/* <p className="mt-10 text-[14px] text-[#676565]">
            Secure and hassle-free fiat-to-crypto conversion is now available for $OSAKarb on Arbitrum L2. Easily
            purchase with your preferred payment method and enjoy fast transactions with low fees.
          </p>
          <p className="mt-10 mb-10 text-[#676565]">Why choose us?</p>
          <p className="mt-4 text-[#676565]">✔ Instant transactions</p>
          <p className="mt-4 text-[#676565]">✔ Secure payment processing</p>
          <p className="mt-4 text-[#676565]">✔ Competitive exchange rates</p> */}
        </div>
      <div className="swap_container">
        
        {/* <div className="swap_setup">
          <Tooltip
            title={setTip}
            arrow={false}
            placement="bottomRight"
            trigger="click"
            overlayClassName="setup_tip"
            open={setUpTip}
            onOpenChange={(open) => setSetUpTip(open)}
          >
            <img src={setup} alt="" />
          </Tooltip>
        </div> */}
        <div
          className="card card_buy card_selected"
          // onClick={() => setSelected(false)}
        >
          <div className="name">Buy</div>
          <div className="value">
            <div className="value_num">
              <input type="number" className="input_num" placeholder="0" value={sellAmount} onChange={sellChange} />
            </div>
            <div className="value_curr">
              <div className="flex align_center justify_center">
              { buyToken?.currency === 'USD' && <img src='/images/common/usd.svg' alt="" className="w-[32px] h-[32px]" /> }
              { buyToken?.currency === 'EUR' && <img src='/images/common/eur.svg' alt="" className="w-[32px] h-[32px]" /> }
                <div className="ml-6 text-[20px] h-[32px] leading-[32px]">{buyToken?.currency}</div>
              </div>
              {/* <TokenSelection
                tokenList={currency}
                acToken={sellToken}
                setAcToken={setSellToken}
                selectedToken={buyToken}
              /> */}
            </div>
          </div>
          {/* <div className="money_curr">
            <div>€{sellPrice}</div>
            {sellToken.token && (
              <div className="money_num">
                0 USDT <div className="money_max">Max</div>
              </div>
            )}
          </div> */}
        </div>
        <div
          className="exchange"
          //  onClick={exchangeHandle}
        >
          <div className="exchange_box">
            <ArrowDownOutlined className="exchange_icon" style={{ fontSize: "20px", color: "rgb(34, 34, 34)" }} />
          </div>
        </div>
        <div className="card card_buy card_selected">
          <div className="name"></div>
          <div className="value">
            <div className="value_num">
              <input
                type="number"
                disabled={true}
                className="input_num"
                placeholder="0"
                value={buyAmount}
                onChange={buyChange}
              />
            </div>
            <div className="value_curr">
              <TokenSelection
                tokenList={currency}
                acToken={buyToken}
                setAcToken={setBuyToken}
                selectedToken={sellToken}
              />
            </div>
          </div>
          {/* <div className="money_curr">€{buyPrice}</div> */}
        </div>
        <div className="card card_buy card_selected">
          <div className="name">address</div>
          <div className="value">
            <div className="value_num">
              <input
                type="text"
                className="input_num"
                placeholder="0"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="money_curr">€{buyPrice}</div> */}
        </div>

        <div className="btn_container">
          {/* 未输入数字 */}
          {btnStatus === 1 && <div className="enter_amount">Enter an amount</div>}
          {/* 可以确认 */}
          {btnStatus === 2 && (
            <div className="review" onClick={reviewClick}>
              Review
            </div>
          )}

          {/* 链接钱包 */}
          {btnStatus === 0 && (
            <div className="link_wallet" onClick={linkWallet}>
              Connect Wallet
            </div>
          )}
        </div>
        {/* {btnStatus === 2 && (
          <div className={showMore ? "more_info more_info_show" : "more_info"}>
            <div className="info_item">
              <span className="info_name">
                1 {moreInfo.sellName} = {moreInfo.buy} {moreInfo.buyName}
              </span>
              <span className="info_value" onClick={() => setShowMore(!showMore)}>
                <span className="info_value_num">
                  <Tooltip
                    title={exchangeTip}
                    trigger={["hover", "click"]}
                    color="white"
                    className={showMore ? "info_value_tip info_value_tip_hide" : "info_value_tip"}
                  >
                    <img src={trade} alt="" className="trade_icon" />
                    <span>US${moreInfo.value}</span>
                  </Tooltip>
                </span>
                <img src={arrow} alt="" className={showMore ? "arrow_icon arrow_icon_show" : "arrow_icon"} />
              </span>
            </div>
            <div className="info_item">
              <span className="info_name">
                <span>Fee (0.25%)</span>
              </span>
              <span className="info_value">
                <span className="info_value_text">
                  {moreInfo.fee} {moreInfo.symbol}
                </span>
              </span>
            </div>
            <div className="info_item">
              <span className="info_name">
                <span>Network cost</span>
              </span>
              <span className="info_value">
                <span className="info_value_text">${moreInfo.network}</span>
              </span>
            </div>
            <div className="info_item">
              <span className="info_name">
                <span>Order routing</span>
              </span>
              <span className="info_value">
                <span className="info_value_text">{moreInfo.routing}</span>
              </span>
            </div>
            <div className="info_item">
              <span className="info_name">
                <span>Price impact</span>
              </span>
              <span className="info_value">
                {moreInfo.increase ? "+" : "-"}
                {moreInfo.price}%
              </span>
            </div>
            <div className="info_item">
              <span className="info_name">
                <span>Max slippage</span>
              </span>
              <span className="info_value">
                <span className="info_value_auto">Anto</span>
                <span className="info_value_text">{moreInfo.slippage}%</span>
              </span>
            </div>
          </div>
        )} */}
      </div>

      {/* 确认弹窗 */}
      <Modal
        open={confirmModal}
        onCancel={handleCancelModal}
        centered={true}
        closable={false}
        footer={null}
        className="confim_modal"
      >
        <div className="header">
          <span>You’re swapping</span>
          <img src={closureAsh} alt="" onClick={handleCancelModal} />
        </div>
        <div className="token_item">
          <div className="item_info">
            <div className="num">
              {sellAmount ? sellAmount : 0} {buyToken?.currency}
            </div>
          </div>
          {/* <div className="item_icon">
            <img src={sellToken.image} alt="" />
          </div> */}
        </div>
        <div className="token_arrow">
          <ArrowDownOutlined className="exchange_icon" style={{ fontSize: "16px", color: "#BFBFBF" }} />
        </div>
        <div className="token_item">
          <div className="item_info">
            <div className="num">
              {buyAmount ? buyAmount : 0} {buyToken.symbol}
            </div>
          </div>
          <div className="item_icon">
            <img src={buyToken.image} alt="" />
          </div>
        </div>
        {/* <div className="confim_info">
          <div className="confim_info_item">
            <span>Fee (0.25%)</span>
            <span> &lt;$0.1</span>
          </div>
          <div className="confim_info_item">
            <span>Network cost</span>
            <span> &lt;$0.1</span>
          </div>
          <div className="confim_info_item">
            <span>Rate</span>
            <span> &lt;$0.1</span>
          </div>
          <div className="confim_info_item">
            <span>Max slippage</span>
            <div className="slippage">
              <div className="auto">Auto</div>
              <span>1%</span>
            </div>
          </div>
        </div> */}

        <div className="confim_btn" onClick={confirmExchange}>
          Swap
        </div>
      </Modal>

      {/* 下单成功弹窗 */}
      <Modal
        open={orderModal}
        onCancel={() => {
          setOrderModal(false);
        }}
        centered={true}
        closable={true}
        footer={null}
        maskClosable={false}
        className="order_model"
      >
        <div className="mt-[25px] h-[80vh]">
          <iframe width="100%" height="100%" src={iframeSrc} frameborder="0"></iframe>
        </div>
      </Modal>
    </div>
  );
};
export default Swap;
