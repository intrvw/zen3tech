import { createSlice } from "@reduxjs/toolkit"

const GallerySlice=createSlice({
    name:'GallerySearch',
    initialState:{
        data:null,
        likedData:{}
    },
    reducers:{
        setGalleryData(state,action){
            state.data=action.payload
        },
        addNewPost(state,action){
            const getPic=getPicDataWithId(action.payload.keyId, state.data)
            const nComments=[...getPic.comments, action.payload.comment]
            getPic.comments=nComments 
        },
        updateLikeToPost(state,action){
            const getPic=getPicDataWithId(action.payload.keyId, state.data)
            state.likedData = {...state.likedData, [getPic.id]: action.payload.like}
            const likes=getPic.likes
            getPic.likes=action.payload.like ? likes+1 : likes-1;
        },
        sortDataByPost(state,action){
            if(action.payload.sortBy == "like"){
                const sortedData=sortDataByLikes(state.data)
                console.log(sortedData)
                state.data=sortedData
            }else if(action.payload.sortBy == "comment"){
                const sortedData=sortDataByComments(state.data)
                console.log(sortedData)
                state.data=sortedData
            }
            
        },
        deletePost(state,action){
            const getPic=getPicDataWithId(action.payload.keyId, state.data)
            const indexPos=searchComment(getPic.comments, action.payload.comment)
            getPic.comments.splice(indexPos,1)
        }
    }
})


const getPicDataWithId=(id, objData)=>{
    return objData.find(x => x.id === id)
}

const sortDataByLikes=(data)=>{
    return data.sort((item1, item2)=> item2.likes - item1.likes)
}

const sortDataByComments=(data)=>{
    return data.sort((item1, item2)=> item2.comments.length - item1.comments.length)
}

const searchComment=(objData, comment)=>{
    return objData.indexOf(comment)
}

export const { setGalleryData, addNewPost, updateLikeToPost, sortDataByPost, deletePost } = GallerySlice.actions;
export default GallerySlice.reducer