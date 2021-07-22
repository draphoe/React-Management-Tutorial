import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hiddeen: {
    display: 'none'
  }
});



class CustomerAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      file: null,
      userName: '',
      dob: '',
      gender: '',
      job: '',
      filename: '',
      open: false
    }
  }

  handleClickOpen=()=>{
    this.setState({
      open: true
    })
  }

  handleClose=()=>{
    this.setState ({
      file: null,
      userName: '',
      dob: '',
      gender: '',
      job: '',
      filename: '',
      open: false
    });
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
      filename: '',
      open: false
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
    const { classes } = this.props;

    return(
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객추가</DialogTitle>
          <DialogContent>
            <input className={classes.hiddeen} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value = {this.state.filename} onChange={this.handleFileChange}></input>
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file"> 
                {this.state.filename === "" ? "프로필 이미지 선택" : this.state.filename}
              </Button>
            </label>            
            <br/>
            <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            <TextField label="생년월일" type="text" name="dob" value={this.state.dob} onChange={this.handleValueChange}/><br/>
            <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            <TextField label="직업" type="text" name="job" value={this.state.jobr} onChange={this.handleValueChange}/><br/>
          </DialogContent>
          <DialogActions>
              <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
              <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerAdd);
