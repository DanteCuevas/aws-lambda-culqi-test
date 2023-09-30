import UnauthorizedError from '../../utils/errors/unauthorized'
import * as dotenv from 'dotenv';
dotenv.config();

class ValidateMerchandiseAction {
  private data?: string

  constructor (data?: string) {
    this.data = data
  }

  public execute = (): void => {
    if (this.data !== `Bearer ${process.env.MERCHANDISE}`) {
      throw new UnauthorizedError('Invalid merchandise pk');
    }
  }
}

export default ValidateMerchandiseAction;
