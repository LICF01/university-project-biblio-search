import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  ActivationStart,
  Router,
  RoutesRecognized,
} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  title: string;
  constructor(private router: Router) {
    this.title = '';
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        const title = event.snapshot.routeConfig?.title;
        if (typeof title === 'string') {
          this.title = title;
        }
      }
    });
  }
}
