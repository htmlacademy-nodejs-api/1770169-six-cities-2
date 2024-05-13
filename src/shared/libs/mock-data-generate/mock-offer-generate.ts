import got from 'got';
import {MockServerDataType} from '../../types/mock-server-data.type.js';
import {MockDataGenerate} from './mock-data-generate.interface.js';

export default class MockOfferGenerate implements MockDataGenerate {
  private mockData: MockServerDataType;

  private async load() {
    try {
      this.mockData = await got.get('http://localhost:3010/api').json();
    } catch (error) {
      console.error('');
    }
  }

  public generate(): void {
    this.load();
  }
}
