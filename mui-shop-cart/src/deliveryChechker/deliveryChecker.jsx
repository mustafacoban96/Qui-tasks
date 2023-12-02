import { LIMIT_DAY } from "../globalValue/globalValue";
import { DELIVERED,BE_DELIVERED,RECIEVED,UNDELIVERED } from "../globalValue/globalValue";

export const deliveryState = (date_diff,reader_delivery_case,delivered_case) =>{
    
    if(delivered_case){
        return RECIEVED;
    }
    else{
        if(date_diff > LIMIT_DAY){
            if(reader_delivery_case){
                if(delivered_case){
                    return RECIEVED;
                }
                else{
                    return DELIVERED;
                }
            }
            else{
                return UNDELIVERED;
            }
        }
        else if(date_diff<=LIMIT_DAY){
            if(reader_delivery_case){
                if(delivered_case){
                    return RECIEVED;
                }
                else{
                    return DELIVERED ;
                }
            }
            else{
                return BE_DELIVERED;
            }
        }
    }
}