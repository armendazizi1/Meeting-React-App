import { Fragment } from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb'

const MONGODB_URI='mongodb://localhost:27017/meetup-react'

function MeetupDetails(props) {
  return (<MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
  />)
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1} ).toArray();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup)=>({
      params:{
        meetupId: meetup._id.toString(),
      }
    }))
  };

  client.close();
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetails;