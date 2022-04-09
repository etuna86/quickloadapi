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

/*
const settings={
  Username:"etuna86",
  Password:"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"
}*/
var data = JSON.stringify({
  "Username": "etuna86",
  "Password": "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"
});

var config = {
  method: 'get',
  url: '/repositories',
  headers: { 
    'Authorization': 'Basic ZXR1bmE4NjpnaHBfYWk2YWVTYUc0RVczVEJDU3lsVVNLelNEQ0pZZkxsMGlGZW9l', 
    'Content-Type': 'application/json'
  },
  data : data
};


function App() {
  const [repositories, setRepositories] = useState();

  useEffect(() => {
      getRepositories()
     //getStars();
  }, []);

  const columns = [
    {
      name: 'Repository ID',
      selector: row => row.id,
    },
    {
      name: 'Username',
      selector: row => row.owner.login,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Stars',
      selector:    row => getStars(  row.full_name)  ,
    },
    {
      name: 'Forks',
      selector:  row => row.fork,
    },
    {
      name: 'Update Date',
      selector: row => row.updatedate,
    },
  ];
  


  function getRepositories() {
    axios
      .get(`/repositories`,config)
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

  function getStars(fullName){
    console.warn("getUser: ",fullName);
    var language="asdfaf";
    axios
    .get(`repos/${fullName}/languages`,config)
    .then((res) => {
      console.warn("getStars data: ", res.data);
      language="ruby";
    }).catch(
      function (error) {
        console.log('Show error notification!123')
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