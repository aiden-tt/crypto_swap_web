import React, { useState, useEffect } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import TokenSelection from "./components/TokenSelection";
import Decimal from "decimal.js";
import closureAsh from "@/assets/swap/closureAsh.svg";
import wnypay from "@/assets/swap/wnypay.svg";
import arbitrum from "@/assets/swap/arbitrum.png";
import YourApp from "@/components/RaunbowButton";
import { useAccount } from "wagmi";
import PageHeader from "./components/header";
import IframeModals from "./components/IframeModals";

// import "./swap.css";

const Swap = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isConnected, address: wagmiAddress } = useAccount();
  // 选中的框，false表示出售，true表示购买
  const [selected, setSelected] = useState(false);
  // 显示或隐藏更多信息
  const [showMore, setShowMore] = useState(false);

  // 币种种类列表
  const [currency, setCurrency] = useState([
    // {
    //   id: 2,
    //   contract: "0x222",
    //   chains: "tttt",
    //   name: "ssss",
    //   symbol: "T",
    //   image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    //   price: 1.13,
    //   currency: "USD",
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

  const calculateAmount = (value, price) => {
    try {
      const amount = new Decimal(value).dividedBy(new Decimal(price)).toDecimalPlaces(2);
      return amount.toNumber();
    } catch (error) {
      console.error("err:", error);
      return 0;
    }
  };

  const sellChange = ({ target: { value } }) => {
    setSellAmount(value);
    if (buyToken?.price) {
      // setBuyAmount(Math.floor((value / buyToken.price) * 100) / 100);
      const result = calculateAmount(value, buyToken.price);
      setBuyAmount(result);
    }
  };

  useEffect(() => {
    console.log(buyToken?.price);
    if (buyToken?.price && sellAmount) {
      // setBuyAmount(Math.floor((sellAmount / buyToken.price) * 100) / 100);
      const result = calculateAmount(sellAmount, buyToken.price);
      setBuyAmount(result);
    }
  }, [buyToken]);

  // 按钮状态 0 链接钱包 , 1无法兑换，未输入数字，2可以兑换
  const [btnStatus, setBtnStatus] = useState(2);

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
  const [orderNo, setOrderNo] = useState("");
  const [infoModal, setInfoModal] = useState(false);
  const [infoIframeSrc, setInfoIframeSrc] = useState("");

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
        setIframeSrc(data?.data?.url);
        setOrderNo(data?.data?.orderNo);
      } else {
        messageApi.open({
          type: "error",
          content: data?.msg,
        });
      }
    } catch (error) {
      console.log(error);
    }
    handleCancelModal();
  };


  // 在组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (window.orderTimer) {
        clearInterval(window.orderTimer);
      }
    };
  }, []);

  const getShopInfo = async (id, type) => {
    try {
      const res = await fetch(`/api/open/shop/info?shop=${id}&type=${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.code === 200 && data.data) {
        setCurrency(data.data);
        setBuyToken(data.data[0]);
      } else {
        messageApi.open({
          type: "error",
          content: data?.msg,
        });
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
        getShopInfo(data?.shopId, data?.type);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    setAddress(wagmiAddress);
  }, [wagmiAddress]);



  return (
    <>
      <PageHeader></PageHeader>
      <div className="swap">
        {contextHolder}
        <div className="w-full max-w-[800px] mx-auto px-4 py-8 text-center">
          <h2 className="font-bold text-[30px] text-[#ffffff]">
            REKT Token launches on Arbitrum l2 - Now with Fiat Purchase Support!
          </h2>
          <p className="mt-10 text-[14px] text-[#676565]">
            Get ready! $REkTarb is making its grand debut on Arbitrum L2, offering lightning-fast transactions and lower
            fees. The best part? You can now buy $REKTarb directly with fiat, making it easier than ever to jump in and
            be part of the action!
          </p>
          <p className="mt-10 mb-10 text-[#676565]"></p>
        </div>
        <div className="swap_container">
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
                  {buyToken?.currency === "USD" && (
                    <img src="/images/common/usd.svg" alt="" className="w-[32px] h-[32px]" />
                  )}
                  {buyToken?.currency === "EUR" && (
                    <img src="/images/common/eur.svg" alt="" className="w-[32px] h-[32px]" />
                  )}
                  <div className="ml-6 text-[20px] h-[32px] leading-[32px]">{buyToken?.currency}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="exchange"
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
            <div className="name">Arbitrum Address</div>
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

          <div className="mt-10 mb-10">
            <YourApp />
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
            <span>Buy Crypto</span>
            <img src={closureAsh} alt="" onClick={handleCancelModal} />
          </div>
          <div className="token_item">
            <div className="item_info">
              <div className="num">
                {sellAmount ? sellAmount : 0} {buyToken?.currency}
              </div>
            </div>
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
          <div className="w-full titewynpay">
            <div className="flex w-full justify-center items-center">
              <img src={wnypay} className="w-[30px] h-[30px] mr-5" alt="" />
              <span className="text-[16px]">Wynpay Best quote</span>
            </div>
            <div className="flex w-full justify-center items-center">
              <img src={arbitrum} className="w-[20px] h-[20px] rounded-full mr-5" alt="" />
              <span>Arbitrum One</span>
            </div>
          </div>

          <div className="confim_btn" onClick={confirmExchange}>
            CONTINUE
          </div>
        </Modal>

        <IframeModals
          orderModal={orderModal}
          setOrderModal={setOrderModal}
          iframeSrc={iframeSrc}
          setIframeSrc={setIframeSrc}
          infoModal={infoModal}
          setInfoModal={setInfoModal}
          infoIframeSrc={infoIframeSrc}
          setInfoIframeSrc={setInfoIframeSrc}
          orderNo={orderNo}
        ></IframeModals>
      </div>
    </>
  );
};
export default Swap;
