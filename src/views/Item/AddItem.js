import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from 'react-bootstrap/Button';
import { FaEdit ,FaTrash} from 'react-icons/fa'; 
import Form from 'react-bootstrap/Form';
import {useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Pagination } from "react-bootstrap";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();

  const [AddData , setAddData] = useState(false);
  const [showUpdate , setShowUpdate] = useState(false);
  const [records ,setRecodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [modalData , setModalData] = useState({
    itemName:""
})
  const AddNewData = ()=>{
    setAddData(true)
}
const handleClose = () => {
  setShowUpdate(false)
  setAddData(false)
  }
  // const submitData = (data) => {
  //   const token = localStorage.getItem('token');
  //   console.log("81",token)
  //   axios.post('http://13.127.182.122:5004/items/addItem', data, {
  //     headers: {
  //       Authorization: `${token}`
  //     }})
  //     .then((response) => {
  //       alert("Data Successfully Added", response.data);
  //       setModalData({
  //           itemName: ""
  //       });
  //       setAddData(false)
  //       axios.get('http://13.127.182.122:5004/items/getAllItem').then(res => {
  //         setRecodes(res.data.data);
  //       });
        
  //     })
  //     .catch((error) => {
  //       alert("Something Wrong",error)
  //     });
  // };
  const submitData = (data) => {
    const token = localStorage.getItem('user'); // Ensure correct key ('token')    
    axios.post('http://13.127.182.122:5004/items/addItem', data, {
      headers: {
        Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
      }
    })
    .then((response) => {
      alert("Data Successfully Added", response.data);
      setModalData({
        itemName: ""
      });
      setAddData(false);
      axios.post('http://13.127.182.122:5004/items/getAllItem', null, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the Authorization header
        }
      })
    })
    .catch((error) => {
      alert("Something Wrong", error);
    });
  };
  
  const updateData = (data)=>{
    const token = localStorage.getItem('user');
    axios.post('http://13.127.182.122:5004/items/updateItemById', data)
  .then((response) => {
    alert("Data Successfully Updated", response.data);
    setShowUpdate(false)
    axios.post('http://13.127.182.122:5004/items/getAllItem', null, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in the Authorization header
      }
    }).then(res => {
      setRecodes(res.data.data);
    });
  })
  .catch((error) => {
    alert("Something Wrong",error)
  });
}

  const EditDetails = (_id)=>{
    axios.get(`http://13.127.182.122:5004/items/getItemById?id=${_id}`).then((res)=>{
        setModalData(res.data.data)
    },[])
    setShowUpdate(true);

}
const handleDelete = (_id)=>{
  const token = localStorage.getItem('user');
  axios.get(`http://13.127.182.122:5004/items/deleteItemById?id=${_id}`).then(res=>{
    alert("Can You Delete This User",res);
    axios.post('http://13.127.182.122:5004/items/getAllItem', null, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in the Authorization header
      }
    }).then(res => {
      setRecodes(res.data.data);
    });
  })
}

useEffect(()=>{
  const token = localStorage.getItem('user');
  console.log("167",token)
  axios.post('http://13.127.182.122:5004/items/getAllItem', null, {
    headers: {
      Authorization: `Bearer ${token}` // Include token in the Authorization header
    }
  }).then(res=>{
      setRecodes(res.data.data)
  })
},[])

  return (
    <GridContainer>
      <Button style={{ marginLeft: "auto", marginRight:'20px'}} className="primary" onClick={()=>AddNewData()} >Add Item</Button>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Item Name
            </h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID", "Item Name","Edit", "Delete"]}
            tableData={currentRecords.map((item, index) => ([
              index + 1,
              item.itemName,
              <Button variant="warning" key={`edit-${index}`} onClick={() => EditDetails(item._id)}><FaEdit /></Button>,
              <Button variant="danger" key={`delete-${index}`} onClick={() => handleDelete(item._id)}><FaTrash /></Button>
            ]))}
          />
            <Pagination style={{ display: "flex", justifyContent: "center", marginBottom: "15px", marginTop: "5px"  }}>
            {Array.from({ length: Math.ceil(records.length / recordsPerPage) }).map(
            (item, index) => (
                <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
                >
                {index + 1}
                </Pagination.Item>
            )
            )}
        </Pagination>
          </CardBody>
        </Card>
        <Modal show={AddData} className= "modal-md" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:'bold'}}>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                           <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>item Name</Form.Label>
                            <Form.Control type="varchar" name="itemName" id="itemName" placeholder="" value={modalData.itemName} onChange={e=>setModalData({...modalData,itemName:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>submitData(modalData)} >
                    Save
                    </Button>
                </Modal.Footer>
        </Modal>

        <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitData}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputup1">
                            <Form.Label>_id</Form.Label>
                            <Form.Control type="varchar" placeholder="" value={modalData._id} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextareaup1">
                            <Form.Label>item Name</Form.Label>
                            <Form.Control as="textarea" rows={3} name='itemName' value={modalData.itemName} onChange={e=>setModalData({...modalData,itemName:e.target.value}) } />
                        </Form.Group>         
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>updateData(modalData)} >
                    Update
                    </Button>
                </Modal.Footer>
        </Modal>

      </GridItem>
    </GridContainer>
  );
}

