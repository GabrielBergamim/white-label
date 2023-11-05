import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <h1>Sing-in</h1>
    <img [src]="imgSource"/>
    <button (click)="login()">Login</button>
`,
  standalone: true,
  imports: [RouterModule]
})
export class LoginComponent implements OnInit {

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  imgSource: string = '/assets/default.png';
  institutiton: string = 'fiserv';

  ngOnInit() {
    const institution = this.activatedRoute.snapshot.params['institution'] || 'default';
    this.imgSource = `/assets/${institution}.png`;
  }

  login() {
    this.router.navigate([this.institutiton, 'home']);
  }
}
