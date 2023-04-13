import axios from "axios"

async function useApi( url, filter) {
    const res = await axios.post(url, {
        project_id: filter.project_id,
        from: filter.from,
        to: filter.to,
    }).then(res => res)
    const data = await res.data
    return data
}

export default useApi
