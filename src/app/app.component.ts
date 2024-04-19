import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { 
      label: 'inicio', 
      link: 'inicio', 
      action: this.onClick.bind(this) 
    },
    { 
      label: 'usuarios',
      link: 'usuarios', 
      action: this.onClick.bind(this) 
    },
  ];
  

  public gridData: any[] = [
    {
        ProductID: 1,
        ProductName: 'Chai',
        UnitPrice: '18',
        Category: {
            CategoryID: '1',
            CategoryName: 'Beverages'
        }
    },
];

  private onClick() {
    //alert('Clicked in menu item');
  }
}
