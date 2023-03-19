import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async getAllCurrencies() {
    return firstValueFrom(
      this.httpService
        .get('https://fapi.binance.com/fapi/v1/exchangeInfo', {})
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
  }
}
