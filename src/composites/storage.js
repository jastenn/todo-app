const storeDataToLs = (task) => {
    localStorage.setItem('tasks', JSON.stringify(task))
}

const getDataToLs = () => {
    let data;
    if(localStorage.getItem('tasks')) {
        data = JSON.parse(localStorage.getItem('tasks'))
    } else {
        data = []
    }
    return data
}

export {storeDataToLs, getDataToLs}