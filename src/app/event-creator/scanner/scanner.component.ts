import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss'
})
export class ScannerComponent {

  scannedResult: string | null = null;

  handleQrCodeResult(result: string) {
    this.scannedResult = result;
    console.log('Scanned QR Code:', result);
  }
}
