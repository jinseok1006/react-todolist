import React from 'react';
import useInputs from '../hooks/useInputs';
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

export default function TodoMangement() {
  return (
    <TodoProvider>
      <CreateTodo />
      <TodoList />
    </TodoProvider>
  );
}

function TodoList() {
  const todos = useTodoState();

  return (
    <List dense>
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

function CreateTodo() {
  const [inputs, onChange, reset, inputRef] = useInputs({
    text: '',
  });
  const { text } = inputs;

  const nextId = useTodoNextId();
  const dispatch = useTodoDispatch();

  const onCreate = () => {
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
    <Grid container spacing={2}>
      <Grid item xs={10}>
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
      <Grid item xs={2}>
        <Button variant="contained" fullWidth onClick={onCreate}>
          CREATE
        </Button>
      </Grid>
    </Grid>
  );
}
