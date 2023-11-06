import { httpService } from './httpService'



async function getPops() {
    return httpService.get('pop?_limit=100')
}

async function getById(popId) {
    return await httpService.get(`pop/getPopById/${popId}`)
}

async function remove(popId) {
    return httpService.delete(`pop/${popId}`)
}

async function save(pop) {
    var savedPop
    if (pop._id) {
        savedPop = await httpService.put('pop', pop)
    } else {
        savedPop = await httpService.post('pop', pop)
    }
    return savedPop
}


function getEmptyPop() {
    return {
     title: "",
     imageName: ""
    }

}



export const popService = {
    getPops,
    getById,
    remove,
    save,
    getEmptyPop,
 
}