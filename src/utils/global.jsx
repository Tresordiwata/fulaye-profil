// export const BACKEND = "http://192.168.43.184/root/backend-fulaye/";
// export const BACKEND = "http://localhost/root/backend-fulaye/";
export const BACKEND = "https://api.fulaye.com/fulaye/";
export const API = BACKEND + "api.php";
export const getData = async (qry, id = null) => {

    let resultat = {};
    await fetch(`${API}?qry=${qry}`, { method: "GET" }).then(r => r.json()).then(r => {
        resultat = r;
    }).catch(r => {
        resultat = { "success": false, "msg": r }
    });
    return resultat;
}
export const postData = async (qry, data, id = null) => {

    let resultat = {};
    let form = new FormData(); 
    form.append("add", qry);
    form.append("data", JSON.stringify(data)); 


    await fetch(`${API}`, { method: "POST", body: form }).then(r => r.json()).then(r => {
        resultat = r;
    }).catch(r => {
        resultat = { "success": false, "msg": r }
    });
    return resultat;
}
export const Btn = ({ text, color, bg,href,width }) => {
    return (
        <div 
            className={`${bg || 'bg-blue-600 '} rounded-md min-w-44 w-80 px-9 py-2`} 
            style={{backgroundColor:bg || '#2563eb', padding:"5px 5px",minWidth:"170px", width:width ||null}} 
        >
            <a className={` min-w-80 py-2 w-80 text-white rounded-md items-center justify-center flex px-9`} href={href || "#"}>
                {text}
            </a>
        </div>
    )
}