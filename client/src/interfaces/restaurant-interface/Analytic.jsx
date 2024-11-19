import React from "react";
import BackButton from "../../components/BackButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PopularItems from "./analytic-table/PopularItem.component";
import BusiestHours from "./analytic-table/BusyHour.component";
import TotalProfit from "./analytic-table/TotalProfit.component";
import "./Analytic.styles.css"
import { useParams } from "react-router-dom";

const Analytic = () => {
  let {rid} = useParams();

  return (
    <div className="head"> 
      <BackButton />
        <h1 className="text-3xl my-4"> Analytic </h1>
      <div className="analytic">
        

        <TotalProfit rid = {rid}> </TotalProfit>

        <Tabs
          id="tabs"
        >
          <Tab eventKey="pop_items" title="Popular Items">
            <PopularItems rid = {rid}> </PopularItems>
          </Tab>
          <Tab eventKey="busy_hours" title="Busiest Hours">
            <BusiestHours rid = {rid}> </BusiestHours>
          </Tab>
        </Tabs>
        </div>
    </div>
  );
}

export default Analytic;