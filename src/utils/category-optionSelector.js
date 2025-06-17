export function categoryOptionSelector(option) {
    const category = [
        {value: 'tv-show', title: 'TV Show'},
        {value: 'animation', title: 'Animation'},
        {value: 'movie', title: 'Movie'},
        {value: 'documentary', title: 'Documentary'},
        {value: 'short-film', title: 'Short Film'}
    ]

    for( let obj of category){
        if (obj.title == option){
            obj.selected = true ;
        }
    }
    
    return category ;
    
}