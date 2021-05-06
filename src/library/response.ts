const response = (data: any, message = '', status: boolean, meta: any = {}) => {

  if (data === null) {
    data = null;
  } else {
    if (data.data) {
      data = data.data;
    }
    if (data.meta) {
      meta = data.meta;
    }
    if (data.status) {
      status = data.status;
    }
  }

  return { status, message, data, meta, };
};
export default response;
