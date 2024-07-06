import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';

type MenuItem =
  | {
      label: string;
      icon: string;
      url: string;
    }
  | {
      separator?: boolean;
    };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, RippleModule, TabViewModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Facultad',
        icon: 'pi pi-fw pi-building-columns',
        url: '/faculty',
      },
      { label: 'Materia', icon: 'pi pi-fw pi-book', url: '/subject' },
      { label: 'Material', icon: 'pi pi-fw pi-images', url: '/resources' },
    ];
  }
}
