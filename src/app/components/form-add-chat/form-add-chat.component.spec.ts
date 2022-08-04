import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddChatComponent } from './form-add-chat.component';

describe('FormAddChatComponent', () => {
  let component: FormAddChatComponent;
  let fixture: ComponentFixture<FormAddChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
