import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash'
import { CSVLink } from 'react-csv'

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import playerData from '../../assets/rushing.json'

import StatPage from '../StatPage';

const PlayersTable = () => {
  const [stats, setStats] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('');

  const categories = [
    "Player",
    "Team",
    "Pos",
    "Att",
    "Att/G",
    "Yds",
    "Avg",
    "Yds/G",
    "TD",
    "Lng",
    "1st",
    "1st%",
    "20+",
    "40+",
    "FUM"
  ]

  useEffect(() => {
    setStats(playerData)
  }, [])

  const handleSearch = event => {
    const searchParams = event.target.value.toLowerCase()

    const results = playerData.filter(result => {
      const playerName = result["Player"].toLowerCase()
      return playerName.includes(searchParams)
    })

    setStats(results)
  }

  const sortData = (category) => {
    const isDesc = sortBy === category && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setSortBy(category);
    setStats(orderBy(stats, category, [order]))
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, playerData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TextField
        id="standard-search"
        label="Search player"
        type="search"
        margin="normal"
        onChange={handleSearch}
      />
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {categories.map(category => {
              return (
                <TableCell key={category} onClick={() => sortData(category)}>{category}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <StatPage stats={stats} rowsPerPage={rowsPerPage} page={page} categories={categories}/>
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
              count={playerData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      </Table>
      <CSVLink data={stats} filename={"rushing.csv"}>
        <Fab variant="extended" aria-label="download">
          <GetAppIcon /> Download CSV
        </Fab>
      </CSVLink>
    </>
  );
}

export default PlayersTable
