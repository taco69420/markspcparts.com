const path=require('path');const {createRequire}=require('module');
const req=createRequire(path.join(__dirname,'..','package.json'));
const sharp=req('sharp');const fs=require('fs');
const src=path.join(__dirname,'..','src','content','blog','Dominuspost');
const out=path.join(__dirname,'..','public','images','posts','dominus-probe-points');
fs.mkdirSync(out,{recursive:true});
const map={
'SYSTEMSHOT.jpg':'systemshot.jpg','MULTIMETER.jpg':'multimeter.jpg','PROBEPOINTS.jpg':'probe-points.jpg','PROBEMANUAL.jpg':'probe-manual.jpg','SFRPROBE.jpg':'sfr-probe.jpg',
'VOLTAGE+PROBECHART.jpg':'handwritten-sheet.jpg',
'BIOSMAINEXTREMETWEKER1.jpg':'bios-1-extreme-tweaker.jpg','BIOS+MEVERSION2.jpg':'bios-2-me-version.jpg','BIOSMONITERVOLTAGES3.jpg':'bios-3-monitor-voltages.jpg','BIOSMCE4.jpg':'bios-4-mce.jpg','BIOSMAINVOLTAGES5.jpg':'bios-5-main-voltages.jpg','BIOSPHASECONTROLLLC6.jpg':'bios-6-phase-control-llc.jpg','BIOSBOOTVOLTAGE7.jpg':'bios-7-boot-voltage.jpg','BIOSCURRENTREPORTSETTIING8.jpg':'bios-8-current-reporting.jpg','BIOSfunnysetting9.jpg':'bios-9-max-core-temp.jpg',
'HWICPU voltagesidle1.PNG':'hwinfo-idle-cpu.png','HWIMotherboard voltagesidle2.PNG':'hwinfo-idle-motherboard.png','HWICINELOADCPU1.PNG':'hwinfo-load-1.png','HWICINELOADCPU2.PNG':'hwinfo-load-2.png'};
(async()=>{for(const [f,o] of Object.entries(map)){
 const wide=/handwritten|hwinfo/.test(o);const max=wide?1800:1600;
 let p=sharp(path.join(src,f)).rotate();const m=await p.metadata();
 p=p.resize({width:max,withoutEnlargement:true});
 if(o.endsWith('.png'))p=p.png({compressionLevel:9});else p=p.jpeg({quality:wide?85:78,mozjpeg:true});
 await p.toFile(path.join(out,o));
 const s=fs.statSync(path.join(out,o)).size;
 const m2=await sharp(path.join(out,o)).metadata();
 console.log(o,`${m.width}x${m.height} (exif ${m.orientation||1}) -> ${m2.width}x${m2.height}`,Math.round(s/1024)+'KB');}})();
