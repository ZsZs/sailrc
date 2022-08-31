import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListContainerComponent } from './base-list-container.component';
import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Key } from '@briebug/ngrx-auto-entity';

class TestEntity implements BaseEntityInterface {
  @Key id: string;
}

describe('BaseListContainerComponent', () => {
  let component: BaseListContainerComponent<TestEntity>;
  let fixture: ComponentFixture<BaseListContainerComponent<TestEntity>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseListContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
