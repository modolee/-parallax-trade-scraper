import { Injectable } from '@nestjs/common';
import { launch } from 'puppeteer';
import {
  BANK_CODE,
  BROWSER_TIMEOUT,
  KOREA_PRICE_SOURCE_URL,
  CURRENCY_COUNTRY_MAP,
  COUNTRY_CURRENCY_MAP,
  INTERNATIONAL_PRICE_SOURCE_URL_PREFIX,
  INTERNATIONAL_PRICE_SOURCE_URL_POSTFIX,
  CURRENCY_PAIR_CODE,
} from 'src/common/constants';
import {
  BankCurrencyInfo,
  InternationalBasePrice,
} from 'src/common/interfaces';
import { parseFloatFromString } from 'src/common/helpers';
import { fetchData } from 'src/common/helpers/fetch.helper';

@Injectable()
export class ScrapService {
  async getInternationalBasePriceOfAllPairs(): Promise<InternationalBasePrice> {
    const basePriceOfAllPairs = {} as InternationalBasePrice;

    await Promise.all(
      Object.keys(CURRENCY_PAIR_CODE).map(async (pairName) => {
        basePriceOfAllPairs[pairName] = await this.getInternationalBasePrice(
          pairName,
        );
      }),
    );

    return basePriceOfAllPairs;
  }

  async getInternationalBasePrice(pairName: string): Promise<number> {
    const url = `${INTERNATIONAL_PRICE_SOURCE_URL_PREFIX}${CURRENCY_PAIR_CODE[pairName]}${INTERNATIONAL_PRICE_SOURCE_URL_POSTFIX}`;

    const result = await fetchData(url);

    if (!result) {
      throw new Error(`Can't fetch International Base Price`);
    }

    let basePrice = Number.parseFloat(result.data[0].data[1]);

    if (pairName === 'JPY') {
      basePrice *= 100;
    }

    return basePrice;
  }

  /**
   * 모든 은행의 환율 정보 가져오기
   * @returns
   */
  async getCurrencyInfoOfAllBanks(): Promise<Record<string, BankCurrencyInfo>> {
    const currencyPricesOfAllBanks = {} as Record<string, BankCurrencyInfo>;

    await Promise.all(
      Object.entries(BANK_CODE).map(async ([bankName, bankCode]) => {
        const currentyPrices = await this.getCurrencyInfo(
          `${KOREA_PRICE_SOURCE_URL}${bankCode}`,
        );

        currencyPricesOfAllBanks[bankName] = currentyPrices;
      }),
    );

    return currencyPricesOfAllBanks;
  }

  /**
   * 환률 정보 가져오기
   * @param url
   * @returns
   */
  async getCurrencyInfo(url: string): Promise<BankCurrencyInfo> {
    const currencyList = await this.getTableContents(url);

    const currencyInfo = {} as BankCurrencyInfo;

    currencyList.map((price: string[]) => {
      const countryName = price[1];

      // USD, JPY, EUR 인 경우만 골라내서 매매기준율을 구함
      if (
        countryName === CURRENCY_COUNTRY_MAP.USD ||
        countryName === CURRENCY_COUNTRY_MAP.JPY ||
        countryName === CURRENCY_COUNTRY_MAP.EUR
      ) {
        const currencyName = COUNTRY_CURRENCY_MAP[countryName];

        currencyInfo[currencyName] = {
          buyPrice: parseFloatFromString(price[2], [',', '원']),
          buySpread: parseFloatFromString(price[3], [',', '%']),
          sellPrice: parseFloatFromString(price[4], [',', '원']),
          sellSpread: parseFloatFromString(price[5], [',', '%']),
          transferPrice: parseFloatFromString(price[6], [',', '원']),
          transferSpread: parseFloatFromString(price[7], [',', '%']),
          basePrice: parseFloatFromString(price[8], [',', '원']),
        };
      }
    });

    return currencyInfo;
  }

  /**
   * 테이블 내용 가져오기
   * @param url
   * @returns
   */
  async getTableContents(url: string): Promise<string[][]> {
    let browser = null;
    try {
      browser = await launch({
        headless: true,
        ignoreHTTPSErrors: true,
        timeout: BROWSER_TIMEOUT,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });

      const page = await browser.newPage();

      await page.goto(url);
      // 카운팅 효과 때문에 3초 가량 기다린 후 파싱 진행
      await page.waitForTimeout(3000);

      // 테이블 컨텐츠 파싱 2차원 배열
      // [[1행 1열, 1행 2열, ...], [2행 1열, 2행 2열, ...], ...]
      const currencyList = await page.$eval('table tbody', (tbody) =>
        [...tbody.rows].map((r) => [...r.cells].map((c) => c.innerText)),
      );
      return currencyList;
    } catch (error) {
      console.log({ error });
    } finally {
      browser && (await browser.close());
    }
  }
}
