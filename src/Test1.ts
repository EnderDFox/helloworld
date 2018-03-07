var a:{[key:number]:boolean} = {};
a["e"] = true;
a["f"] = true;
a["g"] = true;
a["h"] = true;
var b:{u:string,v:number,k:boolean} = {u:"this is u",v:94011,k:true};

for (const key in a) {
    const element = a[key];
    console.log(key,element);
    delete a["e"];
    delete a["f"];
    delete a["g"];
}
console.log("[debug]","----------");
for (const key in b) {
    const element = b[key];
    console.log(key,element);
}
console.log("[debug]","----------");
delete b.u;
delete b["v"];

for (const key in b) {
    const element = b[key];
    console.log(key,element);
}

