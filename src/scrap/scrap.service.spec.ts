import { Test, TestingModule } from '@nestjs/testing';
import { BANK_CODE, KOREA_PRICE_SOURCE_URL } from 'src/constants';
import { ScrapModule } from './scrap.module';
import { ScrapService } from './scrap.service';

describe('Scrap Module', () => {
  let module: TestingModule;
  let scrapService: ScrapService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ScrapModule],
    }).compile();

    scrapService = module.get<ScrapService>(ScrapService);
  });

  afterAll(async () => {
    await module.close();
  });

  test('Scrap currency rate (One Bank)', async () => {
    // GIVEN
    const url = `${KOREA_PRICE_SOURCE_URL}${BANK_CODE.IBK}`;

    // WHEN
    const currencyInfo = await scrapService.getCurrencyInfo(url);

    // THEN
    expect(Object.keys(currencyInfo).length).toEqual(3);
  }, 100000);

  test.only('Scrap currency rate (All Banks)', async () => {
    // GIVEN

    // WHEN
    const currencyInfoOfAllBanks =
      await scrapService.getCurrencyInfoOfAllBanks();

    console.dir({ currencyInfoOfAllBanks }, { depth: null });

    // THEN
    expect(Object.keys(currencyInfoOfAllBanks).length).toEqual(6);
  }, 100000);
});
