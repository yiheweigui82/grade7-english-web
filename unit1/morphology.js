(() => {
  'use strict';
  const entries = Object.create(null);
  const forms = Object.create(null);
  const normalize = word => String(word).toLowerCase().replace(/’/g, "'");
  function entry(word, kind, formula, parts, note) {
    entries[word] = {kind, formula, parts, note};
  }
  function suffix(word, stem, stemMeaning, ending, endingMeaning, note) {
    entry(word, '词缀构词', `${stem} + ${ending} → ${word}`, [[stem, stemMeaning], [ending, endingMeaning]], note);
  }
  function compound(word, left, leftMeaning, right, rightMeaning, note) {
    entry(word, '合成词', `${left} + ${right} → ${word}`, [[left, leftMeaning], [right, rightMeaning]], note);
  }
  suffix('friendly', 'friend', '朋友；名词词基', '-ly', '具有……特点的；这里构成形容词', '像朋友一样对待别人 → 友好的。这里的 -ly 不是副词后缀；不能把所有以 -ly 结尾的词都当成副词。');
  suffix('lovely', 'love', '爱；名词或动词词基', '-ly', '这里构成形容词', '令人喜爱的 → 可爱的、美丽的。lovely 和 friendly 在本课中都是形容词。');
  suffix('helpful', 'help', '帮助；名词或动词词基', '-ful', '具有……性质的；形容词后缀', '愿意帮助别人的 → 乐于助人的。后缀 -ful 只有一个 l。');
  suffix('useful', 'use', '用处；名词词基', '-ful', '具有……性质的；形容词后缀', '有用处的 → 有用的。');
  suffix('wonderful', 'wonder', '惊奇；名词词基', '-ful', '具有……性质的；形容词后缀', '令人惊叹的 → 极好的。');
  suffix('healthy', 'health', '健康；名词词基', '-y', '具有……特征的；形容词后缀', '有健康状态的 → 健康的。这里从 health 记起，不拆成 heal + thy。');
  suffix('correctly', 'correct', '正确的；形容词词基', '-ly', '以……方式；副词后缀', '正确地。这里才是常见的“形容词 + -ly → 副词”。');
  suffix('usually', 'usual', '通常的；形容词词基', '-ly', '以……方式；副词后缀', '通常地、通常。usual 末尾的 l 保留，再加 -ly，所以出现两个 l。');
  suffix('teacher', 'teach', '教；动词词基', '-er', '做某事的人；名词后缀', '教书的人 → 教师。这里的 -er 表示人，不表示比较级。');
  suffix('computer', 'compute', '计算；动词词基', '-er', '做某事的工具或人；名词后缀', '用来计算的工具 → 计算机。compute 末尾已有 e，加后缀时不重复写 e。');
  suffix('greeting', 'greet', '问候；动词词基', '-ing', '这里构成表示动作或行为的名词', '问候的话或问候行为 → 问候。greeting 在课题 Greetings 中是名词。');
  suffix('building', 'build', '建造；动词词基', '-ing', '这里构成表示建造结果的名词', '建造出来的东西 → 建筑物。classroom building 中的 building 是名词。');
  suffix('interesting', 'interest', '使感兴趣；动词词基', '-ing', '分词形式；这里用作形容词', '使人感兴趣的 → 有趣的，常用来描述事物。');
  suffix('interested', 'interest', '使感兴趣；动词词基', '-ed', '分词形式；这里用作形容词', '感到有兴趣的，常用来描述人：be interested in（对……感兴趣）。这里不是在说过去发生的事。');
  suffix('assessment', 'assess', '评价；动词词基', '-ment', '表示行为、过程或结果；名词后缀', '评价的过程或结果 → 评价、评估。');
  suffix('information', 'inform', '告知；动词词基', '-ation', '表示行为、结果或相关内容；名词后缀', '告知的内容 → 信息。information 通常是不可数名词。');
  suffix('action', 'act', '行动；动词词基', '-ion', '表示行为或结果；名词后缀', '行动、行为。这里可按 act + -ion 记忆。');
  suffix('expression', 'express', '表达；动词词基', '-ion', '表示行为或结果；名词后缀', '表达；表达方式。express 保留两个 s，再接 -ion。');
  entry('informal', '前缀构词', 'in- + formal → informal', [['in-', '不；表示否定的前缀'], ['formal', '正式的；形容词词基']], '不正式的 → 非正式的。这里的 in- 不表示“在里面”。');
  entry('enjoy', '前缀构词', 'en- + joy → enjoy', [['en-', '使进入某种状态；动词前缀'], ['joy', '快乐；名词词基']], '获得乐趣 → 享受、喜欢。常见用法：enjoy doing something。');
  compound('classmate', 'class', '班级；名词', 'mate', '同伴；名词', '同一个班的同伴 → 同班同学。');
  compound('classroom', 'class', '班级；名词', 'room', '房间；名词', '班级上课用的房间 → 教室。');
  compound('football', 'foot', '脚；名词', 'ball', '球；名词', '用脚踢的球类运动 → 足球。');
  compound('weekend', 'week', '星期；名词', 'end', '末尾；名词', '一周的末尾 → 周末。');
  compound('website', 'web', '这里指万维网；名词', 'site', '地点、站点；名词', '万维网上的站点 → 网站。');
  compound('someone', 'some', '某个、不确定的', 'one', '这里指人', '某一个人 → 某人。');
  compound('yourself', 'your', '你的；物主限定词', 'self', '自己', '合起来是反身代词“你自己”，不是普通的名词短语。');
  compound('myself', 'my', '我的；物主限定词', 'self', '自己', '合起来是反身代词“我自己”。');
  compound('herself', 'her', '她；这里是代词 her', 'self', '自己', '合起来是反身代词“她自己”。');
  entry('ourselves', '反身代词', 'our + selves → ourselves', [['our', '我们的；物主限定词'], ['selves', 'self 的复数形式：自己']], '合起来表示“我们自己”。self 变复数时把 f 变为 v，再加 -es；标准的复数反身代词是 ourselves。');
  entry('self-introduction', '合成词', 'self + introduction → self-introduction', [['self', '自己；这里作复合词的前一部分'], ['introduction', '介绍；名词']], '自我介绍。中间的 - 是连字符，用来连接两部分，不是词根或词缀。');
  entry('introduction', '词族与词源', 'intro- + duct + -ion → introduction', [['intro-', '向内、进入；拉丁语来源的前缀'], ['duct', '引领；拉丁语词根形式'], ['-ion', '表示行为或结果；名词后缀']], '“引入”引申为“介绍”。introduce（动词）与 introduction（名词）属于同一词族，词干形式有变化，不能直接拼成 introduce + tion。');
  entry('introduce', '词源辅助记忆', 'intro- + duc(e) → introduce', [['intro-', '向内、进入；拉丁语来源的前缀'], ['duc(e)', '引领；词根 duc 在此词中的拼写形式']], '从“引入”联想到“介绍”。同词族的名词是 introduction；duc / duct 是相关词根形式。词源拆解用来辅助记忆，不是随意造新词的规则。');
  entry('nickname', '词源辅助记忆', 'eke + name → an ekename → a nickname', [['eke', '古词，表示“额外的、附加的”'], ['name', '名字']], '原意是“额外的名字”。历史上词与词之间的 n 被重新划分，形成 nickname；不是 nick（刻痕）+ name。');
  entry('ping-pong', '拟声词', 'ping + pong → ping-pong', [['ping', '模仿击球声'], ['pong', '模仿回击声']], '两种声音交替，形成乒乓球的名称。这里不是词根加后缀；- 只是连字符。');
  entry('only', '历史构词', 'one + -ly → only（历史拼写变化）', [['one', '一个'], ['-ly', '历史上的形容词构词成分']], '起初表示“唯一的”，现代英语中还常作副词“仅仅”。不要按 on + -ly 理解，也不要将这个历史变化当作通用拼写规则。');
  entry('different', '词族记忆', 'differ + -ent → different', [['differ', '不同、有区别；动词词基'], ['-ent', '形容词后缀']], '有区别的 → 不同的。把 differ、different 放在一起记。');
  entry('student', '词族记忆', 'study ↔ student', [['study', '学习；动词'], ['student', '学习的人；名词']], 'study 和 student 有共同的拉丁语来源，但现代拼写不能直接按 study + -ent 拼接。将它们作为同词族记忆。');
  entry('science', '词族记忆', 'science ↔ scientist', [['science', '科学；名词'], ['scientist', '科学家；名词']], '这两个词属于同一词族。scientist 中的 -ist 表示从事某种活动的人；science 本身不按 sc + ience 硬拆。');
  entry('favourite', '词族记忆', 'favour ↔ favourite', [['favour', '喜爱、偏爱；名词或动词'], ['favourite', '最喜欢的；形容词，也可作名词']], '通过“偏爱 → 最喜欢的”记忆。美式拼写是 favorite；不要把末尾字母当作可套用的普通后缀。');
  entry('further', '不规则比较形式', 'far → further', [['far', '远的、远地'], ['further', '更远的；进一步的']], 'Further study 表示“进一步学习”。这是 far 的不规则比较形式，不是 fur + -ther。');
  entry('elder', '不规则比较形式', 'old → elder', [['old', '年长的；形容词'], ['elder', '较年长的；也可指年长者']], '本课 the elder 指较年长的人。elder 与 older 都和 old 有关，但用法不同；不是简单的 old + -er 拼写。');
  entry('younger', '比较级', 'young + -er → younger', [['young', '年轻的；形容词词基'], ['-er', '比较级词尾：更……']], '更年轻的。本课 the younger 指较年轻的人；这里的 -er 和 teacher 中表示人的 -er 作用不同。');

  // Only listed forms are analysed, so a matching word ending alone never implies a suffix.
  function inflection(word, stem, ending, kind, note) {
    forms[word]={stem, step:{kind:'词形变化', formula:`${stem} + ${ending} → ${word}`,parts:[[stem, '原词；含义见词义栏'],[ending,kind]],note}};
  }
  const plurals = {
    classmates:'classmate',students:'student',friends:'friend',teachers:'teacher',greetings:'greeting',introductions:'introduction',
    years:'year',hobbies:'hobby',eyes:'eye',classes:'class',subjects:'subject',problems:'problem',sentences:'sentence',words:'word',
    names:'name',sounds:'sound',letters:'letter',groups:'group',questions:'question',answers:'answer',things:'thing',girls:'girl',
    boys:'boy',lessons:'lesson',parents:'parent',nicknames:'nickname',facts:'fact',states:'state',forms:'form',pairs:'pair',
    phrases:'phrase',pictures:'picture',vowels:'vowel',notes:'note',others:'other'
  };
  for(const [word,stem] of Object.entries(plurals)){
    const es=word.endsWith('es')&&(stem.endsWith('s')||stem.endsWith('y'));
    const note=stem.endsWith('y')?'辅音字母 + y 结尾：把 y 变成 i，再加 -es。复数变化不构成一个新的词义。':'这里表示复数，是语法词尾变化，不是创造新词的词缀。';
    inflection(word,stem,es?'-es':'-s','复数词尾：不止一个',note);
  }
  entry('glasses', '复数形式与词义', 'glass + -es → glasses', [['glass', '玻璃；也可指玻璃杯等'], ['-es', '复数词尾']], '本课 glasses 的固定意思是“眼镜”，不能只根据 glass 的“玻璃”意思直译。说“一副眼镜”用 a pair of glasses。');
  const ingForms={reading:'read',playing:'play',introducing:'introduce',dancing:'dance',swimming:'swim',making:'make',learning:'learn',using:'use',saying:'say',listening:'listen',showing:'show',talking:'talk',writing:'write',meeting:'meet',following:'follow'};
  for(const [word,stem] of Object.entries(ingForms)){
    const spelling=word==='swimming'?'swim 先双写末尾的 m，再加 -ing。':stem.endsWith('e')?'去掉词尾不发音的 e，再加 -ing。':'原词后加 -ing。';
    inflection(word,stem,'-ing','动词的 -ing 形式',spelling+' 具体可用于进行时或表示一项活动；不能看到 -ing 就一律译成“正在”。');
  }
  const thirdPerson={reads:'read',plays:'play',likes:'like',loves:'love',says:'say',wears:'wear',helps:'help',swims:'swim',sends:'send',looks:'look',gets:'get',knows:'know',starts:'start',goes:'go'};
  for(const [word,stem] of Object.entries(thirdPerson))inflection(word,stem,word==='goes'?'-es':'-s','一般现在时第三人称单数词尾','用于 he、she、it 或单数主语等，不是表示“多个”的名词复数。');
  for(const [word,stem] of Object.entries({called:'call',asked:'ask',based:'base'}))inflection(word,stem,'-ed','规则动词的过去式或过去分词词尾',stem.endsWith('e')?'原词以 e 结尾，只再写 d。具体作用由句子决定。':'原词后加 -ed。具体是过去式还是过去分词，要看所在句子。');
  for(const [word,text] of Object.entries({am:'与 I 连用',is:'与 he、she、it 或单数主语等连用',are:'与 you、we、they 或复数主语等连用'}))entry(word,'不规则词形',`be → ${word}`,[['be','是；动词原形'],[word,'be 的一般现在时形式']],text+'。这是不规则变化，不按普通词根词缀拆分。');
  for(const [word,stem,note] of [['has','have','have 的第三人称单数形式。'],['does','do','do 加 -es 的第三人称单数形式，发音也发生变化。']])entry(word,'词形变化',`${stem} → ${word}`,[[stem,'动词原形'],[word,'一般现在时第三人称单数形式']],note);
  const contractions={"i'm":['I','am'],"you're":['you','are'],"we're":['we','are'],"they're":['they','are'],"he's":['he','is'],"she's":['she','is'],"it's":['it','is'],"isn't":['is','not'],"aren't":['are','not'],"don't":['do','not'],"doesn't":['does','not'],"what's":['what','is'],"let's":['let','us'],"you've":['you','have']};
  for(const [word,pair] of Object.entries(contractions))entry(word,'缩写形式',`${word} = ${pair.join(' + ')}`,pair.map(p=>[p,'缩写前的组成词']),'撇号表示省略了字母，不是词缀。这里按本课常见用法展开。');
  for(const name of ['daniel','millie'])entry(`${name}'s`,'所有格',`${name} + 's → ${name}'s`,[[name,'人名'],["'s",'这里表示“……的”']],'这是名词所有格，不是复数词尾，也不是 is 的缩写。');

  const wholeWords = new Set('greet grade middle glad same hobby piano love like play always full energy sport often slim hair polite music well wear smart ready help learn pretty shy quiet dance cute swim healthy stay match luck subject problem enjoy chess fun parent informal meet start first day want someone lot clean easy hard right bye say name age late fine time kite use make place gate page race hide rise life size hope joke note rose character sentence word sound letter vowel verb simple present tense fact state positive negative question correct form complete conversation partner pair below above different share true false information model useful comma pause separate stop end mark describe pronounce spend action plan result weak order message attention rule follow group centre bold person usual mum only every go get let welcome goodbye about each other a an all also and any as at be before both box but by can come do does for from has have here how if in into many more most much need new no not now oh ok on or out over own part pay photo post some study talk the then there these thing this those to too try unit very way what when which with work wow yourself herself myself self our us'.split(' '));
  function morphologyFor(word) {
    const key=normalize(word);
    if(Object.hasOwn(entries,key)){
      return key==='self-introduction'?[entries[key],entries.introduction]:[entries[key]];
    }
    if(Object.hasOwn(forms,key)){
      const {stem,step}=forms[key];
      return Object.hasOwn(entries,stem)?[step,entries[stem]]:[step];
    }
    if(wholeWords.has(key))return [{kind:'整体记忆',formula:key,parts:[],note:'在本课中作为一个完整词来记忆，不作词根词缀拆分。字母相同或词尾相似，并不一定表示含有相同的词缀。'}];
    return [{kind:'整体记忆',formula:key,parts:[],note:'暂未收录这个词的可靠构词分析，先结合词义和例句整体记忆。'}];
  }
  window.morphologyFor=morphologyFor;
})();
