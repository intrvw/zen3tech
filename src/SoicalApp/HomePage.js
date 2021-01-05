import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadGalleryData } from "../Config/host";
import { Input, Link } from "../StyleComponents";
import { setGalleryData } from '../Redux/GallerySlice'
import { useDispatch, useSelector } from "react-redux";
import GalleryList from "./GalleryList";
import { GallerySelector } from "../Redux/Selectors";
import { sortDataByPost } from '../Redux/GallerySlice'


export default function HomePage() {

    const dispatch = useDispatch()
    const { data } = useSelector(GallerySelector)
    const [filterData, setFilteredData]=useState(data)
    useEffect(() => {
        if(data === null) { 
          LoadGalleryData(dispatch, setGalleryData) 
        }
        setFilteredData(data)
    }, [data, setFilteredData])

    const handleMostLiked=(type)=>{
      dispatch(sortDataByPost({ sortBy: type}))
    }

    const handleSearchChange=(e)=>{
      const { value } = e.target
      const lowerCasedValue=value.toLowerCase()
      setFilteredData(prevValue => {
        const filteredData= data.filter(el=> el.category.toLowerCase().includes(lowerCasedValue))
        return filteredData
      })
    }

  return (
    <>
      <TitleBar>Imaginary</TitleBar>
      <TopBar>
        <Link href="#" onClick={()=>handleMostLiked("like")}>Most Liked</Link> |
        <Link href="#" onClick={()=>handleMostLiked("comment")}>Most Commented</Link>
        <SearchDiv>
          <Input
            type="text"
            name="search"
            onChange={handleSearchChange}
            placeholder="Search Images....."
          />
        </SearchDiv>
      </TopBar>
      { filterData !== null && <GalleryList items={filterData}/> }
    </>
  );
}

const TitleBar = styled.div`
  background-color: lightblue;
  text-align: center;
  color: blue;
  // height: 100vw;
  padding: 1vw;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  align-items: center;
  padding: 0 1vw 0 1vw;
`;

const SearchDiv = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: center;
`;




