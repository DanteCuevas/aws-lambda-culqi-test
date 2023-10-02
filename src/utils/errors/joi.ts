import Joi from 'joi'

class JoiErrorCustom {
  public static format = (error: Joi.ValidationError) => {
    const message:{ [key: string]: any } = {}
    error.details.forEach(element => {
      const field = element.message.split('"')[1].toString()
      if (!message[field]) {
        message[field] = [element.message]
      } else {
        message[field].push(element.message)
      }
    })

    return message
  }
}

export default JoiErrorCustom;
