import { DELIVERY_BOOK,LEND_BOOK, VERIFY_BOOK} from '../actions/action-types/actionType';
import { data } from '../data';
import { CURRENT_DATE } from '../globalValue/globalValue';

const initState = {
    books:data,
}




export const bookReducer = (state = initState,action) =>{
    switch(action.type){
        case DELIVERY_BOOK:
            let deliveredBook = state.books.find(item => item.id === action.payload)
            if(deliveredBook){
                deliveredBook.reader_delivery_case=true;
            }

            return {
                ...state,books:[...state.books]
            }
        case LEND_BOOK:
            let lendedBook = state.books.find(item => item.id === action.payload);
            if(lendedBook){
                lendedBook.delivered_case=false;
                lendedBook.reader_delivery_case=false;
                lendedBook.delivery_date='11/27/2022'

            }
            return {
                ...state,books:[...state.books]
            }
        case VERIFY_BOOK:
            let verifiedBook = state.books.find(book => book.id === action.payload);
            if(verifiedBook){
                verifiedBook.delivered_case = true;
                verifiedBook.reader_delivery_case = true;
                verifiedBook.delivery_date = CURRENT_DATE
            }
            
            return {...state,books:[...state.books]}
            
            

        default:
            return state;
    }
}