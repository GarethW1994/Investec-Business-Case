import { Component } from '@angular/core';
import { EntityComponent } from './entities/entity.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  classname: string = "";
  component: string = "Entities";

  onBranches(event) {
    this.component = event.target.innerText;
  }

}
