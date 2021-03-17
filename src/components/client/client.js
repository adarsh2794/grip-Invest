import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Multiselect } from "multiselect-react-dropdown";
import React, { useEffect, useState } from 'react';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#cfd8dc',
    color: 'black',
    font: "15px Arial, sans-serif"
  },
  body: {
    font: "13px Arial, sans-serif"
  },
}))(TableCell);

const SearchBoxStyle = {
  chips: {
    background: "blue"
  },
  searchBox: {
    border: "none",
    "border-bottom": "1px solid blue",
    "border-radius": "0px"
    
  },
  multiselectContainer: {
    color: "blue",
    width: "300px",
    fontSize: 10
    
  }
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(surname, name, country, firstContact, email, sold, owner,asset_type) {
  return { surname, name, country, firstContact, email, sold, owner,asset_type };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Clients = inject("CRMStores")(observer((props) => {
  
  //Sets the relevant clients in the state and then updates the state by calling setRelevantClients
  
  const [relevantClients, setRelevantClients] = useState([...props.CRMStores?.clients])
  const [searchParamters, setSearchParameters] = useState([...props.CRMStores?.searchParamters])
  
  /**
  * Use effect is called when render is completed and we want to update anything after that
  */
  
  
  useEffect(() => {
    resetData()
  }, [])
  
  const rows = relevantClients && relevantClients.map(c => {
    return (createData(
      c.last, c.first, c.country_name, c.date, c.email, c.sold, c.owner,c.asset_type))
    })
    
    const resetData = async () => {
      await props.CRMStores.getClients()
      setRelevantClients(props.CRMStores.clients)
      console.log(relevantClients)
    }
    
    const searchData = async (selectedList) => {
      await props.CRMStores.getSearchedClients(selectedList)
      setRelevantClients(props.CRMStores.clients)
      console.log(relevantClients)
    }
    
    function onSelectOrRemove(selectedList, selectedItem) {
      
      if(selectedList.length==0)
      {
        resetData()
      }
      else
      {
        searchData(selectedList)
      }
      
    }
    
    const classes = useStyles();
    return (
      <div><Multiselect
      options={searchParamters}
      isObject={true}
      displayValue="value"
      groupBy="key"
      showCheckbox={true}
      style = {SearchBoxStyle}
      onSelect={onSelectOrRemove} // Function will trigger on select event
      onRemove={onSelectOrRemove}
      />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
      <TableHead>
      <TableRow>
      <StyledTableCell align="center">Client Name</StyledTableCell>
      <StyledTableCell align="center">Client Email</StyledTableCell>
      <StyledTableCell align="center">Country</StyledTableCell>
      <StyledTableCell align="center">Asset Type</StyledTableCell>
      <StyledTableCell align="center">Mediator</StyledTableCell>
      <StyledTableCell align="center">Owner Company</StyledTableCell>
      <StyledTableCell align="center">Purchase Date</StyledTableCell>
      <StyledTableCell align="center">Sold Date</StyledTableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {rows.length && rows.map((row) => (
        <StyledTableRow >
        <StyledTableCell align="center">{row.surname} {row.name}</StyledTableCell>
        <StyledTableCell align="center">{row.email}</StyledTableCell>
        <StyledTableCell align="center">{row.country}</StyledTableCell>
        <StyledTableCell align="center">{row.asset_type}</StyledTableCell>
        <StyledTableCell align="center">GRIP INVEST</StyledTableCell>
        <StyledTableCell align="center">{row.owner}</StyledTableCell>
        <StyledTableCell align="center">{row.firstContact}</StyledTableCell>
        <StyledTableCell align="center">-</StyledTableCell>
        </StyledTableRow>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
        )
      }))
      
      export default Clients
