import {DELIVERY_BOOK, LEND_BOOK, VERIFY_BOOK} from './action-types/actionType'




export const deliveryBook = (id) =>{
    return {
        type:DELIVERY_BOOK,
        payload:id
    }
}

export const lendBook = (id) =>{
    return {
        type:LEND_BOOK,
        payload:id
    }
}



export const verifyBook = (id) => {
    return {
        type:VERIFY_BOOK,
        payload:id
    }
} 