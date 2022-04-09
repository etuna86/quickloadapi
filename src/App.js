import React, { useEffect, useState, useRef } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { axiosAT } from './redux1/actions/index.js';

import DataTable from 'react-data-table-component';
import axios from 'axios';

let customHistory = createBrowserHistory();


const baseURL = "https://teknasyon.myshopify.com";
const AccessToken = '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';
const org = 'ORG';
axios.defaults.baseURL = 'https://api.github.com';

//Repository ID, Username, Description, Stars, Forks, Update Date.
const columns = [
  {
    name: 'Repository ID',
    selector: row => row.id,
  },
  {
    name: 'Username',
    selector: row => row.name,
  },
  {
    name: 'Description',
    selector: row => row.description,
  },
  {
    name: 'Stars',
    selector:  row => row.name ,
  },
  {
    name: 'Forks',
    selector: row => row.fork,
  },
  {
    name: 'Update Date',
    selector: row => row.updatedate,
  },
];


function App() {
  const [repositories, setRepositories] = useState();

  useEffect(() => {
      getRepositories()
     // getStars();
  }, []);




  function getRepositories() {
    axios
      .get(`/repositories`)
      .then((res) => {
        console.warn("res.data.message: ", res.data);
        setRepositories(res.data);
        //setProductdata(res.data.products);
      }).catch(
        function (error) {
          console.log('Show error notification!')
          console.warn(error);
          return Promise.reject(error)
        }
      );

      
  }

  function getStars(getUser){
    console.warn("getUser: ",getUser);
    let language;
    axios
    //.get(`/users/${getUser}/starred`)
    .get(`/users/etuna/starred`)
    .then((res) => {
      console.warn("getStars data: ", res.data);
      language=res.data.language
      //setRepositories(res.data);
      //setProductdata(res.data.products);
    }).catch(
      function (error) {
        console.log('Show error notification!')
        console.warn(error);
        return Promise.reject(error)
      }
    );

      return language;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={repositories}
        pagination
      />
    </>
  );
}

export default App;