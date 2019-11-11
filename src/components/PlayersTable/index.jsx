import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash'
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let sortedStats
  const sortData = (category) => {
    switch (category) {
      case 'Team':
        setStats(orderBy(playerData, 'Team', ['asc']))
        break;
      case 'Pos':
        setStats(orderBy(playerData, 'Pos', ['asc']))
        break;
      case 'Att':
        setStats(orderBy(playerData, 'Att', ['asc']))
        break;
      case 'Att/G':
        setStats(orderBy(playerData, 'Att/G', ['asc']))
        break;
      case 'Yds':
        setStats(orderBy(playerData, 'Yds', ['asc']))
        break;
      case 'TD':
        setStats(orderBy(playerData, 'TD', ['asc']))
        break;
      case 'Lng':
        setStats(orderBy(playerData, 'Lng', ['asc']))
        break;
      case '1st':
        setStats(orderBy(playerData, '1st', ['asc']))
        break;
      case '1st%':
        setStats(orderBy(playerData, '1st%', ['asc']))
        break;
      case '20+':
        setStats(orderBy(playerData, '20+', ['asc']))
        break;
      case '40+':
        setStats(orderBy(playerData, '40+', ['asc']))
        break;
      case 'FUM':
        setStats(orderBy(playerData, 'FUM', ['asc']))
        break;
      default:
        setStats(sortedStats)
    }
  }

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
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Player</TableCell>
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
  );
}

export default PlayersTable
