export enum CommandName {
  Help = '--help',
  Import = '--import',
  Version = '--version',
  Generate = '--generate'
}

export const ErrorMessage = {
  UNSPECIFIED_PATH_ERROR: 'The path to the file is not specified.',
  IMPORT_ERROR: 'Can\'t import data from file: ',
  PARSE_CONTENT_ERROR: 'Failed to parse json content.'
};

