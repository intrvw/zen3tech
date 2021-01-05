export const host="https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json"

const getOptions={
    method:'GET'
}

export const LoadGalleryData=(dispatch, setGalleryData)=>{
    fetch(host,getOptions).then((response)=> response.text())
    .then((res)=> dispatch(setGalleryData(JSON.parse(res).pics)))
    .catch(err => console.log(err))
}