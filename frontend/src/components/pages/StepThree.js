import React, { useState } from 'react'

export default () => {
  const [ime, setIme] = useState('')
  const [prezime, setPrezime] = useState('')
  const [email, setEmail] = useState('')
  const [brojtel, setBrojTel] = useState('')
  const [specZahtj, setSpecZahtj] = useState('')

  return (
    <div className="step-one-container">
      <p className="title">Informacije o gostu:</p>
      <div className='row-step-3'>
        <div className='first-column-3'>
          
          <input
            className='input-form'
            placeholder='*Ime'
            type='ime'
            onChange={e => setIme(e.target.value)}
            value={email}
            autoFocus
          />
        </div>
        <div className='second-column-3'>
          
          <input
            className='input-form'
            placeholder='*Broj telefona'
            type='brojtel'
            onChange={e =>  setEmail(e.target.value)}
            value={brojtel}
          />
        </div>
      </div>

      <div className='row-step-3'>
        <div className='first-column-3'>
          
          <input
            className='input-form'
            placeholder='*E-mail'
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={ime}
            autoFocus
          />
          <p className="napomena">Ovo je e-mail na koji ćemo vam poslati
            informacije o rezervaciji.
          </p>
        </div>
        <div className='second-column-3'>
          
          <input
            className='input-form'
            placeholder='*Broj telefona'
            type='brojtel'
            onChange={e => setBrojTel(e.target.value)}
            value={prezime}
          />
        </div>
      </div>

      <div className='row'>
        
        <div className='six columns'>
          <label className="title">Specijalni zahtjevi:</label>
          <input
            className='input-form2'
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