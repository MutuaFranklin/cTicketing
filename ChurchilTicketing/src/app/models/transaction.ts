import { Event } from "./event";

export class Transaction {

  id: any;
  constructor(
    public first_name: string,
    public last_name: string,
    public phone_number: string,
    public email: string,
    public event: any,
    public regular_tickets: number,
    public vip_tickets: number,
    public total_spend: number,
    public transacted_on:Date,
    public transaction_code: string,


    )
    {
    }
}
