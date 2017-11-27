import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HelpingHands } from './app.component';
import {ProfilePage} from "../pages/profile/profile";
import {HomePage} from "../pages/home/home";
import {} from 'jasmine';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

let comp: HelpingHands;
let fixture: ComponentFixture<HelpingHands>;

describe('Component: Root Component', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [HelpingHands],
      providers: [
        {provide: SplashScreen},

      ],
      imports: [
        IonicModule.forRoot(HelpingHands)
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HelpingHands);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('displays the product page to the user', () => {
    expect(comp['rootPage']).toBe(HomePage);
  });

});
