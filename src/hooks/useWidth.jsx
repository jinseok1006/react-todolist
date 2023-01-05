import { useMediaQuery, useTheme } from '@mui/material';

export default function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

/*
reverse() 새로운객체를 만들지않고 참조를 리턴한다->기존배열이 바뀐다는소리
keys=['xl', lg', 'md','sm','xs']
xl, false -> return true && false -> output(null)
첫번째 true가 나올때까지 반복

마지막 xs이면 match는 true고용...
*/
