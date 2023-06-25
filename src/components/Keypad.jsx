import React from 'react'
import Button from './Buttons.jsx'
import Heater_1 from '../sounds/Heater_1.mp3'
import Heater_2 from '../sounds/Heater-2.mp3'
import Heater_3 from '../sounds/Heater-3.mp3'
import Heater_4 from '../sounds/Heater-4_1.mp3'
import Heater_6 from '../sounds/Heater-6.mp3'
import RP4_KICK_1 from '../sounds/RP4_KICK_1.mp3'
import kit_n_cat from '../sounds/Kick_n_Hat.mp3'
import Cev_H2 from '../sounds/Cev_H2.mp3'
import Dsc_Oh from '../sounds/Dsc_Oh.mp3'

function Keypad() {
  return (
    <div className='keypad_Container'>
    <div className="keypad">
  <Button name={'Q'} title={'Heater 1'} audioPath={Heater_1}/>
  <Button name={'W'} title={'Heater 2'} audioPath={Heater_2}/>
  <Button name={'E'} title={'Heater 3'} audioPath={Heater_3}/>
  <Button name={'A'} title={'Heater 4'} audioPath={Heater_4}/>
  <Button name={'S'} title={'Clap'} audioPath={Cev_H2}/>
  <Button name={'D'} title={'Open HH'} audioPath={Dsc_Oh}/>
  <Button name={'Z'} title={'Kick n\' Hat'} audioPath={kit_n_cat}/>
  <Button name={'X'} title={'Kick'} audioPath={RP4_KICK_1}/>
  <Button name={'C'} title={'Closed HH'} audioPath={Heater_6}/>
</div>
</div>

  )
}

export default Keypad