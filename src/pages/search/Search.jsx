import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Search.css"
import ListView from "./ListView";
import MapView from "./MapView";


const Search = () => {
  const [activeTab, setActiveTab] = useState("list-view");

  return (
    <MainLayout>
      <div className="main-container">
        <h2 className="heading">Search for Events</h2>


        <Tabs className="mb-3 w-50 mx-auto" justify activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          <Tab eventKey="list-view" title="List View" tabClassName="custom-tab"></Tab>
          <Tab eventKey="map-view" title="Map View" tabClassName="custom-tab"></Tab>
        </Tabs>

        {activeTab === "list-view" ? <ListView /> : <MapView />}
      </div>
    </MainLayout>
  );
};

export default Search;