export default function fetchData(url) {
    return fetch(url)
        .then(function(resp){
            return resp.json();
        })
}