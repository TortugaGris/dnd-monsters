import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSkillsComponent } from './monster-skills.component';

describe('MonsterSkillsComponent', () => {
  let component: MonsterSkillsComponent;
  let fixture: ComponentFixture<MonsterSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
