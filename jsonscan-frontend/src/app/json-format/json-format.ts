import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonApiService } from '../services/json-api';

@Component({
  selector: 'app-json-format',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './json-format.html',
  styleUrl: './json-format.css'
})
export class JsonFormat {
  jsonInput: string = '';
  jsonOutput: string = '';
  errorMsg: string = '';

  constructor(private jsonApiService: JsonApiService) {}

  formatJson() {
    this.errorMsg = '';
    this.jsonOutput = '';

    const rawJson = this.jsonInput.trim();
    if (!rawJson) {
      this.errorMsg = 'Please enter JSON input.';
      return;
    }

    this.jsonApiService.formatJson(rawJson).subscribe({
      next: (data) => {
        if (data.valid) {
          console.log("----1")
          console.log(data)
          this.jsonOutput = data.output;
        } else {
          console.log("----2")
          this.errorMsg = data.error || 'Invalid JSON input.';
        }
      },
      error: (err) => {
        console.log("----3")
        console.error(err);
        this.errorMsg = JSON.stringify(err.error);
      }
    });
  }

  clear() {
    this.jsonInput = '';
    this.jsonOutput = '';
    this.errorMsg = '';
  }
}
