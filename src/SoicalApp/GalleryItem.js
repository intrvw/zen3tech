import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, Input, Link } from "../StyleComponents";
import { addNewPost } from "../Redux/GallerySlice";
import { useDispatch, useSelector } from "react-redux";
import { GallerySelector } from "../Redux/Selectors";
import { updateLikeToPost, deletePost } from "../Redux/GallerySlice";
import FullScreenDialog from "../Components/FullScreenDialog";

export default function GalleryItem({
  keyId,
  imgSrc,
  likes,
  category,
  comments,
}) {
  const inpRef = useRef();
  const dispatch = useDispatch();
  const { likedData } = useSelector(GallerySelector);
  const [liked, setLiked] = useState(() =>
    likedData[keyId] === undefined ? false : likedData[keyId]
  )
  const [open,setOpen]=useState(false)

  const handleNewPost = () => {
    const value = inpRef.current.value;
    if (value.length === 0) alert("enter atleast one character");
    else {
      const payload = {
        keyId,
        comment: value,
      };
      dispatch(addNewPost(payload));
      inpRef.current.value = "";
    }
  };

  const handleLike = () => {
    const payload = { keyId, like: !liked };
    dispatch(updateLikeToPost(payload));
    setLiked(!liked);
  };

  const handleDelete = (value) => {
    const payload = { keyId, comment: value };
    dispatch(deletePost(payload));
  };

  const handleCloseDialog=()=>{
    setOpen(false)
  }

  return (
    <Card> 
      <CardImage src={imgSrc} onClick={()=>setOpen(true)}/>
      <CardOptions>
        <p>{likes}</p>
        <Link href="#" onClick={handleLike}>
          {liked === undefined || liked === false ? "Like" : "Unlike"}
        </Link>
        <Category>{category}</Category>
      </CardOptions>
      <CommentInp>
        <Input
          style={{ flexGrow: 2 }}
          ref={inpRef}
          type="text"
          name="post"
          placeholder="Type your comment here"
        />
        <Button onClick={handleNewPost}>Post</Button>
      </CommentInp>
      <CardComments>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment}>
              {comment}
              <DeleteBtn onClick={() => handleDelete(comment)}>
                Delete
              </DeleteBtn>
            </Comment>
          ))}
      </CardComments>
      {open && <FullScreenDialog image={imgSrc} close={handleCloseDialog}/> }
    </Card>
  );
}

const Card = styled.div`
  max-width: 30%;
  flex-grow: 1;
  width: 33%;
  margin: 1vw;
`;

const CardImage = styled.img`
  width: 100%;
  min-height: 300px;
  max-height: 300px;
`;

const CardOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 2vw;
`;

const Category = styled.p`
  flex-grow: 2;
  text-align: right;
  padding-right: 1vw;
`;

const CommentInp = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 1vw;
  flex-wrap: wrap;
`;
const CardComments = styled.div`
  min-height: 200px;
  max-height: 200px;
  overflow: scroll;
`;
const Comment = styled.div`
  border: 1px solid black;
  background-color: lightgreen;
  word-wrap: break-word;
  padding: 4px;
`;

const DeleteBtn = styled.button`
  background-color: #008cba;
  padding: 0 1vw;
  float: right;
`;
