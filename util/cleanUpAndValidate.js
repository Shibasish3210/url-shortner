export const validateRegistration = (name, username, password) => {
    return new Promise((resolve, reject)=>{
        if(!name || !username || !password) reject('Missing Credentials');

        if(typeof name !== 'string') reject('Invalid data type for Project name');
        if(typeof username !== 'string') reject('Invalid data type for Username');
        if(typeof password !== 'string') reject('Invalid data type for Password');

        if(name.length <= 3 || name.length >= 31) reject('Name must be within 4-30 characters');
        if(username.length <= 3 || username.length >= 31) reject('UserName must be within 4-30 characters');
        if(password.length <= 5 || password.length >= 21) reject('Password must be within 6-20 characters');

        resolve();
    })
}