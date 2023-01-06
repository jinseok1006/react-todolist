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
} from '@mui/material';
import React from 'react';

import lectureList from '@/assets/lect.json';

import FileOpenIcon from '@mui/icons-material/FileOpen';

export default function Timetable() {
  return (
    <Container maxWidth="md">
      <List>
        {lectureList.map((lect, i) => (
          <React.Fragment key={i}>
            <LectureItem lect={lect} />
            {i !== lectureList.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

function LectureItem({ lect }) {
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton>
            <FileOpenIcon />
          </IconButton>
        }
      >
        <LectureDetail lect={lect} />
      </ListItem>
    </>
  );
}

function LectureDetail({ lect }) {
  return (
    <Box>
      <Typography variant="body2">{lect.subjectName}</Typography>
      <Box>
        <LectureSpan>{lect.professorName || '(공석)'}</LectureSpan>
        <LectureSpan>
          {lect.public}
          {lect.noPublic !== '' ? `(${lect.noPublic})` : null}
        </LectureSpan>
        <LectureSpan>{lect.department || null}</LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.subject}</LectureSpan>
        <LectureSpan label="분반" color>
          {lect.divisionNumber}
        </LectureSpan>
        <LectureSpan label="학점" color>
          {lect.credit}
        </LectureSpan>
        <LectureSpan label="수강인원" color>
          {lect.currentPersonnel}/{lect.allPersonnel}
        </LectureSpan>
        <LectureSpan>{lect.evaluation}</LectureSpan>
      </Box>
      <Box>
        <LectureSpan>{lect.schedule}</LectureSpan>
      </Box>
    </Box>
  );
}

function LectureSpan({ children, label, color }) {
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
      >
        {children}
      </Typography>
    </Box>
  );
}
