export const getFormObject = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.target as HTMLFormElement)
  const formObject = {} as Record<string, any>

  formData.forEach((v, k) => (formObject[k] = v))

  return formObject
}
