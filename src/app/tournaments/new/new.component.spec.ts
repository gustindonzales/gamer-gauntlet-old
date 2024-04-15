import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponent } from './new.component';
import { NgxsModule } from '@ngxs/store';
import { TournamentsState } from '../store/tournaments.state';

describe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewComponent, NgxsModule.forRoot([TournamentsState])],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
