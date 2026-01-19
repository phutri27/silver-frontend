export async function fetchAPi(){
    try {
        const response = await fetch("https://silver-backend-omega.vercel.app/api/price");
        if (!response.ok){
            throw new Error(`Upstream of ${response.status}`)
        }
        const datas = await response.json()
        return datas

    } catch (error) {
        throw new Error("Loi data, lien he phu ngay")
    }
}
