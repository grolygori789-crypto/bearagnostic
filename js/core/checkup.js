(() => {
  'use strict';

  const MB = 1024 * 1024;
  const LARGE_FILE_BYTES = 100 * MB;
  const OLD_FILE_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  const SAFE_HASH_FILE_BYTES = 32 * MB;
  const SAFE_HASH_TOTAL_BYTES = 128 * MB;
  const RING_LENGTH = 289.03;

  const COPY = {
    en: {
      kicker:'SCANNING YOUR FILES', runningTitle:'Checking things out', idleTitle:'Ready for a checkup', doneTitle:'Checkup complete',
      runningSub:'A cleaner device leads to brighter days.', idleSub:'Choose files or a folder. Dr. Bear only checks what you select.', doneSub:'Your selected files have been reviewed locally.',
      preparing:'Preparing', preparingSub:'Getting ready', details:'File Details', detailsSub:'Reading info', sizes:'File Sizes', sizesSub:'Analyzing', duplicates:'Duplicates', duplicatesSub:'Finding matches', dates:'Modified Dates', datesSub:'Checking dates', finalizing:'Finalizing', finalizingSub:'Almost there',
      filesReviewed:'files reviewed', duplicateCandidates:'duplicate candidates', largeNoted:'large files noted', olderFound:'older files found', scanning:'SCANNING', ready:'READY', complete:'COMPLETE',
      quoteRunning:'Looking carefully. Bears don’t rush diagnostics.', quoteIdle:'Your files. Your choice.', quoteDone:'All done. Only the files you selected were checked.',
      tipTitle:'Did you know?', tipBody:'Bearagnostic checks selected files locally and does not upload their contents in this version.',
      actionIdle:'Choose files or a folder', actionRunning:'Scanning in progress…', actionDone:'Run another checkup',
      pickerEyebrow:'LOCAL CHECKUP', pickerTitle:'What should Dr. Bear check?', pickerLead:'Choose files or a folder. Bearagnostic analyzes only what you explicitly select.', chooseFiles:'Choose files', chooseFilesSub:'Select one or more files', chooseFolder:'Choose folder', chooseFolderSub:'Analyze a folder you select', pickerPrivacy:'Selected file contents stay on this device in the current version.', cancel:'Cancel',
      noFiles:'No files were selected.', folderUnavailable:'Folder selection is not supported by this browser. Choose files instead.', hashNote:'Large same-size files are counted only as duplicate candidates unless safe hashing is available.'
    },
    ja: {
      kicker:'選択したファイルをチェック中', runningTitle:'丁寧に確認中', idleTitle:'チェックの準備ができました', doneTitle:'チェック完了',
      runningSub:'端末をすっきり。毎日を軽やかに。', idleSub:'ファイルまたはフォルダを選択してください。Dr. Bear が確認するのは選んだものだけです。', doneSub:'選択したファイルを端末内で確認しました。',
      preparing:'準備', preparingSub:'準備中', details:'ファイル情報', detailsSub:'情報を確認', sizes:'ファイル容量', sizesSub:'容量を解析', duplicates:'重複候補', duplicatesSub:'一致を確認', dates:'更新日時', datesSub:'日付を確認', finalizing:'仕上げ', finalizingSub:'もう少し',
      filesReviewed:'確認済みファイル', duplicateCandidates:'重複候補', largeNoted:'大容量ファイル', olderFound:'古いファイル', scanning:'チェック中', ready:'準備完了', complete:'完了',
      quoteRunning:'丁寧に確認中。診断は急ぎません。', quoteIdle:'選ぶのは、あなた。', quoteDone:'完了しました。確認したのは選択したファイルだけです。',
      tipTitle:'ご存じですか？', tipBody:'Bearagnostic は選択ファイルを端末内で解析し、現在のバージョンでは内容をアップロードしません。',
      actionIdle:'ファイルまたはフォルダを選ぶ', actionRunning:'チェック中…', actionDone:'もう一度チェック',
      pickerEyebrow:'ローカルチェック', pickerTitle:'何をチェックしますか？', pickerLead:'ファイルまたはフォルダを選んでください。Bearagnostic が解析するのは明示的に選んだものだけです。', chooseFiles:'ファイルを選ぶ', chooseFilesSub:'複数ファイルを選択できます', chooseFolder:'フォルダを選ぶ', chooseFolderSub:'選択したフォルダを解析', pickerPrivacy:'現在のバージョンでは、選択ファイルの内容は端末内に留まります。', cancel:'キャンセル',
      noFiles:'ファイルが選択されていません。', folderUnavailable:'このブラウザはフォルダ選択に対応していません。ファイルを選択してください。', hashNote:'安全にハッシュできない大容量の同サイズファイルは、重複確定ではなく候補としてのみ数えます。'
    },
    th: {
      kicker:'กำลังตรวจไฟล์ที่คุณเลือก', runningTitle:'กำลังตรวจอย่างละเอียด', idleTitle:'พร้อมตรวจไฟล์แล้ว', doneTitle:'ตรวจไฟล์เรียบร้อย',
      runningSub:'เครื่องที่เป็นระเบียบขึ้น ก็ทำให้ทุกอย่างลื่นขึ้น', idleSub:'เลือกไฟล์หรือโฟลเดอร์ คุณหมอแบร์จะตรวจเฉพาะสิ่งที่คุณเลือกเท่านั้น', doneSub:'ตรวจไฟล์ที่คุณเลือกภายในเครื่องเรียบร้อยแล้ว',
      preparing:'เตรียมการ', preparingSub:'กำลังเตรียม', details:'รายละเอียดไฟล์', detailsSub:'อ่านข้อมูล', sizes:'ขนาดไฟล์', sizesSub:'กำลังวิเคราะห์', duplicates:'ไฟล์ซ้ำ', duplicatesSub:'หาคู่ที่ตรงกัน', dates:'วันที่แก้ไข', datesSub:'ตรวจวันที่', finalizing:'สรุปผล', finalizingSub:'ใกล้เสร็จแล้ว',
      filesReviewed:'ไฟล์ที่ตรวจแล้ว', duplicateCandidates:'ไฟล์ซ้ำที่น่าสงสัย', largeNoted:'ไฟล์ขนาดใหญ่', olderFound:'ไฟล์เก่าที่พบ', scanning:'กำลังตรวจ', ready:'พร้อม', complete:'เสร็จแล้ว',
      quoteRunning:'กำลังดูให้ละเอียด การตรวจที่ดีไม่ต้องรีบ', quoteIdle:'ไฟล์ของคุณ คุณเป็นคนเลือก', quoteDone:'เรียบร้อย ตรวจเฉพาะไฟล์ที่คุณเลือกเท่านั้น',
      tipTitle:'รู้หรือไม่?', tipBody:'Bearagnostic วิเคราะห์ไฟล์ที่คุณเลือกภายในเครื่อง และเวอร์ชันนี้ไม่อัปโหลดเนื้อหาไฟล์ออกจากแอพ',
      actionIdle:'เลือกไฟล์หรือโฟลเดอร์', actionRunning:'กำลังตรวจไฟล์…', actionDone:'ตรวจอีกครั้ง',
      pickerEyebrow:'ตรวจบนเครื่อง', pickerTitle:'ให้คุณหมอแบร์ตรวจอะไร?', pickerLead:'เลือกไฟล์หรือโฟลเดอร์ Bearagnostic จะวิเคราะห์เฉพาะสิ่งที่คุณเลือกเองเท่านั้น', chooseFiles:'เลือกไฟล์', chooseFilesSub:'เลือกได้มากกว่าหนึ่งไฟล์', chooseFolder:'เลือกโฟลเดอร์', chooseFolderSub:'วิเคราะห์โฟลเดอร์ที่คุณเลือก', pickerPrivacy:'เวอร์ชันปัจจุบันจะเก็บเนื้อหาไฟล์ที่เลือกไว้บนเครื่องนี้เท่านั้น', cancel:'ยกเลิก',
      noFiles:'ยังไม่ได้เลือกไฟล์', folderUnavailable:'เบราว์เซอร์นี้ไม่รองรับการเลือกโฟลเดอร์ กรุณาเลือกไฟล์แทน', hashNote:'ไฟล์ขนาดใหญ่ที่มีขนาดเท่ากันจะนับเป็นเพียงผู้ต้องสงสัยว่าอาจซ้ำ หากไม่สามารถแฮชได้อย่างปลอดภัย'
    }
  };

  const $ = (id) => document.getElementById(id);
  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => [...root.querySelectorAll(sel)];
  const screen = $('checkupScreen');
  const appRoot = $('appRoot');
  const picker = $('scanPicker');
  const fileInput = $('scanFileInput');
  const folderInput = $('scanFolderInput');
  const actionButton = $('scanAction');
  const stream = $('scanFileStream');
  const ring = $('scanRingValue');
  const percentage = $('scanPercent');
  const ringLabel = $('scanRingLabel');
  const railProgress = $('scanRailProgress');
  const reviewed = $('scanReviewed');
  const duplicates = $('scanDuplicates');
  const large = $('scanLarge');
  const older = $('scanOlder');
  const titleText = $('scanTitleText');
  const subtitle = $('scanSubtitle');
  const kicker = $('scanKicker');
  const quote = $('scanQuote');
  const tipTitle = $('scanTipTitle');
  const tipBody = $('scanTipBody');

  let state = 'idle';
  let scanToken = 0;
  let files = [];
  let streamTimer = null;
  let progressValue = 0;

  const stageDefs = [
    ['preparing','preparingSub',0,8], ['details','detailsSub',8,28], ['sizes','sizesSub',28,45],
    ['duplicates','duplicatesSub',45,80], ['dates','datesSub',80,94], ['finalizing','finalizingSub',94,100]
  ];

  function lang() {
    const value = (document.documentElement.lang || 'en').toLowerCase();
    return value.startsWith('th') ? 'th' : value.startsWith('ja') ? 'ja' : 'en';
  }
  function text(key) { return COPY[lang()][key] || COPY.en[key] || key; }
  function toast(message) { window.BearagnosticAppAPI?.showToast?.(message); }
  function reducedMotion() {
    const mode = document.documentElement.dataset.motion;
    return mode === 'reduced' || (mode === 'system' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function applyCopy() {
    if (!screen) return;
    kicker.textContent = text('kicker');
    tipTitle.textContent = text('tipTitle'); tipBody.textContent = text('tipBody');
    qsa('[data-scan-stage]', screen).forEach((el, i) => {
      const def = stageDefs[i];
      qs('strong',el).textContent = text(def[0]); qs('small',el).textContent = text(def[1]);
    });
    const idle = state === 'idle', running = state === 'running';
    titleText.textContent = text(running ? 'runningTitle' : idle ? 'idleTitle' : 'doneTitle');
    subtitle.textContent = text(running ? 'runningSub' : idle ? 'idleSub' : 'doneSub');
    quote.textContent = text(running ? 'quoteRunning' : idle ? 'quoteIdle' : 'quoteDone');
    ringLabel.textContent = text(running ? 'scanning' : idle ? 'ready' : 'complete');
    actionButton.textContent = text(running ? 'actionRunning' : idle ? 'actionIdle' : 'actionDone');
    $('scanReviewedLabel').textContent = text('filesReviewed');
    $('scanDuplicatesLabel').textContent = text('duplicateCandidates');
    $('scanLargeLabel').textContent = text('largeNoted');
    $('scanOlderLabel').textContent = text('olderFound');
    $('scanPickerEyebrow').textContent=text('pickerEyebrow'); $('scanPickerTitle').textContent=text('pickerTitle'); $('scanPickerLead').textContent=text('pickerLead');
    $('scanChooseFilesText').textContent=text('chooseFiles'); $('scanChooseFilesSub').textContent=text('chooseFilesSub'); $('scanChooseFolderText').textContent=text('chooseFolder'); $('scanChooseFolderSub').textContent=text('chooseFolderSub'); $('scanPickerPrivacy').textContent=text('pickerPrivacy'); $('scanPickerCancel').textContent=text('cancel');
  }

  function setState(next) {
    state = next; if (screen) screen.dataset.state = next;
    actionButton.disabled = next === 'running';
    applyCopy();
  }
  function setProgress(value) {
    const next = Math.max(0, Math.min(100, Number(value) || 0));
    progressValue = next;
    percentage.textContent = String(Math.round(next));
    ring.style.strokeDashoffset = String(RING_LENGTH * (1 - next / 100));
    const rail = stageDefs.length > 1 ? Math.max(0, Math.min(100, ((stageIndexForProgress(next)) / (stageDefs.length - 1)) * 100)) : 0;
    railProgress.style.width = `${rail}%`;
  }
  function stageIndexForProgress(value) {
    let index = 0;
    stageDefs.forEach((def,i) => { if (value >= def[2]) index=i; });
    return index;
  }
  function setStage(index, stageProgress=0) {
    qsa('[data-scan-stage]',screen).forEach((el,i) => {
      el.classList.toggle('is-done', i < index || (index === stageDefs.length && i < stageDefs.length));
      el.classList.toggle('is-active', i === index && index < stageDefs.length);
    });
    const def = stageDefs[index];
    if (def) setProgress(def[2] + (def[3]-def[2]) * Math.max(0,Math.min(1,stageProgress)));
    else if (index >= stageDefs.length) { setProgress(100); railProgress.style.width='100%'; }
  }
  function resetCounters() { reviewed.textContent='0'; duplicates.textContent='0'; large.textContent='0'; older.textContent='0'; }

  function openPicker() {
    if (state === 'running') return;
    picker.hidden=false; requestAnimationFrame(()=>picker.classList.add('is-open'));
  }
  function closePicker() {
    picker.classList.remove('is-open'); setTimeout(()=>{ if(!picker.classList.contains('is-open')) picker.hidden=true; },220);
  }

  function fileKind(file) {
    const type=(file.type||'').toLowerCase(); const name=(file.name||'').toLowerCase();
    if (type.startsWith('image/')) return 'image'; if (type.startsWith('video/')) return 'video'; if (type.startsWith('audio/')) return 'audio';
    if (/\.(zip|rar|7z|tar|gz|folder)$/i.test(name)) return 'folder'; return 'doc';
  }
  const icons = {
    doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M10 12h5M10 15h5"/>',
    image:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.4"/><path d="m6 17 4-4 3 3 2-2 3 3"/>',
    video:'<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m10 9 5 3-5 3z"/>',
    audio:'<path d="M9 18V7l9-2v11"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="16" r="2.5"/>',
    folder:'<path d="M3.5 7h6l2-2H20a1.5 1.5 0 0 1 1.5 1.5V18A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18V8A1 1 0 0 1 3.5 7Z"/>'
  };
  function spawnTile(file) {
    if (!stream || reducedMotion() || state!=='running') return;
    const kind=fileKind(file||{}); const tile=document.createElement('span'); tile.className='scan-file-tile'; tile.dataset.kind=kind; tile.style.setProperty('--lane',String(Math.floor(Math.random()*4))); tile.innerHTML=`<svg viewBox="0 0 24 24">${icons[kind]}</svg>`; stream.appendChild(tile); setTimeout(()=>tile.remove(),1900);
  }
  function startStream() {
    stopStream(); if (reducedMotion()) return;
    let i=0; streamTimer=setInterval(()=>{ if(state!=='running'||!files.length) return; spawnTile(files[i++%files.length]); },430); spawnTile(files[0]);
  }
  function stopStream() { if(streamTimer){clearInterval(streamTimer);streamTimer=null;} }
  function yieldFrame() { return new Promise((resolve)=>requestAnimationFrame(()=>resolve())); }
  async function hashFile(file) { const buf=await file.arrayBuffer(); const digest=await crypto.subtle.digest('SHA-256',buf); return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join(''); }

  async function analyze(selected) {
    const token=++scanToken; files=[...selected].filter(Boolean); if(!files.length){toast(text('noFiles'));return;}
    setState('running'); resetCounters(); setProgress(0); qsa('[data-scan-stage]',screen).forEach(el=>el.classList.remove('is-done','is-active')); startStream();
    const summary={reviewed:0,duplicates:0,large:0,older:0};
    const ensure=()=>{ if(token!==scanToken) throw new Error('cancelled'); };
    try{
      setStage(0,.15); await yieldFrame();
      const normalized=[];
      for(let i=0;i<files.length;i++){
        ensure(); const f=files[i]; normalized.push({file:f,size:Number(f.size)||0,modified:Number(f.lastModified)||0,type:f.type||''}); summary.reviewed=i+1; reviewed.textContent=String(summary.reviewed); setStage(1,(i+1)/files.length); if(i%16===0) await yieldFrame();
      }
      setStage(2,0); await yieldFrame();
      for(let i=0;i<normalized.length;i++){
        ensure(); if(normalized[i].size>=LARGE_FILE_BYTES) summary.large++; large.textContent=String(summary.large); setStage(2,(i+1)/normalized.length); if(i%24===0) await yieldFrame();
      }
      setStage(3,0); await yieldFrame();
      const bySize=new Map();
      normalized.forEach((item)=>{ if(item.size<=0)return; const arr=bySize.get(item.size)||[]; arr.push(item); bySize.set(item.size,arr); });
      const groups=[...bySize.values()].filter(g=>g.length>1); let processed=0; const work=Math.max(1,groups.length);
      for(const group of groups){
        ensure(); const total=group.reduce((s,x)=>s+x.size,0); let duplicatesInGroup=Math.max(0,group.length-1);
        if(window.crypto?.subtle && group.every(x=>x.size<=SAFE_HASH_FILE_BYTES) && total<=SAFE_HASH_TOTAL_BYTES){
          try{
            const hashes=new Map();
            for(const item of group){ const h=await hashFile(item.file); const count=hashes.get(h)||0; hashes.set(h,count+1); }
            duplicatesInGroup=[...hashes.values()].reduce((sum,count)=>sum+Math.max(0,count-1),0);
          }catch(_){
            // Reading/hash failure never turns a candidate into an invented exact duplicate.
            duplicatesInGroup=Math.max(0,group.length-1);
          }
        }
        summary.duplicates+=duplicatesInGroup; duplicates.textContent=String(summary.duplicates); processed++; setStage(3,processed/work); await yieldFrame();
      }
      if(!groups.length) setStage(3,1);
      setStage(4,0); await yieldFrame(); const cutoff=Date.now()-OLD_FILE_AGE_MS;
      for(let i=0;i<normalized.length;i++){
        ensure(); const m=normalized[i].modified; if(m>0&&m<cutoff) summary.older++; older.textContent=String(summary.older); setStage(4,(i+1)/normalized.length); if(i%24===0) await yieldFrame();
      }
      setStage(5,.15); await yieldFrame();
      // Aggregate only. No filenames, paths, file contents, or hashes are persisted.
      try{ localStorage.setItem('bearagnostic.lastCheckupSummary',JSON.stringify({at:Date.now(),reviewed:summary.reviewed,duplicateCandidates:summary.duplicates,largeFiles:summary.large,olderFiles:summary.older})); }catch(_){ }
      setStage(5,1); await yieldFrame(); setStage(6,1); stopStream(); files=[]; setState('complete');
    }catch(err){ if(err?.message!=='cancelled'){ stopStream(); files=[]; setState('idle'); toast('Bearagnostic could not finish this checkup.'); } }
  }

  function onFiles(input) { const selected=[...(input.files||[])]; input.value=''; closePicker(); if(selected.length) analyze(selected); else toast(text('noFiles')); }
  function bind(){
    $('startCheckup')?.addEventListener('click',()=>setTimeout(openPicker,0));
    actionButton?.addEventListener('click',openPicker);
    $('scanChooseFiles')?.addEventListener('click',()=>fileInput?.click());
    $('scanChooseFolder')?.addEventListener('click',()=>{ if('webkitdirectory' in document.createElement('input')) folderInput?.click(); else toast(text('folderUnavailable')); });
    $('scanPickerCancel')?.addEventListener('click',closePicker); picker?.addEventListener('click',(e)=>{ if(e.target===picker)closePicker(); });
    fileInput?.addEventListener('change',()=>onFiles(fileInput)); folderInput?.addEventListener('change',()=>onFiles(folderInput));
    window.addEventListener('bearagnostic:languagechange',applyCopy);
    window.addEventListener('bearagnostic:screenchange',(e)=>{ const checkup=e.detail?.screen==='checkup'; appRoot?.classList.toggle('is-checkup',checkup); if(!checkup) closePicker(); });
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'&&picker?.classList.contains('is-open'))closePicker(); });
  }
  function boot(){ if(!screen)return; setState('idle'); setProgress(0); resetCounters(); bind(); applyCopy(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
