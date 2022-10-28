import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { numberWithCommas } from "../utils/utils";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit }) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama} <strong>(Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Harga : </Form.Label>
              <br />
              <p><strong> Rp. {numberWithCommas(keranjangDetail.total_harga)} </strong></p>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jumlah : </Form.Label>
              <br />
              <Button variant="primary" size="sm" className="me-2" onClick={()=> tambah()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <strong>{jumlah}</strong>
              <Button variant="primary" size="sm" className="ms-2" onClick={()=> kurang()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Form.Group>



            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                name="keterangan" 
                placeholder="Contoh: Pedas, Nasi setengah, Manis" 
                value={keterangan} 
                onChange={(event) => changeHandler(event)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-end">
                Simpan
            </Button>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
