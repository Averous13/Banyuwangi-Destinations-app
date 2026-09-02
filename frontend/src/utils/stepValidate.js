export const validateStep = (stepConfig, data) => {
  if (!stepConfig) return null;

  for (const field of stepConfig.fields) {
    if (field.required && !data[field.name]) {
      return 'Semua field bertanda* wajib diisi';
    }
    if (field.minLength && data[field.name] && data[field.name] < field.minLength) {
      return `${field.placeholder.replace('*', '')} minimal terdiri dari ${field.minLength} karakter`
    }
  }

  if (stepConfig.customValidate) {
    const err = stepConfig.customValidate(data);
    if (err) return err;
  }

  return null;
}
