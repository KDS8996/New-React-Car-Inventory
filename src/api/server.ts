let token = '6f05c5077fed2b781c84ec842c4e6be0';

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://new-flask-shell-car-inventory.onrender.com/api/cars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cars from server')
        }

        return await response.json();
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://new-flask-shell-car-inventory.onrender.com/api/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to create new car on server');
        }

        return await response.json();
    },

    update: async (id: string, data: any = {}) => {
        const response = await fetch(`https://new-flask-shell-car-inventory.onrender.com/api/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update car on server');
        }

        return await response.json();
    },

    delete: async(id: string) => {
        const response = await fetch(`https://new-flask-shell-car-inventory.onrender.com/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete car from server');
        }

        return await response.json();
    }
}
