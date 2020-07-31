import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import {
  Checkbox,
  Chip,
  Fab,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EmployeeForm from './EmployeeForm'
import EmployeeModal from './EmployeeModal'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

// todo add view link
// todo add print
// todo add delete
// todo add filters

function titleCase(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
}

function ChipHelper({ roleData }) {
  let chipColor = 'default'
  let role = titleCase(roleData)

  if (roleData === 'owner') {
    chipColor = 'primary'
  } else if (roleData === 'driver') {
    chipColor = 'secondary'
  }
  return <Chip color={chipColor} label={role} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default function EmployeeTable({ employeeData }) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [modalOpen, setModal] = React.useState(false)
  const [viewOnly, setViewOnly] = React.useState(true)
  const [selectedEmployee, setSelectedEmployee] = React.useState({})

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employeeData.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const viewEmployee = (event, empData) => {
    setSelectedEmployee(empData)
    setViewOnly(true)
    toggleModal()
  }

  const addEmployee = () => {
    setViewOnly(false)
    toggleModal()
  }

  const toggleModal = () => {
    setModal(!modalOpen)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, employeeData.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={employeeData.length}
            />

            <TableBody>
              {stableSort(employeeData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="right">{row.telephone}</TableCell>
                      <TableCell>
                        <ChipHelper roleData={row.role} />
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          onClick={(event) => viewEmployee(event, row)}
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={addEmployee}
      >
        <AddIcon />
      </Fab>

      <EmployeeModal modalOpen={modalOpen} toggleModal={toggleModal}>
        <EmployeeForm
          empData={selectedEmployee}
          toggleModal={toggleModal}
          viewOnly={viewOnly}
        />
      </EmployeeModal>
    </div>
  )
}
