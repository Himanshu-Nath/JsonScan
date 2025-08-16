import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToXml } from './json-to-xml';

describe('JsonToXml', () => {
  let component: JsonToXml;
  let fixture: ComponentFixture<JsonToXml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonToXml]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonToXml);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
