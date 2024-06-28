export enum CommandName {
  Help = '--help',
  Import = '--import',
  Version = '--version',
  Generate = '--generate'
}

export enum ImportOption {
  MockData = '-m',
  CityData = '-c'
}

export const ErrorMessage = {
  UNSPECIFIED_PATH_ERROR: 'The path to the file is not specified.',
  IMPORT_ERROR: 'Can\'t import data from file: ',
  PARSE_CONTENT_ERROR: 'Failed to parse json content.',
  LOAD_DATA_ERROR: 'Can\'t load data from: ',
  GENERATE_DATA_ERROR: 'Can\'t generate data.',
  READ_VERSION_ERROR: 'Can\'t read version from %filePath%.'
};

export const InfoMessage = {
  FILE_CREATE_INFO: 'File %filepath% was created.',
  COUNT_ROW_IMPORTED_INFO: '%count% rows imported.'
};

