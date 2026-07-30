import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { useAuthStore } from '../../store/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = useAuthStore.getState().accessToken;
  
  if (accessToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(authReq);
  }
  
  return next(req);
};