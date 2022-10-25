//@ts-check

import { Store } from './Store.mjs'

class CLayoutManager {
    #active
    #layout

    constructor() {
        Store.subscribe('layout', this.#onChange)
        this.#onChange(Store.get('layout'))
    }

    #onChange = async (newLayout) => {
        if (newLayout === this.#active) {
            this.#layout.update()
        } else {
            this.#active = newLayout
            this.#layout?.exterminate()
            this.#layout = await this.#getLayout(newLayout)
            this.#layout?.render()
        }
    }

    async #getLayout(name) {
        let layout
        switch (name) {
            case 'main':
                const { MainLayout } = await import('../layouts/Main/MainLayout.mjs')
                layout = new MainLayout()
                break
        }

        return layout
    }
}

export const LayoutManager = new CLayoutManager()
