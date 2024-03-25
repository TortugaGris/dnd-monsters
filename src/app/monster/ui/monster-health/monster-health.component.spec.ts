import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterHealthComponent } from './monster-health.component';

describe('MonsterHealthComponent', () => {
  let component: MonsterHealthComponent;
  let fixture: ComponentFixture<MonsterHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterHealthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
