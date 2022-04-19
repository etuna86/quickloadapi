import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, ButtonGroup, ToggleButton, Spinner } from "react-bootstrap";
import { axiosAT } from './redux1/actions/index.js';
import DataTable from 'react-data-table-component';

const radios = [
  { name: 'JavaScript', value: 'JavaScript' },
  { name: 'Python', value: 'Python' },
  { name: 'Scala', value: 'Scala' },
];

const arrayRepo = { repositoryid: 0, username: '', description: '', stars: 0, forks: 0, updatedate: 0 }
const columns = [
  {
    id: 'repositoryid',
    name: 'Repository ID',
    selector: row => row.repositoryid,
    sortable: true,
  },
  {
    id: 'repositoryfullname',
    name: 'Repository fullname',
    selector: row => row.full_name,
    sortable: true,
  },
  {
    id: 'repositoryname',
    name: 'Repository name',
    selector: row => row.name,
    sortable: true,
  },
  {
    id: 'language',
    name: 'language',
    selector: row => row.language,
    sortable: true,
  },
  {
    id: 'username',
    name: 'Username',
    selector: row => row.username,
    sortable: true,
  },
  {
    id: 'description',
    name: 'Description',
    selector: row => row.description,
    sortable: true,
  },
  {
    id: 'stars',
    name: 'Stars',
    selector: row => row.stars,
    sortable: true,
  },
  {
    id: 'forks',
    name: 'Forks',
    selector: row => row.forks,
    sortable: true,
  },
  {
    id: 'updatedate',
    name: 'Update Date',
    selector: row => row.updatedate,
    sortable: true,
  },
];


function App() {
  const [repositories, setRepositories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [columnId, setColumnId] = useState('');
  const [cDefaultSortAsc, setCDefaultSortAsc] = useState(false);
  const [radioValue, setRadioValue] = useState('JavaScript');
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('searchdata')) {
      let searchData = JSON.parse(localStorage.getItem('searchdata'));
      setRadioValue(searchData.language);
      setSearchName(searchData.searchname);
      setColumnId(searchData.columnid);
      setCDefaultSortAsc(searchData.cdefaultsortasc);
      getRepositories(`${searchData.searchname} in:name+language:${searchData.language}`)
    } else {
      getRepositories(`all+language:${radioValue}`)
      localStorage.setItem('searchdata', JSON.stringify({ searchname: searchName, language: radioValue, cdefaultsortasc: cDefaultSortAsc, columnid: columnId }))
    }

  }, []);



  async function getRepositories(query) {
    setRepositories([]);
    setDisabledBtn(true);
    await axiosAT
      .get(`/search/repositories?q=${query}`)
      .then((res) => {
        let description = '';
        Object.values(res.data.items).forEach(async resrow => {
          if (JSON.stringify(resrow.description).length > 20)
            description = resrow.description.substr(0, 20);
          else
            description = resrow.description
          setRepositories(repositories => [...repositories, {
            repositoryid: resrow.id,
            full_name: resrow.full_name,
            name: resrow.name,
            language: resrow.language,
            username: resrow.owner.login,
            description: description,
            stars: resrow.stargazers_count,
            forks: resrow.forks_count,
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

  const tableSort = async (column, sortDirection) => {
    let sortAsc = true;
    setColumnId(column.id);
    if (sortDirection == "asc")
      sortAsc = true;
    else
      sortAsc = false;
    setCDefaultSortAsc(sortAsc);
    localStorage.setItem('searchdata', JSON.stringify({ searchname: searchName, language: radioValue, cdefaultsortasc: sortAsc, columnid: column.id }))
  };

  function searchOnChange(e) {
    e.preventDefault();
    setSearchName(e.target.value);
    if (e.target.value == "")
      getRepositories(`all+language:${radioValue}`)
    else
      getRepositories(`${e.target.value} in:name+language:${radioValue}`)
    localStorage.setItem('searchdata', JSON.stringify({ searchname: e.target.value, language: radioValue, cdefaultsortasc: cDefaultSortAsc, columnid: columnId }))
  }

  function radioValueOnChange(e) {
    e.preventDefault();
    setRadioValue(e.target.value);
    if (searchName == "")
      getRepositories(`all+language:${e.target.value}`)
    else
      getRepositories(`${searchName} in:name+language:${e.target.value}`)
    localStorage.setItem('searchdata', JSON.stringify({ searchname: searchName, language: e.target.value, cdefaultsortasc: cDefaultSortAsc, columnid: columnId }))
  }


function GetDataTable(){
  return(
    <DataTable
    columns={columns}
    data={repositories}
    onSort={tableSort}
    defaultSortAsc={cDefaultSortAsc}
    defaultSortFieldId={columnId}
    pagination

  />
  )
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
                  variant={'outline-success'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => radioValueOnChange(e)}
                  disabled={disabledBtn}
                >
                  {disabledBtn ?
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
                <Form.Control type="text" placeholder="Search" value={searchName} onChange={(e) => searchOnChange(e)} />
              </Form.Group>
            </Form>
              <GetDataTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;