import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HelpingHands } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('HelpingHands Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpingHands],
      imports: [
        IonicModule.forRoot(HelpingHands)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HelpingHands);
      fixture.detectChanges();
      component = fixture.componentInstance;
    });
  }));


  beforeEach(() => {
    // fixture = TestBed.createComponent(HelpingHands);
    // component = fixture.componentInstance;

  });

  it('should be created', () => {
    expect(component instanceof HelpingHands).toBe(true);
  });

  it('should be created', () => {
    expect(component instanceof HelpingHands).toBe(true);
  });


  // it('should have two pages', () => {
  //   expect(component.pages.length).toBe(2);
  // });

});
