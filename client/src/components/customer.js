import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './customerDelete';

class Customer extends React.Component{
  render(){
    return(
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt="profiles"/></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.dob}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
      </TableRow>      
    );
  }
}

export default Customer;