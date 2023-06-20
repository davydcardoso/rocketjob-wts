export const currentDateFormatted = (currentDate?: Date): string => {
  const date = currentDate || new Date(),
    day = date.getDate().toString().padStart(2, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    Year = date.getFullYear();
  return `${day}/${month}/${Year}`;
};

export const currentTimeFormatted = (currentDate?: Date): string => {
  const time = currentDate || new Date(),
    hour = time.getHours().toString().padStart(2, "0"),
    minutes = time.getMinutes().toString().padStart(2, "0"),
    seconds = time.getSeconds().toString().padStart(2, "0");

  return `${hour}:${minutes}:${seconds}`;
};

export const getDaysOfMonth = (month: number, year: number): number[] => {
  month--; //-->Usar somente no Node.JS, em ReactJs ou React Native da BUG

  const date = new Date(year, month, 1);
  const days: number[] = [];

  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const getDayOfWeek = (date: Date): string => {
  const week = [
    "DOMINGO",
    "SEGUNDA",
    "TERCA",
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SABADO",
  ];

  return week[date.getDay()];
};

export const getMonthOfYear = (date: Date): string => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return months[date.getMonth()];
};
