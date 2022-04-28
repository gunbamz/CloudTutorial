import WebSocket, { WebSocketServer } from "ws";
import { getListenKey, keepAlive } from "./lib/ListenKey.js";
import dotenv from "dotenv";
import { getListenKeys, keepAlives } from "./lib/ListenKeySpot.js";
dotenv.config();

let str = "btcusdt 1m 50 1.0020 3 10 2 0.01 3 0.001 1 STOP GTC FALSE 4";
const pingInterval = 3300000;
const strSplit = str.split(" ");

const pair = strSplit[0].toUpperCase();

const pingSheduler = (e) => {  
  setInterval(()=> ping(), pingInterval);
}

const ping = async () => {
  const res = await keepAlive();
  console.log(res);
}

const timer = (a) => {
    const b = new Date(a);
    const mm = b.getMinutes();
    const ss = b.getSeconds();
    let display = mm + " : : "+ ss;
    console.log(display);
    // timeRef.current.value =  display;
}

const connect = (listen) => {
    const baseURL = "wss://fstream.binance.com";
    const klineStream = `/stream?streams=${strSplit[0].toLowerCase()}_perpetual@continuousKline_${strSplit[1]}`;
    const streamm = `${klineStream}/${listen}`;
    console.log(streamm);
    const bsoc = new WebSocket(baseURL + streamm);
    bsoc.onmessage = (event) => {	
      const update = JSON.parse(event.data);
      if (update.data.e == "continuous_kline") {
        const message = update.data;
        timer(message.E);
        //getNow(message.k);
        if (message.k.x == true ) {
          //setMessage(message);            
          let m = message.k;
          let newArr = [];
          newArr.push(m.t);
          newArr.push(m.o);
          newArr.push(m.h);
          newArr.push(m.l);
          newArr.push(m.c);
          newArr.push(m.v);
          newArr.push(m.T);
          newArr.push(m.q);
          newArr.push(m.n);
          newArr.push(m.V);
          newArr.push(m.Q);
          newArr.push(m.B);
          //setArr(e => e = newArr);
          console.log(newArr)
        }
      }
      if (update.data.e == "ACCOUNT_UPDATE") {
        //setPositionProp(update.data.a.P);
        console.log(update.data.a.P);
      }
      if (update.data.e == "ORDER_TRADE_UPDATE") {
        //setOrderProp(update.data.o);
        console.log(update.data.o)
      }
    };
    bsoc.onclose = (e) => {
      console.log("Socket is closed. Reconnect will be attempted in 3 second.", e.reason);
      setTimeout(() => {
      connect();
      }, 3000);
    };
    bsoc.onerror = (err) => {
      console.error("My Socket encountered error: ", err.message, "Closing socket");
      bsoc.close();
    };
}
const startHandler = async () => {
  const res = await getListenKey();
  if (res == undefined) {console.log("api error")}
  else {
    console.log(res);
    pingSheduler();
    connect(res.listenKey);
  }
}
startHandler();
let arrr = [
  1650975840000,  "40467.90",
  "40467.90",     "40456.70",
  "40459.80",     "58.895",
  1650975899999,  "2382809.14390",
  716,            "24.017",
  "971692.09780", "0"
];