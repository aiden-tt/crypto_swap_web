import React, { useEffect } from "react";
import { Modal, Spin, message } from "antd";

const IframeModals = ({
  // 订单弹窗相关
  orderModal,
  setOrderModal,
  iframeSrc,
  setIframeSrc,
  // 信息弹窗相关
  infoModal,
  setInfoModal,
  infoIframeSrc,
  setInfoIframeSrc,
  orderNo
}) => {
  const [messageApi, contextHolder] = message.useMessage();
   // 获取订单信息
   const getOrderInfo = async (orderNo) => {
    // 清除之前的定时器
    if (window.orderTimer) {
      clearInterval(window.orderTimer);
    }

    const checkOrder = async () => {
      try {
        const res = await fetch(`/api/open/order/info?orderNo=${orderNo}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.code === 200) {
          console.log("订单信息=>", data?.data);

          // 如果订单状态为完成或失败,清除定时器
          if (data?.data?.orderFinish) {
            clearInterval(window.orderTimer);
            // 关闭下单对话框
            setOrderModal(false);
            // 展示info 订单弹窗
            setInfoModal(true);
            const src = "https://arbiscan.io/tx/" + data?.data?.createrHash;
            setInfoIframeSrc(src);
          }
        } else {
          messageApi.open({
            type: "error",
            content: data?.msg,
          });
        }
      } catch (error) {
        console.log(error);
        clearInterval(window.orderTimer);
      }
    };

    // 立即执行一次
    await checkOrder();

    // 每5秒轮询一次
    window.orderTimer = setInterval(checkOrder, 5000);
  };

  // 处理 iframe 消息
  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const handleMessage = (event) => {
        const { data } = event;
        const { type } = data;

        switch (type) {
          case "page_loaded":
            console.log("page fully loaded");
            break;
          case "logged_in_success":
            console.log("token:", data.token);
            break;
          case "logged_in_failure":
            messageApi.open({
              type: "error",
              content: JSON.stringify(data.errorCode),
            });
            if (window.orderTimer) {
              clearInterval(window.orderTimer);
            }
            break;
          case "order_cancelled":
            setOrderModal(false);
            break;
          case "order_completed":
            setTimeout(() => {
              setOrderModal(false);
              setInfoModal(true);
            }, 1000);
            break;
        }
      };

      window.addEventListener("message", handleMessage);

      // 清理函数
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [orderModal]);

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (window.orderTimer) {
        clearInterval(window.orderTimer);
      }
    };
  }, []);

  // 当有新的订单号时，开始轮询订单状态
  useEffect(() => {
    if (orderNo) {
      getOrderInfo(orderNo);
    }
  }, [orderNo]);
  return (
    <>
    {contextHolder}
      {/* 下单成功弹窗 */}
      <Modal
        open={orderModal}
        onCancel={() => {
          setOrderModal(false);
          setIframeSrc("");
        }}
        centered={true}
        closable={true}
        footer={null}
        maskClosable={false}
        className="order_model"
      >
        <div className="mt-[25px] h-[80vh]">
          <iframe width="100%" height="100%" src={iframeSrc} frameBorder="0"></iframe>
        </div>
      </Modal>


      {/* 订单信息 */}
      <Modal
        open={infoModal}
        onCancel={() => {
          setInfoModal(false);
          setInfoIframeSrc("");
        }}
        title="Order information"
        centered={true}
        closable={true}
        footer={null}
        maskClosable={false}
        className="order_model"
      >
        <div className="mt-[25px] h-[20vh] cursor-pointer flex justify-center items-center">
          {infoIframeSrc ? (
            <div className="w-full">
              <div>Your order has been delivered. Please check the transaction hash using the link below.</div>
              <div
                className="w-full text-[#28a0f0] break-words pt-[10px] pb-[20px]"
                onClick={() => {
                  window.open(infoIframeSrc);
                }}
              >
                {infoIframeSrc}
              </div>
              <div
                className="w-[80px] rounded-md pt-4 pb-4 bg-[#28a0f0] text-[#fff] text-center m-auto"
                onClick={() => {
                  window.open(infoIframeSrc);
                }}
              >
                open
              </div>
            </div>
          ) : (
            <Spin />
          )}
        </div>
      </Modal>
    </>
  );
};

export default IframeModals;