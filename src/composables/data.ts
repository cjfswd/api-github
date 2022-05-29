export async function useData(url: string) {
    const completeData = async (url: string): Promise<any[]> => {
        return await fetch(url)
            .then((res) => {
                if (res.ok) return res.json().then(res=> res.map((item:any) => item.files));
                else throw new Error("Status code error :" + res.status)
            })
            .catch(err => {
                console.log(err)
                return []
            });
    }

    const onlyFiles = await completeData(url).then(res => res).catch(err => console.log(err))

    return {
        completeData,
        onlyFiles
    }
}