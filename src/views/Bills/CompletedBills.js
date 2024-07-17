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
import moment from 'moment-timezone';
const IST_FORMAT = 'YYYY-MM-DD';
import Button from 'react-bootstrap/Button';
import {FaPrint} from 'react-icons/fa'; 
import { Pagination } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

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

export default function CompletedBills() {
  const classes = useStyles();
  const [records ,setRecodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const [modalData , setModalData] = useState({
    partyName:"",
})
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
const convertUTCToIST = (utcDateTime) => {
    return moment.utc(utcDateTime).tz('Asia/Kolkata').format(IST_FORMAT);
  };
  useEffect(()=>{
    axios.get('http://13.127.182.122:5004/bills/getCompletedBills').then(res=>{
        setRecodes(res.data.data)
    })
  },[])
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

const handlePrint = (_id) => {
    axios.get(`http://13.127.182.122:5004/bills/getBillById?id=${_id}`).then((res)=>{
        const billData = res.data.data;
        if(billData.withGST === "Yes"){
            const htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 420px; /* Adjusted max-width for A5 size */
                    margin: 20px auto;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }
                .company-logo {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                .header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                }
                .header img {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                table, th, td {
                    border: 1px solid #ccc;
                }
                th, td {
                    padding: 2px; /* Adjusted padding for smaller cells */
                    text-align: left;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                }
                .footer div {
                    width: 48%;
                    padding: 5px; /* Adjusted padding for smaller cells */
                    border-radius: 5px;
                }
                .client_name, .company-address, .table-text, .one {
                    font-size: 8px !important; /* Adjusted font size for smaller text */
                }
                .company-QUOTATION {
                    font-weight: bold;
                    font-size: 12px; /* Adjusted font size for A5 size */
                }
                .address {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px; /* Adjusted margin for smaller space */
                }
                .date {
                    text-align: right;
                }
                h3, h5 {
                    margin: 0; /* Removed margin-top styles */
                }
            </style>
            </head>
            <body>
            <div class="container">
                
                <div class="header">
                    <table>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px; padding-top:1px">${billData.partyMobileNumber || "-"}</h3>
                                <h5 style="font-size: 10px;">Vikas Nagar, <br>At Post: Ichalkaranji, Tal: Hathkanagale <br>Dist: Kolhapur<br>Mob No: 8421866684<br>State Name: Maharashtra, Code: 27</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-bottom:3px;">Buyer<br>Vikas Kalagraha<br>Ichalkaranji, Mob: 8421866684<br>State Name: Maharashtra, Code: 27</h3>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td style="font-size: 10px;">Invoice: ${billData.invoiceNumber}</td>
                            <td style="font-size: 10px;">Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Delivery Note: ABC</td>
                            <td style="font-size: 10px;">Mode/Terms of Payment: Online</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Buyer's Order No: 123456</td>
                            <td style="font-size: 10px;">Dated:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Document No: 123456</td>
                            <td style="font-size: 10px;">Delivery Note Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Through: Currier</td>
                            <td style="font-size: 10px;">Destination: Ichalkaranji</td>
                        </tr>
                    </table>
                </div>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
                <thead>
                <tr>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">HSN / SAC : ${billData.HSN_SAC || ""}</th>
                </tr>
                </thead>
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Particular</th>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Sq Ft</th>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Rate</th>
                            <th style="border: 1px solid #ccc; font-size: 10px; text-align:center">Amount</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.parti1 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.sq1 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.rate1 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.Total1 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti2 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq2 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate2 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total2 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti3 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq3 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate3 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total3 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc; border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti4 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq4 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate4 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total4 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti5 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq5 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate5 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total5 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti6 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq6 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate6 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total6 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti7 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq7 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate7 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total7 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti8 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq8 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate8 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total8 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti9 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq9 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate9 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total9 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti10 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq10 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate10 || "-"}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total10 || "-"}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"></td>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"><td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center"><h3>Total GST</h3></td></td>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center ">${billData.GSTAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ccc; border-right: none;"></td>
                                <td style="border: 1px solid #ccc; border-right: none;"><td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center"><h3>Total Amount</h3></td></td>
                                <td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center">${billData.Total11}</td>
                            </tr>
                    </tbody>
                </table>
                <hr>
                <div>
                    <p class="one">1- All Taxes (GST 18%) will Be Extra.</p>
                    <p class="one">2- Transportation/Travelling Charges Will Be Extra At Actual.</p>
                    <p class="one" style="color: red;">3- Payment 60% Advance & 40% After Delivery.</p>
                </div>
                <div class="footer">
                    <table class="table-text">
                        <tbody>
                            <tr>
                                <td>Bank Details</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                   VIKAS KALAGRUHA <br> G.P.PARSIK SAHAKARI BANK LTD.ICHALKARANJI<br>IFSC - PJSB0000201 <br>ACCOUNT NO - 029011300010368 <br>GSTIN NO - 2DSFDSFSDF545
                                </td>
                                <td>For, VIKAS KALAGRUHA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </body>
            </html><br><br><br><br><br><br><br><br>`
            const htmlContent1 = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 420px; /* Adjusted max-width for A5 size */
                    margin: 20px auto;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }
                .company-logo {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                .header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                }
                .header img {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                table, th, td {
                    border: 1px solid #ccc;
                }
                th, td {
                    padding: 2px; /* Adjusted padding for smaller cells */
                    text-align: left;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                }
                .footer div {
                    width: 48%;
                    padding: 5px; /* Adjusted padding for smaller cells */
                    border-radius: 5px;
                }
                .client_name, .company-address, .table-text, .one {
                    font-size: 8px !important; /* Adjusted font size for smaller text */
                }
                .company-QUOTATION {
                    font-weight: bold;
                    font-size: 12px; /* Adjusted font size for A5 size */
                }
                .address {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px; /* Adjusted margin for smaller space */
                }
                .date {
                    text-align: right;
                }
                h3, h5 {
                    margin: 0; /* Removed margin-top styles */
                }
            </style>
            </head>
            <body>
            <div class="container">
                
                <div class="header">
                    <table>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px; padding-top:1px">${billData.partyMobileNumber || "-"}</h3>
                                <h5 style="font-size: 10px;">Vikas Nagar, <br>At Post: Ichalkaranji, Tal: Hathkanagale <br>Dist: Kolhapur<br>Mob No: 8421866684<br>State Name: Maharashtra, Code: 27</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-bottom:3px;">Buyer<br>Vikas Kalagraha<br>Ichalkaranji, Mob: 8421866684<br>State Name: Maharashtra, Code: 27</h3>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td style="font-size: 10px;">Invoice: ${billData.invoiceNumber}</td>
                            <td style="font-size: 10px;">Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Delivery Note: ABC</td>
                            <td style="font-size: 10px;">Mode/Terms of Payment: Online</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Buyer's Order No: 123456</td>
                            <td style="font-size: 10px;">Dated:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Document No: 123456</td>
                            <td style="font-size: 10px;">Delivery Note Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Through: Currier</td>
                            <td style="font-size: 10px;">Destination: Ichalkaranji</td>
                        </tr>
                    </table>
                </div>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
                <thead>
                <tr>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">HSN / SAC : ${billData.HSN_SAC || "-"}</th>
                </tr>
                </thead>
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Particular</th>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Sq Ft</th>
                            <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Rate</th>
                            <th style="border: 1px solid #ccc; font-size: 10px; text-align:center">Amount</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.parti1 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.sq1 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.rate1 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.Total1 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti2 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq2 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate2 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total2 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti3 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq3 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate3 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total3 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc; border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti4 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq4 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate4 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total4 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti5 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq5 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate5 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total5 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti6 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq6 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate6 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total6 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti7 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq7 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate7 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total7 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total8 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate8 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total8 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti9 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq9 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate9 || ""}</td>
                                <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total9 || ""}</td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"></td>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"><td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center"><h3>Total GST</h3></td></td>
                                <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center ">${billData.GSTAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ccc; border-right: none;"></td>
                                <td style="border: 1px solid #ccc; border-right: none;"><td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center"><h3>Total Amount</h3></td></td>
                                <td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center">${billData.Total11}</td>
                            </tr>
                    </tbody>
                </table>
                <hr>
                <div>
                    <p class="one">1- All Taxes (GST 18%) will Be Extra.</p>
                    <p class="one">2- Transportation/Travelling Charges Will Be Extra At Actual.</p>
                    <p class="one" style="color: red;">3- Payment 60% Advance & 40% After Delivery.</p>
                </div>
                <div class="footer">
                    <table class="table-text">
                        <tbody>
                            <tr>
                                <td>Bank Details</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                   VIKAS KALAGRUHA <br> G.P.PARSIK SAHAKARI BANK LTD.ICHALKARANJI<br>IFSC - PJSB0000201 <br>ACCOUNT NO - 029011300010368 <br>GSTIN NO - 2DSFDSFSDF545
                                </td>
                                <td>For, VIKAS KALAGRUHA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </body>
            </html>`
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Write content to the iframe
            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.write(htmlContent1);
            iframeDoc.close();
          
            // Print the iframe content
            iframe.contentWindow.print();
          }else{
            const htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 420px; /* Adjusted max-width for A5 size */
                    margin: 20px auto;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }
                .company-logo {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                .header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                }
                .header img {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                table, th, td {
                    border: 1px solid #ccc;
                }
                th, td {
                    padding: 2px; /* Adjusted padding for smaller cells */
                    text-align: left;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                }
                .footer div {
                    width: 48%;
                    padding: 5px; /* Adjusted padding for smaller cells */
                    border-radius: 5px;
                }
                .client_name, .company-address, .table-text, .one {
                    font-size: 8px !important; /* Adjusted font size for smaller text */
                }
                .company-QUOTATION {
                    font-weight: bold;
                    font-size: 12px; /* Adjusted font size for A5 size */
                }
                .address {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px; /* Adjusted margin for smaller space */
                }
                .date {
                    text-align: right;
                }
                h3, h5 {
                    margin: 0; /* Removed margin-top styles */
                }
            </style>
            </head>
            <body>
            <div class="container">
                
                <div class="header">
                    <table>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-top:1px">${billData.partyMobileNumber || "-"}</h3>
                                <h5 style="font-size: 10px;">Vikas Nagar, <br>At Post: Ichalkaranji, Tal: Hathkanagale <br>Dist: Kolhapur<br>Mob No: 8421866684<br>State Name: Maharashtra, Code: 27</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-bottom:3px;">Buyer<br>Vikas Kalagraha<br>Ichalkaranji, Mob: 8421866684<br>State Name: Maharashtra, Code: 27</h3>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td style="font-size: 10px;">Invoice No: 123</td>
                            <td style="font-size: 10px;">Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Delivery Note: ABC</td>
                            <td style="font-size: 10px;">Mode/Terms of Payment: Online</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Buyer's Order No: 123456</td>
                            <td style="font-size: 10px;">Dated:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Document No: 123456</td>
                            <td style="font-size: 10px;">Delivery Note Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Through: Currier</td>
                            <td style="font-size: 10px;">Destination: Ichalkaranji</td>
                        </tr>
                    </table>
                </div>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
                <thead>
                <tr>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">Invoice No : ${billData.invoiceNumber || ""}</th>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">HSN / SAC : ${billData.HSN_SAC || ""}</th>
                </tr>
                </thead>
                <thead>
                    <tr>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Particular</th>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Sq Ft</th>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Rate</th>
                        <th style="border: 1px solid #ccc; font-size: 10px; text-align:center">Amount</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.parti1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.sq1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.rate1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.Total1 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total2 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total3 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc; border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total4 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total5 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total6 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total7 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total8 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total9 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total10 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"></td>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"><td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center"><h3>Total GST</h3></td></td>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center ">${billData.GSTAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ccc; border-right: none;"></td>
                            <td style="border: 1px solid #ccc; border-right: none;"><td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center"><h3>Total Amount</h3></td></td>
                            <td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center">${billData.Total11}</td>
                        </tr>
                </tbody>
            </table>
                <hr>
                <div>
                    <p class="one">1- All Taxes (GST 18%) will Be Extra.</p>
                    <p class="one">2- Transportation/Travelling Charges Will Be Extra At Actual.</p>
                    <p class="one" style="color: red;">3- Payment 60% Advance & 40% After Delivery.</p>
                </div>
            </div>
            </body>
            </html><br><br><br><br><br><br><br><br><br><br><br>`;
            const htmlContent1 = `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 420px; /* Adjusted max-width for A5 size */
                    margin: 20px auto;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }
                .company-logo {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                .header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                }
                .header img {
                    max-width: 100%; /* Adjusted max-width to ensure responsiveness */
                    height: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                table, th, td {
                    border: 1px solid #ccc;
                }
                th, td {
                    padding: 2px; /* Adjusted padding for smaller cells */
                    text-align: left;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                }
                .footer div {
                    width: 48%;
                    padding: 5px; /* Adjusted padding for smaller cells */
                    border-radius: 5px;
                }
                .client_name, .company-address, .table-text, .one {
                    font-size: 8px !important; /* Adjusted font size for smaller text */
                }
                .company-QUOTATION {
                    font-weight: bold;
                    font-size: 12px; /* Adjusted font size for A5 size */
                }
                .address {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px; /* Adjusted margin for smaller space */
                }
                .date {
                    text-align: right;
                }
                h3, h5 {
                    margin: 0; /* Removed margin-top styles */
                }
            </style>
            </head>
            <body>
            <div class="container">
                
                <div class="header">
                    <table>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-top:1px">${billData.partyMobileNumber || "-"}</h3>
                                <h5 style="font-size: 10px;">Vikas Nagar, <br>At Post: Ichalkaranji, Tal: Hathkanagale <br>Dist: Kolhapur<br>Mob No: 8421866684<br>State Name: Maharashtra, Code: 27</h5>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 style="font-size: 10px;padding-bottom:3px;">Buyer<br>Vikas Kalagraha<br>Ichalkaranji, Mob: 8421866684<br>State Name: Maharashtra, Code: 27</h3>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td style="font-size: 10px;">Invoice No: 123</td>
                            <td style="font-size: 10px;">Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Delivery Note: ABC</td>
                            <td style="font-size: 10px;">Mode/Terms of Payment: Online</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Buyer's Order No: 123456</td>
                            <td style="font-size: 10px;">Dated:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Document No: 123456</td>
                            <td style="font-size: 10px;">Delivery Note Date:  ${new Date(billData.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric'  })}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 10px;">Despatch Through: Currier</td>
                            <td style="font-size: 10px;">Destination: Ichalkaranji</td>
                        </tr>
                    </table>
                </div>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
                <thead>
                <tr>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">Invoice No : ${billData.invoiceNumber || ""}</th>
                    <th style="border: 1px solid #ccc;  font-size: 10px;border-right: none;">HSN / SAC : ${billData.HSN_SAC || ""}</th>
                </tr>
                </thead>
                <thead>
                    <tr>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Particular</th>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Sq Ft</th>
                        <th style="border: 1px solid #ccc; border-right: none; font-size: 10px;text-align:center">Rate</th>
                        <th style="border: 1px solid #ccc; font-size: 10px; text-align:center">Amount</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.parti1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.sq1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.rate1 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc; font-size: 10px; text-align:center">${billData.Total1 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate2 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total2 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate3 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total3 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc; border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate4 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total4 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate5 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total5 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate6 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total6 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate7 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total7 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate8 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total8 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate9 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total9 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.parti10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.sq10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.rate10 || "-"}</td>
                            <td style="border-right: 1px solid #ccc;border: none; border-left: 1px solid #ccc;font-size: 10px; text-align:center">${billData.Total10 || "-"}</td>
                        </tr>
                        <tr>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"></td>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;"><td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center"><h3>Total GST</h3></td></td>
                            <td style="border-right: 1px solid #ccc; border-left: 1px solid #ccc;font-size: 10px; text-align:center ">${billData.GSTAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ccc; border-right: none;"></td>
                            <td style="border: 1px solid #ccc; border-right: none;"><td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center"><h3>Total Amount</h3></td></td>
                            <td style="border: 1px solid #ccc; border-right: none;font-size: 10px;text-align:center">${billData.Total11}</td>
                        </tr>
                </tbody>
            </table>
                <hr>
                <div>
                    <p class="one">1- All Taxes (GST 18%) will Be Extra.</p>
                    <p class="one">2- Transportation/Travelling Charges Will Be Extra At Actual.</p>
                    <p class="one" style="color: red;">3- Payment 60% Advance & 40% After Delivery.</p>
                </div>
            </div>
            </body>
            </html>`;
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Write content to the iframe
            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(htmlContent);
            iframeDoc.write(htmlContent1);
            iframeDoc.close();
          
            // Print the iframe content
            iframe.contentWindow.print();
          }
},[]);
  };
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
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Completed Bills
            </h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["ID", "Invoice No","Party Name", "Number","Amount","Quotation Status","Created Date","Print"]}
            tableData={currentRecords.map((item, index) => ([
              index + 1,
              item.invoiceNumber,
              item.partyName,
              item.partyMobileNumber,
              item.Total11,
              item.billStatus,
              convertUTCToIST(item.createdAt),
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
    
      </GridItem>
    </GridContainer>
  );
}
