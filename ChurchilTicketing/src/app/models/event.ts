export class Event {
  id: any;
  constructor(
    public title: string,
    public description: string,
    public poster: string,
    public date: Date,
    public time: string,
    public location: string,
    public regular_ticket: number,
    public vip_ticket: number,
    public max_attendance: number,
    public created_at:Date,


    )
    {
    }
}
