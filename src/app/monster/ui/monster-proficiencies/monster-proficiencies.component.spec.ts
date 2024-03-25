import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterProficienciesComponent } from './monster-proficiencies.component';

describe('MonsterProficienciesComponent', () => {
  let component: MonsterProficienciesComponent;
  let fixture: ComponentFixture<MonsterProficienciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterProficienciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterProficienciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
