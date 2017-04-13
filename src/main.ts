import {Aquarium} from "./agents/Aquarium"

class Main {
    static init(){
        const main = document.getElementsByTagName("main")[0]

        var aquarium = new Aquarium()
    }
    static load(){
        
    }
}

document.addEventListener("DOMContentLoaded", Main.init)