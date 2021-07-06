import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS= [
  {
    id: 'm1',
    title: 'A first meeting',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: 'some street 1, some city',
    description: 'this is a first meetup'
  },
  {
    id: 'm2',
    title: 'A second meeting',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: 'some street 12, some city',
    description: 'this is a second meetup'
  },
];

function HomePage(){
  return <MeetupList meetups={DUMMY_MEETUPS}> </MeetupList>

}

export default HomePage;