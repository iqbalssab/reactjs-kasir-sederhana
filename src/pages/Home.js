import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategories, Hasil, Menus } from "../components/index";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  // buat nampilin yang ada di tampilan utama
  componentDidMount() {
    // tampilkan di baian 'daftar produk'
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        // handle success
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });

      // tampilkan di bagian hasil
      this.getListKeranjang();
  }

  
  // componentDidUpdate(prevState){
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //     axios
  //     .get(API_URL + "keranjangs")
  //     .then((res) => {
  //       // handle success
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     })
  //     .catch((err) => {
  //       // handle error
  //       console.log(err);
  //     });
  //   }
  // }

  // biar realtime perubahannya
  getListKeranjang = () => {
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // handle success
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
    
  }


  // ganti kategori sesuai yg di klik(antara makanan,minuman,ato cemilan)
  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        // handle success
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        // handle success
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          }
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              // handle success
              swal({
                title: "Pesanan Masuk!",
                text: "Anda memesan " + keranjang.product.nama,
                icon: "success",
              });
            })
            .catch((err) => {
              // handle error
              console.log(err);
            });
        } else{
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value,
          }

          axios
            .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              // handle success
              swal({
                title: "Pesanan Masuk!",
                text: "Anda memesan " + keranjang.product.nama,
                icon: "success",
              });
            })
            .catch((err) => {
              // handle error
              console.log(err);
            });

        }
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state;
    return (
      
        
        <div className="mt-4">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>{menus && menus.map((menu) => <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang} />)}</Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang} />
            </Row>
          </Container>
        </div>
      
    );
  }
}
