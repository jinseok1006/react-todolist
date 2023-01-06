import React from 'react';
import useInputs from '@/hooks/useInputs';

import TodoProvider, {
  useTodoNextId,
  useTodoDispatch,
  useTodoState,
} from './TodoContext';

import {
  Button,
  List,
  ListItem,
  Grid,
  ListItemText,
  TextField,
  Checkbox,
  ListItemIcon,
  IconButton,
  Typography,
  ListItemButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import TodoTemplate from './TodoTemplate';

export default function TodoMangement() {
  return (
    <TodoProvider>
      <TodoTemplate
        comp1={<TodoPanel comp1={<TodoCreate />} comp2={<TodoControl />} />}
        comp2={<TodoList />}
      />
    </TodoProvider>
  );
}

function TodoList() {
  const todos = useTodoState();

  return (
    <List disablePadding>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}

const doneStyle = (theme) => ({
  color: `${theme.palette.grey[400]}`,
  fontWeight: '300',
});

function TodoItem({ todo }) {
  const dispatch = useTodoDispatch();

  const { id, text, done } = todo;

  const onDelete = (id) => dispatch({ type: 'DELETE', id });
  const onToggle = (id) => dispatch({ type: 'TOGGLE', id });

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton onClick={() => onToggle(id)}>
        <ListItemIcon>
          <Checkbox edge="start" checked={done} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography sx={done ? doneStyle : null}>{text}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  );
}

function TodoCreate() {
  const [inputs, onChange, reset, inputRef] = useInputs({
    text: '',
  });
  const { text } = inputs;

  const nextId = useTodoNextId();
  const dispatch = useTodoDispatch();

  const onCreate = (e) => {
    e.preventDefault();

    if (text === '') return alert('텍스트필드가 빈칸입니다.');

    const todo = {
      id: nextId.current,
      text,
      done: false,
    };

    dispatch({ type: 'CREATE', todo });
    reset();
    nextId.current += 1;
  };

  return (
    <form onSubmit={onCreate}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <TextField
            size="small"
            fullWidth
            label="todo"
            name="text"
            value={text}
            inputRef={inputRef}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button variant="contained" fullWidth type="submit">
            CREATE
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function TodoControl() {
  const dispatch = useTodoDispatch();

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => dispatch({ type: 'DELETE_DONE_ITEMS' })}
    >
      DELETE ALL DONE ITEMS
    </Button>
  );
}

function TodoPanel({ comp1, comp2 }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {comp1}
      </Grid>
      <Grid item xs={12}>
        {comp2}
      </Grid>
    </Grid>
  );
}
