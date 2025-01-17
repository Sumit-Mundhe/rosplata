// @ts-check
import { AuthManager } from "./core/AuthManager.mjs"
import { LayoutManager } from "./core/LayoutManager.mjs"
import { Router } from "./core/Router.mjs"
import { SettingsManager } from "./core/SettingsManager.mjs"
import { importStyle } from "./utils/imports.js"

importStyle('/styles/App.css')

document.querySelector('#features-support-checkup')?.remove()

document.body.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault()
        event.stopImmediatePropagation()
        let didgoback = true
        if ('goback' in event.target.dataset) {
            didgoback = Router.back()
            if (didgoback) {
                return
            }
        }
        Router.navigate(event.target.getAttribute('href'), !didgoback)
    }
})

window.addEventListener('load', async () => {
    // SettingsManager.changeTheme(SettingsManager.theme)
    await AuthManager.start()
    if (await AuthManager.validate()) {
        Router.start()
    }
})
