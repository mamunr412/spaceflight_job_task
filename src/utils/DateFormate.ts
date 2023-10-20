export const dateFormat = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "short" });
  const year = newDate.getFullYear();
  return `${day} ${month}, ${year}`;
};
