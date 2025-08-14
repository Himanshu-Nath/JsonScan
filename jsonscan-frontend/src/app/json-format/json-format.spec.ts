import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormat } from './json-format';

describe('JsonFormat', () => {
  let component: JsonFormat;
  let fixture: ComponentFixture<JsonFormat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonFormat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonFormat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
