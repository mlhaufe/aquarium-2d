import {Presentation} from "./Presentation"
import {Abstraction} from "./Abstraction"

interface Agent {
    readonly presentation: HTMLElement
    readonly abstraction: Object
}
export {Agent}