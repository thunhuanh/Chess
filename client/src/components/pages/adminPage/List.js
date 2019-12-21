import React from 'react';
import { Table, Button,Input, Icon } from 'antd';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import config from '../../../config'

export default class List extends React.Component {
  constructor(){
    super();
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data:[],
      searchText: '',
      searchedColumn: '',
    };
    this.token = localStorage.getItem('token_admin')
    this.arrpoint = []
  }
  
  liOnClick = (data, arrpoint) => {
    let id = data.key
    console.log(id)
    console.log(arrpoint)
    this.props.liOnClick(id,arrpoint)
  }

  fetchData = (token) => {
    var headerconfig = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    let url = config.API_URL + '/api/v1/be/account/accounts';
    axios.get(url,headerconfig)
    .then((response) => {
      let data = [];
      for (let i = 0; i < response.data.data.length; i++){
        let temp = {
          key: response.data.data[i].id,
          name: response.data.data[i].name,
          rank: response.data.data[i].Rank,
          point: response.data.data[i].Point,
        }
        data.push(temp);
        this.arrpoint.push(response.data.data[i].Point)
      }
       
      this.setState({
        data: data,
      })
      this.arrpoint.sort();
      console.log(this.arrpoint); 
    })
  .catch(function (error) {
    console.log(error)
    })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  sortPoint = (data) => {
  };

  async componentDidMount(){
    await this.fetchData(this.token); 
  };
 
  render(){
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        ...this.getColumnSearchProps('key'),
        sorter: (a, b) => a.key - b.key,
        sortOrder: sortedInfo.columnKey === 'key' && sortedInfo.order,
        ellipsis: true,
        width: '10%',
        render: (number,record) => (
          <a onClick={() => (this.liOnClick(record,this.arrpoint))}>{number}</a>
        ),
      },

      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        // filteredValue: filteredInfo.name || null,
        // onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
        
      },
      {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
        sorter: (a, b) => a.point - b.point,
        sortOrder: sortedInfo.columnKey === 'point' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        filters: [{ text: 'Bronze', value: 'Bronze' }, { text: 'Silver', value: 'Silver' }, { text: 'Gold', value: 'Gold'}, {text:'Plantium', value:'Plantium'}],
        filteredValue: filteredInfo.rank || null,
        onFilter: (value, record) => record.rank.includes(value),
        sorter: (a, b) => a.rank.length - b.rank.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        ellipsis: true,
      },
      
    ];
    return(
      <div style={{margin:'0 0 0 0'}}>
        <div className="table-operations"  style={{marginBottom:'10px'}}>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}  style={{marginLeft:'10px'}}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
      </div>
    );
  }
}