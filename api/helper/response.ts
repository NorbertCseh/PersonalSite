import moment from "moment";

export async function responseJson(status: number, msg: any, token?: string) {
  return {
    status,
    msg,
    token,
    timeStamp: moment(),
  };
}
