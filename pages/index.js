import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb'

const MONGODB_URI='mongodb://localhost:27017/meetup-react'

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

function HomePage(props){
  
  return <MeetupList meetups={props.meetups}> </MeetupList>

}

export async function getStaticProps(){
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup)=>({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      
    },
    revalidate: 1,
  }
}

export default HomePage;