const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = __dirname;
const source = 'C:/Users/qxch0/Desktop/工作区/GRADE 7 ENGLISH';
async function main() {
  fs.mkdirSync(path.join(root, 'assets'), {recursive:true});
  const raw = fs.readFileSync(path.join(source, '小学单词.txt'), 'utf8');
  const words = [...new Set((raw.match(/[A-Za-z]+(?:-[A-Za-z]+)*/g)||[]).map(w=>w.toLowerCase()))].sort();
  fs.writeFileSync(path.join(root, 'primary-words.js'), 'window.PRIMARY_WORDS = '+JSON.stringify(words)+';\n');
  fs.copyFileSync(path.join(source, '小学单词.txt'), path.join(root, '小学单词.txt'));
  const dep='C:/Users/qxch0/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/lucide';
  fs.copyFileSync(path.join(dep,'dist/umd/lucide.js'),path.join(root,'assets/lucide.js'));
  fs.copyFileSync(path.join(dep,'LICENSE'),path.join(root,'assets/LUCIDE-LICENSE'));
  const context={window:{}}; vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
  vm.runInNewContext(fs.readFileSync(path.join(root,'examples.js'),'utf8'),context);
  function strings(v){return typeof v==='string'?[v]:Array.isArray(v)?v.flatMap(strings):v&&typeof v==='object'?Object.entries(v).flatMap(([k,x])=>[k,...strings(x)]):[];}
  const all = strings(context.window).join(' ');
  const spoken=[...new Set((all.match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g)||[]).map(w=>w.toLowerCase().replace(/’/g,"'")))].sort();
  fs.writeFileSync(path.join(root,'audio-words.json'),JSON.stringify(spoken));
  const phrases=[];
  for(const section of context.window.UNIT.sections)for(const block of section.blocks){
    if(block.type==='dialogue'){phrases.push(block.lines.map(l=>l[1]).join('\n'));phrases.push(...block.lines.map(l=>l[1]));}
    if(block.people)phrases.push(...block.people.map(p=>p[2]));
    if(block.type==='letter')phrases.push(block.text);
    if(block.type==='sentences')phrases.push(...block.items);
  }
  const unique=[...new Set(phrases)];
  const manifest=Object.fromEntries(unique.map((s,i)=>[s,`phrase-${i+1}.wav`]));
  for(const [,sentence] of context.window.WORD_EXAMPLES){
    if(!manifest[sentence])manifest[sentence]=`example-${require('crypto').createHash('sha1').update(sentence).digest('hex').slice(0,16)}.wav`;
  }
  fs.writeFileSync(path.join(root,'audio-phrases.json'),JSON.stringify(Object.entries(manifest).map(([text,file])=>({text,file}))));
  fs.writeFileSync(path.join(root,'audio-manifest.js'),'window.AUDIO_PHRASES = '+JSON.stringify(manifest)+';\n');
  console.log('Primary vocabulary:',words.length,'words. Textbook assets prepared.');
}
main();
