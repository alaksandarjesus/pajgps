import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-layout-1',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink, MatToolbarModule],
  templateUrl: './layout-1.component.html',
  styleUrl: './layout-1.component.scss'
})
export class Layout1Component {

  constructor(private router:Router){}

  onLogout(event:any){
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
