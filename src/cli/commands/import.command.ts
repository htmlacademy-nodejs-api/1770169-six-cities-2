import chalk from 'chalk';

import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import {CommandName, ErrorMessage} from './command.constant.js';
import {Command} from './command.interface.js';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';
import {DefaultUserService, UserModel, UserService} from '../../shared/modules/user/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {Logger, PinoLogger} from '../../shared/libs/logger/index.js';
import {Offer} from '../../shared/types/index.js';
import {getMongoURI} from '../../shared/helpers/index.js';

export default class ImportCommand implements Command {
  readonly name: string = CommandName.Import;
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {

    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get(): string {
    return this.name;
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, '27017', dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);

    if (!filename) {
      throw new Error(ErrorMessage.UNSPECIFIED_PATH_ERROR);
    }

    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(ErrorMessage.IMPORT_ERROR, filename));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(chalk.yellow(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.create({...offer.host, password: ''}, this.salt);
    await this.offerService.create({
      ...offer,
      host: user.id
    });
  }
}
