import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSpeedComponent } from './monster-speed.component';

describe('MonsterSpeedComponent', () => {
  let component: MonsterSpeedComponent;
  let fixture: ComponentFixture<MonsterSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSpeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
