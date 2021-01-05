import React from 'react'
import styled from 'styled-components'
import GalleryItem from './GalleryItem'

export default function GalleryList({items}) {
    return (
        <GalleryContainer>
         {
            items.map((item)=>(
                <GalleryItem keyId={item.id} imgSrc={item.url} key={item.id} likes={item.likes} category={item.category} comments={item.comments}/>
            ))}
        </GalleryContainer>
       
    )
}

const GalleryContainer=styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`