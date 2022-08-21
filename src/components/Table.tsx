import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Asteroid } from '../types/types';
import Loader from './Loader';
import Error from './Error';
import { TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableCaption: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50 %)',
    height: ' 1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: ' 1px',
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ComponentProps {
  asteroids: Asteroid[];
  loading: boolean;
  error: string;
}

export default function AsteroidsTables({ loading, error, asteroids }: ComponentProps) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const roundDownAstKmsToInt = (a: Asteroid) => {
    return Math.floor(parseInt(a.close_approach_data[0].miss_distance.kilometers, 10));
  };

  const compareAsteroids = (a: Asteroid, b: Asteroid) => {
    return roundDownAstKmsToInt(a) - roundDownAstKmsToInt(b);
  };

  useEffect(() => {
    setPage(0);
  }, [loading]);

  return (
    <Paper sx={{ marginBottom: 8 }}>
      {!error ?
        <TableContainer component={Paper}>
          <Table id="main-content" data-cy="asteroids-table" sx={{ minWidth: 700 }} aria-label="asteroids table">
            <caption className={classes.tableCaption}>Asteroids table</caption>
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Miss distance (km)</StyledTableCell>
                <StyledTableCell align="right">Absolute magnitude</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && asteroids.length > 0 ? (asteroids.sort(compareAsteroids).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row" data-cy={`cell-id-${row.id}`}>
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{roundDownAstKmsToInt(row)}</StyledTableCell>
                  <StyledTableCell align="right">{row.absolute_magnitude_h}</StyledTableCell>
                </StyledTableRow>
              ))) : (
                <StyledTableRow>
                  <StyledTableCell>
                    <Loader />
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        : <Error error={error} />}
      <TablePagination
        sx={{ fontSize: 16 }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={asteroids.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
