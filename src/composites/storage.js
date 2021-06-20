const storeDataToLs = (task) => {
    localStorage.setItem('myTasks', JSON.stringify(task))
}

const getDataToLs = () => {
    let data;
    if(localStorage.getItem('myTasks')) {
        data = JSON.parse(localStorage.getItem('myTasks'))._value
    } else {
        data = []
    }
    return data
}

export {storeDataToLs, getDataToLs}