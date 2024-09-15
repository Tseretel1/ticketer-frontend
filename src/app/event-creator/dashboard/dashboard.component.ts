import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Result ,BarcodeFormat } from '@zxing/library';
import { ScanServiceService } from './scan-service.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ZXingScannerModule,MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  qrCodeResult: string | null = null;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  constructor(private service :ScanServiceService, private datePipe :DatePipe) {}

  Response : any ={};  

  Expired  :boolean = false;
  IsActive :boolean = false;
  showNotActive :boolean = false
  onCodeResult(result: string) {
    if (result!=null) {
      this.isScanerOpened = false;
      this.service.Scannticket(result).subscribe(
        (resp)=>{
          console.log(this.Response),
          this.Response = resp; 
          this.Expired = resp.isExpired
          this.IsActive = resp.isActive
          this.showNotActive = true;
          this.DelayScanned();
        },
        (error)=>
          console.log(error)
      )
    }
  }

  DelayScanned(){
    setTimeout(() => {
      this.isScanerOpened = true
    }, 2000);
    setTimeout(() => {
      this.Expired = false,
      this.IsActive  = false,
      this.showNotActive = false
    }, 3000);
  }

  isScanerOpened:boolean = true;
  OpenScanner(){
    if(this.isScanerOpened == false){
      this.isScanerOpened = true;
    }
    else{
      this.isScanerOpened = false;
    }
  }


  monthNames:any = {
    1: 'January',   2: 'February',  3: 'March',     4: 'April',
    5: 'May',       6: 'June',      7: 'July',      8: 'August',
    9: 'September', 10: 'October',  11: 'November', 12: 'December'
};

MonthNumber : number = 0;
MonthName: string = " ";
DayNumber: number = 0;
Hour : string = "" ;

  formatDate(date: string | null): string {
    if (!date) {
      return ''; 
    }
    const Month = this.datePipe.transform(date, 'M');
    if (Month) {
      this.MonthNumber = parseInt(Month, 10);
    }
    const Day = this.datePipe.transform(date, 'd');
    const Hour = this.datePipe.transform(date,'h : mm')
    this.MonthName = this.monthNames[ this.MonthNumber ];
    return this.MonthName + " " + Day;
  }
  formatHour(date: string | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    const formattedHour = this.datePipe.transform(parsedDate, 'h:mm '); 
    return formattedHour || '';
  }
  
}
