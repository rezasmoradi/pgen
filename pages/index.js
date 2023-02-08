import React, { useState } from 'react';
import Head from 'next/head'

import TextField from '@/components/TextField';
import Checkbox from '@/components/Checkbox';
import ItemContainer from '@/components/ItemContainer';

export default function Home() {

  const [password, setPassword] = useState('');
  const [composition, setComposition] = useState('0123456789abcdefghijklmnopqrstuvwxyz');
  const [characterLength, setCharacterLength] = useState(10);
  const [textType, setTextType] = useState('password');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [securityColor, setSecurityColor] = useState('rgb(203 213 225)');
  const [securityLevel, setSecurityLevel] = useState('');
  const [checkMatchPassword, setCheckMatchPassword] = useState(true);
  const [error, setError] = useState(false);

  const generatePassword = () => {
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialCharacters = '[`!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~]'

    let lowers = ''
    let uppers = ''
    let num = ''
    let specials = ''
    for (let i = 0; i < 5; i++) {
      lowers += lowerLetters.charAt(Math.floor(Math.random() * 26))
    }
    for (let i = 0; i < 3; i++) {
      num += numbers.charAt(Math.floor(Math.random() * 10))
      specials += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length))
      uppers += upperLetters.charAt(Math.floor(Math.random() * 26))
    }

    let pass = lowers + uppers + num + specials

    let charPass = pass.split('')
    for (let j = charPass.length - 1; j > 0; j--) {
      let rand = Math.floor(Math.random() * (j + 1))
      let tmp = charPass[j]
      charPass[j] = charPass[rand]
      charPass[rand] = tmp
    }
    let shuffledPassword = charPass.join('')

    setPassword(shuffledPassword);
    setRepeatPassword(shuffledPassword);
    checkSecurityPassword(shuffledPassword);
  };

  const checkSecurityPassword = (value) => {
    let lowercase = value.match(/[a-z]/)
    let uppercase = value.match(/[A-Z]/)
    let number = value.match(/[0-9]/)
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let hasSpecialChars = specialChars.test(value);

    const lowercaseScore = lowercase === null ? 0 : 5
    const uppercaseScore = uppercase === null ? 0 : 20
    const numberScore = number === null ? 0 : 13
    const minEightCharsScore = value.length < 12 ? value.length * 3 : 33
    const specialCharsScore = hasSpecialChars ? 30 : 0

    const passStrength = lowercaseScore + uppercaseScore + numberScore + minEightCharsScore + specialCharsScore
    setPasswordStrength(passStrength > 100 ? 100 : passStrength)

    let color = 'rgb(220 38 38)'
    let secLevel = ''
    switch (true) {
      case value.length === 0:
        color = 'rgb(220 38 38)'
        secLevel = '';
        break;
      case passStrength < 10 || (value.length > 0 && value.length < 4):
        color = '#dc2626'
        secLevel = 'خیلی ضعیف'
        break;
      case passStrength >= 10 && passStrength < 30:
        color = '#ef4444'
        secLevel = 'ضعیف'
        break;
      case passStrength >= 30 && passStrength < 50:
        color = '#f97316'
        secLevel = 'متوسط'
        break;
      case passStrength >= 50 && passStrength < 71:
        color = '#f59e0b'
        secLevel = 'نسبتاً خوب'
        break;
      case (passStrength >= 71 && passStrength < 85) || value.length < 8:
        color = '#84cc16'
        secLevel = 'خوب'
        break;
      case passStrength >= 85:
        color = '#16a34a'
        secLevel = 'عالی'
        break;
      default:
        color = 'rgb(203 213 225)'
    }
    setSecurityColor(color)
    setSecurityLevel(secLevel)
  };

  const handleComposition = (checked, type) => {
    switch (type) {
      case 'number':
        setComposition(checked ? composition + '0123456789' : composition.replace(/[0-9]/ig, ''));
        break;
      case 'lowercase':
        setComposition(checked ? composition + 'abcdefghijklmnopqrstuvwxyz' : composition.replace(/[a-z]/ig, ''));
        break;
      case 'uppercase':
        setComposition(checked ? composition + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : composition.replace(/[A-Z]/ig, ''));
        break;
      case 'special':
        setComposition(checked ? composition + '[`!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~]' : composition.replace(/[^a-zA-Z0-9]/ig, ''));
        break;
      default:
        setComposition('');
    }
  };

  const createPassword = () => {
    let pass = '';
    let charPass = composition.split('')
    for (let j = charPass.length - 1; j > 0; j--) {
      let rand = Math.floor(Math.random() * (j + 1))
      let tmp = charPass[j]
      charPass[j] = charPass[rand]
      charPass[rand] = tmp
    }
    let shuffledPassword = charPass.join('')
    for (let i = 0; i < characterLength; i++) {
      pass += shuffledPassword.charAt(Math.random() * shuffledPassword.length)
    }
    setPassword(pass);
    checkSecurityPassword(pass);
    setRepeatPassword(pass);
  };

  return (
    <>
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-auto flex mt-10 dark:bg-gray-800 transition-all bg-slate-300/10" style={{ direction: 'rtl' }}>
        <div className="w-full h-auto pl-2 dark:bg-gray-800 transition-all">
          <div style={{ width: '98%', height: 'auto' }} className="border mx-auto mt-px dark:border-gray-600 rounded shadow-sm dark:shadow-slate-600">
            <div className="w-full h-auto flex flex-col mt-12 mb-8">
              <div className="w-full h-auto grid place-content-center items-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%_minmax(40%,_1fr)_30%]">
                <section className="w-full sm:w-10/12 h-auto mx-auto flex flex-col justify-around lg:mr-8">
                  <TextField
                    label={'رمز عبور '}
                    id="new_pass"
                    type={textType}
                    value={password}
                    onChange={e => { setPassword(e.target.value.trim()); checkSecurityPassword(e.target.value.trim()); }}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1 text-primary">
                      <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                    </svg>}>
                    {password !== '' &&
                      <button tabIndex={-1} onClick={() => { setTextType(textType === 'password' ? 'text' : 'password'); }}>
                        {textType === 'password' ?
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-primary animate-fade">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-6 right-4 w-6 h-6 text-primary animate-fade">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        }
                      </button>
                    }
                  </TextField>
                </section>
                <section className="w-full h-auto md:border-r-2 border-gray-400 pr-8 mt-8 md:mt-0">
                  <span className="inline-block text-xl text-gray-800 dark:text-gray-300 mb-4">رمز عبور امن</span>
                  <ul>
                    <li className="flex justify-start mt-4 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: password.length !== 0 ? password.length < 8 ? 'rgb(239 68 68)' : 'rgb(132 204 22)' : 'rgb(51 65 85)' }}>
                        <path strokeLinecap="round" d="M3 12h18" />
                      </svg>
                      <span className="px-2 text-sm lg:text-base text-gray-800 dark:text-gray-300">حداقل 8 کاراکتر دارد</span>
                    </li>
                    <li className="flex justify-start my-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: password.length !== 0 ? password.match(/[0-9]/) === null ? 'rgb(239 68 68)' : 'rgb(132 204 22)' : 'rgb(51 65 85)' }}>
                        <path strokeLinecap="round" d="M3 12h18" />
                      </svg>
                      <span className="px-2 text-sm lg:text-base text-gray-800 dark:text-gray-300">شامل حداقل یک عدد است</span>
                    </li>
                    <li className="flex justify-start my-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: password.length !== 0 ? password.match(/[A-Z]/) === null ? 'rgb(239 68 68)' : 'rgb(132 204 22)' : 'rgb(51 65 85)' }}>
                        <path strokeLinecap="round" d="M3 12h18" />
                      </svg>
                      <span className="px-2 text-sm lg:text-base text-gray-800 dark:text-gray-300">شامل حداقل یک حرف بزرگ انگلیسی است</span>
                    </li>
                    <li className="flex flex-wrap justify-start my-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: password.length !== 0 ? password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) === null ? 'rgb(239 68 68)' : 'rgb(132 204 22)' : 'rgb(51 65 85)' }}>
                        <path strokeLinecap="round" d="M3 12h18" />
                      </svg>
                      <span className="px-2 text-sm lg:text-base sm:whitespace-nowrap text-gray-800 dark:text-gray-300">شامل حداقل یکی از کاراکترهای خاص مانند</span>
                      <span className="text-primary text-sm lg:text-base font-medium font-mono">
                        ! | @ | # | $ | &
                      </span>
                      <span className="pr-2 text-sm lg:text-base text-gray-800 dark:text-gray-300">است</span>
                    </li>
                  </ul>
                  <div className="w-full h-auto md:h-auto flex flex-col justify-start">
                    <div className="w-10/12 mx-auto relative my-8">
                      <p className="text-medium text-sm text-gray-900 dark:text-gray-300 pb-3">امنیت رمز عبور</p>
                      <div className="w-full h-2 md:ml-4 rounded-full bg-slate-300 dark:bg-slate-600">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: passwordStrength + '%', backgroundColor: securityColor }} />
                      </div>
                      <span className='absolute text-semi-small top-0 left-8' style={{ color: securityColor }}>{securityLevel}</span>
                    </div>
                    <button className="flex justify-around items-center w-10/12 md:w-48 h-11 outline-none backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/50 dark:from-gray-600/20 dark:to-gray-600/50 border dark:border-slate-600 rounded dark:shadow-slate-600/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-2 text-gray-900 dark:text-gray-300 dark:hover:text-gray-900 text-semi-small font-medium mx-auto relative before:absolute before:content-[''] before:transition-all before:top-0 before:left-0 before:w-0 before:h-11 before:rounded before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:before:w-8/12 md:hover:before:w-36 before:-z-10 hover:text-white hover:before:bg-green-600 before:duration-500"
                      onClick={() => generatePassword()}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.563 9.75a12.014 12.014 0 00-3.427 5.136L9 12.75m3-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
                      </svg>
                      <span>تولید رمز عبور تصادفی</span>
                    </button>
                  </div>
                </section>
                <section className="w-full col-span-full lg:col-span-1 sm:w-10/12 h-full lg:border-r-2 border-gray-400 mx-8 pr-2 lg:pr-8 mt-8 md:mt-0">
                  <span className="hidden md:inline-block text-xl text-gray-800 dark:text-gray-300 mb-6">تولید رمز عبور ترکیبی</span>
                  <div className="w-auto h-auto hidden md:flex flex-col justify-around">
                    <Checkbox label={'اعداد'} defaultChecked onChange={e => { handleComposition(e.target.checked, 'number') }} />
                    <Checkbox label={'حروف کوچک انگلیسی'} defaultChecked onChange={e => { handleComposition(e.target.checked, 'lowercase') }} />
                    <Checkbox label={'حروف بزرگ انگلیسی'} onChange={e => { handleComposition(e.target.checked, 'uppercase') }} />
                    <Checkbox label={'کاراکترهای خاص'} onChange={e => { handleComposition(e.target.checked, 'special') }} />
                    <div className="w-1/3 lg:w-full">
                      <TextField label={'طول رمز عبور'} value={characterLength} type={'number'} onChange={value => { setCharacterLength(value); }} />
                    </div>
                    <div className="w-full md:w-11/12 h-11 mt-6 flex justify-center sm:justify-start lg:justify-center">
                      <button className="w-10/12 h-11 md:w-32 md:ml-6 lg:ml-0 backdrop-blur-2xl outline-none bg-gradient-to-br from-white/10 to-white/50 dark:from-gray-600/20 dark:to-gray-600/50 border dark:border-slate-600 rounded dark:shadow-slate-700/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 mx-auto text-gray-900 dark:text-gray-300 text-semi-small font-medium md:mx-2 before:content-[''] before:w-0 before:h-0 hover:before:w-full md:hover:before:w-32 hover:before:h-11 before:duration-300 before:rounded before:transition-all before:absolute before:bottom-0 before:left-0 hover:before:bg-gradient-to-tr hover:before:from-slate-400/20 hover:before:to-slate-400/10 dark:hover:before:from-white/20 dark:hover:before:to-white/10"
                        onClick={createPassword}>
                        تولید رمز عبور
                      </button>
                    </div>
                  </div>
                  <div className="block md:hidden relative md:static right-0 left-0 mx-auto border-b-2 border-slate-400 py-2">
                    <ItemContainer textItem={'تولید رمز عبور ترکیبی'}>
                      <Checkbox label={'اعداد'} onChange={e => { handleComposition(e.target.checked, 'number') }} />
                      <Checkbox label={'حروف کوچک انگلیسی'} onChange={e => { handleComposition(e.target.checked, 'lowercase') }} />
                      <Checkbox label={'حروف بزرگ انگلیسی'} onChange={e => { handleComposition(e.target.checked, 'uppercase') }} />
                      <Checkbox label={'کاراکترهای خاص'} onChange={e => { handleComposition(e.target.checked, 'special') }} />
                      <div className="w-full">
                        <TextField label={'طول رمز عبور'} value={characterLength} type={'number'} onChange={value => { setCharacterLength(value); }} />
                      </div>
                      <div className="w-full md:w-11/12 h-11 mt-8 flex justify-center">
                        <button className="w-10/12 md:w-32 md:ml-6 lg:ml-0 backdrop-blur-2xl outline-none bg-gradient-to-br from-white/10 to-white/50 dark:from-gray-600/20 dark:to-gray-600/50 border dark:border-slate-600 rounded dark:shadow-slate-700/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 mx-auto text-gray-900 dark:text-gray-300 text-semi-small font-medium md:mx-2 before:content-[''] before:w-0 before:h-0 hover:before:w-full md:hover:before:w-32 hover:before:h-11 before:duration-300 before:rounded before:transition-all before:absolute before:bottom-0 before:left-0 hover:before:bg-gradient-to-tr hover:before:from-slate-400/20 hover:before:to-slate-400/10 dark:hover:before:from-white/20 dark:hover:before:to-white/10"
                          onClick={() => { setError(true); }}>
                          تولید رمز عبور
                        </button>
                      </div>
                    </ItemContainer>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
