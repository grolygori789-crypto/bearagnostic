(() => {
  'use strict';

  const KOFI_URL = 'https://ko-fi.com/benedictinteractive';
  /* Canonical approved Benedict Interactive PromptPay QR, reused from the verified support standard. */
  const PROMPTPAY_QR_URL = 'https://raw.githubusercontent.com/grolygori789-crypto/little-ganesha-tarot/main/assets/support/promptpay-qr.png';
  const RECIPIENT_TH = 'จักรพันธ์ เบญจศุภนิมิต';
  const RECIPIENT_EN = 'Jakraphan Benjasupanimit';
  const api = () => window.BearagnosticAppAPI || {};

  const COPY = {
    en: {
      group:'Support the Project', groupNote:'Support is optional and never changes analysis, results, or access.', project:'Support Bearagnostic', projectSub:'Thailand via PromptPay · worldwide via Ko-fi',
      thaiBadge:'THAILAND', thaiTitle:'Support with PromptPay', thaiSub:'Scan or save the verified QR', worldBadge:'WORLDWIDE', worldTitle:'Support on Ko-fi', worldSub:'Continue securely on Ko-fi',
      hubEyebrow:'SUPPORT BEARAGNOSTIC', hubTitle:'Help Dr. Bear keep checking.', hubLead:'Bearagnostic stays open-access. If it is useful to you, voluntary support helps Benedict Interactive keep refining it.',
      promptEyebrow:'SUPPORT IN THAILAND', promptTitle:'Support with PromptPay', promptLead:'Scan the verified QR with a Thai banking app, or save it first if you are using the same phone.', recipient:'RECIPIENT', verify:'Please verify the recipient name in your banking app before confirming any payment.', save:'Save QR', openImage:'Open QR Image', back:'Back', close:'Close', optional:'Support is always optional. It never changes checkup quality, results, limits, or access to any feature.',
      kofiEyebrow:'WORLDWIDE SUPPORT', kofiTitle:'Support Benedict Interactive', kofiLead:'If Bearagnostic is useful to you, you can support continued development on Ko-fi.', kofiBody:'Ko-fi opens in your browser. Payment and account details are handled there, outside Bearagnostic.', kofiCta:'Continue to Ko-fi', qrFailed:'The verified QR could not be loaded. Try again while online.', saved:'QR image saved.', saveFallback:'The QR opened as an image. Save it from your device if needed.'
    },
    ja: {
      group:'プロジェクトを支援', groupNote:'支援は任意です。解析結果、品質、利用できる機能には一切影響しません。', project:'Bearagnostic を支援', projectSub:'タイは PromptPay · 海外は Ko-fi',
      thaiBadge:'タイ国内', thaiTitle:'PromptPay で支援', thaiSub:'確認済みQRをスキャンまたは保存', worldBadge:'WORLDWIDE', worldTitle:'Ko-fi で支援', worldSub:'Ko-fi で Benedict Interactive を支援',
      hubEyebrow:'BEARAGNOSTIC を支援', hubTitle:'Dr. Bear の仕事を応援する', hubLead:'Bearagnostic はオープンアクセスです。役に立ったと感じたら、任意の支援が今後の開発と改善につながります。',
      promptEyebrow:'タイ国内からの支援', promptTitle:'PromptPay で支援', promptLead:'タイの銀行アプリで確認済みQRをスキャンしてください。同じ端末を使う場合は、先にQR画像を保存できます。', recipient:'受取人', verify:'支払いを確定する前に、銀行アプリに表示される受取人名を必ず確認してください。', save:'QRを保存', openImage:'QR画像を開く', back:'戻る', close:'閉じる', optional:'支援は常に任意です。チェック結果、解析品質、利用回数、機能へのアクセスは変わりません。',
      kofiEyebrow:'海外からの支援', kofiTitle:'Benedict Interactive を支援', kofiLead:'Bearagnostic が役に立ったと感じたら、Ko-fi から今後の開発を支援できます。', kofiBody:'Ko-fi はブラウザで開きます。支払い・アカウント情報は Ko-fi 側で扱われ、Bearagnostic には送られません。', kofiCta:'Ko-fi へ進む', qrFailed:'確認済みQRを読み込めませんでした。オンラインで再度お試しください。', saved:'QR画像を保存しました。', saveFallback:'QR画像を開きました。必要に応じて端末へ保存してください。'
    },
    th: {
      group:'สนับสนุนโปรเจกต์', groupNote:'การสนับสนุนเป็นทางเลือก และไม่มีผลต่อคุณภาพการวิเคราะห์ ผลลัพธ์ หรือสิทธิ์ใช้งาน', project:'สนับสนุน Bearagnostic', projectSub:'ในไทยผ่าน PromptPay · ต่างประเทศผ่าน Ko-fi',
      thaiBadge:'ประเทศไทย', thaiTitle:'สนับสนุนผ่าน PromptPay', thaiSub:'สแกนหรือบันทึก QR ที่ตรวจสอบแล้ว', worldBadge:'ทั่วโลก', worldTitle:'สนับสนุนผ่าน Ko-fi', worldSub:'ไปยัง Ko-fi เพื่อสนับสนุน Benedict Interactive',
      hubEyebrow:'สนับสนุน BEARAGNOSTIC', hubTitle:'ช่วยให้ Dr. Bear ทำงานต่อได้', hubLead:'Bearagnostic เปิดให้ใช้งานโดยไม่ผูกกับการสนับสนุน ถ้าแอปนี้มีประโยชน์กับคุณ การสนับสนุนโดยสมัครใจจะช่วยให้ Benedict Interactive พัฒนาและขัดเกลาต่อไปได้',
      promptEyebrow:'สนับสนุนในประเทศไทย', promptTitle:'สนับสนุนผ่าน PromptPay', promptLead:'สแกน QR ที่ตรวจสอบแล้วด้วยแอปธนาคาร หรือบันทึกภาพไว้ก่อนถ้าใช้งานบนโทรศัพท์เครื่องเดียวกัน', recipient:'ชื่อผู้รับ', verify:'กรุณาตรวจสอบชื่อผู้รับในแอปธนาคารก่อนยืนยันการชำระเงินทุกครั้ง', save:'บันทึก QR', openImage:'เปิดภาพ QR', back:'ย้อนกลับ', close:'ปิด', optional:'การสนับสนุนเป็นทางเลือกเสมอ และไม่มีผลต่อคุณภาพการตรวจ ผลลัพธ์ ขีดจำกัด หรือการเข้าถึงฟีเจอร์ใดๆ',
      kofiEyebrow:'สนับสนุนจากทั่วโลก', kofiTitle:'สนับสนุน Benedict Interactive', kofiLead:'ถ้า Bearagnostic มีประโยชน์กับคุณ สามารถร่วมสนับสนุนการพัฒนาต่อผ่าน Ko-fi ได้', kofiBody:'ระบบจะเปิด Ko-fi ในเบราว์เซอร์ การชำระเงินและข้อมูลบัญชีดำเนินการบน Ko-fi โดยตรง ไม่ได้อยู่ใน Bearagnostic', kofiCta:'ไปยัง Ko-fi', qrFailed:'ไม่สามารถโหลด QR ที่ตรวจสอบแล้วได้ กรุณาลองอีกครั้งเมื่อออนไลน์', saved:'บันทึกภาพ QR แล้ว', saveFallback:'เปิดภาพ QR ให้แล้ว สามารถบันทึกจากอุปกรณ์ได้ตามปกติ'
    }
  };

  let overlay = null;
  let view = 'hub';
  function lang(){ return api().getLanguage?.() || (document.documentElement.lang || 'en').split('-')[0]; }
  function c(){ return COPY[lang()] || COPY.en; }
  function ensure(){
    if(overlay) return overlay;
    overlay=document.createElement('div'); overlay.className='bx-overlay'; overlay.id='supportOverlay'; overlay.setAttribute('aria-hidden','true');
    overlay.addEventListener('click',(e)=>{if(e.target===overlay)close();}); document.body.appendChild(overlay);
    document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&overlay.classList.contains('is-open'))close();}); return overlay;
  }
  function open(){ensure();overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  function close(){if(!overlay)return;overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}

  function renderHub(){
    view='hub';const t=c();ensure();
    overlay.innerHTML=`<section class="bx-sheet" role="dialog" aria-modal="true" aria-labelledby="bsTitle"><div class="bx-handle"></div><div class="bx-head"><div><div class="bx-eyebrow">${t.hubEyebrow}</div><h2 id="bsTitle">${t.hubTitle}</h2></div><button class="bx-close" data-support-close type="button" aria-label="${t.close}">×</button></div><p class="bx-lead">${t.hubLead}</p><div class="bx-support-choice">
      <button class="bx-action-card" data-support="promptpay" type="button"><span class="bx-support-badge">${t.thaiBadge}</span><span><strong>${t.thaiTitle}</strong><small>${t.thaiSub}</small></span><b>›</b></button>
      <button class="bx-action-card" data-support="kofi" type="button"><span class="bx-support-badge">${t.worldBadge}</span><span><strong>${t.worldTitle}</strong><small>${t.worldSub}</small></span><b>↗</b></button>
    </div><p class="bx-support-disclaimer">${t.optional}</p></section>`;
    overlay.querySelector('[data-support-close]').addEventListener('click',close);
    overlay.querySelector('[data-support="promptpay"]').addEventListener('click',renderPromptPay);
    overlay.querySelector('[data-support="kofi"]').addEventListener('click',renderKofi);
    open();
  }

  function renderPromptPay(){
    view='promptpay';const t=c();ensure();
    overlay.innerHTML=`<section class="bx-sheet" role="dialog" aria-modal="true" aria-labelledby="bpTitle"><div class="bx-handle"></div><div class="bx-head"><div><div class="bx-eyebrow">${t.promptEyebrow}</div><h2 id="bpTitle">${t.promptTitle}</h2></div><button class="bx-close" data-support-close type="button" aria-label="${t.close}">×</button></div><p class="bx-lead">${t.promptLead}</p>
      <div class="bx-qr-frame"><img id="promptPayQr" src="${PROMPTPAY_QR_URL}" alt="PromptPay QR" referrerpolicy="no-referrer"></div>
      <div class="bx-recipient"><span>${t.recipient}</span><strong>${RECIPIENT_TH}</strong><small>${RECIPIENT_EN}</small></div><p class="bx-verify">${t.verify}</p>
      <div class="bx-actions"><button class="bx-primary" id="savePromptPayQr" type="button">${t.save}</button><button class="bx-secondary" id="openPromptPayQr" type="button">${t.openImage}</button><button class="bx-secondary" id="supportBack" type="button">${t.back}</button></div><p class="bx-support-disclaimer">${t.optional}</p></section>`;
    const img=overlay.querySelector('#promptPayQr'); img.addEventListener('error',()=>api().showToast?.(t.qrFailed),{once:true});
    overlay.querySelector('[data-support-close]').addEventListener('click',close); overlay.querySelector('#supportBack').addEventListener('click',renderHub);
    overlay.querySelector('#openPromptPayQr').addEventListener('click',()=>window.open(PROMPTPAY_QR_URL,'_blank','noopener,noreferrer'));
    overlay.querySelector('#savePromptPayQr').addEventListener('click',saveQr); open();
  }

  async function saveQr(){
    const t=c();
    try{
      const response=await fetch(PROMPTPAY_QR_URL,{mode:'cors',credentials:'omit'}); if(!response.ok)throw new Error('fetch');
      const blob=await response.blob(); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url;a.download='bearagnostic-promptpay-qr.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);api().showToast?.(t.saved);
    }catch(_){ window.open(PROMPTPAY_QR_URL,'_blank','noopener,noreferrer'); api().showToast?.(t.saveFallback); }
  }

  function renderKofi(){
    view='kofi';const t=c();ensure();
    overlay.innerHTML=`<section class="bx-sheet" role="dialog" aria-modal="true" aria-labelledby="bkTitle"><div class="bx-handle"></div><div class="bx-head"><div><div class="bx-eyebrow">${t.kofiEyebrow}</div><h2 id="bkTitle">${t.kofiTitle}</h2></div><button class="bx-close" data-support-close type="button" aria-label="${t.close}">×</button></div><p class="bx-lead">${t.kofiLead}</p><div class="bx-provider"><strong>Ko-fi · Benedict Interactive</strong><p>${t.kofiBody}</p></div><div class="bx-actions"><button class="bx-primary" id="openKofi" type="button">${t.kofiCta}</button><button class="bx-secondary" id="supportBack" type="button">${t.back}</button></div><p class="bx-support-disclaimer">${t.optional}</p></section>`;
    overlay.querySelector('[data-support-close]').addEventListener('click',close);overlay.querySelector('#supportBack').addEventListener('click',renderHub);
    overlay.querySelector('#openKofi').addEventListener('click',()=>window.open(KOFI_URL,'_blank','noopener,noreferrer'));open();
  }

  function localizeStatic(){
    const t=c();
    const title=document.getElementById('supportProjectTitle');
    const sub=document.getElementById('supportProjectSub');
    if(title) title.textContent=t.project;
    if(sub) sub.textContent=t.projectSub;
  }
  function bind(){
    document.getElementById('supportProjectRow')?.addEventListener('click',renderHub);
    localizeStatic();
  }

  window.BearagnosticSupport=Object.freeze({open:renderHub,openPromptPay:renderPromptPay,openKofi:renderKofi});
  window.addEventListener('bearagnostic:languagechange',()=>{localizeStatic();if(overlay?.classList.contains('is-open')){view==='promptpay'?renderPromptPay():view==='kofi'?renderKofi():renderHub();}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
