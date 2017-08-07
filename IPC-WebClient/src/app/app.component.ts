import { Component,OnInit } from '@angular/core';
import {OutputsService} from './services/outputs.service'
//import {Output} from './models/outputModel';
import {Output} from './models/outputModel';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 private outputs:Output[]=[];
 private gg:string;
 private errormessage:string;
 private postdata:String;
  constructor(private ts:OutputsService)
  {
    // this.outputs = Output[];
      // this.gg = "ss";
      var dd = this.ts.getOutput();
      console.log("*************"+dd);
  }
  
    OnButtonClicked(output)
    {
       this.outputs[output.id].status = 'ON'
       
       
       this.ts.editOutput(this.outputs[output.id]).subscribe(
         error=>alert(error),
         () => console.log("FINISHED")
       );
      
    }

    OFFButtonClicked(output)
    {
      this.outputs[output.id].status = 'OFF'

      this.ts.editOutput(this.outputs[output.id]).subscribe(
        error=>alert(error),
        () => console.log("FINISHED")
      );
      
    }

    ngOnInit()
    {
      this.getOutputs();
    }

    getOutputs(){
       this.ts.getOutput().subscribe(o => this.outputs = o as Output[]
       ,error => this.errormessage = <any>error);
      
    }



}
