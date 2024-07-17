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
import { FaEdit ,FaPrint,FaEye} from 'react-icons/fa'; 
import Form from 'react-bootstrap/Form';
import {useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import jwt from 'jsonwebtoken';


// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment-timezone';
import { Pagination } from "react-bootstrap";
const IST_FORMAT = 'YYYY-MM-DD';
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
  const [records ,setRecodes] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items ,setItems] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [relatedItems1, setRelatedItems1] = useState([]);
  const [relatedItems2, setRelatedItems2] = useState([]);
  const [relatedItems3, setRelatedItems3] = useState([]);
  const [relatedItems4, setRelatedItems4] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
  const [showUpdate , setShowUpdate] = useState(false)
  const [modalData , setModalData] = useState({
    PO_no:"",
    Line_Item_No:"",
    Challan_No:"",
    Vehicle_No:"",
    Material_Code1:"",
    Material_Code2:"",
    Material_Code3:"",
    Material_Code4:"",
    Material_Code5:"",
    Material_TCode1:"",
    Material_TCode2:"",
    Material_TCode3:"",
    Material_TCode4:"",
    Material_TCode5:"",
    Quantity1:"",
    Quantity2:"",
    Quantity3:"",
    Quantity4:"",
    Quantity5:"",
    RQuantity1:"",
    RQuantity2:"",
    RQuantity3:"",
    RQuantity4:"",
    RQuantity5:"",
    TQuantity1:"",
    TQuantity2:"",
    TQuantity3:"",
    TQuantity4:"",
    TQuantity5:""
})
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

const convertUTCToIST = (utcDateTime) => {
    return moment.utc(utcDateTime).tz('Asia/Kolkata').format(IST_FORMAT);
  };

// const handleDelete = (_id)=>{
//     const token = localStorage.getItem('user');
//     axios.get(`http://13.127.182.122:5004/bills/deleteBillById?id=${_id}`).then(res=>{
//       alert("Can You Delete This Bill",res);
//       axios.get('http://13.127.182.122:5004/bills/getAllBills', null,{
//         headers: {
//           Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
//         }
//       }).then(res => {
//         setRecodes(res.data.data);
//       });
//     })
//   }

  const handleViewImage = (item) => {
    setSelectedItem(item);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedItem(null);
  };
  useEffect(()=>{
        const token = localStorage.getItem('user');
        axios.post('http://13.127.182.122:5004/bills/getAllBills', null,{
            headers: {
            Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
            }
        }).then(res=>{
            setRecodes(res.data.data)
        })
        axios.post('http://13.127.182.122:5004/items/getAllItem').then(res=>{
            setItems(res.data.data)
        })
  },[])

  const handleMaterialCode1Change = (e) => {
    const selectedValue = e.target.value;
    setModalData({ ...modalData, Material_Code1: selectedValue })
      // Fetch related data for the second select box (Material_Code2) based on the selected value's ID
      axios.get(`http://13.127.182.122:5004/itemsCode/relatedItem?materialCode=${selectedValue}`)
        .then(response => {setRelatedItems(response.data.data),[]})    
  };
  const handleMaterialCode1Change1 = (e) => {
    const selectedValue = e.target.value;
    setModalData({ ...modalData, Material_Code2: selectedValue })
      // Fetch related data for the second select box (Material_Code2) based on the selected value's ID
      axios.get(`http://13.127.182.122:5004/itemsCode/relatedItem?materialCode=${selectedValue}`)
        .then(response => {setRelatedItems1(response.data.data),[]})    
  };
  const handleMaterialCode1Change2 = (e) => {
    const selectedValue = e.target.value;
    setModalData({ ...modalData, Material_Code3: selectedValue })
      // Fetch related data for the second select box (Material_Code2) based on the selected value's ID
      axios.get(`http://13.127.182.122:5004/itemsCode/relatedItem?materialCode=${selectedValue}`)
        .then(response => {setRelatedItems2(response.data.data),[]})    
  };
  const handleMaterialCode1Change3 = (e) => {
    const selectedValue = e.target.value;
    setModalData({ ...modalData, Material_Code4: selectedValue })
      // Fetch related data for the second select box (Material_Code2) based on the selected value's ID
      axios.get(`http://13.127.182.122:5004/itemsCode/relatedItem?materialCode=${selectedValue}`)
        .then(response => {setRelatedItems3(response.data.data),[]})    
  };
  const handleMaterialCode1Change4 = (e) => {
    const selectedValue = e.target.value;
    setModalData({ ...modalData, Material_Code5: selectedValue })
      // Fetch related data for the second select box (Material_Code2) based on the selected value's ID
      axios.get(`http://13.127.182.122:5004/itemsCode/relatedItem?materialCode=${selectedValue}`)
        .then(response => {setRelatedItems4(response.data.data),[]})    
  };

  const AddNewData = ()=>{
    const token = localStorage.getItem('user');
    const tokenJson = token.slice(1, -1);
    const decoded = jwt.decode(tokenJson);

    setModalData({
        PO_no:decoded.PO_no,
        vendorNo:decoded.vendorNo,
        Line_Item_No:"",
        Challan_No:"",
        Vehicle_No:"",
        Material_Code1:"",
        Material_Code2:"",
        Material_Code3:"",
        Material_Code4:"",
        Material_Code5:"",
        Material_TCode1:"",
        Material_TCode2:"",
        Material_TCode3:"",
        Material_TCode4:"",
        Material_TCode5:"",
        Quantity1:"",
        Quantity2:"",
        Quantity3:"",
        Quantity4:"",
        Quantity5:"",
        RQuantity1:"",
        RQuantity2:"",
        RQuantity3:"",
        RQuantity4:"",
        RQuantity5:"",
        TQuantity1:"",
        TQuantity2:"",
        TQuantity3:"",
        TQuantity4:"",
        TQuantity5:""
      });
    setAddData(true)
}
const handleClose = () => {
  setShowUpdate(false)
  setAddData(false)
  }

  const handlePrint = (_id) => {
    const token = localStorage.getItem('user');
    const tokenJson = token.slice(1, -1);
    const decoded = jwt.decode(tokenJson);
    axios.get(`http://13.127.182.122:5004/bills/getBillById?id=${_id}`).then((res)=>{
        const billData = res.data.data;
          // HTML content to be printed
            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Challan Document</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); position: relative;">
        <img src=${billData.Qr_Code_URL || "-"} alt="QR Code" style="position: absolute; top: 20px; left: 20px; width: 180px; height: 180px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 16px;">DELIVERY CHALLAN</h1>
            <p style="margin: 1px 0;">SUBJECT TO KOLHAPUR JURISDICTION</p>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 30px;">${billData.name || "-"}</h1>
            <p style="margin: 5px 0;">${billData.address || ""}</p>
            <p style="margin: 5px 0;">Mob.${billData.number || ""}</p>
            <p style="margin: 5px 0;">GST No.: <span>${decoded.GST_no || "-"}</span></p>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="flex: 1;">
                <p style="margin: 5px 0;">MENON & MENON LTD</p>
                <p style="margin: 5px 0;">Udyamnagar, Kolhapur</p>
                <p style="margin: 5px 0;">27AAMCM1356L1Z2</p>
            </div>
            <div style="flex: 1; text-align: right;">
                <p style="margin: 5px 0;">Vendor No.: <span>${decoded.vendorNo || "-"}</span></p>
                <p style="margin: 5px 0;">Challan No.: <span>${billData.Challan_No || "-"}</span></p>
                <p style="margin: 5px 0;">P.O.No.: <span>${billData.PO_no || "-"}</span></p>
                <p style="margin: 5px 0;">Date: <span>${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</span></p>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 10px; background-color: #f2f2f2;">Sr. No</th>
                    <th style="border: 1px solid #000; padding: 10px; background-color: #f2f2f2;">Description</th>
                    <th style="border: 1px solid #000; padding: 10px; background-color: #f2f2f2;">Ok.</th>
                    <th style="border: 1px solid #000; padding: 10px; background-color: #f2f2f2;">Rej.</th>
                    <th style="border: 1px solid #000; padding: 10px; background-color: #f2f2f2;">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">1)</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Material_Code1_data || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity1 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity1 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${typeof billData.Quantity1 === 'number' && typeof billData.RQuantity1 === 'number' ? billData.Quantity1 - billData.RQuantity1 : "-"}
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">2)</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Material_Code2_data || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity2 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity2 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${typeof billData.Quantity2 === 'number' && typeof billData.RQuantity2 === 'number' ? billData.Quantity2 - billData.RQuantity2 : "-"}
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">3)</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Material_Code3_data || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity3 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity3 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${typeof billData.Quantity3 === 'number' && typeof billData.RQuantity3 === 'number' ? billData.Quantity3 - billData.RQuantity3 : "-"}
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">4)</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Material_Code4_data || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity4 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity4 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${typeof billData.Quantity4 === 'number' && typeof billData.RQuantity4 === 'number' ? billData.Quantity4 - billData.RQuantity4 : "-"}
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">5)</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Material_Code5_data || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity5 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity5 || "-"}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${typeof billData.Quantity5 === 'number' && typeof billData.RQuantity5 === 'number' ? billData.Quantity5 - billData.RQuantity5 : "-"}
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">Vechicle No :</td>
                    <td style="border: 1px solid #000; padding: 10px;">${billData.Vehicle_No || "-"}<span style="float: right;">Total</span></td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.Quantity1 + billData.Quantity2 + billData.Quantity3 + billData.Quantity4 + billData.Quantity5}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${billData.RQuantity1 + billData.RQuantity2 + billData.RQuantity3 + billData.RQuantity4 + billData.RQuantity5}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                        ${(
                            (billData.Quantity1 || 0) + 
                            (billData.Quantity2 || 0) + 
                            (billData.Quantity3 || 0) + 
                            (billData.Quantity4 || 0) + 
                            (billData.Quantity5 || 0)
                        ) - (
                            (billData.RQuantity1 || 0) + 
                            (billData.RQuantity2 || 0) + 
                            (billData.RQuantity3 || 0) + 
                            (billData.RQuantity4 || 0) + 
                            (billData.RQuantity5 || 0)
                        )}
                        </td>
                </tr>
            </tbody>
        </table>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <div style="text-align: left;">
                <p style="margin: 5px 0;"><span></span></p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 5px 0;"><span></span></p>
                <p style="margin: 5px 0;">For ${billData.name || "-"}</p>
                <p style="margin: 40px 0 0 0;"></p>
            </div>
        </div>
        <div style="text-align: left; margin-top: 20px;">
            <p style="margin: 5px 0;text-align: right;">Proprietor</p>
            <p style="margin: 5px 0;text-align: left;">Receiver Sign.</p>
        </div>
    </div>
</body>
</html>
`
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Write content to the iframe
            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.close();
          
            // Print the iframe content
            iframe.contentWindow.print();
       
},[]);
  };  

  const searchData = (data)=>{
    axios.post('http://13.127.182.122:5004/bills/search', data)
            .then((response) => {
                setRecodes(response.data.data);
                setModalData({
                    partyName:""
                })
            })
  .catch((error) => {
    alert("Something Wrong",error)
  });
}
    const submitData = (data)=>{
        console.log("389",data)
        const token = localStorage.getItem('user');
        axios.post('http://13.127.182.122:5004/bills/addBill', data,{
            headers: {
              Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
            }
          })
      .then((response) => {
        alert("Data Successfully Added", response.data);
        setModalData({
            PO_no:"",
            Line_Item_No:"",
            Challan_No:"",
            Vehicle_No:"",
            Material_Code1:"",
            Material_Code2:"",
            Material_Code3:"",
            Material_Code4:"",
            Material_Code5:"",
            Material_TCode1:"",
            Material_TCode2:"",
            Material_TCode3:"",
            Material_TCode4:"",
            Material_TCode5:"",
            Quantity1:"",
            Quantity2:"",
            Quantity3:"",
            Quantity4:"",
            Quantity5:"",
            RQuantity1:"",
            RQuantity2:"",
            RQuantity3:"",
            RQuantity4:"",
            RQuantity5:"",
            TQuantity1:"",
            TQuantity2:"",
            TQuantity3:"",
            TQuantity4:"",
            TQuantity5:""
          });
        setAddData(false)
        axios.post('http://13.127.182.122:5004/bills/getAllBills',null, {
            headers: {
              Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
            }
          }).then(res => {
          setRecodes(res.data.data);
        });
        
      })
      .catch((error) => {
        alert("Something Wrong",error)
      });
  }

  const updateData = (data)=>{
    const token = localStorage.getItem('user');
    axios.post('http://13.127.182.122:5004/bills/updateBillById', data, {
        headers: {
          Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
        }
      })
  .then((response) => {
    alert("Data Successfully Updated", response.data);
    setShowUpdate(false)
    axios.post('http://13.127.182.122:5004/bills/getAllBills',null, {
        headers: {
          Authorization: `Bearer ${token}` // Prepend 'Bearer ' to the token
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
    axios.get(`http://13.127.182.122:5004/bills/getBillById?id=${_id}`).then((res)=>{
        setModalData(res.data.data)
    },[])
    setShowUpdate(true);
   
}

  return (
    <GridContainer>
          <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Label style={{ fontWeight: 'bold', margin: 0, marginLeft: '15px' }}>Party Name:</Form.Label>
            <Form.Control 
                type="varchar"  
                name="partyName"  
                placeholder="" 
                value={modalData.partyName} 
                onChange={e => setModalData({ ...modalData, partyName: e.target.value })} 
                style={{ flex: 1 }} // Ensure the input takes remaining space
            />
        </Form.Group>
        <Form.Group className="mb-3">
        <Button variant="primary" style={{marginLeft:"10px"}} onClick={()=>searchData(modalData)} >
                    Search
        </Button>
        </Form.Group>
      <Button style={{ marginLeft: "auto", marginRight:'20px'}} className="primary" onClick={()=>AddNewData()} >Add Bill</Button>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              All Bills
            </h4>
            <p className={classes.cardCategoryWhite}>
              
            </p>
          </CardHeader>
          <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID","Name","Number","PO Number","Challan No","Created Date","Edit", "QR Code","Print"]}
            tableData={currentRecords.map((item, index) => ([
              index + 1,
              item.name,
              item.number,
              item.PO_no,
              item.Challan_No,
              convertUTCToIST(item.createdAt),
              <Button variant="warning" key={`edit-${index}`} onClick={() => EditDetails(item._id)}><FaEdit /></Button>,
            //   <Button variant="danger" key={`delete-${index}`} onClick={() => handleDelete(item._id)}><FaEye /></Button>,
            <Button variant="primary" onClick={() => handleViewImage(item)} key={`view-${item._id}`}><FaEye /></Button>,
              <Button variant="danger" key={`print-${index}`} onClick={() => handlePrint(item._id)}><FaPrint /></Button>
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
        <Modal show={AddData} className= "modal-xl"onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:'bold'}}>Create New Invoice</Modal.Title>
                </Modal.Header>
                 <div className='row'>
                <div className='col-md-4'>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Purchase Order Number</Form.Label>
                            <Form.Control type="varchar" name="PO_no" id="PO_no" placeholder="" value={modalData.PO_no} onChange={e=>setModalData({...modalData,PO_no:e.target.value}) } readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label style={{fontWeight:'bold'}}>Material Name</Form.Label>
                        <Form.Select name="Material_Code1" value={modalData.Material_Code1} onChange={handleMaterialCode1Change}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Select name="Material_Code2" value={modalData.Material_Code2} onChange={handleMaterialCode1Change1}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Select name="Material_Code3" value={modalData.Material_Code3} onChange={handleMaterialCode1Change2}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Select name="Material_Code4" value={modalData.Material_Code4} onChange={handleMaterialCode1Change3}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Select name="Material_Code5" value={modalData.Material_Code5} onChange={handleMaterialCode1Change4}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight:'bold'}}>Vendor Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="vendorNo"
                            id="vendorNo"
                            placeholder="vendor Number"
                            value={modalData.vendorNo}
                            readOnly
                        />
                    </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Related Material</Form.Label>
                            <Form.Select
                            name="Material_TCode1"
                            value={modalData.Material_TCode1}
                            onChange={e => setModalData({ ...modalData, Material_TCode1: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                              <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode2"
                            value={modalData.Material_TCode2}
                            onChange={e => setModalData({ ...modalData, Material_TCode2: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems1.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                              <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode3"
                            value={modalData.Material_TCode3}
                            onChange={e => setModalData({ ...modalData, Material_TCode3: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems2.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                               <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode4"
                            value={modalData.Material_TCode4}
                            onChange={e => setModalData({ ...modalData, Material_TCode4: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems3.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                                <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode5"
                            value={modalData.Material_TCode5}
                            onChange={e => setModalData({ ...modalData, Material_TCode5: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems4.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Line Item No</Form.Label>
                            <Form.Control type="varchar" name="Line_Item_No" id="Line_Item_No" placeholder="" value={modalData.Line_Item_No} onChange={e=>setModalData({...modalData,Line_Item_No:e.target.value}) }/>
                        </Form.Group>
                 
                        <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Ok Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.Quantity1} name="Quantity1"  onChange={e=>setModalData({...modalData,Quantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.Quantity2} name="Quantity2"  onChange={e=>setModalData({...modalData,Quantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity3"  placeholder="" value={modalData.Quantity3}  onChange={e=>setModalData({...modalData,Quantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity4"  placeholder="" value={modalData.Quantity4}  onChange={e=>setModalData({...modalData,Quantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity5"  placeholder="" value={modalData.Quantity5}  onChange={e=>setModalData({...modalData,Quantity5:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Challan Number</Form.Label>
                            <Form.Control type="number" name="Challan_No" placeholder="" value={modalData.Challan_No}  onChange={e=>setModalData({...modalData,Challan_No:e.target.value}) } />
                        </Form.Group>
                        <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Rej Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.RQuantity1} name="RQuantity1"  onChange={e=>setModalData({...modalData,RQuantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.RQuantity2} name="RQuantity2"  onChange={e=>setModalData({...modalData,RQuantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity3"  placeholder="" value={modalData.RQuantity3}  onChange={e=>setModalData({...modalData,RQuantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity4"  placeholder="" value={modalData.RQuantity4}  onChange={e=>setModalData({...modalData,RQuantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity5"  placeholder="" value={modalData.RQuantity5}  onChange={e=>setModalData({...modalData,RQuantity5:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 hidden" controlId="exampleForm.ControlInputup1">
                        <Form.Label style={{fontWeight:'bold'}}>Vehicle Number</Form.Label>
                            <Form.Control type="varchar"  name="Vehicle_No"  placeholder="" value={modalData.Vehicle_No} onChange={e=>setModalData({...modalData,Vehicle_No:e.target.value.toUpperCase()}) } />
                        </Form.Group>
                        <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Total Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.Quantity1 - modalData.RQuantity1} name="TQuantity1"  onChange={e=>setModalData({...modalData,TQuantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.Quantity2 - modalData.RQuantity2} name="TQuantity2"  onChange={e=>setModalData({...modalData,TQuantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity3"  placeholder="" value={modalData.Quantity3 - modalData.RQuantity3}  onChange={e=>setModalData({...modalData,TQuantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity4"  placeholder="" value={modalData.Quantity4 - modalData.RQuantity4}  onChange={e=>setModalData({...modalData,TQuantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity5"  placeholder="" value={modalData.Quantity5 - modalData.RQuantity5}  onChange={e=>setModalData({...modalData,TQuantity5:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>submitData(modalData)} >
                    Save
                    </Button>
                </Modal.Footer>
        </Modal>
        <Modal show={showUpdate} className= "modal-xl"onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:'bold'}}>Update Invoice</Modal.Title>
                </Modal.Header>
                <div className='row'>
                <div className='col-md-4'>
                       <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Purchase Order Number</Form.Label>
                            <Form.Control type="varchar" name="PO_no" id="PO_no" placeholder="" value={modalData.PO_no} onChange={e=>setModalData({...modalData,PO_no:e.target.value}) } readOnly/>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" >
                        <Form.Label style={{fontWeight:'bold'}}>Material Name</Form.Label>
                        <Form.Control type="varchar" name="Material_Code1" id="Material_Code1" placeholder="" value={modalData.Material_Code1} onChange={e=>setModalData({...modalData,Material_Code1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Control type="varchar" name="Material_Code2" id="Material_Code2" placeholder="" value={modalData.Material_Code2} onChange={e=>setModalData({...modalData,Material_Code2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Control type="varchar" name="Material_Code3" id="Material_Code3" placeholder="" value={modalData.Material_Code3} onChange={e=>setModalData({...modalData,Material_Code3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Control type="varchar" name="Material_Code4" id="Material_Code4" placeholder="" value={modalData.Material_Code4} onChange={e=>setModalData({...modalData,Material_Code4:e.target.value}) }/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                    <Form.Control type="varchar" name="Material_Code5" id="Material_Code5" placeholder="" value={modalData.Material_Code5} onChange={e=>setModalData({...modalData,Material_Code5:e.target.value}) }/>
                    </Form.Group> */}
                        <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight:'bold'}}>Vendor Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="vendorNo"
                            id="vendorNo"
                            placeholder="vendor Number"
                            value={modalData.vendorNo}
                            readOnly
                        />
                    </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label style={{fontWeight:'bold'}}>Material Name</Form.Label>
                        <Form.Select name="Material_Code1" value={modalData.Material_Code1} onChange={handleMaterialCode1Change}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Select name="Material_Code2" value={modalData.Material_Code2} onChange={handleMaterialCode1Change1}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Select name="Material_Code3" value={modalData.Material_Code3} onChange={handleMaterialCode1Change2}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Select name="Material_Code4" value={modalData.Material_Code4} onChange={handleMaterialCode1Change3}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Select name="Material_Code5" value={modalData.Material_Code5} onChange={handleMaterialCode1Change4}>
                                <option value="">Select an option</option>
                                {items.map(item => (
                                    <option key={item.itemName} value={item._id}>{item.itemName}</option>
                                ))}
                        </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: 'white' }}>.</Form.Label>
                        <Form.Control
                            type="text"
                            name="PO_no"
                            id="PO_no"
                            placeholder=""
                            value={modalData.PO_no}
                            readOnly
                            style={{ borderColor: 'white', color: 'white', backgroundColor: 'transparent' }}
                        />
                    </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Related Material</Form.Label>
                            <Form.Select
                            name="Material_TCode1"
                            value={modalData.Material_TCode1}
                            onChange={e => setModalData({ ...modalData, Material_TCode1: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                              <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode2"
                            value={modalData.Material_TCode2}
                            onChange={e => setModalData({ ...modalData, Material_TCode2: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems1.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                              <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode3"
                            value={modalData.Material_TCode3}
                            onChange={e => setModalData({ ...modalData, Material_TCode3: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems2.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                               <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode4"
                            value={modalData.Material_TCode4}
                            onChange={e => setModalData({ ...modalData, Material_TCode4: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems3.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                                <Form.Group className="mb-3">
                            <Form.Select
                            name="Material_TCode5"
                            value={modalData.Material_TCode5}
                            onChange={e => setModalData({ ...modalData, Material_TCode5: e.target.value })}
                            >
                            <option value="">Select an option</option>
                            {relatedItems4.map(item => (
                                <option key={item.itemCode} value={item.itemCode}>
                                {item.itemCode}
                                </option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Line Item No</Form.Label>
                            <Form.Control type="varchar" name="Line_Item_No" id="Line_Item_No" placeholder="" value={modalData.Line_Item_No} onChange={e=>setModalData({...modalData,Line_Item_No:e.target.value}) }/>
                        </Form.Group>
                 
                        <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.Quantity1} name="Quantity1"  onChange={e=>setModalData({...modalData,Quantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.Quantity2} name="Quantity2"  onChange={e=>setModalData({...modalData,Quantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity3"  placeholder="" value={modalData.Quantity3}  onChange={e=>setModalData({...modalData,Quantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity4"  placeholder="" value={modalData.Quantity4}  onChange={e=>setModalData({...modalData,Quantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="Quantity5"  placeholder="" value={modalData.Quantity5}  onChange={e=>setModalData({...modalData,Quantity5:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{fontWeight:'bold'}}>Challan Number</Form.Label>
                            <Form.Control type="number" name="Challan_No" placeholder="" value={modalData.Challan_No}  onChange={e=>setModalData({...modalData,Challan_No:e.target.value}) } />
                        </Form.Group>
                    </Form>
                    <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Rej Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.RQuantity1} name="RQuantity1"  onChange={e=>setModalData({...modalData,RQuantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.RQuantity2} name="RQuantity2"  onChange={e=>setModalData({...modalData,RQuantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity3"  placeholder="" value={modalData.RQuantity3}  onChange={e=>setModalData({...modalData,RQuantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity4"  placeholder="" value={modalData.RQuantity4}  onChange={e=>setModalData({...modalData,RQuantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="RQuantity5"  placeholder="" value={modalData.RQuantity5}  onChange={e=>setModalData({...modalData,RQuantity5:e.target.value}) }/>
                        </Form.Group>
                </Modal.Body>
                </div>
                <div className='col-md-2'>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 hidden" controlId="exampleForm.ControlInputup1">
                        <Form.Label style={{fontWeight:'bold'}}>Vehicle Number</Form.Label>
                            <Form.Control type="varchar"  name="Vehicle_No"  placeholder="" value={modalData.Vehicle_No} onChange={e=>setModalData({...modalData,Vehicle_No:e.target.value}) } />
                        </Form.Group>
                        <Form.Group className="mb-3" name="" id="" >
                            <Form.Label style={{fontWeight:'bold'}}>Total Quantity</Form.Label>
                            <Form.Control type="number" placeholder="" value={modalData.Quantity1 - modalData.RQuantity1} name="TQuantity1"  onChange={e=>setModalData({...modalData,TQuantity1:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" placeholder="" value={modalData.Quantity2 - modalData.RQuantity2} name="TQuantity2"  onChange={e=>setModalData({...modalData,TQuantity2:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity3"  placeholder="" value={modalData.Quantity3 - modalData.RQuantity3}  onChange={e=>setModalData({...modalData,TQuantity3:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity4"  placeholder="" value={modalData.Quantity4 - modalData.RQuantity4}  onChange={e=>setModalData({...modalData,TQuantity4:e.target.value}) }/>
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="number" name="TQuantity5"  placeholder="" value={modalData.Quantity5 - modalData.RQuantity5}  onChange={e=>setModalData({...modalData,TQuantity5:e.target.value}) }/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>updateData(modalData)} >
                    Update
                    </Button>
                </Modal.Footer>
        </Modal>
        <Modal show={showImageModal} onHide={handleCloseImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <img src={selectedItem.Qr_Code_URL} alt={selectedItem.name} style={{ maxWidth: '100%' }} />
          )}
        </Modal.Body>
      </Modal>
      </GridItem>
    </GridContainer>
  );
}
