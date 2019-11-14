import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv'

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import Stats from './Stats';
import TableHeader from './TableHeader'
import SearchBar from '../SearchBar'
import { useStyles } from '../../styles'
import playerData from '../../assets/rushing.json'

const PlayersTable = () => {
  const { button, buttonText, table, header } = useStyles()
  const [stats, setStats] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Grouping categories into a list, since they are the same for everyone.
  const categories = ["Player","Team","Pos","Att","Att/G","Yds","Avg","Yds/G","TD","Lng","1st","1st%","20+","40+","FUM"]

  useEffect(() => {
    // Sets the stats to show all data on page load
    setStats(playerData)
  }, [])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, playerData.length - page * rowsPerPage);
  const EmptyRow = () => {
    return (
      <TableRow style={{ height: 53 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <header className={header}>
        <h1>NFL Rushing</h1>
        <SearchBar setStats={setStats} data={playerData} />
        <CSVLink data={stats} filename={"rushing.csv"} className={buttonText}>
          <Button className={button}>Download CSV</Button>
        </CSVLink>
      </header>
      <Table stickyHeader>
        <TableHead>
          <TableHeader setStats={setStats} stats={stats} categories={categories} />
        </TableHead>
        <TableBody>
          <Stats stats={stats} rowsPerPage={rowsPerPage} page={page} categories={categories} tableStyle={table}/>
          {/* Adding empty rows to fill up the last page */}
          {emptyRows > 0 ? <EmptyRow /> : null}
          <TableRow>
            <TablePagination
              className={table}
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
    </>
  );
}

export default PlayersTable
