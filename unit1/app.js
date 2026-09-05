(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storageKey='sunshine-unit1-v1';
  const defaults={theme:'boy',font:24,rate:.85,mode:'basic',highlight:true,answers:{},done:[],saved:[],section:'welcome'};
  let state;
  try {state={...defaults,...JSON.parse(localStorage.getItem(storageKey)||'{}')};} catch {state={...defaults};}
  if(state.typographyVersion!==2){state.font=Math.max(24,Number(state.font)||24);state.typographyVersion=2;}
  state.font=Math.min(30,Math.max(20,Number(state.font)||24));
  let storageWarning=false;
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{if(!storageWarning){storageWarning=true;toast('当前浏览器无法保存进度，可导出你的作文和单词本。');}}}
  const icons=()=>window.lucide?.createIcons();
  const icon=name=>`<i data-lucide="${name}"></i>`;
  const primary=new Set(PRIMARY_WORDS);
  const basic=new Set(BASIC_WORDS.map(normalize));
  const proper=new Set(PROPER_NAMES);
  const examples=new Map(WORD_EXAMPLES.flatMap(([keys,en,zh])=>keys.split(' ').map(key=>[normalize(key),{en,zh}])));
  const tokenPattern=/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g;
  let current=0,activeWord='',vocabTab='saved',toastTimer,audio=null,speechVersion=0;
  function normalize(s){return String(s).toLowerCase().replace(/’/g,"'");}
  function base(w){const n=normalize(w);return WORD_FORMS[n]||n;}
  function isNew(w){const n=normalize(w),b=base(n);return !proper.has(n)&&!primary.has(n)&&!primary.has(b)&&!(state.mode==='basic'&&(basic.has(n)||basic.has(b)));}
  function marked(text){return String(text||'').split(/([A-Za-z]+(?:[’'-][A-Za-z]+)*)/g).map((s,i)=>i%2&&isNew(s)&&state.highlight?`<button class="new-word" data-word="${esc(s)}" title="${esc(s)} · 朗读">${esc(s)}</button>`:esc(s)).join('');}
  const sayButton=(text,label='朗读')=>`<button class="icon-button" data-say="${esc(text)}" aria-label="${esc(label)}" title="${esc(label)}">${icon('volume-2')}</button>`;
  function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2800);}
  function stopSpeech(){speechVersion++;if(audio){audio.pause();audio.currentTime=0;audio=null;}window.speechSynthesis?.cancel();}
  function speak(text){
    stopSpeech(); const version=speechVersion;
    const n=normalize(text.trim());
    const recorded=window.AUDIO_PHRASES?.[text];
    if(recorded||/^[a-z]+(?:['-][a-z]+)*$/.test(n)){
      audio=new Audio(recorded?`assets/audio/${recorded}`:`assets/audio/${n.replace(/'/g,'_')}.wav`);
      audio.playbackRate=state.rate/.85;
      audio.onerror=()=>{if(version===speechVersion)browserSpeak(text);};
      audio.play().catch(()=>{if(version===speechVersion)browserSpeak(text);});
    }else browserSpeak(text);
  }
  function browserSpeak(text){
    if(!window.speechSynthesis){toast('浏览器不支持整段朗读，请使用单词点读。');return;}
    const voices=speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
    if(!voices.length){toast('未找到英语语音；单词点读仍可使用。');return;}
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.voice=voices.find(v=>v.localService&&/Zira/i.test(v.name))||voices.find(v=>v.localService)||voices[0];
    utterance.lang=utterance.voice.lang;utterance.rate=state.rate;
    utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))toast('朗读暂不可用，请重试。');};
    speechSynthesis.speak(utterance);
  }
  function field(key,label,multiline=false){return `<label class="form-field"><span>${marked(label)}</span><${multiline?'textarea':'input'} data-save="${esc(key)}" aria-label="${esc(label)}" ${multiline?'rows="3"':`value="${esc(state.answers[key]||'')}"`}>${multiline?esc(state.answers[key]||''):''}${multiline?'</textarea>':''}</label>`;}
  function blank(key,label,options){const val=state.answers[key]||'';return options?`<select class="blank" data-answer="${esc(key)}" data-save="${esc(key)}" aria-label="${esc(label)}"><option value="">选择</option>${options.map(o=>`<option ${val===o?'selected':''} value="${esc(o)}">${esc(o)}</option>`).join('')}</select>`:`<input class="blank" autocomplete="off" spellcheck="false" data-answer="${esc(key)}" data-save="${esc(key)}" aria-label="${esc(label)}" value="${esc(val)}">`;}
  function questionHTML(q,b,qi,ungraded=false){
    const text=q[0];let idx=0;
    if(b.kind==='tf')return `<div class="question" data-question="${qi}"><span class="qnum">${qi+1}</span>${marked(text)}<span class="tf-options">${['T','F'].map(v=>`<label><input type="radio" name="${b.id}-${qi}" value="${v}" data-answer="${b.id}-${qi}-0" data-save="${b.id}-${qi}-0" ${state.answers[`${b.id}-${qi}-0`]===v?'checked':''}>${v}</label>`).join('')}</span><span class="answer-hint" hidden></span></div>`;
    const parts=text.split('__');let html=parts.map((s,i)=>marked(s)+(i<parts.length-1?blank(`${b.id}-${qi}-${idx++}`,`${b.id} 第 ${qi+1} 题，第 ${i+1} 空`,b.kind==='select'?b.options:null):'')).join('');
    if(parts.length===1&&q.length>1)html+=blank(`${b.id}-${qi}-0`,`${text} 的答案`,b.options);
    return `<div class="question" data-question="${qi}">${text&&q.length>1||ungraded?`<span class="qnum">${qi+1}</span>`:''}${html}<span class="answer-hint" hidden></span></div>`;
  }
  function exerciseActions(id){return `<div class="exercise-actions"><button class="primary-button" data-check="${id}">${icon('check')}检查答案</button><button class="text-button" data-reveal="${id}">${icon('eye')}查看答案</button><button class="icon-button" data-reset="${id}" aria-label="重做本题" title="重做本题">${icon('rotate-ccw')}</button><span class="exercise-result" role="status"></span></div>`;}
  function blockHTML(b){
    switch(b.type){
      case 'goals':return `<section class="block"><div class="goal-heading">${marked(b.title)}</div><ol class="goal-list">${b.items.map(s=>`<li><span>${marked(s)}</span></li>`).join('')}</ol></section>`;
      case 'text':return `<p class="plain-text block">${marked(b.text)}</p>`;
      case 'heading':return `<section class="block"><div class="block-title">${b.code?`<span class="exercise-code">${b.code}</span>`:''}<h2>${marked(b.title)}</h2></div>${b.instruction?`<p class="instruction">${marked(b.instruction)}</p>`:''}</section>`;
      case 'bank':return `<div class="bank">${b.words.map(marked).join('<span>·</span>')}</div>`;
      case 'dialogue':return `<section class="dialogue block"><div class="dialogue-head"><span>${b.title?marked(b.title):'Conversation'}</span>${sayButton(b.lines.map(l=>l[1]).join('\n'),'朗读整段对话')}</div>${b.image?`<img class="dialogue-image" src="assets/${b.image}.jpg" alt="教材对话插图">`:''}${b.lines.map(l=>`<div class="dialogue-line"><span class="speaker">${esc(l[0])}</span><span class="line-text">${marked(l[1])}</span>${sayButton(l[1],`朗读 ${l[0]} 的句子`)}</div>`).join('')}</section>`;
      case 'introductions':return `<div class="intro-grid block">${b.people.map(p=>`<article class="intro-item"><img src="assets/${p[0]}.jpg" alt="${esc(p[1])}" loading="lazy"><h3>${esc(p[1])}</h3><p>${marked(p[2])}${sayButton(p[2])}</p></article>`).join('')}</div>`;
      case 'profiles':return `<div class="profiles block">${b.people.map(p=>`<article class="profile"><div class="profile-top"><img src="assets/${p[0]}.jpg" alt="${esc(p[1])}"><h3>${esc(p[1].split(' / ')[1])}<small>${esc(p[1].split(' / ')[0])}</small></h3>${sayButton(p[2],'朗读人物介绍')}</div><p>${marked(p[2])}</p></article>`).join('')}</div>`;
      case 'tip':return `<aside class="tip block">${icon('lightbulb')}<p>${marked(b.text)}</p></aside>`;
      case 'exercise':return `<section class="exercise block" data-exercise="${b.id}"><h3>${marked(b.title)}</h3>${b.note?`<p class="instruction">${marked(b.note)}</p>`:''}${b.bank?`<div class="bank">${b.bank.map(marked).join('<span>·</span>')}</div>`:''}${b.questions.map((q,i)=>questionHTML(q,b,i)).join('')}${exerciseActions(b.id)}</section>`;
      case 'open':return `<section class="open-task block"><h3>${marked(b.title)}</h3><div class="form-grid">${b.fields.map((s,i)=>field(`${b.id}-${i}`,s,s.length>35)).join('')}</div></section>`;
      case 'letter':return `<article class="letter block"><div class="letter-head">${sayButton(b.text,'朗读全文')}</div>${b.avatar?`<img src="assets/${b.avatar}.jpg" alt="Daniel">`:''}<p>${marked(b.text)}</p></article>`;
      case 'table':return `<div class="table-scroll block"><table><caption>${marked(b.title)}</caption><thead><tr>${b.headers.map(h=>`<th>${marked(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(v=>`<td>${marked(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'sounds':return `<div class="sounds-grid block">${b.groups.map(g=>`<div class="sound-group"><span class="sound-letter">${esc(g[0])}</span><span class="sound-ipa">${g[1]}</span><div class="sound-words">${g[2].map(w=>`<button class="sound-word" data-say="${w}" aria-label="朗读 ${w}">${isNew(w)&&state.highlight?`<span class="new-word">${w}</span>`:w}</button>`).join('')}</div></div>`).join('')}</div>`;
      case 'sentences':return `<ol class="sentences block">${b.items.map(s=>`<li>${marked(s)}${sayButton(s)}</li>`).join('')}</ol>`;
      case 'choicegrid':return `<section class="exercise block" data-exercise="${b.id}"><h3>${marked(b.title)}</h3><div class="table-scroll"><table><thead><tr><th></th><th>Kitty</th><th>Amy</th></tr></thead><tbody>${b.rows.map((r,ri)=>`<tr><th>${marked(r[0])}</th>${[0,1].map(pi=>`<td>${r[1].map((o,oi)=>`<label class="choice-label"><input type="checkbox" data-save="${b.id}-${ri}-${pi}-${oi}" ${state.answers[`${b.id}-${ri}-${pi}-${oi}`]?'checked':''}>${marked(o)}</label>`).join('')}<span class="answer-hint" data-choice-hint="${ri}-${pi}" hidden></span></td>`).join('')}</tr>`).join('')}</tbody></table></div>${exerciseActions(b.id)}</section>`;
      case 'listening':return `<section class="exercise block"><h3>${marked(b.title)}</h3><div class="audio-note">未提供教材听力录音；本题保留填写，不自动判分。</div><div class="audio-upload"><label class="secondary-button">${icon('upload')}导入教材录音<input id="listening-upload" type="file" accept="audio/*" hidden></label><span id="listening-filename" class="muted">尚未选择录音</span></div><audio id="listening-audio" controls hidden></audio>${b.questions.map((q,i)=>questionHTML(q,b,i,true)).join('')}</section>`;
      case 'compareform':return `<section class="open-task block"><h3>${marked(b.title)}</h3><div class="table-scroll"><table><thead><tr><th></th><th>Daniel</th><th>Me</th></tr></thead><tbody>${b.rows.map((r,i)=>`<tr><th>${marked(r[0])}</th><td>${marked(r[1])}</td><td>${blank(`${b.id}-${i}`,r[0])}</td></tr>`).join('')}</tbody></table></div></section>`;
      case 'writing':return `<section class="open-task block"><h3>${marked(b.title)}</h3><div class="writing-layout"><aside class="expressions"><h3>Useful expressions</h3>${b.expressions.map(s=>`<p>${marked(s)}</p>`).join('')}</aside><div class="writing-editor"><textarea id="my-writing" data-save="${b.id}" aria-label="我的英文自我介绍" spellcheck="true" lang="en" placeholder="Hi there! My name is ...">${esc(state.answers[b.id]||'')}</textarea><div class="writing-meta"><span id="writing-count">0 words</span><span>本机自动保存</span></div><div class="exercise-actions"><button class="primary-button" data-action="preview-writing">${icon('book-open')}预览</button><button class="icon-button" data-action="read-writing" aria-label="朗读作文" title="朗读作文">${icon('volume-2')}</button><button class="icon-button" data-action="export-writing" aria-label="导出作文" title="导出作文">${icon('download')}</button></div><div class="writing-preview" id="writing-preview" hidden></div></div></div></section>`;
      case 'assessment':return `<section class="block"><div class="table-scroll"><table><thead><tr><th>What I can do</th><th>Me</th><th>Partner</th></tr></thead><tbody>${b.items.map((s,i)=>`<tr><td>${marked(s)}</td>${['me','partner'].map(w=>`<td><select class="rating-select" data-save="${b.id}-${i}-${w}" aria-label="第 ${i+1} 项 ${w} 评价"><option value="">待评价</option>${['Weak','Good','Wonderful'].map(v=>`<option ${state.answers[`${b.id}-${i}-${w}`]===v?'selected':''}>${v}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="rating-label"><b>Result:</b>${['Weak','Good','Wonderful'].map(v=>`<label><input type="radio" name="result" data-save="assessment-result" value="${v}" ${state.answers['assessment-result']===v?'checked':''}>${v}</label>`).join('')}</div></section>`;
      case 'note':return `<p class="note">${esc(b.text)}</p>`;
      default:return '';
    }
  }
  function render(){
    const s=UNIT.sections[current];
    state.section=s.id;save();
    $('#chapters').innerHTML=UNIT.sections.map((v,i)=>`<a href="#${v.id}" ${i===current?'aria-current="page"':''}>${icon(v.icon)}<span>${v.name}</span><span class="nav-number">${state.done.includes(v.id)?'✓':String(i+1).padStart(2,'0')}</span></a>`).join('');
    $('#main').innerHTML=`<div class="lesson-top"><div><p class="eyebrow">UNIT 1 <span> / </span> ${String(current+1).padStart(2,'0')}</p><h2>${s.en}</h2></div><button class="text-button" data-action="source">${icon('scan-text')}教材原页 <span>p.${s.pages}</span></button></div>${current===0?`<section class="hero"><img src="assets/campus.jpg" alt="教材中的新同学们一起走进校园"><span class="unit-stamp">GRADE 7 · UNIT 1</span><div class="hero-content"><p class="eyebrow">WELCOME TO SUNSHINE</p><h1>This is me!</h1><p>New school, new friends, new start!</p></div></section>`:`<div class="lesson-heading"><h1>${s.title}</h1><p>${s.intro}</p></div>`}<div class="reading-toolbar"><div class="legend"><span><b class="legend-familiar"></b>小学熟词</span><span><b class="legend-mark"></b>本课新词</span></div><button class="text-button" data-action="stop">${icon('square')}停止朗读</button></div><div class="reading-content">${s.blocks.map(blockHTML).join('')}</div><div class="finish-lesson"><button class="secondary-button" data-action="complete">${icon(state.done.includes(s.id)?'circle-check':'check')}${state.done.includes(s.id)?'本课已完成':'完成这一课'}</button></div>`;
    $('#previous').disabled=current===0;$('#next').disabled=current===UNIT.sections.length-1;
    $('#footer-pages').textContent=`${current+1} / ${UNIT.sections.length}  ·  p. ${s.pages}`;
    $('#progress-text').textContent=`${state.done.length} / 7`;$('#course-progress').value=state.done.length;
    $('#word-count').textContent=state.saved.length;
    updateWritingCount();icons();
  }
  function navigate(id,scroll=true){const index=UNIT.sections.findIndex(s=>s.id===id);current=index<0?0:index;stopSpeech();render();$('#sidebar').classList.remove('open');if(scroll){window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});}}
  function applySettings(){document.body.dataset.theme=state.theme;document.documentElement.style.setProperty('--reading-size',`${state.font/16}rem`);$$('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===state.theme)));$('#font-size').value=state.font;$('#font-output').textContent=`${state.font}px`;$('#speech-rate').value=state.rate;$('#rate-output').textContent=`${Number(state.rate).toFixed(2)}×`;$('#known-mode').value=state.mode;$('#highlight-toggle').checked=state.highlight;$('#primary-count').textContent=`小学词表：${PRIMARY_WORDS.length} 个去重词项；常见词形合并，人名不标新词。`;}
  function exampleFor(word){return examples.get(normalize(word))||examples.get(base(word))||{en:`I can spell the word “${word}”.`,zh:`我会拼写单词“${word}”。`};}
  function structureHTML(word){
    return morphologyFor(word).map(step=>`<div class="structure-step"><p class="structure-kind">${esc(step.kind)}</p><p class="structure-formula" lang="en">${esc(step.formula)}</p>${step.parts.length?`<dl class="structure-parts">${step.parts.map(([part,meaning])=>`<div><dt lang="en">${esc(part)}</dt><dd>${esc(meaning)}</dd></div>`).join('')}</dl>`:''}<p class="structure-note">${esc(step.note)}</p></div>`).join('');
  }
  function openWord(word){
    activeWord=word;
    $('#word-title').textContent=word;
    $('#word-meaning').textContent=GLOSSARY[base(word)]||'词表外词 · 结合教材语境理解';
    $('#word-base').textContent=base(word)!==normalize(word)?`原形：${base(word)}`:'Unit 1 · This is me!';
    if(normalize(word)==='ourselves')$('#word-base').textContent='反身代词：我们自己';
    $('#word-structure-content').innerHTML=structureHTML(word);
    const example=exampleFor(word);
    $('#word-example-en').innerHTML=example.en.split(/([A-Za-z]+(?:[’'-][A-Za-z]+)*)/g).map((s,i)=>i%2&&base(s)===base(word)?`<mark>${esc(s)}</mark>`:esc(s)).join('');
    $('#word-example-zh').textContent=example.zh;
    $('#example-speak').dataset.say=example.en;
    updateWordSave();
    if(!$('#word-dialog').open)$('#word-dialog').showModal();
    $('#word-dialog').scrollTop=0;
    speak(word);
  }
  function updateWordSave(){const added=state.saved.includes(base(activeWord));$('#word-save').innerHTML=icon(added?'bookmark-check':'bookmark-plus')+(added?'已加入单词本':'加入单词本');$('#word-save').setAttribute('aria-pressed',String(added));icons();}
  function toggleSaved(word){const b=base(word);state.saved=state.saved.includes(b)?state.saved.filter(w=>w!==b):[...state.saved,b];save();$('#word-count').textContent=state.saved.length;}
  function collectContent(value,key=''){
    if(['id','type','icon','name','en','pages','avatar','image','kind','options'].includes(key))return [];
    if(typeof value==='string')return [value];
    if(Array.isArray(value))return value.flatMap(v=>collectContent(v));
    if(value&&typeof value==='object')return Object.entries(value).flatMap(([k,v])=>collectContent(v,k));return [];
  }
  function unitWords(){return [...new Set((collectContent(UNIT.sections).join(' ').match(tokenPattern)||[]).filter(isNew).map(base))].filter(w=>!['tf','select','good','negative','positive'].includes(w)||isNew(w)).sort();}
  function renderVocabulary(){const query=normalize($('#vocab-search').value.trim());const words=(vocabTab==='saved'?state.saved:unitWords()).filter(w=>w.includes(query)||(GLOSSARY[w]||'').includes(query)).sort();$$('[data-vocab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.vocab===vocabTab)));$('#vocab-list').innerHTML=words.length?words.map(w=>`<div class="vocab-row"><button class="vocab-word" data-word="${esc(w)}">${esc(w)}<small>${esc(GLOSSARY[w]||'词表外词 · 结合教材语境理解')}</small></button>${sayButton(w)}<button class="icon-button" data-bookmark="${esc(w)}" aria-label="${state.saved.includes(w)?'取消收藏':'收藏'} ${esc(w)}" title="${state.saved.includes(w)?'取消收藏':'收藏'}">${icon(state.saved.includes(w)?'bookmark-check':'bookmark-plus')}</button></div>`).join(''):`<p class="empty-state">${query?'没有找到这个单词':vocabTab==='saved'?'单词本还是空的':'暂无新词'}</p>`;icons();}
  function findExercise(id){return UNIT.sections.flatMap(s=>s.blocks).find(b=>b.id===id);}
  function canonical(s){return normalize(s).trim().replace(/\s+/g,' ').replace(/[.!?。！]$/,'');}
  function check(id,reveal=false){
    const b=findExercise(id),root=$(`[data-exercise="${id}"]`);let total=0,correct=0;
    if(b.type==='choicegrid'){
      b.rows.forEach((r,ri)=>[0,1].forEach(pi=>{total++;const expected=r[pi+2];const chosen=r[1].filter((o,oi)=>state.answers[`${id}-${ri}-${pi}-${oi}`]);const ok=chosen.length===expected.length&&expected.every(o=>chosen.includes(o));if(ok)correct++;const hint=$(`[data-choice-hint="${ri}-${pi}"]`,root);hint.hidden=false;hint.classList.toggle('ok',ok);hint.textContent=reveal?expected.join(', '):ok?'正确':'再读一读人物介绍';}));
    }else b.questions.forEach((q,qi)=>{
      const answers=b.kind==='tf'?[q[1]]:q.slice(1);if(!answers.length)return;
      const row=$(`[data-question="${qi}"]`,root),hint=$('.answer-hint',row);let rowOK=true;
      answers.forEach((ans,ai)=>{total++;const key=`${id}-${qi}-${ai}`,ok=ans.split('|').some(a=>canonical(a)===canonical(state.answers[key]||''));if(ok)correct++;else rowOK=false;$$(`[data-answer="${key}"]`,row).forEach(input=>{input.classList.toggle('correct',ok);input.classList.toggle('incorrect',!ok);input.setAttribute('aria-invalid',String(!ok));});});
      hint.hidden=false;hint.classList.toggle('ok',rowOK);
      hint.textContent=reveal?`参考答案：${answers.map(a=>a.split('|')[0]).join(' / ')}${b.kind==='tf'&&q[2]?' · '+q[2]:''}`:rowOK?'正确':b.kind==='tf'&&q[2]?`再想一想：${q[2]}`:'还有空格需要再想一想。';
    });
    $('.exercise-result',root).textContent=reveal?'参考答案已显示':`${correct} / ${total} 正确${correct===total?' · 全部完成！':''}`;
  }
  function resetExercise(id){Object.keys(state.answers).filter(k=>k.startsWith(id+'-')).forEach(k=>delete state.answers[k]);save();const y=window.scrollY;render();window.scrollTo(0,y);toast('本组答案已清空');}
  function updateWritingCount(){if($('#my-writing'))$('#writing-count').textContent=`${($('#my-writing').value.match(tokenPattern)||[]).length} words`;}
  function download(filename,text){const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function source(){const pages=UNIT.sections[current].pages.split('–').map(Number);const first=Math.floor((pages[0]-6)/2)+1;$('#source-select').innerHTML=Array.from({length:6},(_,i)=>`<option value="${i+1}">${6+i*2}–${7+i*2} 页</option>`).join('');$('#source-select').value=first;$('#source-image').src=`assets/spread-${first}.jpg`;$('#source-dialog').showModal();}
  const actions={
    menu:()=>$('#sidebar').classList.toggle('open'),
    settings:()=>$('#settings-dialog').showModal(),
    source,stop:stopSpeech,
    vocabulary:()=>{renderVocabulary();$('#vocabulary-dialog').showModal();},
    complete:()=>{const id=UNIT.sections[current].id;if(!state.done.includes(id)){state.done.push(id);save();const y=window.scrollY;render();window.scrollTo(0,y);toast(state.done.length===7?'Unit 1 已完成！':'本课已完成');}},
    'preview-writing':()=>{const text=state.answers['writing-d3']||'';if(!text.trim())return toast('先写下你的自我介绍吧。');$('#writing-preview').innerHTML=marked(text);$('#writing-preview').hidden=false;},
    'read-writing':()=>{const text=state.answers['writing-d3']||'';if(text.trim())speak(text);else toast('先写下你的自我介绍吧。');},
    'export-writing':()=>{const text=state.answers['writing-d3']||'';if(text.trim())download('My self-introduction.txt',text);else toast('还没有可导出的作文。');},
    'export-vocab':()=>{const words=vocabTab==='saved'?state.saved:unitWords();if(!words.length)return toast('单词本还是空的。');download('Unit 1 单词本.txt',words.map(w=>`${w}\t${GLOSSARY[w]||''}`).join('\n'));}
  };
  document.addEventListener('click',event=>{
    const target=event.target.closest('button,a,label');
    if(target?.dataset.word)return openWord(target.dataset.word);
    if(target?.dataset.say)return speak(target.dataset.say);
    if(target?.dataset.action)return actions[target.dataset.action]?.();
    if(target?.dataset.close)return $('#'+target.dataset.close).close();
    if(target?.dataset.theme){state.theme=target.dataset.theme;save();applySettings();return;}
    if(target?.dataset.check)return check(target.dataset.check);
    if(target?.dataset.reveal)return check(target.dataset.reveal,true);
    if(target?.dataset.reset)return resetExercise(target.dataset.reset);
    if(target?.dataset.vocab){vocabTab=target.dataset.vocab;renderVocabulary();return;}
    if(target?.dataset.bookmark){toggleSaved(target.dataset.bookmark);renderVocabulary();return;}
    if($('#sidebar').classList.contains('open')&&!event.target.closest('.sidebar,.mobile-menu'))$('#sidebar').classList.remove('open');
  });
  function storeInput(event){const el=event.target;if(!el.dataset.save)return;state.answers[el.dataset.save]=el.type==='checkbox'?el.checked:el.value;save();updateWritingCount();if(el.id==='my-writing'&&$('#writing-preview'))$('#writing-preview').hidden=true;const row=el.closest('.question');if(row){const hint=$('.answer-hint',row);if(hint)hint.hidden=true;el.classList.remove('correct','incorrect');el.removeAttribute('aria-invalid');}const exercise=el.closest('[data-exercise]');if(exercise){const result=$('.exercise-result',exercise);if(result)result.textContent='';}}
  document.addEventListener('input',storeInput);document.addEventListener('change',storeInput);
  document.addEventListener('change',event=>{if(event.target.id==='listening-upload'){const file=event.target.files[0];if(!file)return;const player=$('#listening-audio');if(player.dataset.url)URL.revokeObjectURL(player.dataset.url);const url=URL.createObjectURL(file);player.src=url;player.dataset.url=url;player.hidden=false;$('#listening-filename').textContent=file.name;}});
  $('#word-speak').addEventListener('click',()=>speak(activeWord));
  $('#word-save').addEventListener('click',()=>{toggleSaved(activeWord);updateWordSave();if($('#vocabulary-dialog').open)renderVocabulary();});
  $('#vocab-search').addEventListener('input',renderVocabulary);
  $('#source-select').addEventListener('change',()=>{$('#source-image').src=`assets/spread-${$('#source-select').value}.jpg`;});
  $('#font-size').addEventListener('input',e=>{state.font=Number(e.target.value);save();applySettings();});
  $('#speech-rate').addEventListener('input',e=>{state.rate=Number(e.target.value);save();applySettings();});
  $('#known-mode').addEventListener('change',e=>{state.mode=e.target.value;save();render();});
  $('#highlight-toggle').addEventListener('change',e=>{state.highlight=e.target.checked;save();render();});
  $('#previous').addEventListener('click',()=>{if(current>0)location.hash=UNIT.sections[current-1].id;});
  $('#next').addEventListener('click',()=>{if(current<6)location.hash=UNIT.sections[current+1].id;});
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  $('#word-dialog').addEventListener('close',stopSpeech);
  addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
  addEventListener('beforeunload',stopSpeech);
  applySettings();navigate(location.hash.slice(1)||state.section,false);
  // A minimal inspection API keeps vocabulary classification verifiable offline.
  window.Sunshine={isNew,base,unitWords,exampleFor,morphologyFor,getState:()=>JSON.parse(JSON.stringify(state))};
})();
