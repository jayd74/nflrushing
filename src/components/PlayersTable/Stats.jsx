import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Stats = ({ stats, rowsPerPage, page, categories, tableStyle }) => {
  const statPage = rowsPerPage > 0
    ? stats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : stats

  return statPage.map(stat => {
    return (
      <TableRow key={stat["Player"]}>
        {categories.map(category => {
          return <TableCell className={tableStyle} key={category}>{stat[category]}</TableCell>
        })}
      </TableRow>
    )
  })
}

export default Stats
