import { Injectable } from '@angular/core';
//Response from http gives you .json() method
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

//if want to use service within a service need injectable
@Injectable()
//USING HTTP IS AN OBSERVABLE BUT IT IS NOT SENT YET B/C WE HAVEN'T SUBSCRIBED
export class ServerService {

  constructor(private http: Http) {}
  
  storeServers(servers: any[]) {
    //can set headers by creating custom object and adding it as third argument;
    const customHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    // return this.http.post('https://angular-http-22e1d.firebaseio.com/data.json', servers, {headers: customHeaders});
    return this.http.put('https://angular-http-22e1d.firebaseio.com/data.json', servers, {headers: customHeaders});
  }

  //map allows us to transform the data in this file instead of having to do it in multiple other files like we initially did in app.component.ts
  //need to import 'rxjs/Rx' to use this b/c it is part of the observable library
  getServers() {
    return this.http.get('https://angular-http-22e1d.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          //can add loop within the .map() method
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          console.log(error);
          //since we are subscribing to the http observable in app.component.ts, we need to return an observable even in the error message; this we need this code below
          return Observable.throw('KYLE, SOMETHING WENT WRONG__' + error);
        }
      )
  }

  getAppName() {
    return this.http.get('https://angular-http-22e1d.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
  }

}




//don't forget to add ServerService to providers in app.module; need to do this for every observable
//make sure you have HTTP module in imports in app.component