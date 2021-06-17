const storeDataToLs = (task) => {
    localStorage.setItem('tasks', JSON.stringify(task))
}

const getDataToLs = () => {
    let data;
    if(localStorage.getItem('tasks')) {
        data = JSON.parse(localStorage.getItem('tasks'))._value
    } else {
        data = []
    }
    return data
}

export {storeDataToLs, getDataToLs}