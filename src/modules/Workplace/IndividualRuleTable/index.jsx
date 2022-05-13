import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function createData(rule, recall, precision, fscore) {
  return { rule, recall, precision, fscore };
}

export default function DenseTable(props) {

    const workspace = useSelector(state => state.workspace)

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Rule</TableCell>
                <TableCell align="right">Recall</TableCell>
                <TableCell align="right">Precision</TableCell>
                <TableCell align="right">F1 Score</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {  workspace['rules'] != null && workspace['rules'].map((row, id) => (
                <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.pattern}
                </TableCell>
                <TableCell align="right">{row.recall.toFixed(2)}</TableCell>
                <TableCell align="right">{row.precision.toFixed(2)}</TableCell>
                <TableCell align="right">{row.fscore.toFixed(2)}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}