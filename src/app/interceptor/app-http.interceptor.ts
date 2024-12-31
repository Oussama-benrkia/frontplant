import { HttpInterceptorFn } from '@angular/common/http';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  if (
    !req.url.includes('/auth/login') &&
    !req.url.includes('/auth/register') &&
    !req.url.includes('/auth/refresh')
  ) {
    console.log("Adding Authorization header to request");

    // Get the token from localStorage
    const accessToken: string | null = localStorage.getItem("accessToken");
    console.log(accessToken)
    if (accessToken) {
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
        withCredentials: true, // Include cookies with the request
      });
      return next(newRequest);
    }
  }

  return next(req);
};
