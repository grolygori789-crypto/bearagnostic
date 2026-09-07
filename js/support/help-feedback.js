(() => {
  'use strict';

  const SUPPORT_EMAIL = 'benedict.support@gmail.com';
  const MAX_MESSAGE = 1200;
  const api = () => window.BearagnosticAppAPI || {};

  const COPY = {
    en: {
      hubEyebrow:'HELP & FEEDBACK', hubTitle:'How can Dr. Bear help?', hubLead:'Report a problem, share an idea, or copy safe technical details.',
      report:'Report a Problem', reportSub:'Tell us what happened inside Bearagnostic.', feedback:'Send Feedback', feedbackSub:'Share an idea or tell us what could be better.', diagnostics:'Copy Diagnostic Info', diagnosticsSub:'Copy non-sensitive app and device details.',
      reportTitle:'Report a Problem', reportLead:'Tell us what happened. Bearagnostic will prepare an email for Benedict Interactive Support.', feedbackTitle:'Send Feedback', feedbackLead:'Tell us what worked well, what could be better, or what you would like Dr. Bear to do next.',
      message:'Your message', reportPlaceholder:'What happened? What were you trying to do?', feedbackPlaceholder:'Tell us what you think…', includeTech:'Include technical details', reportTech:'Recommended for problem reports. Only safe app, platform, browser and capability details are included.', feedbackTech:'Optional for feedback. No file names or selected-file details are included.',
      privacy:'Please do not include passwords, payment details, private file names, file paths, or sensitive personal information.', emailNote:'This opens your email app. Nothing is sent until you choose Send there.', openEmail:'Open Email to Send', copyDetails:'Copy Details', close:'Close', back:'Back', required:'Write a short message first.', copied:'Details copied.', diagnosticsCopied:'Diagnostic info copied.', copyFailed:'Could not copy automatically.'
    },
    ja: {
      hubEyebrow:'ヘルプ・フィードバック', hubTitle:'Dr. Bear にご相談ください', hubLead:'不具合の報告、ご意見・ご要望、安全な診断情報のコピーができます。',
      report:'問題を報告', reportSub:'Bearagnostic で起きたことをお知らせください。', feedback:'フィードバックを送る', feedbackSub:'改善案や、もっとこうしてほしいというご意見をお聞かせください。', diagnostics:'診断情報をコピー', diagnosticsSub:'個人情報を含まないアプリ・端末情報だけをコピーします。',
      reportTitle:'問題を報告', reportLead:'何が起きたか教えてください。Benedict Interactive Support 宛てのメールを作成します。', feedbackTitle:'フィードバックを送る', feedbackLead:'良かった点、改善してほしい点、Dr. Bear に今後してほしいことを自由にお書きください。',
      message:'メッセージ', reportPlaceholder:'何が起きましたか？ そのとき何をしようとしていましたか？', feedbackPlaceholder:'ご意見・ご要望をお聞かせください…', includeTech:'技術情報を含める', reportTech:'問題の調査に役立つため推奨です。アプリ、OS、ブラウザ、対応機能など安全な情報だけを含みます。', feedbackTech:'フィードバックでは任意です。ファイル名や選択したファイルの情報は含みません。',
      privacy:'パスワード、決済情報、個人的なファイル名やパス、機密情報は入力しないでください。', emailNote:'メールアプリが開きます。そこで送信するまで、情報は送られません。', openEmail:'メールを開いて送信', copyDetails:'内容をコピー', close:'閉じる', back:'戻る', required:'まず短いメッセージを入力してください。', copied:'内容をコピーしました。', diagnosticsCopied:'診断情報をコピーしました。', copyFailed:'自動でコピーできませんでした。'
    },
    th: {
      hubEyebrow:'ช่วยเหลือและข้อเสนอแนะ', hubTitle:'ให้ Dr. Bear ช่วยอะไรดี?', hubLead:'รายงานปัญหา ส่งความคิดเห็น หรือคัดลอกข้อมูลทางเทคนิคที่ปลอดภัยได้จากตรงนี้',
      report:'รายงานปัญหา', reportSub:'บอกเราว่าเกิดอะไรขึ้นใน Bearagnostic', feedback:'ส่งข้อเสนอแนะ', feedbackSub:'แชร์ไอเดียหรือบอกว่าส่วนไหนควรทำให้ดีขึ้น', diagnostics:'คัดลอกข้อมูลทางเทคนิค', diagnosticsSub:'คัดลอกเฉพาะข้อมูลแอปและอุปกรณ์ที่ไม่ละเอียดอ่อน',
      reportTitle:'รายงานปัญหา', reportLead:'เล่าให้เราฟังว่าเกิดอะไรขึ้น แล้ว Bearagnostic จะเตรียมอีเมลถึงฝ่ายสนับสนุน Benedict Interactive ให้พร้อมส่ง', feedbackTitle:'ส่งข้อเสนอแนะ', feedbackLead:'บอกเราได้เลยว่าส่วนไหนดี ส่วนไหนควรปรับ หรืออยากให้ Dr. Bear ทำอะไรได้เพิ่มในอนาคต',
      message:'ข้อความของคุณ', reportPlaceholder:'เกิดอะไรขึ้น และตอนนั้นคุณกำลังทำอะไรอยู่?', feedbackPlaceholder:'เขียนความคิดเห็นหรือไอเดียของคุณได้เลย…', includeTech:'แนบข้อมูลทางเทคนิค', reportTech:'แนะนำให้เปิดไว้สำหรับรายงานปัญหา ระบบจะใส่เฉพาะเวอร์ชันแอป แพลตฟอร์ม เบราว์เซอร์ และความสามารถที่รองรับ', feedbackTech:'สำหรับข้อเสนอแนะเลือกเปิดได้ตามต้องการ ไม่มีชื่อไฟล์หรือข้อมูลไฟล์ที่เลือกถูกแนบไป',
      privacy:'กรุณาอย่าใส่รหัสผ่าน ข้อมูลการชำระเงิน ชื่อไฟล์หรือพาธส่วนตัว และข้อมูลอ่อนไหว', emailNote:'เมื่อกด ระบบจะเปิดแอปอีเมลของคุณ และจะยังไม่มีอะไรถูกส่งจนกว่าคุณจะกดส่งอีเมลเอง', openEmail:'เปิดอีเมลเพื่อส่ง', copyDetails:'คัดลอกรายละเอียด', close:'ปิด', back:'ย้อนกลับ', required:'กรุณาเขียนข้อความสั้นๆ ก่อน', copied:'คัดลอกรายละเอียดแล้ว', diagnosticsCopied:'คัดลอกข้อมูลทางเทคนิคแล้ว', copyFailed:'ไม่สามารถคัดลอกให้อัตโนมัติได้'
    }
  };

  let overlay = null;
  let view = 'hub';
  let type = 'report';

  function lang(){ return api().getLanguage?.() || (document.documentElement.lang || 'en').split('-')[0]; }
  function c(){ return COPY[lang()] || COPY.en; }
  function icon(kind){
    const paths = {
      report:'<path d="M7 3h10l3 3v15H4V3z"/><path d="M9 9h6M9 13h6M9 17h4"/>',
      feedback:'<path d="M4 5h16v12H8l-4 3z"/><path d="M8 9h8M8 13h5"/>',
      diagnostics:'<path d="M5 12h14M12 5v14"/><circle cx="12" cy="12" r="8"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind] || paths.feedback}</svg>`;
  }
  function ensure(){
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'bx-overlay';
    overlay.id = 'helpFeedbackOverlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.addEventListener('click',(e)=>{ if(e.target===overlay) close(); });
    document.body.appendChild(overlay);
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && overlay.classList.contains('is-open')) close(); });
    return overlay;
  }
  function open(){
    ensure(); overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  }
  function close(){ if(!overlay)return; overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }

  function renderHub(){
    view='hub'; const t=c(); ensure();
    overlay.innerHTML=`<section class="bx-sheet" role="dialog" aria-modal="true" aria-labelledby="bhTitle"><div class="bx-handle"></div><div class="bx-head"><div><div class="bx-eyebrow">${t.hubEyebrow}</div><h2 id="bhTitle">${t.hubTitle}</h2></div><button class="bx-close" data-bx-close type="button" aria-label="${t.close}">×</button></div><p class="bx-lead">${t.hubLead}</p><div class="bx-stack">
      <button class="bx-action-card" data-help-action="report" type="button"><span class="bx-action-icon">${icon('report')}</span><span><strong>${t.report}</strong><small>${t.reportSub}</small></span><b>›</b></button>
      <button class="bx-action-card" data-help-action="feedback" type="button"><span class="bx-action-icon">${icon('feedback')}</span><span><strong>${t.feedback}</strong><small>${t.feedbackSub}</small></span><b>›</b></button>
      <button class="bx-action-card" data-help-action="diagnostics" type="button"><span class="bx-action-icon">${icon('diagnostics')}</span><span><strong>${t.diagnostics}</strong><small>${t.diagnosticsSub}</small></span><b>›</b></button>
    </div></section>`;
    overlay.querySelector('[data-bx-close]').addEventListener('click',close);
    overlay.querySelectorAll('[data-help-action]').forEach(btn=>btn.addEventListener('click',()=>{
      const a=btn.dataset.helpAction; if(a==='diagnostics') copyDiagnostics(); else renderComposer(a);
    }));
    open();
  }

  function renderComposer(nextType){
    type=nextType; view='composer'; const t=c(); const isReport=type==='report'; ensure();
    overlay.innerHTML=`<section class="bx-sheet" role="dialog" aria-modal="true" aria-labelledby="bcTitle"><div class="bx-handle"></div><div class="bx-head"><div><div class="bx-eyebrow">${t.hubEyebrow}</div><h2 id="bcTitle">${isReport?t.reportTitle:t.feedbackTitle}</h2></div><button class="bx-close" data-bx-close type="button" aria-label="${t.close}">×</button></div><p class="bx-lead">${isReport?t.reportLead:t.feedbackLead}</p>
      <label class="bx-field-label" for="bxMessage"><span>${t.message}</span><span class="bx-char-count" id="bxChars">${MAX_MESSAGE}</span></label>
      <textarea class="bx-textarea" id="bxMessage" maxlength="${MAX_MESSAGE}" placeholder="${isReport?t.reportPlaceholder:t.feedbackPlaceholder}"></textarea>
      <label class="bx-toggle-row"><span><strong>${t.includeTech}</strong><small>${isReport?t.reportTech:t.feedbackTech}</small></span><span class="bx-switch"><input id="bxTech" type="checkbox" ${isReport?'checked':''}><span></span></span></label>
      <p class="bx-privacy-note">${t.privacy}</p>
      <div class="bx-actions"><button class="bx-primary" id="bxSend" type="button">${t.openEmail}</button><button class="bx-secondary" id="bxCopy" type="button">${t.copyDetails}</button><button class="bx-secondary" id="bxBack" type="button">${t.back}</button></div><p class="bx-mail-note">${t.emailNote}</p>
    </section>`;
    const ta=overlay.querySelector('#bxMessage'); const chars=overlay.querySelector('#bxChars');
    ta.addEventListener('input',()=>{ chars.textContent=String(MAX_MESSAGE-ta.value.length); });
    overlay.querySelector('[data-bx-close]').addEventListener('click',close);
    overlay.querySelector('#bxBack').addEventListener('click',renderHub);
    overlay.querySelector('#bxSend').addEventListener('click',sendMail);
    overlay.querySelector('#bxCopy').addEventListener('click',copyComposer);
    open(); setTimeout(()=>ta.focus({preventScroll:true}),80);
  }

  function buildBody(){
    const msg=overlay.querySelector('#bxMessage')?.value.trim() || '';
    const tech=Boolean(overlay.querySelector('#bxTech')?.checked);
    const heading=type==='report'?'Bearagnostic — Problem Report':'Bearagnostic — Feedback';
    const parts=[heading,'','Message:',msg];
    if(tech) parts.push('','Technical details:',api().diagnostics?.() || 'Unavailable');
    parts.push('','---',`Prepared locally in Bearagnostic. Nothing is sent until the user sends this email.`);
    return {msg,body:parts.join('\n')};
  }
  function sendMail(){
    const {msg,body}=buildBody(); const t=c(); if(!msg){ api().showToast?.(t.required); return; }
    const build=api().config?.build || 5;
    const subject=type==='report'?`Bearagnostic Build ${build} — Problem report`:`Bearagnostic Build ${build} — Feedback`;
    const href=`mailto:${encodeURIComponent(SUPPORT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href=href;
  }
  async function copyComposer(){
    const {msg,body}=buildBody(); const t=c(); if(!msg){ api().showToast?.(t.required); return; }
    const ok=await api().copyText?.(body); api().showToast?.(ok?t.copied:t.copyFailed);
  }
  async function copyDiagnostics(){
    const t=c(); const ok=await api().copyText?.(api().diagnostics?.() || ''); api().showToast?.(ok?t.diagnosticsCopied:t.copyFailed); close();
  }

  window.BearagnosticHelp = Object.freeze({ openHub:renderHub, openComposer:renderComposer });
  window.addEventListener('bearagnostic:languagechange',()=>{ if(overlay?.classList.contains('is-open')) view==='hub'?renderHub():renderComposer(type); });
})();
