import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash'
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
        setStats(sortBy(playerData, 'Team'))
        break;
      case 'Pos':
        setStats(sortBy(playerData, 'Pos'))
        break;
      case 'Att':
        setStats(sortBy(playerData, 'Att'))
        break;
      case 'Att/G':
        setStats(sortBy(playerData, 'Att/G'))
        break;
      case 'Yds':
        setStats(sortBy(playerData, 'Yds'))
        break;
      case 'TD':
        setStats(sortBy(playerData, 'TD'))
        break;
      case 'Lng':
        setStats(sortBy(playerData, 'Lng'))
        break;
      case '1st':
        setStats(sortBy(playerData, '1st'))
        break;
      case '1st%':
        setStats(sortBy(playerData, '1st%'))
        break;
      case '20+':
        setStats(sortBy(playerData, '20+'))
        break;
      case '40+':
        setStats(sortBy(playerData, '40+'))
        break;
      case 'FUM':
        setStats(sortBy(playerData, 'FUM'))
        break;
      default:
        setStats(sortedStats)
    }
  }

  useEffect(() => {
    setStats(playerData)
  }, [])


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, playerData.length - page * rowsPerPage);

  const handleChangePage = (newPage) => {
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
      </TableBody>
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
    </Table>

  );
}

export default PlayersTable
