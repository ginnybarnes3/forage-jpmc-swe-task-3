import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound : number,
  lower_bound : number,
  trigger_alert : number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const abc_price = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const def_price = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = abc_price/def_price;
    const upperB = 1.05;
    const lowerB = 0.95;
    return {
      price_abc : abc_price,
      price_def : def_price,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
          serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperB,
      lower_bound: lowerB,
      trigger_alert: (ratio > upperB || ratio < lowerB) ? ratio : undefined,
    }
  }
}
