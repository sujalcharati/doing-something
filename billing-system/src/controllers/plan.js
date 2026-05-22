import { randomUUID} from "crypto";

export const createPlan = (req, res)=>{
    
    try{

        const { name, price, currency, interval, createdAt} = req.body;
    
        if( !name || !price || !currency || !interval || !createdAt){
            return res.status(404).json({
                status:"missing cred!"
            })
        }
    
        plans.push({
            id: randomUUID,
            name,
            price,
            currency,
            interval,
            createdAt
        });
    
        return res.status(201).json({
            status: "Plan created succesfully"
        })
    }catch(err){
        console.error('the error is',err);
    }

}

export const listallPlans = (req, res) =>{

    return res.status(200).json(plans);
}

export const getonePlan = (req, res)=>{
    
    const planid = req.params.id;

    const found = plans.find((p)=>{
        return p.id === planid
    })

    if(!found){
        return res.status(404).json({
            status:"plan not found"
        })
    }

    return res.status(200).json(found);
}

export const updatePlan = (req,res)=>{

    const planid = req.params.id;
    const found = plans.find((p)=>{
        return p.id === planid;
    })

    const updates = req.body;

    Object.assign(plan, updates);
    plan.id = planid;

    return res.status(201).json(plan);
}

export const removePlan = (req, res)=>{

    const planid = req.params.id;

    const index = plan.findIndex((p)=>{
        return p.id === planid;
    })

    if(index == -1){
        return res.status(404).json({
            status:"plan not found"
        })
    }

    plan.slice(index,1);
    return res.status(201).json(plan);


}