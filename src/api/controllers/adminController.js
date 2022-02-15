import Adult from "../models/adult";
import Minor from "../models/minor";


// const signup = (req, res) => {

//     const admin = new Admin(req.body);
//     admin.save((err, admin) => {
//         if (err) {
//             return res.status(400).send(err)
//         }
//         res.send(admin)
//     })

// }
const SearchUser = async (req, res) => {
if(req.body.choice ==="adult"){
    const {
        cin,
        dateFinCin
    } = req.body;
    const data = await Adult.findOne({cin : cin,dateFinCin : dateFinCin}).exec()
    if(data){
        if(data.dose1==false){
            return res.status(400).json({
            status: false,
            msg:"dose1"
         })
        }
        if(data.dose2==false){
            return res.status(400).json({
                status: false,
                msg:"dose2"})
            }
        if(data.dose3==false){
            return res.status(400).json({
                status: false,
                msg:"dose3"
            })
                }
                else{
                    return res.status(400).json({
                        status:true,
                        msg:"download pass v"
                    })
                }
    }else{
        return res.status(400).json({
            status:true,
            msg:"Pas encore Enregistre"
        })
    }  
    }else{
        const {
            cne,
        } = req.body;
        const data = await Minor.findOne({cne : cne}).exec()
        if(data){
            if(data.dose1==false){
                return res.status(400).json({
                status: false,
                msg:"dose1"
             })
            }
            if(data.dose2==false){
                return res.status(400).json({
                    status: false,
                    msg:"dose2"})
                }
            if(data.dose3==false){
                return res.status(400).json({
                    status: false,
                    msg:"dose3"
                })
                    }
                    else{
                        return res.status(400).json({
                            status:true,
                            msg:"download pass v"
                        })
                    }
        }else{
            return res.status(400).json({
                status:true,
                msg:"Pas encore Enregistre"
            })
        }
    }

}

const storeAdult = async (req,res)=>{

 

        var randomString = Math.random().toString(36).slice(-8);
        var date = new Date()
        var dattt = date.setDate(date.getDate() + 2)
        const {
        nom,
        prenom,
        age,
        chronic_disease,
        cin,
        date_fin_cin
        } = req.body;
    
        const AdultData = {
            nom,
        prenom,
        age,
        chronic_disease,
        cin,
        date_fin_cin,
            hashed_password:randomString,
            rdv:dattt
    
        }
        const adult = new Adult(AdultData);
        adult.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
        return res.status(201).json({
            status : true,
            response : result.rdv,
            msg : "successfully created"
        })
    })
}

export {
    SearchUser,
    storeAdult
}