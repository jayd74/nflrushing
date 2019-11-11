import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash'
import { CSVLink } from 'react-csv'

import Fab from '@material-ui/core/Fab';
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

  const [order, setOrder] = React.useState('asc');
  const [sortBy, setSortBy] = React.useState('');

  const sortData = (category) => {
    const isDesc = sortBy === category && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setSortBy(category);
    setStats(orderBy(playerData, category, [order]))
  };

  useEffect(() => {
    setStats(playerData)
  }, [])

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
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => sortData('Player')}>Player</TableCell>
            <TableCell align="right" onClick={() => sortData('Team')}>Team</TableCell>
            <TableCell align="right" onClick={() => sortData('Pos')}>Pos</TableCell>
            <TableCell align="right" onClick={() => sortData('Att')}>Att</TableCell>
            <TableCell align="right" onClick={() => sortData('Att/G')}>Att/G</TableCell>
            <TableCell align="right" onClick={() => sortData('Yds')}>Yds</TableCell>
            <TableCell align="right" onClick={() => sortData('TD')}>TD</TableCell>
            <TableCell align="right" onClick={() => sortData('Lng')}>Lng</TableCell>
            <TableCell align="right" onClick={() => sortData('1st')}>1st</TableCell>
            <TableCell align="right" onClick={() => sortData('1st%')}>1st%</TableCell>
            <TableCell align="right" onClick={() => sortData('20+')}>20+</TableCell>
            <TableCell align="right" onClick={() => sortData('40+')}>40+</TableCell>
            <TableCell align="right" onClick={() => sortData('FUM')}>FUM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StatPage stats={stats} rowsPerPage={rowsPerPage} page={page} />
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
          <GetAppIcon />
          Download CSV
      </Fab>
      </CSVLink>
    </>
  );
}

export default PlayersTable
