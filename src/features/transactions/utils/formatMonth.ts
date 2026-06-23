export const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[Number(monthNum) - 1]} '${year.slice(2)}`;
};