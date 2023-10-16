export const handleError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

export const createError = (status, message)=>{
  const err = new Error()
  err.status= status
  err.message= message
  return err
} 