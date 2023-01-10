import { Container, Grid, Paper } from '@mui/material';

function TodoTemplate({ comp1, comp2 }) {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={5} xs={12}>
            {comp1}
          </Grid>
          <Grid item sm={7} xs={12}>
            {comp2}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TodoTemplate;
