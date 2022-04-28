import { getListenKey, keepAlive } from './lib/ListenKey';
import { getListenKeys, keepAlives } from './lib/ListenKeySpot';

const pingInterval = 3300000;
const pings = async () => {
    const res = await keepAlives(temp);
    return res;
}

const ping = async () => {
    const res = await keepAlive();
    console.log(res);
}

const pingSheduler = (e) => {  
  setInterval(() => ping(), pingInterval)
}

const keyHandler = async () => {
    const res = await getListenKey();
    
}
const keyHandlerShot = async () => {
    const res = await getListenKey();
}

  const keyHandlerSpot = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let temp = modeRef.current.value;
    console.log(temp);
    if (temp == "SPOT") {
      const res = await getListenKeys();
      if (res == undefined) {console.log('api error')}
      else {
        setsListenKey(res.listenKey);
        clearTimer(getDeadTime());
      }
    } else { console.log("you are in Futures mode")}
    setIsSending(false);
  }, [isSending]);