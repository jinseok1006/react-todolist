import React, { useContext, useRef, useCallback } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';

import { UsersDispatch, UsersState } from './User';
import useInputs from '../hooks/useInputs';

function CreateUser() {
  const dispatch = useContext(UsersDispatch);
  const users = useContext(UsersState);

  const [inputs, onChange, reset, inputRef] = useInputs({
    username: '',
    email: '',
  });
  const nextId = useRef(1);

  const { username, email } = inputs;

  const onCreate = useCallback(
    (e) => {
      e.preventDefault();

      if (username === '' || email === '')
        return alert('텍스트필드가 빈칸입니다');

      const user = {
        id: nextId.current,
        username,
        email,
        active: false,
      };
      dispatch({ type: 'CREATE', user });
      reset();
      nextId.current += 1;
    },
    [inputs, users]
  );

  return (
    <Box component="form" onSubmit={onCreate} direction="row">
      <Grid container spacing={1}>
        <Grid item sm={5} xs={12}>
          <TextField
            size="small"
            fullWidth
            label="username"
            name="username"
            value={username}
            onChange={onChange}
            inputRef={inputRef}
          />
        </Grid>
        <Grid item sm={5} xs={12}>
          <TextField
            size="small"
            fullWidth
            label="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Grid>

        <Grid item sm={2} xs={12}>
          <Button variant="contained" fullWidth type="submit">
            create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(CreateUser);
