import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private router:Router){}
  searchProductsByText(value:string)
{
  this.router.navigateByUrl(`search/${value}`);

}
}
