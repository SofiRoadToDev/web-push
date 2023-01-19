
require('dotenv').config()
const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const webpush=require('web-push');
const path=require('path');
const { dirname } = require('path');
const cors= require('cors');


app.use(cors());
app.use('/static',express.static(path.join(__dirname,'src/public')))
app.use(express.static(path.join(__dirname,'src/cliente')))
app.use(bodyParser.json())

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

/*para que los clientes se suscriban a recibir notificaciones */
app.post('/suscripcion',(req,res)=>{
    const subscription=req.body;
    res.status(201).json({'msg':'ya te suscribiste'})
    const payload=JSON.stringify({title:'Bienvenido'})
    webpush.sendNotification(subscription,payload).catch(e=>console.error(e))

})
const root=path.join(__dirname,'src/public');


app.get('/',(req,res)=>res.sendFile(path.join(root,'index.html')))




app.listen(PORT,()=>{ `app funiconando en puerto ${PORT}`})




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      