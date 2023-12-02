import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { connect } from 'react-redux';
import { LIMIT_DAY } from '../globalValue/globalValue';
import LinearProgress from '@mui/material/LinearProgress';
import { dateCalcutor } from '../dateCalculator/dateCalculator';
import { deliveryBook } from '../actions/action';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';


const max = LIMIT_DAY;
const min = 0;
const normalise = (value) => ((value - min )*100) / (max-min)


const UserSide = (props) => {
  const handleDelivery = (id) =>{
    props.deliveryBook(id);
  }
  return (
    <Box sx={{padding:'20px' ,display:'flex'}} gap={8}>
      {
        props.books.map(book =>(
          book.delivered_case ? null :
          <Card sx={{ maxWidth: 250}} key={book.id}>
            <CardActionArea>
              <CardMedia
                height={400}
                component="img"
                image={book.img_path}
                alt="green iguana"
              />
              <CardContent sx={{textAlign:'left'}}>
                <Typography gutterBottom variant="h7" component="div">
                  {book.title}
                </Typography>
                <Typography marginTop='10px' marginBottom='10px' variant="body2" color="text.secondary">
                  {book.yazar}
                </Typography>
                {
                  dateCalcutor(book.delivery_date) >= LIMIT_DAY ?
                  (
                    <>
                    <Typography variant='p'>{dateCalcutor(book.delivery_date)} days <HourglassFullIcon/></Typography>
                    <LinearProgress variant="determinate" color='error' value={normalise(LIMIT_DAY)} sx={{height:'10px'}}/> 
                    </>
                  ):
                  (
                    <>
                    <Typography variant='p'>{dateCalcutor(book.delivery_date)} days <HourglassTopIcon/></Typography>
                     <LinearProgress color={dateCalcutor(book.delivery_date) >= 15 ? 'warning':'success'} variant="determinate" value={normalise(dateCalcutor(book.delivery_date))} sx={{height:'10px'}}/>
                    </>
                  )
                 
                  
                }
              </CardContent>
            </CardActionArea>
            <CardActions sx={{justifyContent:'right',padding:'12px'}}>
              {
                !book.reader_delivery_case ? 
                <Button 
                size="small"  
                variant='contained'
                onClick={() => handleDelivery(book.id)}
                sx={{
                  color:'white',
                  backgroundColor:'#dd2c00',
                  "&:hover":{
                    backgroundColor:'#ff3d00'
                  }
                }}
                >
                Deliver
              </Button> :
              <Button disabled size="small"  variant='contained' endIcon={<HourglassTopIcon/>}
              sx={{
                color:'white',
                backgroundColor:'#dd2c00',
                "&:hover":{
                  backgroundColor:'#ff3d00'
                }
                }}>
                Wait to verify
              </Button> 
              }
              
            </CardActions>
          </Card>
        ))
      }
      
    </Box>
  )
}

const mapStateToProps = state =>{
  return {
    //state.books => 'books' in reducer's initState
    books: state.books
  }
}

const mapActionToProps = {deliveryBook}

export default connect(mapStateToProps,mapActionToProps)(UserSide)
