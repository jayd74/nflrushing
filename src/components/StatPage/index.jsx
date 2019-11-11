import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const StatPage = ({ stats, rowsPerPage, page }) => {
  const statPage = rowsPerPage > 0
    ? stats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : stats

  return statPage.map(stat => {
    return (
      <TableRow key={stat["Player"]}>
        <TableCell>{stat["Player"]}</TableCell>
        <TableCell align="right">{stat["Team"]}</TableCell>
        <TableCell align="right">{stat["Pos"]}</TableCell>
        <TableCell align="right">{stat["Att"]}</TableCell>
        <TableCell align="right">{stat["Att/G"]}</TableCell>
        <TableCell align="right">{stat["Yds"]}</TableCell>
        <TableCell align="right">{stat["TD"]}</TableCell>
        <TableCell align="right">{stat["Lng"]}</TableCell>
        <TableCell align="right">{stat["1st"]}</TableCell>
        <TableCell align="right">{stat["1st%"]}</TableCell>
        <TableCell align="right">{stat["20+"]}</TableCell>
        <TableCell align="right">{stat["40+"]}</TableCell>
        <TableCell align="right">{stat["FUM"]}</TableCell>
      </TableRow>
    )
  })
}

export default StatPage
