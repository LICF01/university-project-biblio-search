import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyFormComponent } from './bibliography-form.component';

describe('BibliographyFormComponent', () => {
  let component: BibliographyFormComponent;
  let fixture: ComponentFixture<BibliographyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliographyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliographyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
