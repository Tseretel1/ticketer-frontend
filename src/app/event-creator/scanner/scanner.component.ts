import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerService } from './scanner.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [
    CommonModule,
    ZXingScannerModule,
    TranslateModule,
    MatIcon
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss'
})
export class ScannerComponent {

  
  constructor(public service :ScannerService){
  }
  isScannerOpen :boolean = true;
 

  openScanner (){
    this.isScannerOpen = true;
  }
  HideScanner (){
    this.isScannerOpen = false;
  }


  scanedResult: any = {};

  scannQr(ticketID: string) {
    this.isScannerOpen = false;
    this.service.scannOneTime(ticketID).subscribe(
      (resp)=>{
        this.scanedResult =resp;
      },
      (error)=>{

      }
    )
  }


}
