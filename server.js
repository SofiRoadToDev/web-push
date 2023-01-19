
require('dotenv').config()
const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const webpush=require('web-push');
const path=require('path');
const { dirname } = require('path');
const cors= require('cors');


//app.use(cors());
app.use(express.static(path.join(__dirname,'src/public')))
//app.use(express.static(path.join(__dirname,'src/cliente')))
app.use(bodyParser.json())

const root=path.join(__dirname,'src/public');

const PORT =process.env.PORT || 3100;
const vapIdKeys={
    public:process.env.PUBLIC_VAPID_KEY,
    private:process.env.PRIVATE_VAPID_KEY
}


webpush.setVapidDetails(
    'mailto:sofi@gmail.com',
    vapIdKeys.public,
    vapIdKeys.private
)

/*Guardamos cada objeto suscripcion que serían como las direcciones para enviar algo a los clientes*/
var subscripciones=[]

/*para que los clientes se suscriban a recibir notificaciones */
app.post('/subscription',(req,res)=>{
    const subscription=req.body;
    console.log(subscription.endpoint)
    subscripciones.push(subscription)
    res.status(201).json({})
    const payload=JSON.stringify({title:"Gracias por suscribirte"})
    webpush.sendNotification(subscription,payload).catch(e=>console.error(e))
    console.log(`arreglo de subscripciones: ${subscripciones.length}`)

})


const testMethod=()=>{
    subscripciones.forEach((s)=>{
        let payload=JSON.stringify({
            title:'Ya guarde sus suscripciones'
        })
        webpush.sendNotification(s,payload).catch(e=>console.error(e))
    })
}


app.get('/test',async(req,res)=>{
    await testMethod();
    res.status(200);
})


app.get('/',(req,res)=>res.sendFile(path.join(root,'index.html')))




app.listen(PORT,()=>{ `app funiconando en puerto ${PORT}`})




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      