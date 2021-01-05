import React from "react";
import styled from "styled-components";

export default function FullScreenDialog({image, close}) {
  return(
      <Dialog>
        <Close href="#" class="closebtn" onClick={close}>&times;</Close>
        <img src={image}/>
      </Dialog>
  )
}

const Dialog = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  justify-content: center;

  & > img {
    width: 50%;
    padding: 5%;
    z-index: 2;
  }
`

const Close = styled.a`
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
  color: #818181;
`

