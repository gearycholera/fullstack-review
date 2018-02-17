import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import ListItem from './components/ListItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  renderData(arr) {
    this.setState({repos: arr})
  }

  getData() {
    var that = this;
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        that.renderData(data);
        console.log('success from getData')
      },
      error: function(err) {
        console.log('error with getData')
      }
    })
  }

  search (term) {
    var that = this;
    console.log(`${term} was searched`);
    var obj = {word: term}
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      success: function(data) {
        console.log('successful post to server:');
        console.log(data);
      }, 
      error: function(err) {
        console.log('error with post to server');
        console.log(err);
      }
    })
  }

  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <ListItem repos = {this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));