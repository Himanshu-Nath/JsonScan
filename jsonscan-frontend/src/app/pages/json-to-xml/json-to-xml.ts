import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { JsonApiService } from '../../services/json-api';

@Component({
  selector: 'app-json-to-xml',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './json-to-xml.html',
  styleUrl: './json-to-xml.css'
})
export class JsonToXml {
  jsonInput: string = '';
  xmlOutput: string = '';
  errorMsg: string = '';
  loading = false;

  constructor(private jsonApiService: JsonApiService) { }

  convertJsonToXml() {
    this.loading = true;
    this.errorMsg = '';
    this.xmlOutput = '';

    const rawJson = this.jsonInput.trim();
    if (!rawJson) {
      this.errorMsg = 'Please enter JSON input.';
      return;
    }

    try {
      this.jsonApiService.jsonToXml(rawJson).subscribe({
        next: (data) => {
          if (data.valid) {
            console.log("----1")
            console.log(data)
            this.xmlOutput = data.output;
            this.loading = false;
          } else {
            console.log("----2")
            this.errorMsg = data.error || 'Invalid JSON input.';
          }
        },
        error: (err) => {
          this.xmlOutput = 'Error converting JSON to XML.';
          this.loading = false;
          console.error(err);
          this.errorMsg = JSON.stringify(err.error);
        }
      });
    } catch (e) {
      this.xmlOutput = 'Invalid JSON format.';
      this.loading = false;
    }
  }

  clear() {
    this.jsonInput = '';
    this.xmlOutput = '';
    this.errorMsg = '';
  }

  // convertJsonToXml() {
  //   this.loading = true;
  //   try {
  //     const json = JSON.parse(this.jsonInput);

  //     this.http.post('http://localhost:3000/json/to-xml', json, { responseType: 'text' })
  //       .subscribe({
  //         next: (response) => {
  //           this.xmlOutput = response;
  //           this.loading = false;
  //         },
  //         error: (err) => {
  //           this.xmlOutput = 'Error converting JSON to XML.';
  //           this.loading = false;
  //           console.error(err);
  //         }
  //       });
  //   } catch (e) {
  //     this.xmlOutput = 'Invalid JSON format.';
  //     this.loading = false;
  //   }
  // }
}
