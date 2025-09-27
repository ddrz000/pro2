import React, { useMemo, useRef, useState } from 'react'

const SEGMENTS = ['JOYCASINO','DRIFT CASINO','CASINO X','SOL CASINO','COLUMBUS','ARGO','ASINO X','DRIFT CASINO']

export default function App(){
  const [spinning,setSpinning]=useState(false)
  const [result,setResult]=useState(null)
  const wheelRef=useRef(null)

  const spin=()=>{
    if(spinning) return
    setSpinning(true); setResult(null)
    const targetIndex=Math.floor(Math.random()*SEGMENTS.length)
    const turns=6; const slice=360/SEGMENTS.length
    const targetAngle=360-(targetIndex*slice+slice/2)
    const final=turns*360+targetAngle
    const wheel=wheelRef.current
    wheel.style.transition='transform 3.2s cubic-bezier(0.22,1,0.36,1)'
    wheel.style.transform=`rotate(${final}deg)`
    const onEnd=()=>{ wheel.removeEventListener('transitionend',onEnd); setSpinning(false); setResult(SEGMENTS[targetIndex]) }
    wheel.addEventListener('transitionend',onEnd)
  }

  const labelAngles = useMemo(()=> Array.from({length:SEGMENTS.length}, (_,i)=> (360/SEGMENTS.length)*i + (360/SEGMENTS.length)/2 ), [])

  return (
    <main className="min-h-screen text-amber-200 relative" style={{backgroundImage:'url(/assets/bg.svg)', backgroundSize:'cover', backgroundPosition:'center'}}>
      <header className="border-b border-amber-800/30 bg-[#12100e]/80 sticky top-0 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="hidden md:flex gap-8 tracking-wide text-sm">
            {['CASINO X','COLUMBUS','ARGO CASINO','AZINO777'].map((i)=>(<a key={i} href="#" className="hover:text-amber-300">{i}</a>))}
          </nav>
          <div className="ml-auto text-xs text-amber-400/80">DEMO / UI ONLY</div>
        </div>
      </header>

      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-[1fr_minmax(320px,420px)] gap-10 items-center">
          <div className="relative mx-auto">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px]">
              <img ref={wheelRef} src="/assets/wheel.svg" alt="wheel" className="absolute inset-0 w-full h-full [transform-origin:center]" />
              {labelAngles.map((a,i)=>(
                <div key={i} className="absolute left-1/2 top-1/2 origin-left text-[11px] sm:text-[12px] md:text-sm tracking-wide"
                     style={{ transform:`rotate(${a}deg) translateX(47%)`}}>
                  <span className="block -rotate-90 font-semibold text-amber-200/90 whitespace-nowrap">{SEGMENTS[i]}</span>
                </div>
              ))}
              <img src="/assets/pointer.svg" alt="" className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 select-none pointer-events-none"/>
            </div>
          </div>

          <aside className="relative">
            <div className="relative p-8 md:p-10 text-amber-100" style={{background:'url(/assets/panel.svg) center/100% 100% no-repeat'}}>
              <div className="text-3xl md:text-4xl font-semibold tracking-wide drop-shadow">AZINO <span className="text-amber-400">777</span></div>
              <div className="mt-4 text-5xl md:text-6xl font-black drop-shadow">100</div>
              <div className="text-xl md:text-2xl text-amber-300/90 drop-shadow">БЕСПЛАТНЫХ ВРАЩЕНИЙ</div>
              <p className="mt-4 text-amber-200/90 leading-relaxed">
                Крути колесо, чтобы получить демо-приз. Это учебный макет без реальных выплат и ссылок.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={spin} disabled={spinning} className="px-6 py-3 font-semibold rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-60 shadow-lg shadow-amber-900/40">{spinning?'Крутится...':'Вращать'}</button>
                <button className="px-6 py-3 font-semibold rounded-xl bg-amber-800/50 hover:bg-amber-700/60 border border-amber-900/60">Забрать бонус</button>
              </div>
              <div className="mt-4 text-sm text-amber-300 min-h-[1.5rem]">{result && <>Выпало: <b>{result}</b></>}</div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-amber-900/30 py-8 text-center text-xs text-amber-400/70">
        Макет для демонстрации UI.
      </footer>
    </main>
  )
}