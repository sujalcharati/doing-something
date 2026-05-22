import {randomUUID} from "crypto";

export const makeSubscription = (req, res)=>{
    const { customerId, planId } = req.body;

    if( !customerId || !planId){
        return res.status(400).json({
            status:"customerid or planid is missing here"
        })
    }

    const customerExists = customer.find((c)=>{
         return c.id === customerId;
    })

    const planExists = plan.find((p)=>{
        return p.id === planId;
    })

    if( !customerExists || !planExists){
        return res.status(404).json({
            status:"customerid or planid doesn't exists"
        })
    }

    const newsub = {
         id:randomUUID,
         customerId,
         planId,
         status:"active",
         startedAt: new Date().toString(),
         canceledAt: null,
    }
    subscriptions.push(newsub);
    

    return res.status(201).json(newsub);
}


export const listallSubscription = (req, res)=>{
    return res.status(201).json(subscriptions);
}

export const getoneSubscription = (req, res)=>{

    const subId = req.params.id;

    const found = subscriptions.find((s)=>{
        return s.id === subId;
    })

    if(!found){
        return res.status(400).json({
            status:" subscriptions id not found"
        })
    }

    return res.status(201).json(found);
}

export const cancelSubscription = (req, res)=>{

    const subId = req.params.id;

    const found = subscriptions.find((s)=>{
        return s.id === subId;
    })

    if(!found){
        return res.status(404).json({
            status:" subscription not found!"
        })
    }

    if (found.status == "canceled"){
        return res.status(209).json({
            status:"subscrptions already cancelled"
        });
    }

    found.status = "cancelled";
    found.canceledAt = now Date().toISOstring();

    return res.status(201).json(subscriptions);
}

export const resumeSubscription = (req, res)=>{
    
}

