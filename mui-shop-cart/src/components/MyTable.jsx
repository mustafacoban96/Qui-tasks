import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { CardMedia, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { dateCalcutor } from '../dateCalculator/dateCalculator';
import { LIMIT_DAY } from '../globalValue/globalValue';
import { deliveryState } from '../deliveryChechker/deliveryChecker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { verifyBook,lendBook } from '../actions/action';


const max = LIMIT_DAY;
const min = 0;
const normalise = (value) => ((value - min )*100) / (max-min)

const MyTable = (props) => {
  const verifyClick = (id) =>{
    props.verifyBook(id);
  }
  const lendedClick = (id) =>{
    props.lendBook(id);
  }
  
  return (
    <TableContainer component={Paper} sx={{width:'90%'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Process</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.books.map((book) => (
            <TableRow
              key={book.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell>
                {/* <CardMedia 
                  component='img'
                  width='100px'
                  image={book.img_path}
                  sx={{borderRadius:'10px'}}
                /> */}
                {book.id}
              </TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.yazar}</TableCell>
              <TableCell>
                <Typography variant='p'>{dateCalcutor(book.delivery_date)}</Typography>
                {
                  dateCalcutor(book.delivery_date) >= LIMIT_DAY ?
                  <LinearProgress variant="determinate" color='error' value={normalise(LIMIT_DAY)} sx={{height:'10px'}}/> :
                  <LinearProgress color={dateCalcutor(book.delivery_date) >= 15 ? 'warning':'success'} variant="determinate" value={normalise(dateCalcutor(book.delivery_date))} sx={{height:'10px'}}/>
                  
                }
                </TableCell>
             
                <TableCell>{deliveryState(dateCalcutor(book.delivery_date),book.reader_delivery_case,book.delivered_case)}</TableCell>
                <TableCell>
                  {
                    book.reader_delivery_case ? 
                    (
                      book.delivered_case ? 
                      <Button 
                      onClick={() => lendedClick(book.id)}
                      variant="contained" 
                      color='success'
                      endIcon={<SendIcon />}>LEND</Button> :
                      <Button 
                      onClick={() => verifyClick(book.id)}
                      variant="contained" 
                      color='warning'
                      endIcon={<SendIcon />}>VERIFY</Button>
                      )
                     :
                    <Button 
                    disabled
                    variant="contained" 
                    endIcon={<SendIcon />}>WAITING</Button>
                  }
                  
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = state =>{
  return {
    //state.books => 'books' in reducer's initState
    books: state.books
  }
}

const mapActionsToProps = {verifyBook,lendBook}

export default connect(mapStateToProps,mapActionsToProps)(MyTable)
