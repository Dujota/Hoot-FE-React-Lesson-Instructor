import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import hootService from "../../services/hootService";


const HootDetails = (props) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

  useEffect(()=>{
    async function getHoot(){
      const hootData = await hootService.show(hootId)
      setHoot(hootData)
    }
    getHoot()
  },[hootId])


  if(!hoot){
    return <main><h3>Loading...</h3></main>
  }

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} posted on &nbsp;
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;