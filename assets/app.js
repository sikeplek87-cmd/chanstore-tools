document.getElementById('year')?.append(String(new Date().getFullYear()));
const search=document.getElementById('search');if(search){const cards=[...document.querySelectorAll('.tool-card')];search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();let n=0;cards.forEach(c=>{const ok=(c.innerText+' '+c.dataset.tags).toLowerCase().includes(q);c.classList.toggle('hidden',!ok);if(ok)n++});document.getElementById('count').textContent=n+' tools';document.getElementById('empty').hidden=n!==0})}
function byId(id){return document.getElementById(id)}function output(s){const el=byId('result');if(el)el.textContent=s}function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function money(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)}
const tool=document.body.dataset.tool;
if(tool==='discount')byId('calc')?.addEventListener('click',()=>{let p=+byId('price').value,d=+byId('percent').value;if(p<0||d<0||d>100||!Number.isFinite(p+d))return output('Masukkan harga dan diskon yang valid.');output('Potongan: '+money(p*d/100)+'\nHarga setelah diskon: '+money(p*(1-d/100)))});
if(tool==='profit')byId('calc')?.addEventListener('click',()=>{let c=+byId('cost').value,s=+byId('sell').value,q=+byId('qty').value||1;if(c<0||s<0||q<1)return output('Masukkan angka yang valid.');let p=(s-c)*q;output('Total modal: '+money(c*q)+'\nOmzet: '+money(s*q)+'\nKeuntungan: '+money(p)+'\nMargin: '+(s?((s-c)/s*100).toFixed(2):0)+'%')});
if(tool==='word')byId('text')?.addEventListener('input',e=>{let s=e.target.value;output('Kata: '+(s.trim()?s.trim().split(/\s+/).length:0)+'\nKarakter (dengan spasi): '+s.length+'\nKarakter (tanpa spasi): '+s.replace(/\s/g,'').length+'\nParagraf: '+(s.trim()?s.trim().split(/\n\s*\n/).length:0))});
if(tool==='data')byId('convert')?.addEventListener('click',()=>{let v=+byId('amount').value,u=byId('unit').value;if(v<0||!Number.isFinite(v))return output('Masukkan angka valid.');let b=v*({B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776}[u]);output(['B','KB','MB','GB','TB'].map(k=>k+': '+(b/({B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776}[k])).toLocaleString('id-ID',{maximumFractionDigits:6})).join('\n'))});
if(tool==='wa')byId('make')?.addEventListener('click',()=>{let n=byId('phone').value.replace(/\D/g,'').replace(/^0/,'62'),m=encodeURIComponent(byId('message').value);if(n.length<9)return output('Masukkan nomor WhatsApp dengan kode negara atau nomor Indonesia.');let url='https://wa.me/'+n+(m?'?text='+m:'');output(url);byId('open').href=url;byId('open').classList.remove('hidden')});
if(tool==='password'){function gen(){let len=+byId('length').value,chars='abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';if(byId('symbols').checked)chars+='!@#$%^&*()-_=+';let arr=new Uint32Array(len);crypto.getRandomValues(arr);return [...arr].map(x=>chars[x%chars.length]).join('')}byId('make')?.addEventListener('click',()=>output(gen()));}
if(tool==='qr'){byId('make')?.addEventListener('click',()=>{let v=byId('qrtext').value.trim();if(!v)return output('Masukkan teks atau link terlebih dahulu.');let img=byId('qrimg');img.src='https://api.qrserver.com/v1/create-qr-code/?size=260x260&data='+encodeURIComponent(v);img.classList.remove('hidden');byId('qrdownload').href=img.src;byId('qrdownload').classList.remove('hidden');output('QR dibuat melalui layanan pihak ketiga. Jangan masukkan data rahasia.')})}
async function loadPdfLib(){if(window.PDFLib)return window.PDFLib;return new Promise((resolve,reject)=>{let s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';s.onload=()=>resolve(window.PDFLib);s.onerror=reject;document.head.append(s)})}
if(tool==='merge')byId('run')?.addEventListener('click',async()=>{try{let files=[...byId('files').files];if(files.length<2)return output('Pilih minimal dua file PDF.');let lib=await loadPdfLib(),out=await lib.PDFDocument.create();for(let f of files){let pdf=await lib.PDFDocument.load(await f.arrayBuffer());let pages=await out.copyPages(pdf,pdf.getPageIndices());pages.forEach(p=>out.addPage(p))}downloadBlob(new Blob([await out.save()],{type:'application/pdf'}),'gabungan.pdf');output('Selesai. File gabungan mulai diunduh.')}catch(e){output('Gagal memproses PDF. Pastikan file tidak rusak atau terenkripsi.')}});
if(tool==='imgpdf')byId('run')?.addEventListener('click',async()=>{try{let fs=[...byId('files').files];if(!fs.length)return output('Pilih satu atau beberapa gambar.');let lib=await loadPdfLib(),pdf=await lib.PDFDocument.create();for(let f of fs){let bytes=await f.arrayBuffer(),img=f.type==='image/png'?await pdf.embedPng(bytes):await pdf.embedJpg(bytes),page=pdf.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})}downloadBlob(new Blob([await pdf.save()],{type:'application/pdf'}),'gambar-ke-pdf.pdf');output('PDF berhasil dibuat.')}catch(e){output('Gagal. Gunakan gambar JPG atau PNG yang valid.')}});
async function imageFile(){let f=byId('file')?.files[0];if(!f)return output('Pilih gambar terlebih dahulu.');let url=URL.createObjectURL(f),img=new Image();img.onload=()=>{let w=+(byId('width')?.value||img.width),h=+(byId('height')?.value||img.height);if(tool==='resize'&&(!w||!h)){output('Ukuran tidak valid.');return}let c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);c.toBlob(blob=>{if(!blob)return output('Gagal membuat gambar.');downloadBlob(blob,tool==='resize'?'gambar-ubah-ukuran.png':'gambar-kompres.jpg');output('Selesai. Ukuran awal: '+(f.size/1024).toFixed(1)+' KB. Hasil: '+(blob.size/1024).toFixed(1)+' KB.')},tool==='resize'?'image/png':'image/jpeg',+(byId('quality')?.value||75)/100);URL.revokeObjectURL(url)};img.onerror=()=>output('File gambar tidak dapat dibaca.');img.src=url}
if(tool==='compress'||tool==='resize')byId('run')?.addEventListener('click',imageFile);


// Kompres PDF: render halaman dengan PDF.js lalu susun ulang menggunakan pdf-lib.
// Catatan: hasil berupa halaman gambar (raster), bukan teks PDF yang dapat dipilih.
async function loadPdfJs(){
  if(window.pdfjsLib) return window.pdfjsLib;
  await new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload=resolve; s.onerror=()=>reject(new Error('Gagal memuat mesin pembaca PDF.'));
    document.head.append(s);
  });
  if(!window.pdfjsLib) throw new Error('Mesin pembaca PDF tidak tersedia.');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  return window.pdfjsLib;
}
if(tool==='compresspdf') byId('compressPdf')?.addEventListener('click',async()=>{
  const button=byId('compressPdf'), file=byId('pdfFile')?.files?.[0], quality=Number(byId('pdfQuality')?.value||0.68);
  const status=byId('pdfResult');
  const say=s=>{if(status)status.textContent=s};
  if(!file){say('Pilih file PDF terlebih dahulu.');return;}
  if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')){say('File harus berformat PDF.');return;}
  if(file.size>30*1024*1024){say('Ukuran file melebihi batas 30 MB. Coba PDF yang lebih kecil agar HP tidak kehabisan memori.');return;}
  button.disabled=true;
  try{
    say('Memuat mesin PDF…');
    const [pdfjs,lib]=await Promise.all([loadPdfJs(),loadPdfLib()]);
    const bytes=await file.arrayBuffer();
    const source=await pdfjs.getDocument({data:new Uint8Array(bytes)}).promise;
    if(source.numPages>40){throw new Error('PDF memiliki '+source.numPages+' halaman. Batas alat ini 40 halaman agar lebih aman untuk memori HP.');}
    const outputPdf=await lib.PDFDocument.create();
    for(let i=1;i<=source.numPages;i++){
      say('Memproses halaman '+i+' dari '+source.numPages+'…');
      const page=await source.getPage(i);
      const base=page.getViewport({scale:1});
      const scale=Math.min(1.5,Math.max(1,1.25));
      const viewport=page.getViewport({scale});
      const canvas=document.createElement('canvas');
      canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
      const ctx=canvas.getContext('2d',{alpha:false});
      if(!ctx)throw new Error('Browser tidak dapat membuat canvas.');
      ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);
      await page.render({canvasContext:ctx,viewport}).promise;
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));
      if(!blob)throw new Error('Gagal mengoptimalkan halaman '+i+'.');
      const jpg=await blob.arrayBuffer();
      const embedded=await outputPdf.embedJpg(jpg);
      const outPage=outputPdf.addPage([base.width,base.height]);
      outPage.drawImage(embedded,{x:0,y:0,width:base.width,height:base.height});
      canvas.width=1;canvas.height=1;
      page.cleanup();
    }
    say('Menyusun file PDF hasil…');
    const saved=await outputPdf.save({useObjectStreams:true});
    const resultBlob=new Blob([saved],{type:'application/pdf'});
    downloadBlob(resultBlob,'kompres-chanstore.pdf');
    const before=(file.size/1024).toFixed(1),after=(resultBlob.size/1024).toFixed(1);
    const diff=((1-resultBlob.size/file.size)*100);
    say('Selesai. Ukuran awal: '+before+' KB. Ukuran hasil: '+after+' KB. '+(diff>0?'Berkurang '+diff.toFixed(1)+'%.':'Ukuran tidak berkurang; PDF asli mungkin sudah teroptimasi.'));
    await source.destroy();
  }catch(e){
    say('Gagal memproses PDF: '+(e?.message||'Terjadi kesalahan. Pastikan PDF tidak rusak atau terkunci.'));
  }finally{button.disabled=false;}
});
