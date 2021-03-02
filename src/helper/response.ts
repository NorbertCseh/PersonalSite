import * as moment from "moment";

export async function responseJson(status: number, msg: any, token?: string) {
  return {
    status: status,
    msg: msg,
    token: token,
    timeStamp: moment(),
  };
}
