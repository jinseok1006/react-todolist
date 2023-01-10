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
import Timetable from './Timetable';

import React, { useEffect, useState } from 'react';
import useAsync from '@/hooks/useAsync';
import axios from 'axios';

import FileOpenIcon from '@mui/icons-material/FileOpen';

async function getSubjects() {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_PATH}/lectures.json`
  );
  return response.data;
}

function SubjectSearchPanel() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField select label="학년도/학기" size="small" fullWidth>
            <MenuItem>Ten</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={8}>
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

export default function LectureSearch() {
  const [lecturesState, fetchLectures] = useAsync(getSubjects, [], false);
  const { data: lectures, error, loading } = lecturesState;

  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (id) => setSelectedItem(id);

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <SubjectSearchPanel />
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
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            alignSelf: 'flex-start',
            position: { md: 'sticky' },
            top: { md: '4rem' },
          }}
        >
          <Timetable selectedItem={selectedItem} lectures={lectures} />
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

function SubjectList({ lectures, selectedItem, onSelect }) {
  return (
    <Paper elevation={3} sx={{ mt: 2 }}>
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
      <Box>
        <Typography component="span" variant="subtitle1">
          {lect.subjectName}
        </Typography>{' '}
        <Typography component="span" variant="subtitle2">
          {lect.divisionNumber}분반
        </Typography>{' '}
      </Box>

      <Box>
        <LectureSpan>{lect.professorName || '(공석)'}</LectureSpan>
        <LectureSpan label="학점" color emphasis>
          {lect.credit}
        </LectureSpan>
        <LectureSpan label="수강인원" color emphasis>
          {lect.currentPersonnel}/{lect.allPersonnel}({lect.limitPersonnel})
        </LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.public}</LectureSpan>
        <LectureSpan>{lect.department || null}</LectureSpan>
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
