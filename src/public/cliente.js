const publicKey='BEooeLR4hZe2LrGvVJ6Jj-l8Pf7S7138Ns9M1Vg_gxmJ0P-zL1ENY3i0J3mp6ofVgU2-txTSjHa4FVMEXzJBtHw';
console.log('cliente.js')




const send=async()=>{
    console.log('registrando el service worker')
    /**1 objeto register*/

    const register= await navigator.serviceWorker.register(
        'serviceworker.js',
        {scope:'/'});
        console.log('service worker registrado')

    console.log(' registrando el push, suscribiendose a las notificaciones')
    /**2  con el register se crea el objeto suscripcion*/

    const subcription=await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    })
    console.log(' Push registrado')

    /**3 Se envia el objeto suscripcion al endpoint de suscripcion del servidor*/

    console.log('enviando el objeto subscription al servidor')
    await fetch('/subscription',{
        method:'POST',
        body:JSON.stringify(subcription),
        headers:{
            'content-type':'application/json'
        }
    });

    console.log("push enviado, suscripcion enviada mejor dicho")


}




const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

if('serviceWorker' in navigator){
  send().catch(e=>console.error(`error en el codigo del cliente ${e}`));
}
