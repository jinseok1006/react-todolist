import { Container, Grid } from '@mui/material';

function TodoTemplate({ comp1, comp2 }) {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item sm={5} xs={12}>
          {comp1}
        </Grid>
        <Grid item sm={7} xs={12}>
          {comp2}
        </Grid>
      </Grid>
    </Container>
  );
}

export default TodoTemplate;
