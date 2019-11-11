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
          <TableCell align="right">Team</TableCell>
          <TableCell align="right">Pos</TableCell>
          <TableCell align="right">Att</TableCell>
          <TableCell align="right">Att/G</TableCell>
          <TableCell align="right">Yds</TableCell>
          <TableCell align="right">TD</TableCell>
          <TableCell align="right">Lng</TableCell>
          <TableCell align="right">1st</TableCell>
          <TableCell align="right">1st%</TableCell>
          <TableCell align="right">20+</TableCell>
          <TableCell align="right">40+</TableCell>
          <TableCell align="right">FUM</TableCell>
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
