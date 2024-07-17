import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import {useState,useEffect } from 'react';
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [records ,setRecodes] = useState([]);
  const [allBills ,setAllBills] = useState([]);
  const [totalAmount ,setTotalAmount] = useState([]);
  const [completedBills ,setCompletedBills] = useState([]);
  useEffect(()=>{
    axios.get('http://13.127.182.122:5004/bills/getPendingBillsCount').then(res=>{
        setRecodes(res.data)
    });
    axios.get('http://13.127.182.122:5004/bills/getCompletedBillsAmount').then(res=>{
      setTotalAmount(res.data)
  });
  axios.get('http://13.127.182.122:5004/bills/getAllBillsCount').then(res=>{
    setAllBills(res.data)
});
axios.get('http://13.127.182.122:5004/bills/getCompletedBillsCount').then(res=>{
  setCompletedBills(res.data)
});
  },[])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Bills</p>
              <h3 className={classes.cardTitle}>
              {allBills.data} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {/* Get more space */}
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Total Bills Amount</p>
              <p className={classes.cardTitle}>{totalAmount.data && <h3 className={classes.cardTitle}>{totalAmount.data.toFixed(2)}</h3>}</p>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {/* Last 24 Hours */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Pending Bills</p>
              <h3 className={classes.cardTitle}>{records.data}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Completed Bills</p>
              <h3 className={classes.cardTitle}>{completedBills.data}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
