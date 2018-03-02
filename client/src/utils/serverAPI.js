const MAIN_URI = 'http://localhost:3001';
const headers = {
    "Content-Type": "application/json"
}

export const getCompanies = () => {
    return fetch(`${MAIN_URI}/companies`, {headers}).then(res => res.json())
}

export const getPeopleByCompany = (company) => {
    return fetch(`${MAIN_URI}/companies/${company}/people`, {headers}).then(res => res.json())
}

export const addCompany = ({name, address, revenue, phone}) => {
    return fetch(`${MAIN_URI}/companies`, {headers, method:'POST', body: JSON.stringify({
            name,
            address,
            revenue,
            phone
        })
    }).then(res => res.json())
    .then((json) => json)
}

export const addPerson = ({name, companyId, email}) => {
    return fetch(`${MAIN_URI}/person`, {headers, method:'POST', body: JSON.stringify({
            name,
            companyId,
            email
        })
    }).then(res => res.json())
    .then((json) => json)
}

export const updateCompany = (companyId='', {name, address, revenue, phone}) => {
    return fetch(`${MAIN_URI}/companies/${companyId}`, {headers, method:'PUT', body: JSON.stringify(
        {
            name,
            address,
            revenue,
            phone
        }
    )
}).then(res => {return;})
}

export const updatePerson = (personId='', {name, companyId, email}) => {
    return fetch(`${MAIN_URI}/person/${personId}`, {headers, method:'PUT', body: JSON.stringify(
        {
            name,
            companyId,
            email
        }
    )
}).then(res => {return;})
}

export const deletePerson = (personId) => {
    return fetch(`${MAIN_URI}/person/${personId}`, {headers, method:'DELETE'})
        .then(()=> {return;})
}