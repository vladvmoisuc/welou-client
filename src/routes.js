import Connect from './containers/Connect';
import Description from './containers/Description';
import BooksPreferences from './containers/BooksPreferences';
import SportsPreferences from './containers/SportsPreferences';
import MusicPreferences from './containers/MusicPreferences';
import SeriesPreferences from './containers/SeriesPreferences';
import HobbiesPreferences from './containers/HobbiesPreferences';
import InterestsPreferences from './containers/InterestsPreferences';
import BioPreferences from './containers/BioPreferences';
import Match from './containers/Match';
import Profile from './containers/Profile';
import Notifications from './containers/Notifications';
import Chat from './containers/Chat';
import Meet from './containers/Meet';

export default [
  { route: '/', component: (props) => <Connect {...props} /> },
  {
    route: '/walkthrough/description',
    component: (props) => <Description {...props} />,
  },
  {
    route: '/walkthrough/books',
    component: (props) => <BooksPreferences {...props} />,
  },
  {
    route: '/walkthrough/sports',
    component: (props) => <SportsPreferences {...props} />,
  },
  {
    route: '/walkthrough/music',
    component: (props) => <MusicPreferences {...props} />,
  },
  {
    route: '/walkthrough/series',
    component: (props) => <SeriesPreferences {...props} />,
  },
  {
    route: '/walkthrough/hobbies',
    component: (props) => <HobbiesPreferences {...props} />,
  },
  {
    route: '/walkthrough/interests',
    component: (props) => <InterestsPreferences {...props} />,
  },
  {
    route: '/walkthrough/bio',
    component: (props) => <BioPreferences {...props} />,
  },
  { route: '/profile', component: (props) => <Profile {...props} /> },
  { route: '/match', component: (props) => <Match {...props} /> },
  {
    route: '/notifications',
    component: (props) => <Notifications {...props} />,
  },
  { route: '/chat', component: (props) => <Chat {...props} /> },
  { route: '/lets-meet', component: (props) => <Meet {...props} /> },
];
