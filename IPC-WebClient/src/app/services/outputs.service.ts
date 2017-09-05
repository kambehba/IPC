import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Output} from '../models/outputModel';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OutputsService {

 //private outputs:Output[]; 
  //private output:Output;
  private qq =[];
  constructor(private http:Http) 
  { 
    //this.output = new Output('','OFF') 
    //this.outputs = new Array<Output>();

  }

   getOutput():Observable<Output[]> {
       // return this.http.get('http://localhost:3000/api/outputs')
           // .map((response:Response)=>response.json());

             return this.http.get('https://ipc-webserver.herokuapp.com/api/outputs')
            .map((response:Response)=>response.json());
   }

   
   
   
   editOutput(output:Output): Observable<Output>{
      const body = JSON.stringify(output);
      //const body = JSON.stringify({var1:'test1',var2:'test2'});
      //var prams = 'json=' + body;
      var prams = body;
     // this.http.get('http://localhost:3000/api/outputs')
     //      .map((response:Response)=>response.json());
    
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });


     //return this.http.put('http://localhost:3000/api/outputs',body,options)
      
     //return this.http.post('http://localhost:3000/api/outputs',prams,options)
     //  .map(this.extractData)
      // .catch(this.handleErrorObservable);

       return this.http.post('https://ipc-webserver.herokuapp.com/api/outputs',prams,options)
       .map(this.extractData)
       .catch(this.handleErrorObservable);

     
// this.http.post('http://localhost:3000/api/outputs',body);

 
    
     
   }

    private handleError(error:any){
      console.log("EEEEEEEEEEEEEEEEEEEEEEEE");
     console.log(error);
     return Observable.throw(error);
   }

   private extractData(res: Response) {
	    let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }



}
