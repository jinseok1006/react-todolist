// time='월 1-A'

export function decodeSchedule(schedulesString) {
  return schedulesString.split(',').map((scheduleString) => {
    const [week, t] = scheduleString.split(' ');
    const [time, type] = t.split('-');
    const period = (parseInt(time) - 1) * 2 + (type === 'A' ? 0 : 1);
    return { week, period };
  });
}
