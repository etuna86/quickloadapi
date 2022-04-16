import React, { useEffect, useState, useRef } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Container, Row, Col,Form, ButtonGroup, ToggleButton,Spinner} from "react-bootstrap";
import { axiosAT } from './redux1/actions/index.js';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { responseInterceptor } from 'http-proxy-middleware';
let customHistory = createBrowserHistory();





axios.defaults.baseURL = 'https://api.github.com';
var data = JSON.stringify({
  "Username": "etuna86",
  "Password": "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"
});

var config = {
  method: 'get',
  headers: {
    'Authorization': 'Basic ZXR1bmE4NjpnaHBfYWk2YWVTYUc0RVczVEJDU3lsVVNLelNEQ0pZZkxsMGlGZW9l',
    'Content-Type': 'application/json'
  },
  data: data
};


function App(props) {
  const [repositories, setRepositories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [stargazersCount, setStargazersCount] = useState(0);
  const [radioValue, setRadioValue] = useState('JavaScript');
  const [disabledBtn, setDisabledBtn] = useState(false);

  const radios = [
    { name: 'JavaScript', value: 'JavaScript' },
    { name: 'Python', value: 'Python' },
    { name: 'Scala', value: 'Scala' },
  ];


  useEffect(() => {
    getRepositories(`all+language:${radioValue}`)

    if(localStorage.getItem('searchdata')){
      let searchData=JSON.parse(localStorage.getItem('searchdata'));
      setRadioValue(searchData.language);
      setSearchName(searchData.searchname);
      console.warn("searchData: ",searchData.language);
    }else{
      localStorage.setItem('searchdata',JSON.stringify({searchname:searchName,language:radioValue}))
    }

  }, []);


  const arrayRepo = { repositoryid: 0, username: '', description: '', stars: 0, forks: 0, updatedate: 0 }

  const columns = [
    {
      name: 'Repository ID',
      selector: row => row.repositoryid,
    },
    {
      name: 'Repository fullname',
      selector: row => row.full_name,
    },
    {
      name: 'Repository name',
      selector: row => row.name,
    },
    {
      name: 'language',
      selector: row => row.language,
    },
    {
      name: 'Username',
      selector: row => row.username,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Stars',
      selector: row => row.stars,
    },
    {
      name: 'Forks',
      selector: row => row.forks,
    },
    {
      name: 'Update Date',
      selector: row => row.updatedate,
    },
  ];

   async function getRepositories(query) {
    setRepositories([]);
    console.warn("query: ",query);
    setDisabledBtn(true);
    await axios
      .get(`/search/repositories?q=${query}`, config)
      .then((res) => {
        let description= '';
        Object.values(res.data.items).forEach(async resrow => {
          if(JSON.stringify(resrow.description).length > 20)
            description=resrow.description.substr(0, 20);
          else
            description=resrow.description
          setRepositories(repositories => [...repositories, {
            repositoryid: resrow.id,
            full_name: resrow.full_name,
            name: resrow.name,
            language: resrow.language,
            username: resrow.owner.login,
            description:  description,
            stars: resrow.stargazers_count,
            forks: resrow.forks_count  ,
            updatedate: resrow.updated_at
          }]);
        })
          setDisabledBtn(false);
 
     
      }).catch(
        function (error) {
          return Promise.reject(error)
        }
      );

    
  }

   function searchOnChange(e){
      e.preventDefault();
      setSearchName(e.target.value);
      if(e.target.value=="")
        getRepositories(`all+language:${radioValue}`)
      else
        getRepositories(`${e.target.value} in:name+language:${radioValue}`)
        localStorage.setItem('searchdata',JSON.stringify({searchname:e.target.value,language:radioValue}))
  }

  function radioValueOnChange(e){
    e.preventDefault();
    setRadioValue(e.target.value);
    if(searchName=="")
      getRepositories(`all+language:${e.target.value}`)
    else
      getRepositories(`${searchName} in:name+language:${e.target.value}`)
      localStorage.setItem('searchdata',JSON.stringify({searchname:searchName,language:e.target.value}))
  }

  return (
    <div>
      <Container>
      <Row className="align-items-center">
        <Col>
          <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-success' }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => radioValueOnChange(e)}
            disabled={disabledBtn}
          >
            { disabledBtn ?
            <Spinner 
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : radio.name
            }
                
          </ToggleButton>
        ))}
      </ButtonGroup>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search</Form.Label>
        <Form.Control type="text" placeholder="Search" value={searchName} onChange={(e)=>searchOnChange(e)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    </Form>
      <DataTable
        columns={columns}
        data={repositories}
        pagination
      />
      </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;