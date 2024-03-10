import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HagtagComponent } from './hagtag.component';

describe('HagtagComponent', () => {
  let component: HagtagComponent;
  let fixture: ComponentFixture<HagtagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HagtagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HagtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
