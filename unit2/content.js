window.UNIT = {
  title: 'This is me!',
  sections: [
    {id:'welcome', name:'初次见面', en:'Welcome to the unit', pages:'6–7', icon:'hand', title:'Greetings', intro:'New school, new friends, new start!', blocks:[
      {type:'goals', title:'In this unit, we will', items:['read about Millie and her new classmates;','learn about other students from Class 1, Grade 7;','introduce ourselves and our classmates;','learn how to greet others and make new friends.']},
      {type:'text', text:'This is our first day at a new school. Let’s meet some of the students and teachers at Sunshine Middle School, and learn how to greet others and introduce ourselves.'},
      {type:'heading', code:'A', title:'Meet our new classmates', instruction:'Here are some students from Class 1, Grade 7 and their English teacher, Mr Wu. Read what they say.'},
      {type:'dialogue', title:'Good morning, class.', image:'greeting', lines:[['Mr Wu','Good morning, class.'],['Class','Good morning, Mr Wu.'],['Mr Wu','Please greet and introduce each other.']]},
      {type:'introductions', people:[
        ['daniel','Chen Dan / Daniel','Hello, my name is Chen Dan, and Daniel is my English name.'],
        ['amy','Zhao Min / Amy','Hi, I’m Zhao Min. My English name is Amy.'],
        ['kitty','Zhang Ke / Kitty','Hi, my name is Zhang Ke. You can call me Kitty.'],
        ['millie','Wang Xinyue / Millie','Hello, I’m Wang Xinyue, and I go by Millie.'],
        ['simon','Luo Yang / Simon','Good morning. I’m Luo Yang. You can call me Simon.'],
        ['sandy','Li Shanshan / Sandy','Hi, I’m Sandy. My Chinese name is Li Shanshan.']
      ]},
      {type:'heading', code:'B', title:'Nice to meet you!', instruction:'Millie is greeting Sandy. Work in pairs. Greet your partner and then introduce yourself. Use the conversation below as a model. The sentences in the box may help you.'},
      {type:'bank', words:['Good morning.','Good afternoon.','Good evening.']},
      {type:'dialogue', lines:[['Millie','Good morning.'],['Sandy','Morning.'],['Millie','I’m Millie. What’s your name?'],['Sandy','My name is Sandy. Nice to meet you!'],['Millie','Glad to meet you too! Which class are you in?'],['Sandy','I’m in Class 1. And you?'],['Millie','Wow, we’re in the same class! Do you have any hobbies?'],['Sandy','Yes, I like playing the piano. What about you?'],['Millie','I love reading.']]},
      {type:'tip',text:'“Morning” is an informal way of saying “Good morning”. The same goes for “Afternoon/Evening/Night”.'},
      {type:'open',id:'welcome-c',title:'C · What other greetings do you know? Think of a different greeting and share it with your classmates.',fields:['My greeting']}
    ]},
    {id:'reading',name:'认识新同学',en:'Reading',pages:'8–10',icon:'book-open',title:'Welcome to Class 1, Grade 7!',intro:'Millie and her new classmates',blocks:[
      {type:'text',text:'Millie is introducing herself and her new classmates at Sunshine Middle School. Let’s meet them. Before reading, think about the questions below.'},
      {type:'open',id:'before-reading',title:'Before reading',fields:['What do you want to tell your new classmates about yourself?','What do you know about your new classmates?']},
      {type:'profiles',people:[
        ['millie','Wang Xinyue / Millie','Hi! I’m Millie, a new student at Sunshine Middle School. I’m in Class 1, Grade 7.\nI’m 12 years old. I love reading. Here are my new classmates. They’re very friendly. Let’s meet them.'],
        ['simon','Luo Yang / Simon','This is Simon.\nHe is tall.\nHe is always full of energy.\nHe is good at sport.\nHe often plays football after school.'],
        ['sandy','Li Shanshan / Sandy','This is Sandy.\nShe is tall and slim. She has long hair.\nShe is very polite.\nShe likes music and she can play the piano well.'],
        ['daniel','Chen Dan / Daniel','This is Daniel.\nHe is not tall.\nHe wears glasses.\nHe is smart and always ready to help others.\nHe is interested in science.']
      ]},
      {type:'tip',text:'We use “this is ...” to introduce someone to others. We also use “this is ...” to introduce ourselves on the phone.'},
      {type:'exercise',id:'reading-a',title:'A · Match the new students in Class 1, Grade 7 with their hobbies.',kind:'select',options:['a · football','b · music','c · reading','d · science'],questions:[['Millie','c · reading'],['Simon','a · football'],['Sandy','b · music'],['Daniel','d · science']]},
      {type:'exercise',id:'reading-b',title:'B · Read Millie’s introductions again. Write a T if a sentence is true or an F if it is false. Then correct the false one(s).',kind:'tf',questions:[['Millie is interested in reading.','T'],['Simon is not tall.','F','Simon is tall.'],['Simon loves science.','F','Daniel is interested in science.'],['Sandy is a tall, polite girl.','T'],['Sandy and Daniel wear glasses.','T'],['Daniel is very helpful.','T']]},
      {type:'exercise',id:'reading-c',title:'C · Mr Wu is making some notes about his new students. Complete his notes with the correct forms of the words and phrases in the box below.',bank:['be good at','slim','friendly','polite','smart','science','full of energy','ready to'],questions:[
        ['This is Millie. She has short hair. She loves reading.'],
        ['Simon is a tall boy. He likes sport and __ football. He is always __.','is good at','full of energy'],
        ['Sandy is a tall and __ girl with long hair. She is interested in music, and she can play the piano well. She is very __. She always says “please” and “thank you”.','slim','polite'],
        ['Daniel is not tall. He wears glasses. He is __. He likes learning about __. He is very nice and always __ help others.','smart','science','ready to'],
        ['My new students are all very nice. They are __ to each other.','friendly']
      ]},
      {type:'open',id:'reading-d',title:'D · Write some sentences about yourself or one of your classmates. You can write them in the following order.',fields:['Name','Age','Looks','Character','Hobbies']}
    ]},
    {id:'grammar',name:'语法小课堂',en:'Grammar',pages:'11–12',icon:'puzzle',title:'Simple present tense (I)',intro:'The verb be · am / is / are',blocks:[
      {type:'text',text:'Millie sends a message to her old friend Jenny about her new classmates. Read the message and pay attention to the use of the verb be.'},
      {type:'letter',text:'Hi, Jenny. I am at Sunshine Middle School now. It is a nice school. I like my new classmates. They are all very friendly.\n\nSandy is a tall girl. She is interested in music. Simon is tall too. He is good at sport. We are friends now.\n\nHow about you? Are you happy at your new school?'},
      {type:'exercise',id:'grammar-rule',title:'Work out the rule!',note:'We use the simple present tense to talk about facts and states.',kind:'select',options:['am','are','is'],questions:[['We use __ with I.','am'],['We use __ with you, we and they.','are'],['We use __ with he, she and it.','is']]},
      {type:'table',title:'Positive and negative sentences',headers:['Subject','Positive','Negative'],rows:[['I','am happy.','am not happy.'],['You / We / They','are happy.','are not happy.'],['He / She / It','is happy.','is not happy.']]},
      {type:'table',title:'Questions and short answers',headers:['Question','Yes','No'],rows:[['Am I happy?','Yes, you are.','No, you are not.'],['Are you / we / they happy?','Yes, I am. / Yes, we / they are.','No, I am not. / No, we / they are not.'],['Is he / she / it happy?','Yes, he / she / it is.','No, he / she / it is not.']]},
      {type:'tip',text:'I am = I’m · You are = You’re · We are = We’re · They are = They’re · He is = He’s · She is = She’s · It is = It’s\nare not = aren’t · is not = isn’t'},
      {type:'exercise',id:'grammar-a',title:'A · Here are some pictures of Millie, her classmates and her teacher at the new school. Complete what they are saying with the correct forms of the verb be.',questions:[
        ['Hello! I __ Millie. I __ 12 years old.','am','am'],
        ['I have some new friends now. They __ friendly.','are'],
        ['Hi, Daniel. __ you good at football? No, I __.','Are','am not'],
        ['The girls over there __ Kitty and Sandy. They both love sport.','are'],
        ['Look! __ he our teacher? Yes, he __. He __ our English teacher.','Is','is','is'],
        ['This __ our classroom. Our lessons __ not easy, but we enjoy them.','is','are']
      ]},
      {type:'exercise',id:'grammar-b',title:'B · Millie is talking to her new friends. Complete their conversation with the correct forms of the verb be.',questions:[
        ['Millie: Hi, Simon. Hi, Sandy. __ you happy at our new school?','Are'],
        ['Sandy & Simon: Yes, we __.','are'],
        ['Sandy: I like this school a lot! It __ new and clean. Our classmates __ very nice.','is','are'],
        ['Simon: The teachers __ nice too. Mr Wu __ my favourite teacher!','are','is'],
        ['Sandy: __ English easy for you, Simon?','Is'],
        ['Simon: No, it __. It __ hard for me, but I like it.','is not|isn’t|isn\'t','is'],
        ['Sandy: How about you, Millie? __ you interested in English?','Are'],
        ['Millie: Yes, I __. I __ always happy in English class.','am','am']
      ]},
      {type:'open',id:'grammar-c',title:'C · Talk with your partner about people and things in your new school, using the correct forms of the verb be.',fields:['People and things at my school']}
    ]},
    {id:'sounds',name:'发音实验室',en:'Pronunciation',pages:'13',icon:'audio-lines',title:'Vowels (I)',intro:'a · e · i · o · u',blocks:[
      {type:'text',text:'Read the following words. Pay attention to the sounds of the letters a, e, i, o and u.'},
      {type:'sounds',groups:[['a','/eɪ/',['name','face','game','age','late']],['e','/iː/',['be','he','me','we','these']],['i','/aɪ/',['fine','hi','write','time','kite']],['o','/əʊ/',['old','home','no','nose','close']],['u','/juː/',['computer','cute','music','student','use']]]},
      {type:'exercise',id:'sounds-a',title:'A · Read the words below. Then put each one into the correct sound group.',kind:'select',options:['/eɪ/','/iː/','/aɪ/','/əʊ/','/juː/'],questions:[['grade','/eɪ/'],['she','/iː/'],['hello','/əʊ/'],['like','/aɪ/'],['make','/eɪ/'],['music','/juː/'],['those','/əʊ/'],['use','/juː/'],['white','/aɪ/'],['these','/iː/']]},
      {type:'heading',code:'B',title:'Read new words',instruction:'Look at the groups of words. Try to read the new words according to the sound of the word in the centre in each group.'},
      {type:'sounds',groups:[['place','/eɪ/',['same','gate','place','page','race']],['nice','/aɪ/',['hide','rise','nice','life','size']],['home','/əʊ/',['hope','joke','home','note','rose']]]},
      {type:'heading',code:'C',title:'Read the sentences',instruction:'Read the following sentences. Pay attention to the sounds of the letters in bold.'},
      {type:'sentences',items:['We have the same hobbies.','My classmates are all very nice.','Sandy likes listening to piano music.','Simon and Amy go to school by bike.','The students go home by bus.']}
    ]},
    {id:'integration',name:'结交新朋友',en:'Integration',pages:'14–15',icon:'users',title:'Meeting my new friends',intro:'Kitty, Amy and Ms Lin',blocks:[
      {type:'heading',code:'A',title:'Kitty & Amy',instruction:'Millie is writing about her new friends Kitty and Amy. Read her introductions. Circle the correct words in the table.'},
      {type:'profiles',people:[['kitty','Zhang Ke / Kitty','This is Zhang Ke. Her English name is Kitty. She has long hair. She is pretty and has lovely eyes. She is shy and quiet. She likes dancing.'],['amy','Zhao Min / Amy','This is Zhao Min. Her English name is Amy. Her hair is short. She is small and cute. She is always happy. She is good at swimming.']]},
      {type:'choicegrid',id:'integration-a',title:'Looks, character and hobbies',rows:[['Hair',['long hair','short hair'],['long hair'],['short hair']],['Looks',['small','cute','lovely eyes','pretty'],['lovely eyes','pretty'],['small','cute']],['Character',['shy','quiet','happy'],['shy','quiet'],['happy']],['Hobby',['swimming','dancing'],['dancing'],['swimming']]]},
      {type:'listening',id:'integration-b',title:'B · Millie is showing her mum a photo of her new class. Listen to their conversation and complete the sentences below.',questions:[['Kitty and Amy are Millie’s new friends.'],['Kitty is only __ years old. She is good at __. She has dance classes every week. She also likes __.'],['Amy is __ years old. She is small. She swims very __. She likes __ new people.'],['Millie likes her new friends very much.']]},
      {type:'heading',code:'C',title:'Glad to meet you, Ms Lin.',instruction:'Millie and Ms Lin, the Music teacher, meet Simon in front of the classroom building. Work in groups of three to greet and introduce each other. Use the conversation below as a model.'},
      {type:'dialogue',image:'meeting',lines:[['Simon','Hi, Millie.'],['Millie','Hi, Simon. Ms Lin, this is my classmate Simon. Simon, this is Ms Lin, our Music teacher.'],['Simon','Glad to meet you, Ms Lin.'],['Ms Lin','Glad to meet you too, Simon. You like playing football, right?'],['Simon','Yes, I do. I often play football after school. Sport helps me stay healthy and happy.'],['Ms Lin','Great!'],['Simon','Oh, we have a football match with Class 2 at 4:30 this afternoon. I have to go now. Goodbye, Ms Lin. Goodbye, Millie.'],['Ms Lin','OK. Bye. Good luck!'],['Millie','Bye.']]},
      {type:'tip',text:'When we introduce two people to each other, we usually introduce the younger to the elder first.'}
    ]},
    {id:'writing',name:'这就是我',en:'Writing',pages:'15–16',icon:'pen-line',title:'My self-introduction',intro:'A new story starts with you.',blocks:[
      {type:'text',text:'To help students learn more about each other, Mr Wu asked every student to write a self-introduction and post it on the school website.'},
      {type:'compareform',id:'writing-d1',title:'D1 · Daniel is making a table to help him write the self-introduction. Complete the table with your own information.',rows:[['Age','12'],['Favourite subject(s)','Maths, Computer Science'],['Hobbies','Chinese chess, ping-pong']]},
      {type:'heading',code:'D2',title:'Daniel’s self-introduction',instruction:'Here is Daniel’s self-introduction. Read it below.'},
      {type:'letter',avatar:'daniel',text:'Hi there! I am Chen Dan from Class 1, Grade 7.\nMy English name is Daniel. I am 12 years old.\n\nMy favourite subjects are Maths and Computer Science. They are interesting. I am good at them, and I like to help my classmates with Maths problems.\n\nI enjoy playing Chinese chess and ping-pong. I often play these with my dad at the weekend. They are fun.\n\nI have many new classmates at school. They are all very nice. I am happy to make friends with them.\n\nDo you want to be my friend?'},
      {type:'tip',text:'“Hi there” is an informal greeting.\nWe use a comma (,) to pause or separate things in a sentence. We use a full stop (.) to end a sentence. We use a question mark (?) at the end of a question.'},
      {type:'writing',id:'writing-d3',title:'D3 · Write your own self-introduction based on your information in Part D1. Use Daniel’s self-introduction as a model.',expressions:['My name is ... / I am ...','I am ... (years old).','I am in ...','I like/love Maths/Computer Science/...','I like to ...','I am good at ...','I am interested in ...','My favourite ... is ...','I often play ... at the weekend.']}
    ]},
    {id:'assessment',name:'单元回顾',en:'Assessment & Further study',pages:'17',icon:'award',title:'Look how far you’ve come!',intro:'This is me! · Unit 1',blocks:[
      {type:'assessment',id:'assessment',items:['I can describe Millie and her new classmates.','I can use the verb be in the simple present tense correctly.','I can introduce myself and my classmates with the new words in this unit.','I can pronounce the sounds /eɪ/, /iː/, /aɪ/, /əʊ/ and /juː/ correctly in words.','I know how to greet others and make new friends at a new school.']},
      {type:'open',id:'action-plan',title:'My action plan',fields:['I am good at','I need to spend more time on','My action plan']},
      {type:'note',text:'教材另有第 106 页自测练习；本次照片未包含该页。'},
      {type:'heading',title:'Further study',instruction:'Simon has a friend called William Smith. He is from the UK. His parents and friends often call him “Will”. Here are some nicknames for popular English names.'},
      {type:'table',title:'English names & nicknames',headers:['Name','Nickname','Name','Nickname'],rows:[['Andrew','Andy','Elizabeth','Liz'],['James','Jimmy','Susan','Sue'],['Thomas','Tom','William','Will']]},
      {type:'tip',text:'Don’t use a nickname if the person does not ask you to.'},
      {type:'open',id:'further-study',title:'Find out more fun facts about names and share them with your classmates.',fields:['Fun facts about names']}
    ]}
  ]
};
window.BASIC_WORDS = 'a an the am is are be been being was were and or but to of for with at from by as about after before into over out up down off this that these those there here what which who when where why how do does did done have has had can could will would should may must not so too very all any some many much more most each other than then now only both also it’s let’s i’m you’re he’s she’s we’re they’re isn’t aren’t don’t doesn’t i’ll can’t'.split(' ');
window.WORD_FORMS = {
  reading:'read',reads:'read',playing:'play',plays:'play',likes:'like',loves:'love',years:'year',classmates:'classmate',students:'student',friends:'friend',teachers:'teacher',greetings:'greeting',introducing:'introduce',introductions:'introduction',ourselves:'ourself',herself:'herself',others:'other',hobbies:'hobby',says:'say',wears:'wear',glasses:'glasses',helps:'help',eyes:'eye',dancing:'dance',swimming:'swim',swims:'swim',classes:'class',subjects:'subject',problems:'problem',sentences:'sentence',words:'word',names:'name',sounds:'sound',letters:'letter',groups:'group',questions:'question',answers:'answer',things:'thing',girls:'girl',boys:'boy',lessons:'lesson',parents:'parent',nicknames:'nickname',called:'call',asked:'ask',making:'make',learning:'learn',using:'use',saying:'say',sends:'send',looks:'look',listening:'listen',younger:'young',elder:'old',gets:'get',knows:'know'
};
window.PROPER_NAMES = 'millie sandy simon daniel kitty amy jenny wu lin chen dan zhao min zhang ke wang xinyue luo yang li shanshan sunshine english chinese maths uk william smith will andrew andy elizabeth liz james jimmy susan sue thomas tom mr ms'.split(' ');
window.GLOSSARY = {
  'self-introduction':'自我介绍',
  greet:'打招呼；问候',greeting:'问候',introduce:'介绍',introduction:'介绍',classmate:'同班同学',grade:'年级',middle:'中间的；初级中等的',friendly:'友好的',glad:'高兴的',same:'相同的',hobby:'业余爱好',piano:'钢琴',love:'爱；喜爱',like:'喜欢；像',play:'玩；参加运动；演奏',always:'总是',full:'满的',energy:'精力；能量',sport:'体育运动',often:'经常',football:'足球',slim:'苗条的',hair:'头发',polite:'有礼貌的',music:'音乐',well:'好；出色地',wear:'穿；戴',glasses:'眼镜',smart:'聪明的',ready:'准备好的',help:'帮助',interested:'感兴趣的',science:'科学',helpful:'乐于助人的',learn:'学习',please:'请',thank:'感谢',pretty:'漂亮的',lovely:'可爱的；美丽的',shy:'害羞的',quiet:'安静的',dance:'跳舞',cute:'可爱的',swim:'游泳',healthy:'健康的',stay:'保持；停留',match:'比赛',luck:'运气',subject:'学科',favourite:'最喜欢的',interesting:'有趣的',problem:'问题；习题',enjoy:'喜欢；享受',chess:'国际象棋；棋',weekend:'周末',fun:'乐趣；有趣的',nickname:'昵称',popular:'受欢迎的',parent:'父亲或母亲',informal:'非正式的',yourself:'你自己',herself:'她自己',ourself:'我们自己',meet:'遇见；结识',start:'开始',first:'第一；首先',want:'想要',tell:'告诉',someone:'某人',lot:'许多',clean:'干净的',easy:'容易的',hard:'困难的',right:'对的；右边',bye:'再见',say:'说',name:'名字',age:'年龄',late:'迟的',fine:'好的',time:'时间',kite:'风筝',use:'使用',make:'制作；使',place:'地方',gate:'大门',page:'页',race:'比赛',hide:'藏',rise:'上升',life:'生活；生命',size:'大小',hope:'希望',joke:'玩笑',note:'笔记',rose:'玫瑰',character:'性格',look:'看；外貌',sentence:'句子',word:'单词',sound:'声音；音素',letter:'字母；信',vowel:'元音',verb:'动词',simple:'简单的',present:'现在的',tense:'时态',fact:'事实',state:'状态',positive:'肯定的',negative:'否定的',question:'问题；疑问句',correct:'正确的；改正',form:'形式',complete:'完成',conversation:'对话',partner:'搭档',pair:'一对',below:'在下面',above:'在上面',different:'不同的',share:'分享',true:'正确的；真实的',false:'错误的',read:'阅读',think:'想；认为',write:'写',table:'表格；桌子',information:'信息',website:'网站',post:'发布；邮寄',model:'范例；榜样',useful:'有用的',expression:'表达',comma:'逗号',pause:'停顿',separate:'分开',stop:'停止；句号中的 stop',end:'结束',mark:'符号',describe:'描述',pronounce:'发音',correctly:'正确地',spend:'花费',action:'行动',plan:'计划',result:'结果',weak:'薄弱的',wonderful:'极好的',assessment:'评价',further:'进一步的',study:'学习',order:'顺序',message:'消息',attention:'注意',rule:'规则',following:'接下来的',group:'组',centre:'中心',bold:'粗体的',person:'人',usually:'通常',building:'建筑物',mum:'妈妈',only:'仅仅',every:'每一',go:'去',get:'得到',us:'我们（宾格）',let:'让',welcome:'欢迎',goodbye:'再见',about:'关于',each:'每个',other:'其他的',them:'他们（宾格）'
};
