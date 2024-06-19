import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryProductsComponent } from './subcategory-products.component';

describe('SubcategoryProductsComponent', () => {
  let component: SubcategoryProductsComponent;
  let fixture: ComponentFixture<SubcategoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoryProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
