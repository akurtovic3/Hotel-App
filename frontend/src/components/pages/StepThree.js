import React, { useState } from 'react'

export default () => {
  const [ime, setIme] = useState('')
  const [prezime, setPrezime] = useState('')
  const [email, setEmail] = useState('')
  const [brojTel, setBrojTel] = useState('')
  const [specZahtj, setSpecZahtj] = useState('')

  return (
    <div>
      <div className='row'>
        <div className='six columns'>
          <label>*Ime</label>
          <input
            className='u-full-width required'
            placeholder='Ime'
            type='ime'
            onChange={e => setIme(e.target.value)}
            value={ime}
            autoFocus
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          <label>*Prezime</label>
          <input
            className='u-full-width'
            placeholder='Prezime'
            type='prezime'
            onChange={e => setPrezime(e.target.value)}
            value={prezime}
          />
        </div>
      </div>

      <div className='row'>
        <div className='six columns'>
          <label>*e-mail</label>
          <input
            className='u-full-width'
            placeholder='e-mail'
            type='e-mail'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>

      <div className='row'>
        <div className='six columns'>
          <label>*Broj telefona</label>
          <input
            className='u-full-width'
            placeholder='Broj telefona'
            type='Broj telefona'
            onChange={e => setBrojTel(e.target.value)}
            value={brojTel}
          />
        </div>
      </div>

      <div className='row'>
        <div className='six columns'>
          <label>Specijalni zahtjevi</label>
          <input
            className='u-full-width'
            placeholder='Ukoliko imate specijalne zahtjeve, napomene i slično, navedite ih ovdje.'
            type='Specijalni zahtjevi'
            onChange={e => setSpecZahtj(e.target.value)}
            value={specZahtj}
          />
        </div>
      </div>
      
    </div>
  )
}