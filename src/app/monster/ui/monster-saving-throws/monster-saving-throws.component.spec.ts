import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSavingThrowsComponent } from './monster-saving-throws.component';

describe('MonsterSavingThrowsComponent', () => {
  let component: MonsterSavingThrowsComponent;
  let fixture: ComponentFixture<MonsterSavingThrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSavingThrowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterSavingThrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
