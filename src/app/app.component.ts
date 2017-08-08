import { Component } from '@angular/core';
import { ServerService } from './server.service';
//Response from http gives you .json() method
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers = [
    // {
    //   name: 'Testserver',
    //   capacity: 10,
    //   id: this.generateId()
    // },
    // {
    //   name: 'Liveserver',
    //   capacity: 100,
    //   id: this.generateId()
    // }
  ];

  constructor(private serverService: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  //calling method storeServers we set up in server.service
  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  }

  onGet() {
    this.serverService.getServers() 
      .subscribe(
        (servers: any[]) => {
          console.log(servers);
          this.servers = servers;
        },
        (error) => alert('There was a problem with the fetch')
      )
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
