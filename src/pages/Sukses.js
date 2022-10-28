import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from "../utils/constant";

export default class Sukses extends Component {

  // Ketika Halaman Sukses di Load, ->
  componentDidMount(){
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // handle success
        const keranjangs = res.data;
        // Mapping, biar bisa dihapus semua isi JSON Keranjangs nya
        keranjangs.map((item) => {
            return axios
                  .delete(API_URL + 'keranjangs/' + item.id) //Method delete Json Placeholder
                  .catch((err) => console.log('Error',err)) 
            })
              
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  }
  
  render() {
    return (
      <div className='mt-4 text-center'>
        <Image src='assets/images/sukses.png' width={500}/>
        <h2>Sukses Pesan</h2>
        <p>Terimakasih sudah memesan, Mohon Tunggu pesanan anda!</p>
        <Button variant='primary' as={Link} to='/'>Kembali</Button>
      </div>
    )
  }
}
