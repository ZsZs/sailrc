import { CountdownFormFieldComponent } from '@processpuzzle/shared/widgets';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownConfig, CountdownModule, CountdownStatus } from 'ngx-countdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { defaultCountdownConfig } from './countdown-form-field.component';
import { Component, ViewChild } from '@angular/core';

describe('CountdownFormFieldComponent', () => {
  @Component({
    selector: `sailrc-host-component`,
    template: `<sailrc-countdown-form-field [value]="countdownConfig" [placeholder]="placeholder"></sailrc-countdown-form-field>`,
  })
  class TestHostComponent {
    public countdownConfig: CountdownConfig;
    @ViewChild(CountdownFormFieldComponent) public countdownFormField: CountdownFormFieldComponent;
    public placeholder: string;
  }

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let countdownFormField: CountdownFormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountdownFormFieldComponent, TestHostComponent],
      imports: [BrowserModule, CountdownModule, MatFormFieldModule],
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    countdownFormField = testHostComponent.countdownFormField;
  });

  describe('initializations', () => {
    it('should create component', () => {
      expect(countdownFormField).toBeTruthy();
    });

    it('should have CountdownComponent child', () => {
      expect(countdownFormField['countdownComponent']).toBeTruthy();
    });

    it('defines default values for CountdownConfig', () => {
      const defaultConfig = countdownFormField.value;
      expect(defaultConfig).toBeTruthy();
      expect(defaultConfig.demand).toBeFalsy();
      expect(defaultConfig.leftTime).toEqual(0);
      expect(defaultConfig.stopTime).toBeUndefined();
      expect(defaultConfig.format).toEqual('HH:mm:ss');
      expect(defaultConfig.prettyText).toBeUndefined();
      expect(defaultConfig.notify).toBeUndefined();
      expect(defaultConfig.timezone).toEqual('+0000');
    });

    it('placeholder is undefined', () => {
      expect(countdownFormField.placeholder).toBeUndefined();
    });

    it('disabled is false', () => {
      expect(countdownFormField.disabled).toBeFalsy();
    });

    it('errorState is false', () => {
      expect(countdownFormField.errorState).toBeFalsy();
    });

    it('required is undefined', () => {
      expect(countdownFormField.required).toBeUndefined();
    });

    it('empty is always false', () => {
      expect(countdownFormField.empty).toBeFalsy();
    });
  });

  describe('@Inputs', () => {
    it('value is set by parent component', () => {
      testHostComponent.countdownConfig = { ...defaultCountdownConfig, leftTime: 20 };
      testHostFixture.detectChanges();
      expect(testHostComponent.countdownFormField.value.leftTime).toEqual(20);
    });

    it('placeholder is set by parent component', () => {
      testHostComponent.placeholder = 'from_parent';
      testHostFixture.detectChanges();
      expect(testHostComponent.countdownFormField.placeholder).toEqual('from_parent');
    });

    it('CountdownEvent(s) are emitted when configuring CountdownComponent', () => {
      const countdownEventSpy = spyOn(testHostComponent.countdownFormField.countdownEvent, 'emit');
      testHostComponent.countdownConfig = { ...defaultCountdownConfig, demand: true, leftTime: 20 };
      testHostFixture.detectChanges();
      expect(countdownEventSpy).toHaveBeenCalledWith(
        // expect.objectContaining({action : 'done',status: CountdownStatus.done,left: 0,text: '00:00:00'}),
        // expect.objectContaining({action : 'start',status: CountdownStatus.ing,left: 0,text: '00:00:00'}),
        expect.objectContaining({ action: 'restart', status: CountdownStatus.pause, left: 20000, text: '00:00:20' })
      );
    });
  });

  describe('@Outputs', () => {
    it('CountdownEvent emitted on countdownComponent.begin()', () => {
      testHostComponent.countdownConfig = { ...defaultCountdownConfig, demand: true, leftTime: 20 };
      testHostFixture.detectChanges();
      const countdownEventSpy = spyOn(testHostComponent.countdownFormField.countdownEvent, 'emit');
      testHostComponent.countdownFormField.begin();
      expect(countdownEventSpy).toHaveBeenCalledWith(expect.objectContaining({ action: 'start', status: CountdownStatus.ing, left: 20000, text: '00:00:20' }));
    });
  });

  describe('DOM events', () => {
    it('mouseOver()', () => {
      countdownFormField.onMouseOver();
      expect(countdownFormField.focused).toBeTruthy();
      expect(countdownFormField.shouldLabelFloat).toBeTruthy();
    });

    it('mouseOut()', () => {
      countdownFormField.onMouseOut();
      expect(countdownFormField.focused).toBeFalsy();
      expect(countdownFormField.shouldLabelFloat).toBeFalsy();
    });
  });

  describe('Public mutators', () => {
    it('begin() starts counting down, stop() stops it', () => {
      testHostComponent.countdownConfig = { ...defaultCountdownConfig, demand: true, leftTime: 10 };
      testHostFixture.detectChanges();
      const countdownEventSpy = spyOn(testHostComponent.countdownFormField.countdownEvent, 'emit');
      testHostComponent.countdownFormField.begin();
      expect(countdownEventSpy).toHaveBeenCalledWith(expect.objectContaining({ action: 'start', status: CountdownStatus.ing, left: 10000, text: '00:00:10' }));

      testHostComponent.countdownFormField.stop();
      expect(countdownEventSpy).toHaveBeenCalledWith(expect.objectContaining({ action: 'stop', status: CountdownStatus.stop, left: 10000, text: '00:00:10' }));
    });
  });
});
