import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import { TransactionsIntent } from "../intent";

const app = express();
const main = express();
// const axios = require('axios');

export const cloud_function_url_notification =
  "https://us-central1-ezykargo-61790.cloudfunctions.net/api/v1/sE8BFAAE5EEABCA864224363759A55351B0DAA792C03.php";
export const baseUrl = "https://api.monetbil.com/payment/v1/";
export const placePayment = baseUrl + "placePayment";
export const checkPayment = baseUrl + "checkPayment";
export const payout = "https://api.monetbil.com/v1/payouts/withdrawal";
export const serviceKey = "MkiGgmqZ0btHaB0rv7WbqiYv5WB3m4jy";
export const serviceSecret =
  "lfO7ARbbMH4PNB6sBKkfYZv4F8ZudIo2JlgKZRWUwcBHpjJPyyokGn7MpRRvi2ys";

const validIp = ["184.154.224.14", "184.154.224.222"];

main.use("/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.post("/sE8BFAAE5EEABCA864224363759A55351B0DAA792C03.php", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // console.log(ip);
  // if (validIp.indexOf(`${ip}`) === -1) {
  //   res.send("server incorrect");
  //   return;
  // }
  const data = req.body;
  console.log(data);
  TransactionsIntent.validatePayment(data)
    .then(() => {
      res.send("received");
    })
    .catch(err => {
      console.log(err);
      res.send("error");
    });
});

const webApi = functions.https.onRequest(main);
export default webApi;

//MoMo
/*{
            "status": REQUEST_ACCEPTED,
            "message": payment pending,
            "channel_ussd": *126#,
            "channel_name": MTN Mobile Money,
            "channel": CM_MTNMOBILEMONEY,
            "paymentId": 17759286369594791363
            }*/
//OM
/*{
            "status": REQUEST_ACCEPTED,
            "message": payment pending,
            "channel_ussd": #150*4*4#,
            "channel_name": Orange Money,
            "channel": CM_ORANGEMONEY,
            "payment_url": https://api.monetbil.com/orangemoney/v1/93514644691982916222/payment,
            "paymentId": 93514644691982916222
        }*/
/*Channel used to make payment.
         CM_MTNMOBILEMONEY
         CM_ORANGEMONEY
         CM_EUMM
         CM_NEXTTEL*/
