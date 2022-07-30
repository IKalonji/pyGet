import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { select, Store } from '@ngrx/store';
import { selectUser, selectUserToken } from '../../store/store.selectors';
import { userTokenStore, userStore, userSubStore } from '../../store/store.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  user: User = { username: '' };
  code: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['username']) {
        this.code = params['sub'];
        this.user.username = params['username'];
        this.store.dispatch(
          userStore({ user: { username: params['username'] } })
        );
        this.store.dispatch(userSubStore({ sub: params['sub'] }));
        this.userService.getUserTokens(this.code).subscribe((data) => {
          this.store.dispatch(userTokenStore({ token: data }));
        });
      }
    });
  }

  async getUser(): Promise<void> {
    console.log('Coming soon')
    let getUser = this.store.pipe(select(selectUser));
    getUser.subscribe((s) => {
      if (!s) {
        return;
      } else {
        //console.log('user', s);
      }
    });

    let token = this.store.pipe(select(selectUserToken));
    token.subscribe((s) => {
      if (!s) {
        return;
      } else {
        //console.log('token', s);
      }
    });
  }

  addArticle(){
    this.router.navigateByUrl("add-article")
  }
}
