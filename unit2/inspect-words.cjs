const fs=require('fs'),vm=require('vm');
const c={window:{}};
for(const f of ['content.js','primary-words.js'])vm.runInNewContext(fs.readFileSync(__dirname+'/'+f,'utf8'),c);
const w=c.window;
function strings(v,k=''){
  if(['id','type','icon','name','en','pages','avatar','image','kind','options'].includes(k))return [];
  return typeof v==='string'?[v]:Array.isArray(v)?v.flatMap(x=>strings(x)):v&&typeof v==='object'?Object.entries(v).flatMap(([k,x])=>strings(x,k)):[];
}
const words=[...new Set((strings(w.UNIT.sections).join(' ').match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g)||[]).map(x=>x.toLowerCase().replace(/’/g,"'")).map(x=>w.WORD_FORMS[x]||x))].filter(x=>!w.PRIMARY_WORDS.includes(x)&&!w.PROPER_NAMES.includes(x)).sort();
if(fs.existsSync(__dirname+'/examples.js')){
  vm.runInNewContext(fs.readFileSync(__dirname+'/examples.js','utf8'),c);
  const covered=new Set(w.WORD_EXAMPLES.flatMap(e=>e[0].replace(/’/g,"'").split(' ')));
  console.log('Missing:',words.filter(x=>!covered.has(x)).join(' '));
}else console.log(words.join(' '));
