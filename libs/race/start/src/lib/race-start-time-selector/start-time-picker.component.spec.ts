import { StartTimePickerComponent } from './start-time-picker.component';
import { NGXLogger } from 'ngx-logger';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { RaceStartModule } from '../race-start.module';

describe('RaceStartTimeSelectorComponent', () => {
  let component: StartTimePickerComponent;
  let fixture: MockedComponentFixture<StartTimePickerComponent, {/* noop */}>;
  const now = new Date();

  beforeEach(() => {
    return MockBuilder(StartTimePickerComponent, RaceStartModule )
      .provide({provide: NGXLogger, useValue: {debug: () => {/* noop */}} as Partial<NGXLogger>});
  });

  beforeEach(() => {
    fixture = MockRender(StartTimePickerComponent );
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  describe('initializations', () => {

    beforeEach(() => {
      fixture = MockRender(StartTimePickerComponent, {} );
      component = fixture.point.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it( 'should default showControls: true', () => {
      expect( component.showControls ).toBeTruthy();
    });

    it( 'should default timeSelectMode: LeftTime', () => {
      expect(component.timeSelectMode).toEqual( 'LeftTime' );
    });
  });

  describe('Angular Lifecycle hooks', () => {
    it( 'should OnInit calculate current time ', function() {
      const currentTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      expect( component.currentTime ).toEqual( currentTime );
    });
  });

  describe('@Inputs', () => {
    beforeEach(() => {
      fixture = MockRender(StartTimePickerComponent, {showControls: false, stopTime: now.getMilliseconds() });
      component = fixture.point.componentInstance;
      fixture.detectChanges();
    });

    it( 'should showControls override', () => {
      expect( component.showControls ).toBeFalsy();
    });

    it( 'should stopTime override', () => {
      expect( component.stopTime ).toEqual( now.getMilliseconds() );
    });
  });

  describe('@Outputs', () => {
    // TODO: define test for @Output
  });

  describe('DOM events', () => {
    // TODO: define test for DOM events
  });

  describe('Attributes', () => {
    // TODO: define test for component attributes
  });
});
