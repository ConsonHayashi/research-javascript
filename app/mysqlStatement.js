const dealValue =  (value) => {
    const resultValue = (typeof value === "string") ? `"${value}"` : value;
    return resultValue;
}

const getSelectStatment = (tableName, index=null, value=null) => {
    if (index == null && value==null){
        return `SELECT * FROM ${tableName};`;
    } else {
        value = dealValue(value);
        return `SELECT * FROM ${tableName} where ${index} = ${value};`;
    }
}

const getDeleteStatement = (tableName, index, value) => {
    value = dealValue(value);
    return `DELETE FROM ${tableName} where ${index} = ${value};`;
}

const getUpdateStatement = (tableName, index, value) => {
    value = dealValue(value);
    return `UPDATE ${tableName} SET ${index} = ${value};`;
}

let result 
const test = _ => {
    result = getSelectStatment('students', 'student_name', '张四')
    result = getSelectStatment('students', 'student_age', 15)
    // result = select('students')
    result = getDeleteStatement('students', 'student_name', '张四')
    console.log(result); 
}

test()