import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const HttpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http);
};
