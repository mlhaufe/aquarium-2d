import {Aquarium} from "./agents/Aquarium"

document.addEventListener("DOMContentLoaded", function(){
    const main = document.getElementsByTagName("main")[0]
    var aquarium = new Aquarium()
    aquarium.run()
})