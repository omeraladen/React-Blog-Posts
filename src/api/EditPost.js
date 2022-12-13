import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({
    posts, handleSubmit , editTitle , editBody , setEditTitle, setEditBody
}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {

    }, [posts , setEditBody, setEditTitle])
  return (
    <div>

    </div>
  )
}

export default EditPost;