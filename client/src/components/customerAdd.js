import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      file: null,
      userName: '',
      dob: '',
      gender: '',
      job: '',
      filename: ''
    }
  }

  handleFormSubmit = (ev)=>{
    ev.preventDefault();
    this.addCusomer()
      .then((response)=>{
        console.log(response.data);
        this.props.stateRefresh(); // 비동기이기 때문에 서버로부터 응답을 받고 나서 갱신하도록 한다.
      });
    this.setState({
      file: null,
      userName: '',
      dob: '',
      gender: '',
      job: '',
      filename: ''
    });
    // this.props.stateRefresh();
    // window.location.reload();
  }

  addCusomer = ()=>{
    const url = 'api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('dob', this.state.dob);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    const config = {
      headers:{
        'content-type': 'multipart/form-data',
      }
    }
    return post(url, formData, config); //axios 라이브러리에 포함되어 있다.
  }

  handleFileChange = (ev) => {
    this.setState({
      file: ev.target.files[0],
      filename: ev.target.value
    });
  }  

  handleValueChange = (ev)=>{
    let nextState = {};
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
  }

  render(){
    return(
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name = "file" file={this.state.file} value = {this.state.filename} onChange={this.handleFileChange} /><br/>
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
        생년월일: <input type="text" name="dob" value={this.state.dob} onChange={this.handleValueChange}/><br/>
        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
        직업: <input type="text" name="job" value={this.state.jobr} onChange={this.handleValueChange}/><br/>
        <button type="submit">고객 추가</button>
      </form>
    );
  }
}

export default CustomerAdd
