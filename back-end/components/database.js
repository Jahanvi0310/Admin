const mongoose=require("mongoose")

const dbconnection =async () => {

    try 
    {
            // const uri = process.env.ATLAS_URI;
            await mongoose.connect('mongodb://localhost:27017/EcommerceDB',{
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
                }
            );
            //   const uri = process.env.ATLAS_URI;
            //   await mongoose.connect(String(uri),
            //      { useNewUrlParser: true,
            //          useCreateIndex: true,
            //           useUnifiedTopology: true
            //         }
            //         );
            // console.log("connected");
        
    } catch (error) {
        console.log("mycon"+error);
    }
}

module.exports=dbconnection