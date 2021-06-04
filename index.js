const ElectrumCli = require('electrum-client');
var express = require('express');
var app = express();

//Username and password relate to those set in the bitcoin.conf file
app.get('/', (req, res) => {
    res.send("OK")
})

const main = async () => {
    const ecl = new ElectrumCli(50001, '154.126.33.182', 'tcp') // tcp or tls
    await ecl.connect() // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const ver = await ecl.server_version("2.7.11", "1.0") // json-rpc(promise)
        console.log(ver)
    }catch(e){
        console.log(e)
    }
    await ecl.close() // disconnect(promise)
}
main()

app.listen(3000);