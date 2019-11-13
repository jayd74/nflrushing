import React, { useState } from 'react'
import { orderBy } from 'lodash'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useStyles } from '../../styles'

const TableHeader = ({ stats, setStats, categories }) => {
  const { tableHeader } = useStyles()
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');

  const chevron = order === 'desc' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />

  const sortData = (category) => {
    const isDesc = sortBy === category && order === 'desc';
    setSortBy(category);
    setStats(orderBy(stats, category, [order]))
    setOrder(isDesc ? 'asc' : 'desc');
  };

  return (
    <TableRow>
      {categories.map(category => {
        return (
          <TableCell className={tableHeader} key={category} onClick={() => sortData(category)}>{category}{sortBy === category ? chevron : null}</TableCell>
        )
      })}
    </TableRow>
  )
}

export default TableHeader
