import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceTwentyFacesTwentyComponent } from './dice-twenty-faces-twenty.component';

describe('DiceTwentyFacesTwentyComponent', () => {
  let component: DiceTwentyFacesTwentyComponent;
  let fixture: ComponentFixture<DiceTwentyFacesTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceTwentyFacesTwentyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceTwentyFacesTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
