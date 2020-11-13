import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalUpdate from '../components/ModalUpdate';
import ModalCreate from '../components/ModalCreate';


const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Created at:' },
  { id: 'updated_at', numeric: true, disablePadding: false, label: 'Updated at:' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [modalCreate, setModalCreate] = React.useState(false);
  const [row, setRow] = React.useState({});
  const { numSelected, selected, deleteEquipment, rows, handleClick, getEquipmentsData, paginationData, rowsPerPage, order, orderBy } = props;

  
  const handleClickDelete = (event) => {
    if(event){
      deleteEquipment(selected[0]);
      //Ну и вот тут немного не уверен. Я получаю все записи плюс следующую. Но как именно получить просто следующую пока не понимаю
      // Отдельно по айди могу получить запись, но как понять какой айди у записы на следующей странице не переходя на неё
      if(paginationData.total_count >= rowsPerPage){
        getEquipmentsData(
          {
            limit: paginationData.limit + 1, 
            offset: paginationData.offset, 
            orders: orderBy === 'name'? { name: order } : { id: order } 
          }
        );
      }
      handleClick(event, selected[0]);
    }
  }

  const updateClick = (event) => {
    if(event){
      setModalUpdate(!modalUpdate);
      rows.forEach(row => {
        if (row.id === selected[0]){ 
          setRow(row);
        }
      });
    }
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Equipments
        </Typography>
      )}

      {numSelected > 0 && numSelected < 2 ? (    
        <div style={{whiteSpace: 'nowrap'}}> 
          <Tooltip title="Edit">
          <IconButton onClick={updateClick} aria-label="edit">
            <EditIcon/>
          </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
          <IconButton onClick={handleClickDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          </Tooltip>
        </div>
      ) :
        <Tooltip title="Add">
        <IconButton onClick={() => setModalCreate(!modalCreate)}  aria-label="add">
          <AddCircleIcon />
        </IconButton>
        </Tooltip>
      }
      <ModalUpdate modalUpdate={modalUpdate} selectedRow={row}/>
      <ModalCreate modalCreate={modalCreate}/>
    </Toolbar>
    
  );
  
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
}));

export default function EnhancedTable(props) {
  const rows = props.equipmentsData;
  let prevPage = 0;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.paginationData.limit);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    props.getEquipmentsData(
        {
          limit: props.paginationData.limit, 
          offset: props.paginationData.offset, 
          orders: orderBy === 'name'? { name: order } : { id: order }
        }
      )
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.getEquipmentsData(
      {
        limit: props.paginationData.limit, 
        offset: props.paginationData.count >= props.paginationData.limit && newPage > prevPage ?
         props.paginationData.offset + props.paginationData.limit : 
         props.paginationData.offset - props.paginationData.limit,
        orders: orderBy === 'name'? { name: order } : { id: order }
      }
    )
    prevPage = newPage;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.getEquipmentsData(
      {
        limit: event.target.value, 
        offset: props.paginationData.offset, 
        orders: orderBy === 'name'? { name: order } : { id: order }
      }
    );
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.paginationData.total_count - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          selected={selected} 
          rows={rows} 
          deleteEquipment={props.deleteEquipment}
          getEquipmentsData={props.getEquipmentsData}
          handleClick={handleClick}
          paginationData={props.paginationData}
          rowsPerPage={rowsPerPage}
          order={order}
          orderBy={orderBy}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.paginationData.total_count}
            />
            <TableBody>
               { rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      key={row.id}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{new Date(Date.parse(row.created_at)).toLocaleString()}</TableCell>
                      <TableCell align="right">{new Date(Date.parse(row.updated_at)).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.paginationData.total_count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}