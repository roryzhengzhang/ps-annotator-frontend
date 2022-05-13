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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

export default function DenseTable(props) {

    const workspace = useSelector(state => state.workspace)

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Rule</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Recall</TableCell>
                <TableCell align="right">Precision</TableCell>
                <TableCell align="right">F1 Score</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            { workspace['combinedPatterns'] != null &&  workspace['combinedPatterns'].slice(0, 3).map((row, id) => 

                    (<TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: id == 0 ? 'rgba(0, 0, 255, 0.5)': id == 1 ? 'rgba(0, 0, 255, 0.4)' : 'rgba(0, 0, 255, 0.3)' }}
                    >
                    <TableCell component="th" scope="row">
                        {row.pattern}
                    </TableCell>
                    <TableCell align="right">{row.weight}</TableCell>
                    <TableCell align="right">{row.recall}</TableCell>
                    <TableCell align="right">{row.precision}</TableCell>
                    <TableCell align="right">{row.fscore}</TableCell>
                    </TableRow>)
            )}
            {
                workspace['combinedRules'] != null && 
                
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    <strong>Combination</strong>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">1</TableCell>
                </TableRow>
            }
            </TableBody>
        </Table>
        </TableContainer>
    );
}