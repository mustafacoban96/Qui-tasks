
import { CURRENT_DATE } from "../globalValue/globalValue";
export const dateCalcutor = (MyDate) =>{
    //let date_1 = new Date(MyDate);
    let date_1 = new Date(MyDate);
    let date_2 = new Date(CURRENT_DATE);
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.floor(difference / (1000 * 3600 * 24));
    return TotalDays;

}