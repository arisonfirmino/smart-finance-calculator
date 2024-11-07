export const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 18 || currentHour < 6) {
    return "boa noite";
  } else if (currentHour >= 12) {
    return "boa tarde";
  } else {
    return "bom dia";
  }
};
