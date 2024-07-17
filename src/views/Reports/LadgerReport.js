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
import {useState,useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {FaPrint} from 'react-icons/fa'; 
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
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

export default function LadgerReport() {
  const classes = useStyles();
  const [records ,setRecodes] = useState([]);
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [modalData , setModalData] = useState({
   startDate:"",
   endDate:"",
   partyName:""
})
// const [searchResults, setSearchResults] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  useEffect(()=>{
    axios.get('http://13.127.182.122:5004/bills/getAllBillsGroupBy').then(res=>{
        setRecodes(res.data.data)
    })
  },[])
  function getFormattedDate(dateString) {
    if (!dateString) return 'N/A'; // Return 'N/A' if dateString is falsy

    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
  const handlePrint = (partyName) => {
    axios.get(`http://13.127.182.122:5004/bills/getLadgerBillById?partyName=${partyName}`).then((res)=>{
        const billData = res.data.data;
            console.log("93",res)
            const htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ledger Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #dddddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .total-row {
                    background-color: #e0e0e0;
                    font-weight: bold;
                }
                .header-container {
                    text-align: center;
                    margin-bottom: 0px; /* Add spacing below the header */
                }
            </style>
            </head>
            <body>
            <div class="header-container">
            <p style="margin: 3px;font-weight:bold"> ${billData[0].partyName}</p>
            <p style="margin: 3px;">Mob No.: ${billData[0].partyMobileNumber}</p>
            <p style="margin: 3px;font-weight:bold">LEDGER</p>
            <p style="margin: 3px;">(From ${getFormattedDate(billData[0].createdAt)} TO ${getFormattedDate(billData[billData.length - 1].createdAt)})</p>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                ${billData.map((entry, index) => {
                    const advance = parseFloat(entry.advance) || 0;
                    const total11 = parseFloat(entry.Total11) || 0;
                    const balance = total11 - advance;
                    const createdAt = entry.createdAt ? new Date(entry.createdAt).toISOString().split('T')[0] : '0'; // Formatting date
                    return (
                        `<tr key=${index}>
                        <td style="font-size: 13px;">${createdAt}</td>
                        <td style="font-size: 13px;">${advance.toFixed(2) || '0'}</td>
                        <td style="font-size: 13px;">${total11.toFixed(2) || '0'}</td>
                        <td style="font-size: 13px;">${balance.toFixed(2) || '0'}</td>
                    </tr>`
                    );
                }).join('')}
                <tr class="total-row">
                    <td colspan="3">Total</td>
                    <td>${billData.reduce((total, entry) => total + (parseFloat(entry.Total11) || 0) - (parseFloat(entry.advance) || 0), 0).toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
            </body>
            </html>`;            
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

  const submitData = (dataToSend) => {
        axios.post('http://13.127.182.122:5004/bills/search', dataToSend)
            .then((response) => {
                setRecodes(response.data.data);
                setModalData({
                    partyName:""
                })
            })
            .catch((error) => {
                alert("Something Wrong", error);
            });

};


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
                Ladger Report
            </h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
          <Form>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Label style={{ fontWeight: 'bold', margin: 0, marginRight: '10px' }}>Party Name:</Form.Label>
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
        <Button variant="primary" style={{marginLeft:"10px"}} onClick={()=>submitData(modalData)} >
                    Search
        </Button>
        </Form.Group>
    </div>
</Form>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID","Party Name","Print"]}
            tableData={currentRecords.map((item, index) => ([
              index + 1,
              item.partyName,
              <Button variant="danger" key={`print-${index}`} onClick={() => handlePrint(item.partyName)}><FaPrint /></Button>
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
    
      </GridItem>
    </GridContainer>
  );
}
