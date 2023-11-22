export const getFormData = (object) => {
  const fd = new FormData();
  Object.entries(object).forEach(([key, value]) => {
    fd.append(key, value)
  });

  return fd;
}