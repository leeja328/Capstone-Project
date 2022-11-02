let token = 'd123f7e134630cac7f1cbd88f7b187c96385152e8688bc1a'

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://really-neat-drones123.herokuapp.com/api/drones`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    getfood: async (query: string) => {
        const response = await fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${query}`,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4a9ffe65b7mshf589ad9bba8271bp161ed5jsnb5fe9f58258c',
                'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data:any )=> {
        const response = await fetch(`https://really-neat-drones123.herokuapp.com/api/drones`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },

    update: async(id:string,data: {}) => {
        const response = await fetch(`https://really-neat-drones123.herokuapp.com/api/drones/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error(`Failed to Update Drone Id ${id} on server`)
        }

        return await response.json()
    },

    delete: async(id:string) => {
        const response = await fetch(`https://really-neat-drones123.herokuapp.com/api/drones/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });

        if(!response.ok){
            throw new Error(`Failed to Delete Drone Id ${id} on server`)
        }

        return await response.json()
    },

}