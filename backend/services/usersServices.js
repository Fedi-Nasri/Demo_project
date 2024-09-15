const User = require ('../models/User');
const bcrypt = require('bcryptjs');

exports.addUser = async (data) => {
    try {
        const existingUser = await User.findOne({ email:data.email });
    if (existingUser) 
        return null;

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const NewUser = await User.create({ 
        name : data.name,
        email: data.email,
        password: hashedPassword });
        return NewUser
    }catch (error) {
        throw new Error('Error creating user'); 
    }
    
};

exports.getUser = (id) =>{
    try{
        const user = User.findById(id);
        if(!user) throw new Error('User not found !');
        return user; 
    } catch(error) { 
        throw error;
    }
};