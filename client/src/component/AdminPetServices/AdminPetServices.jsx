import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../PetServices/PetServices.css";
import Wrapper from "../Wrapper/Wrapper";
import BoardingCard from "../BoardingCard/AdminServiceCard";
import API from "../../utils/API";

const PetServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [zip, setZip] = useState("");
  const [distance, setDistance] = useState("");
  const [dataFromZipcode, setDataFromZipcode] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    API.getClassified()
      .then((res) => {
        setAllServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //----------------- THIS IS THE HANDLE CATEGORY FUNCTION----------------
  const handleCategoryChange = (e) => {
    setDataFromZipcode([]);
    let query = e.target.value; // getting name of selected dropdown
    let display = [];
    setQuery(e.target.value);
    for (let newArray of allServices) {
      if (newArray.category === query) {
        display.push(newArray);
      }
    }
    setFilteredService(display);
  };
  //----------------- THIS IS THE HANDLE ZIP CHANGE FUNCTION----------------
  const handleZipInputChange = (e) => {
    setZip(e.target.value);
  };
  //----------------- THIS IS THE HANDLE DISTANCE CHANGE FUNCTION----------------
  const handleDistanceInputChange = (e) => {
    setDistance(e.target.value);
  };
  //----------------- THIS IS THE HANDLE SUBMIT FUNCTION----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    API.getZipCode(zip, distance, query)
      .then((res) => {
        setDataFromZipcode(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="serviceContainer">
      <Wrapper>
        <div className="newServiceBtn-container">
          <Link to="/NewServiceModal" className="newServiceBtn" id="showModal">
            Create New Service
          </Link>
        </div>
        <form className="serviceForm-container has-text-centered">
          <div className="customDropDown service-input">
            <div className="dropdown select ">
              <select onChange={handleCategoryChange}>
                <option value="0">Select a Service</option>
                <option value="Walker">Walker</option>
                <option value="Boarding">Boarding</option>
                <option value="Sitter">Sitter</option>
              </select>
            </div>
          </div>

          <input
            className="service-input zipcode-input"
            type="number"
            name="zip"
            onChange={handleZipInputChange}
            placeholder="Search by Zipcode"
          />
          <input
            className="service-input distance-input"
            type="number"
            name="distance"
            onChange={handleDistanceInputChange}
            placeholder="50 Miles Radius"
          />

          <button onClick={handleSubmit} className="button searchService">
            <strong>Search</strong>
          </button>
        </form>
        {dataFromZipcode.length > 0
          ? dataFromZipcode.map((serve) => [
              <BoardingCard
                service={serve.category}
                name={serve.name}
                zip={serve.zipCode}
                key={serve._id}
                tel={serve.tel}
                id={serve._id}
                email={serve.email}
              />,
            ])
          : filteredService.length > 0
          ? filteredService.map((serve) => [
              <BoardingCard
                service={serve.category}
                name={serve.name}
                zip={serve.zipCode}
                key={serve._id}
                tel={serve.tel}
                email={serve.email}
                id={serve._id}
              />,
            ])
          : allServices.map((serve) => [
              <BoardingCard
                service={serve.category}
                name={serve.name}
                zip={serve.zipCode}
                key={serve._id}
                tel={serve.tel}
                email={serve.email}
                id={serve._id}
              />,
            ])}
      </Wrapper>
    </div>
  );
};

export default PetServices;
