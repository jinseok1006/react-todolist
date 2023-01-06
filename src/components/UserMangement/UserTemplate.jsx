import { Container } from '@mui/system';
import React from 'react';

export default function UserTemplate({ children }) {
  return <Container maxWidth="md">{children}</Container>;
}
