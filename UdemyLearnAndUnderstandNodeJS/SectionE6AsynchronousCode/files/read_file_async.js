function callback(error, data) {
  if (error !== null) {
    return error.message;
  } else {
    return data;
  }
}

