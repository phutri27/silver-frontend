export async function fetchAPi(){
    try {
        const response = await fetch("api/api/price-data");
        if (!response.ok){
            throw new Error(`Upstream of ${response.status}`)
        }
        const datas = await response.json()
        let price;
        for (const data of datas){
            if (data.includes('Ngân Long Quảng Tiến 999 - 1 lượng')){
                price = data[2]
                break
            }
        }
        const priceArr = price.split(",")
        const result = Number(priceArr.join(""))
        return result

    } catch (error) {
        throw new Error("Loi data, lien he phu ngay")
    }
}
