import { isEmpty } from '../utils/isEmpty.js'

export function validateTaskCreation(data) {
  const ret = {
    valid: true,
    message: ""
  }
  if (isEmpty(data.title)) {
    ret.valid = false;
    ret.message = "A task deve conter um título";
  }
  if (isEmpty(data.description)) {
    ret.valid = false;
    ret.message = "A task deve conter uma descrição";
  }

  return ret
}