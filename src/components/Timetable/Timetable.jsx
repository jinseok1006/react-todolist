import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Divider,
  Box,
  IconButton,
  ListItemButton,
  Fab,
  Grid,
  Paper,
  TextField,
  Select,
  Button,
  MenuItem,
  Input,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import useAsync from '@/hooks/useAsync';
import axios from 'axios';

import FileOpenIcon from '@mui/icons-material/FileOpen';

async function getSubjects() {
  const response = await axios.get(
    'http://192.168.0.12:5173/public/lectures.json'
  );
  return response.data;
}

function TimeTablePanel() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField select label="연도" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="학기" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="구분" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="대학" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="학과" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="학년" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField label="교과목명" size="small" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Input></Input>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="small" fullWidth>
            search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

function SubjectList({ lectures, selectedItem, onSelect }) {
  return (
    <Paper elevation={3}>
      <List disablePadding dense>
        {lectures.map((lect, i) => (
          <LectureItem
            key={i}
            selectedItem={selectedItem}
            id={i}
            lect={lect}
            onSelect={onSelect}
          />
        ))}
      </List>
    </Paper>
  );
}

export default function Timetable() {
  const [lecturesState, fetchLectures] = useAsync(getSubjects, [], false);

  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (id) => setSelectedItem(id);

  const { data: lectures, error, loading } = lecturesState;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            alignSelf: 'flex-start',
            position: { md: 'sticky' },
            top: { md: '4rem' },
            order: { md: 1 },
          }}
        >
          <TimeTablePanel />
        </Grid>
        <Grid item md={6} xs={12}>
          {loading ? (
            <div>로딩중</div>
          ) : error ? (
            <div>에러발생</div>
          ) : !lectures ? null : (
            <SubjectList
              onSelect={onSelect}
              selectedItem={selectedItem}
              lectures={lectures}
            />
          )}
        </Grid>
      </Grid>

      <Fab
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
        disabled={selectedItem === null}
        color="primary"
      >
        <FileOpenIcon />
      </Fab>
    </Container>
  );
}

function LectureItem({ selectedItem, id, lect, onSelect }) {
  return (
    <ListItem
      // secondaryAction={
      //   <IconButton>
      //     <FileOpenIcon />
      //   </IconButton>
      // }
      disableGutters
    >
      <ListItemButton
        onClick={() => onSelect(id)}
        selected={id === selectedItem}
      >
        <LectureDetail lect={lect} />
      </ListItemButton>
    </ListItem>
  );
}

function LectureDetail({ lect }) {
  return (
    <Box>
      <Typography variant="subtitle1" fontSize={14}>
        {lect.subjectName}
      </Typography>
      <Box>
        <LectureSpan>{lect.professorName || '(공석)'}</LectureSpan>
        <LectureSpan color emphasis>
          {lect.engineeringVerification}
        </LectureSpan>
        <LectureSpan>{lect.lectureRoom}</LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.public}</LectureSpan>
        <LectureSpan>{lect.department || null}</LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.subject}</LectureSpan>
        <LectureSpan label="분반" color emphasis>
          {lect.divisionNumber}
        </LectureSpan>
        <LectureSpan label="학점" color emphasis>
          {lect.credit}
        </LectureSpan>
        <LectureSpan label="수강인원" color emphasis>
          {lect.currentPersonnel}/{lect.allPersonnel}({lect.limitPersonnel})
        </LectureSpan>
        <LectureSpan>{lect.openLecture}</LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.schedule}</LectureSpan>
      </Box>
    </Box>
  );
}

function LectureSpan({ children, label, color, emphasis }) {
  return (
    <Box component="span" mr={1}>
      {label ? (
        <>
          <Typography variant="subtitle2" component="span">
            {label}
          </Typography>{' '}
        </>
      ) : null}
      <Typography
        variant="subtitle2"
        color={color ? 'primary' : 'grey'}
        component="span"
        fontWeight={emphasis ? 500 : null}
      >
        {children}
      </Typography>
    </Box>
  );
}
