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
  const [show, setShow] = useState(false);
  const [showUpdate , setShowUpdate] = useState(false);
  const [records ,setRecodes] = useState([]);
  const [modalData , setModalData] = useState({
    name:"",
    number:""
})
  const AddNewData = ()=>{
    setAddData(true)
}
const handleClose = () => {setShow(false)
  setShowUpdate(false)
  setAddData(false)
  }
  const submitData = (data) => {
    axios.post('http://13.127.182.122:5004/mobileuser/addMobileUser', data)
      .then((response) => {
        alert("Data Successfully Added", response.data);
        setModalData({
          name: "",
          number: ""
        });
        setAddData(false)
        axios.get('http://13.127.182.122:5004/mobileuser/getAllMobileUser').then(res => {
          setRecodes(res.data.data);
        });
        
      })
      .catch((error) => {
        alert("Something Wrong",error)
      });
  };

  const updateData = (data)=>{
    axios.post('http://13.127.182.122:5004/mobileuser/updateUserById', data)
  .then((response) => {
    alert("Data Successfully Updated", response.data);
    setShowUpdate(false)
    axios.get('http://13.127.182.122:5004/mobileuser/getAllMobileUser').then(res => {
      setRecodes(res.data.data);
    });
  })
  .catch((error) => {
    alert("Something Wrong",error)
  });
}

  const EditDetails = (_id)=>{
    axios.get(`http://13.127.182.122:5004/mobileuser/getUserById?id=${_id}`).then((res)=>{
        setModalData(res.data.data)
    },[])
    setShowUpdate(true);

}
const handleDelete = (_id)=>{
  axios.get(`http://13.127.182.122:5004/mobileuser/deleteUserById?id=${_id}`).then(res=>{
    alert("Can You Delete This User",res);
    axios.get('http://13.127.182.122:5004/mobileuser/getAllMobileUser').then(res => {
      setRecodes(res.data.data);
    });
  })
}

useEffect(()=>{
  axios.get('http://13.127.182.122:5004/mobileuser/getAllMobileUser').then(res=>{
      setRecodes(res.data.data)
  })
},[])

  return (
    <GridContainer>
      <Button style={{ marginLeft: "auto", marginRight:'20px'}} className="primary" onClick={()=>AddNewData()} >Add Data</Button>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Users
            </h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID", "Name", "Number","Edit", "Delete"]}
            tableData={records.map((item, index) => ([
              index + 1,
              item.name,
              item.number,
              <Button variant="warning" key={`edit-${index}`} onClick={() => EditDetails(item._id)}><FaEdit /></Button>,
              <Button variant="danger" key={`delete-${index}`} onClick={() => handleDelete(item._id)}><FaTrash /></Button>
            ]))}
          />
          </CardBody>
        </Card>
        <Modal show={AddData} className= "modal-md" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:'bold'}}>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                           <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Name</Form.Label>
                            <Form.Control type="varchar" name="name" id="name" placeholder="" value={modalData.name} onChange={e=>setModalData({...modalData,name:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Number</Form.Label>
                            <Form.Control type="varchar" name="number"  placeholder="Enter Number" value={modalData.number} onChange={e=>setModalData({...modalData,number:e.target.value}) } />
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
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Show Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>_id</Form.Label>
            <Form.Control type="varchar" placeholder="" value={modalData._id} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>ChallengeName</Form.Label>
                <Form.Control as="textarea" rows={3} name='challengeName' value={modalData.challengeName} />
            </Form.Group>
            </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" >
                  Save Changes
                </Button>
              </Modal.Footer>
        </Modal>
        <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Show Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitData}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputup1">
                            <Form.Label>_id</Form.Label>
                            <Form.Control type="varchar" placeholder="" value={modalData._id} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextareaup1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control as="textarea" rows={3} name='name' value={modalData.name} onChange={e=>setModalData({...modalData,name:e.target.value}) } />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputup1">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="varchar" placeholder="" value={modalData.number} />
                        </Form.Group>
                    
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>updateData(modalData)} >
                    
                    Save Changes
                    </Button>
                </Modal.Footer>
        </Modal>

      </GridItem>
    </GridContainer>
  );
}

