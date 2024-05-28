
import { useContext } from 'react'
import { DBContext } from "./components/contexts/DBContext";
import ShareTrombinoDetails from './components/ShareTrombinoDetail';
import { useParams } from 'react-router-dom';

export default function Share(props) {
  const { db } = useContext(DBContext);
  db.autoCancellation(false);
  const { slug } = useParams();

  return (
    <>
      <ShareTrombinoDetails id={slug} />
    </>
  )
}
