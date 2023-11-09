export function Theme(bgA='#fff', bgB='#222' , bgC  = 'rgba(62, 237, 62, 0.8)', clA='rgba(0,0,0,0.8)') {
    const scheme =  JSON.parse(localStorage.getItem('theme'))
    const root  = document.documentElement
    if (scheme)  {
    root.style.setProperty('--app-bgA', scheme.bgA )
    root.style.setProperty('--app-bgB', scheme.bgB )
    root.style.setProperty('--app-bgC', scheme.bgC )
    root.style.setProperty('--app-clA', scheme.clA ) 
    } 
    else {
    root.style.setProperty('--app-bgA', bgA )
    root.style.setProperty('--app-bgB', bgB )
    root.style.setProperty('--app-bgC', bgC )
    root.style.setProperty('--app-clA', clA )   
    }
}

function AppStorage(theme, bgA,bgB, bgC , clA) {
    const value = {
        theme : theme,
        bgA : bgA,
        bgB : bgB,
        bgC : bgC,
        clA : clA
    }
    return localStorage.setItem('theme', JSON.stringify(value))
}

export function CheckTheme() {
   const theme = JSON.parse(localStorage.getItem('theme'))
   if(theme !== null) {
    return theme.theme
    }
   else false
}

export function DarkTheme() { 
    const bgA  = '#333';
    const bgB =  '#222';
    const bgC  = 'rgba(62, 237, 62, 0.8)';
    const clA = 'rgba(256,256,256,0.9)';
    AppStorage('dark', bgA, bgB, bgC , clA)
    window.location.reload()
}

export function LightTheme() { 
    const bgA  = '#fff';
    const bgB =  '#222';
    const bgC  = 'rgba(62, 237, 62, 0.8)';
    const clA = 'rgba(0,0,0,0.9)';
    AppStorage('light', bgA, bgB , bgC, clA) 
    window.location.reload()
}
