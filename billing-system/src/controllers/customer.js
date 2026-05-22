import { randomUUID } from "crypto"


export const listallCustomers =  (req, res) =>{

    return res.status(200).json(customer);
}

export const getCustomer = (req, res)=>{

    const userid = req.params.id;
    const found = customer.find((c)=>{
        return c.id === userid;
    })

    if(!found){
        return res.status(404).json({
            status:"Particular user not found"
        })
    }
    return res.status(200).json(found);
}

export const createCustomer =  (req, res )=>{

    const { email, passoword, username } = req.body;

    if( !email || !passoword || !username){
        return res.status(400).json({
           status:"Some credentials missing here" 
        })
    }

    const foundUser = customer.find((c)=>{
        return  c.email === email
    })

    if( foundUser){
        return res.status(409).json({
            status:"Already user found"
        })
    }

    customer.push({
        id: randomUUID,
        username,
        email,
        passoword
    })

    return customer;

}

export const updateUser = (req, res )=>{

    const userid = req.params.id;

    const found = customer.find((c)=>{
        return c.id === userid;
    })

    if(!found){
        return res.status(404).json({
            status:"user not found by this id"
        })
    }

    const updates = req.body;

    Object.assign(found, updates);
    found.id = userid;

    return res.status(200).json(found);
    
}

export const deleteUser = (req, res)=>{
    const userid = req.params.id;

    const index = customer.findIndex((c)=>{
        return c.id === userid;
    })

    if( index === -1){
        return res.status(404).json({
            status:"index not found for the user"
        })
    }

    customer.splice(index,1);

    return res.status(204).json({
        status:"user removed successfully !"
    })


}