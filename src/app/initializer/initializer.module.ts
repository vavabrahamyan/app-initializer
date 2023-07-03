import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { interval, take, tap } from 'rxjs';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (configService: ConfigService) => {
        return () => {
          configService.getUserId();
          return configService.users$.pipe(
            tap((res) => {
              console.log('res::', res);
            }),
            take(5)
          );
        };
      },
      deps: [ConfigService],
    },
  ],
})
export class InitializerModule {}
