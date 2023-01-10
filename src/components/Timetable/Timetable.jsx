import React from 'react';

import { Box, Stack, Paper, styled } from '@mui/material';
import { decodeSchedule } from './util';

const weeks = ['일', '월', '화', '수', '목', '금', '토'];
// const classes = Array.from({ length: 26 }, (_, i) => i);

// 13교시까지 표기하기에는 너무 정신사나운데 해결책이 없을까?
const periods = Array.from({ length: 9 }, (_, i) => i).reduce(
  (pre, cur) => [...pre, `${cur + 1}-A`, `${cur + 1}-B`],
  []
);

// 서치방식을 바꿔야만하는데.. 연타하면 CPU가 15%까지 올라간다...

export default function Timetable({ selectedItem, lectures }) {
  const schedules =
    selectedItem !== null
      ? decodeSchedule(lectures[selectedItem].schedule)
      : null;

  const getSelected = (row, col) => {
    if (schedules) {
      return schedules.some(
        (schedule) => schedule.period === row && schedule.week === col
      );
    }
    return false;
  };

  // return (
  //   <Paper sx={{ p: 1 }}>
  //     <Box>
  //       <Stack direction="row">
  //         <SelectedCell />
  //         {weeks.map((col, i) => (
  //           <SelectedCell key={i}>{col}</SelectedCell>
  //         ))}
  //       </Stack>
  //       {classes.map((row, i) => (
  //         <Stack direction="row" key={i}>
  //           <SelectedCell>{row}</SelectedCell>
  //           {weeks.map((col, j) => (
  //             <SelectedCell key={j} selected={getSeleceted(i, col)} />
  //           ))}
  //         </Stack>
  //       ))}
  //     </Box>
  //   </Paper>
  // );

  return (
    <Paper sx={{ p: 1 }}>
      <Box component="table" sx={{ border: 1, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            {weeks.map((col) => (
              <Box key={col} component="th" sx={{ border: 1 }}>
                {col}
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((row, i) => (
            <tr key={row}>
              <SelectedCell>{row}</SelectedCell>
              {weeks.map((col) => (
                <SelectedCell key={col} selected={getSelected(i, col)} />
              ))}
            </tr>
          ))}
        </tbody>
      </Box>
    </Paper>
  );
}

function SelectedCell({ children, row, col, selected }) {
  return (
    <Box
      component="td"
      sx={{
        display: 'table-cell',
        textAlign: 'center',
        width: '60px',
        height: '25px',
        border: selected ? null : 1,
        backgroundColor: selected ? '#ffa8a8' : null,
      }}
    >
      {children}
    </Box>
  );
}
