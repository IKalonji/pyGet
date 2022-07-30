import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { userStore, userLoggedIn } from '../store/store.actions';
import { selectUser } from '../store/store.selectors';

@Injectable()
export class StoreEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  // loadUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userLoggedIn),
  //     withLatestFrom(this.store.pipe(select(selectUser))),
  //     mergeMap((user) => {
  //       if (!user) {
  //         return EMPTY;
  //       }
  //       return this.userService.getUser().pipe(
  //         map((data) => userStore({ user: data }))
  //       );
  //     })
  //   )
  // );
}
