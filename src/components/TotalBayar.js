import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const TotalBayar = (props) => {

  const navigate = useNavigate()

   const totalHarga = props.keranjangs.reduce((result,item) => {
    return result + item.total_harga;
  }, 0)

    const submitTotalHarga = (totalHarga) => {
      if(totalHarga === 0){
        swal("Kosong!", "Mohon Pesan Minimal Satu Menu!", "error");
      } else {
      
      swal({
        title: "Cek Ulang Pesanan",
        text: "Pastikan Pesanan Anda Sudah Sesuai Dengan List Di Sistem!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((iya) => {
        if (iya) {
          const pesanan = {
          total_harga: totalHarga,
          menus: props.keranjangs
      }
      
      axios
           .post(API_URL+"pesanans", pesanan)
           .then((res) => {
  
             navigate('/sukses')
              
           })
           .catch((err) =>{
            console.log('error : '+err);
           })

        
          swal("Pesanan Berhasil Dibuat! Silahkan Tunggu!", {
            icon: "success",
          });
        } else {
          swal("Pesanan Dibatalkan!");
        }
      });

      }
    }

   
  return (
      <div className='fixed-bottom mb-3'>
      <Row>
        <Col md={{span: 3, offset: 9}} className='px-4 d-grid gap-1'>
        <h4>Total Harga : <strong className='float-end'> Rp. {numberWithCommas(totalHarga)}</strong> </h4>
        <Button variant='primary'
        onClick={() => submitTotalHarga(totalHarga)}>
        <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
        </Button>
        </Col>
      </Row>
      </div>
)
}


export default TotalBayar

