import { initializeApp } from 'firebase-admin/app'
import { setGlobalOptions } from 'firebase-functions/v2/options'

initializeApp()
setGlobalOptions({ maxInstances: 10 })

export * from './department'
export * from './user'
