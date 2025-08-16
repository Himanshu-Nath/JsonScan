import { Component } from '@angular/core';
import { JsonApiService } from '../../services/json-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './qr-code.html',
  styleUrl: './qr-code.css'
})
export class QRCode {

  jsonInput: string = '';
  qrCodeUrl: string | null = null;
  errorMsg: string = '';

  constructor(private jsonApiService: JsonApiService) { }

  generateQrCode() {
    this.errorMsg = '';
  
    const rawJson = this.jsonInput.trim();
    if (!rawJson) {
      this.errorMsg = 'Please enter JSON input.';
      return;
    }
  
    try {
      const parsedJson = JSON.parse(rawJson);
  
      this.jsonApiService.jsonToQRCode(parsedJson).subscribe({
        next: (blob) => {
          if (this.qrCodeUrl) {
            URL.revokeObjectURL(this.qrCodeUrl);
          }
          this.qrCodeUrl = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('QR Code generation failed:', err);
  
          // This happens when backend sends JSON error but Angular expects a blob
          if (err.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const parsed = JSON.parse(reader.result as string);
                this.errorMsg = parsed.message || 'Unknown error from server.';
              } catch {
                this.errorMsg = 'Error: ' + reader.result;
              }
            };
            reader.readAsText(err.error);
          } else {
            this.errorMsg = err.message || 'Unexpected error occurred.';
          }
        }
      });
  
    } catch (e) {
      this.errorMsg = 'Invalid JSON input.';
      console.error('JSON parsing error:', e);
    }
  }  

  clear() {
    this.jsonInput = '';
    this.qrCodeUrl = null;
    this.errorMsg = '';
  }
}
