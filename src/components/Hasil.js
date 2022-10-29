import React, { Component } from 'react';
import {Row, Col, ListGroup, Badge, Card} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar  from './TotalBayar';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import swal from 'sweetalert';



export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal : false,
       keranjangDetail : false,
       jumlah : 0,
       keterangan : '',
       totalHarga: 0,
    }
  }

  // Ketika Modal dibuka
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal : true,
      keranjangDetail : menuKeranjang,
      jumlah : menuKeranjang.jumlah,
      keterangan : menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    })
  }

  // Ketika modal ditutup
  handleClose = () => {
    this.setState({
      showModal : false,
    })
  }

  // Ketika Klik tombol (+)
  tambah = () => {
    this.setState({
      jumlah : this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    })
  }
  
  // Ketika Klik tombol (-)
  kurang = () => {
    if(this.state.jumlah > 1){
      this.setState({
        jumlah : this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1) 
      })
    }
  }

  // Ketika Memasukkan Value di TextArea
  changeHandler = (event) => {
    this.setState({
      keterangan : event.target.value,
    })
  }

  // Ketika tombol save di klik
  handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    }
    axios
      .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang()
        // handle success
        swal({
          title: "Update Pesanan!",
          text: "Anda memesan " + data.product.nama,
          icon: "success",
        });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });

      this.handleClose();
  }
  
  // Ketika tombol save di klik
  hapusPesanan = (id) => {
  
    swal({
      title: "Hapus Pesanan?",
      text: this.state.keranjangDetail.product.nama + "Akan Dihapus Dari Pesanan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
      .delete(API_URL + "keranjangs/"+id)
      .then((res) => {
        this.props.getListKeranjang()
        // handle success
        swal({
          title: "Pesanan Dihapus!",
          text: "Sukses Hapus Pesanan "+ this.state.keranjangDetail.product.nama,
          icon: "success",
        });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    

      this.handleClose();
  }

  render() {
    const {keranjangs} = this.props;
    return (
        <Col md={3} mt='2'>
        <h4> <strong>Hasil</strong> </h4>
        <hr />
          {keranjangs.length !== 0 && (
            <Card className="wadah overflow-auto">
          <ListGroup variant="flush" >
            {keranjangs.map((menuKeranjang) => (
            <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)} className="list-menu">
            <Row>
              <Col xs={2}>
                <h4>
                  <Badge pill bg="success">
                    {menuKeranjang.jumlah}
                  </Badge>
                </h4>
              </Col>
              <Col>
                <h5>{menuKeranjang.product.nama}</h5>
                <p>@ Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
              </Col>
              <Col>
              <strong className='float-end'>
              Rp. {numberWithCommas(menuKeranjang.total_harga)}
              </strong>
              </Col>
            </Row>
            </ListGroup.Item>

            ))}
            <ModalKeranjang 
            handleClose={this.handleClose} 
            {...this.state} 
            tambah={this.tambah} 
            kurang={this.kurang} 
            changeHandler={this.changeHandler}
            handleSubmit={this.handleSubmit}
            hapusPesanan={this.hapusPesanan}
            />

          </ListGroup>
          </Card>

          )}

          <TotalBayar keranjangs={keranjangs} {...this.props}/>
      </Col>
    ) 
  }
}
