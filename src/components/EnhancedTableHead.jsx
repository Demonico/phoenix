import React from 'react'
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

const headCells = [
  { id: 'firstName', num: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', num: false, disablePadding: true, label: 'Last Name' },
  { id: 'email', num: false, disablePadding: true, label: 'Email Address' },
  { id: 'telephone', num: true, disablePadding: true, label: 'Phone Number' },
  { id: 'role', num: false, disablePadding: true, label: 'Role' },
  { id: 'action', num: false, disablePadding: true, label: 'Action' },
]

export default function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all employees' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.num ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
