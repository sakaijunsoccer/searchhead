class Helper {
    static generateQueryString = (query) => {
        let words = query.split(' ');
        const queryStringArray = [];
        let keywords = [];
        for(let i=0; i < words.length; i++){
            let keyValues = words[i].split('=');
            if (keyValues.length === 1){
                keywords.push(encodeURIComponent(words[i]))
            }else{
                queryStringArray.push(encodeURIComponent(keyValues[0]) + '=' + encodeURIComponent(keyValues[1])) 
            }
        }
        queryStringArray.push("keywords=" + keywords.join(','))
        return queryStringArray.join('&');
    }
  }
  export default Helper;