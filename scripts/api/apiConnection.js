export async function request(path) {
    try {
        const req = fetch(path);
            
        if (!req.ok) {
            return req;
        }

        const data = await req.json();
        //console.log(data);
        return req;

    } catch (err) {
        return "ERROR FETCH";
    }
}
