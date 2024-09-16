import { HttpInterceptorFn } from '@angular/common/http';
import {
  ACCESS_TOKEN_KEY,
  getFromLocalStorage,
} from '../../shared/helpers/constants.helper';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken: string | null = getFromLocalStorage(ACCESS_TOKEN_KEY);

  if (accessToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next(cloned);
  }

  return next(req);
};
