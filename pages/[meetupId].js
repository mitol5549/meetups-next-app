// our-domain.com/[meetupId]

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../components/meetups/MeetupDetail';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://mitol5549:s5dV7PQTj1s9ZBvo@cluster0.8laixvg.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(content) {
  // fetch data for a single meetup

  const meetupId = content.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://mitol5549:s5dV7PQTj1s9ZBvo@cluster0.8laixvg.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
