import { Component, ViewChild } from '@angular/core';
import { CdTimerOptions, CountupFormFieldComponent } from '@processpuzzle/shared/widgets';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdTimerModule } from 'angular-cd-timer';
import { defaultCdTimerOptions } from './countup-form-field.component';
import { StartSignals } from '@sailrc/race/domain';

describe('CountupFormFieldComponent', () => {
  @Component({
    selector: `sailrc-host-component`,
    template: `<sailrc-countup-form-field [value]="cdTimerOptions" [placeholder]="placeholder"></sailrc-countup-form-field>`,
  })
  class TestHostComponent {
    cdTimerOptions = defaultCdTimerOptions;
    @ViewChild(CountupFormFieldComponent) public countupFormField: CountupFormFieldComponent;
    public placeholder: string;
  }

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let countupFormField: CountupFormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountupFormFieldComponent, TestHostComponent],
      imports: [BrowserModule, CdTimerModule, MatFormFieldModule],
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    countupFormField = testHostComponent.countupFormField;
  });

  describe('initializations', () => {
    it('should create component', () => {
      expect(countupFormField).toBeTruthy();
    });

    it('should have CdTimerComponent child', () => {
      expect(countupFormField['cdTimerComponent']).toBeTruthy();
    });

    it('defines default values for cdTimerOptions', () => {
      expect(countupFormField['cdTimerOptions'].startTime).toBe(0);
      expect(countupFormField['cdTimerOptions'].endTime).toBe(0);
      expect(countupFormField['cdTimerOptions'].countdown).toBeFalsy();
      expect(countupFormField['cdTimerOptions'].autostart).toBeTruthy();
      expect(countupFormField['cdTimerOptions'].maxTimeUnit).toBe('day');
      expect(countupFormField['cdTimerOptions'].format).toBe('hms');

      expect(countupFormField.startTime).toBe(0);
      expect(countupFormField.endTime).toBe(0);
      expect(countupFormField.countdown).toBeFalsy();
      expect(countupFormField.autostart).toBeTruthy();
      expect(countupFormField.maxTimeUnit).toBe('day');
      expect(countupFormField.format).toBe('hms');
    });

    it('placeholder is undefined', () => {
      expect(countupFormField.placeholder).toBeUndefined();
    });
  });

  describe('@Input', () => {
    it('value is set by parent component', () => {
      const changedOptions: CdTimerOptions = {
        startTime: 10,
        endTime: 20,
        countdown: true,
        autostart: false,
        maxTimeUnit: 'minute',
        format: 'default',
      };

      testHostComponent.cdTimerOptions = changedOptions;
      testHostFixture.detectChanges();

      // mapped from cdTimerOptions
      expect(countupFormField.startTime).toBe(10);
      expect(countupFormField.endTime).toBe(20);
      expect(countupFormField.countdown).toBeTruthy();
      expect(countupFormField.autostart).toBeFalsy();
      expect(countupFormField.maxTimeUnit).toBe('minute');
      expect(countupFormField.format).toBe('default');
    });

    it('placeholder is set by parent component', () => {
      testHostComponent.placeholder = 'from_parent';
      testHostFixture.detectChanges();
      expect(testHostComponent.countupFormField.placeholder).toEqual('from_parent');
    });
  });

  describe('@Outputs', () => {
    it('StartSignals.RecallSignal emitted at 1 minute.', async () => {
      testHostComponent.cdTimerOptions = { ...defaultCdTimerOptions, startTime: 60, endTime: 61, autostart: false };
      testHostFixture.detectChanges();
      const countupEventSpy = spyOn(testHostComponent.countupFormField.countupEvent, 'emit');
      testHostComponent.countupFormField.start();
      await new Promise((r) => setTimeout(r, 1000));
      expect(countupEventSpy).toHaveBeenCalledWith(StartSignals.RecallSignal);
    });

    it('StartEvent emitted countupFormField.start().', async () => {
      testHostComponent.cdTimerOptions = { ...defaultCdTimerOptions, startTime: 0, endTime: 1, autostart: false };
      testHostFixture.detectChanges();
      const startEventSpy = spyOn(testHostComponent.countupFormField.startEvent, 'emit');
      testHostComponent.countupFormField.start();
      await new Promise((r) => setTimeout(r, 1000));
      expect(startEventSpy).toHaveBeenCalledTimes(1);
    });

    it('StopEvent emitted countupFormField.stop().', async () => {
      testHostComponent.cdTimerOptions = { ...defaultCdTimerOptions, startTime: 0, endTime: 1, autostart: false };
      testHostFixture.detectChanges();
      const stopEventSpy = spyOn(testHostComponent.countupFormField.stopEvent, 'emit');
      testHostComponent.countupFormField.start();
      testHostComponent.countupFormField.stop();
      await new Promise((r) => setTimeout(r, 1000));
      expect(stopEventSpy).toHaveBeenCalledTimes(1);
    });

    it('CompleteEvent emitted when endTime reached.', async () => {
      testHostComponent.cdTimerOptions = { ...defaultCdTimerOptions, startTime: 1, endTime: 2, autostart: false };
      testHostFixture.detectChanges();
      const completeEventSpy = spyOn(testHostComponent.countupFormField.completeEVent, 'emit');
      testHostComponent.countupFormField.start();
      await new Promise((r) => setTimeout(r, 3000));
      expect(completeEventSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM events', () => {
    it('mouseOver()', () => {
      countupFormField.onMouseOver();
      expect(countupFormField.focused).toBeTruthy();
      expect(countupFormField.shouldLabelFloat).toBeTruthy();
    });

    it('mouseOut()', () => {
      countupFormField.onMouseOut();
      expect(countupFormField.focused).toBeFalsy();
      expect(countupFormField.shouldLabelFloat).toBeFalsy();
    });
  });

  describe('properties', () => {
    it('empty returns always false', () => expect(countupFormField.empty).toBeFalsy());
    it('value returns cdTimerOption', () => expect(countupFormField.value).toBe(countupFormField['cdTimerOptions']));
  });
});
